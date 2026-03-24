const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const jwt = require('jsonwebtoken');

// ─── Rate Limiters ────────────────────────────────────────────────────────────

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please slow down.' },
  skip: (req) => req.path === '/api/health',
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many auth attempts. Try again in 15 minutes.' },
});

const forgotPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many password reset requests. Try again in 1 hour.' },
});

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many contact submissions. Try again later.' },
});

const quoteLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many quote requests. Try again later.' },
});

const publicReadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests.' },
});

// ─── Input Sanitization ───────────────────────────────────────────────────────

const noSQLSanitize = mongoSanitize({
  replaceWith: '_',
  onSanitize: ({ req, key }) => {
    console.warn(`[security] NoSQL injection attempt blocked — key: ${key} — IP: ${req.ip}`);
  },
});

const sanitizeString = (str = '', maxLen = 1000) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/data:/gi, '')
    .trim()
    .substring(0, maxLen);
};

const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
const isValidEmail = (email) => EMAIL_REGEX.test(email);

const OBJECTID_REGEX = /^[a-f\d]{24}$/i;
const isValidObjectId = (id) => OBJECTID_REGEX.test(id);

// ─── HTTP Parameter Pollution Protection ─────────────────────────────────────
const hppProtection = hpp();

// ─── Security Headers ─────────────────────────────────────────────────────────
const securityHeaders = (req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.removeHeader('X-Powered-By');
  next();
};

// ─── Request Size Guard ───────────────────────────────────────────────────────
const requestSizeGuard = (req, res, next) => {
  const contentLength = parseInt(req.headers['content-length'] || '0', 10);
  if (contentLength > 1 * 1024 * 1024) {
    return res.status(413).json({ error: 'Request payload too large.' });
  }
  next();
};

// ─── Suspicious Request Detector ─────────────────────────────────────────────
const SUSPICIOUS_PATTERNS = [
  /(\.\.|\/etc\/passwd|\/proc\/|\/sys\/)/i,
  /(union\s+select|drop\s+table|insert\s+into|delete\s+from)/i,
  /(<script|<iframe|<object|<embed)/i,
  /(eval\(|exec\(|system\(|passthru\()/i,
  /(\$where|\$regex|\$gt|\$lt|\$ne|\$in)/,
  /(base64_decode|base64_encode)/i,
];

const suspiciousRequestDetector = (req, res, next) => {
  const toCheck = [
    JSON.stringify(req.body || {}),
    JSON.stringify(req.query || {}),
    req.path,
    req.headers['user-agent'] || '',
  ].join(' ');

  for (const pattern of SUSPICIOUS_PATTERNS) {
    if (pattern.test(toCheck)) {
      console.warn(`[security] Suspicious request blocked — IP: ${req.ip} — Path: ${req.path}`);
      return res.status(400).json({ error: 'Invalid request.' });
    }
  }
  next();
};

// ─── CORS ─────────────────────────────────────────────────────────────────────
const buildCorsOptions = () => {
  const allowed = (process.env.FRONTEND_URL || 'http://localhost:3000').replace(/\/+$/, '');
  return {
    origin: (origin, callback) => {
      if (!origin || origin === allowed) return callback(null, true);
      if (process.env.NODE_ENV !== 'production') return callback(null, true);
      console.warn(`[security] CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400,
  };
};

// ─── Auth Middleware ──────────────────────────────────────────────────────────
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required.' });
  }

  const token = authHeader.split(' ')[1];
  if (!token || token.length > 2048) {
    return res.status(401).json({ error: 'Invalid token format.' });
  }

  try {
    // algorithms whitelist prevents alg:none attack
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
    if (!decoded.userId) return res.status(401).json({ error: 'Invalid token payload.' });
    req.userId = decoded.userId;
    req.user = { userId: decoded.userId };
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') return res.status(401).json({ error: 'Token expired.' });
    if (err.name === 'JsonWebTokenError') return res.status(401).json({ error: 'Invalid token.' });
    return res.status(401).json({ error: 'Authentication failed.' });
  }
};

// Optional auth — attaches user if valid token present, never blocks
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return next();
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
    if (decoded.userId) {
      req.userId = decoded.userId;
      req.user = { userId: decoded.userId };
    }
  } catch (_) {}
  next();
};

// Role-based access control
const requireRole = (...roles) => (req, res, next) => {
  if (!req.userRole || !roles.includes(req.userRole)) {
    return res.status(403).json({ error: 'Insufficient permissions.' });
  }
  next();
};

module.exports = {
  globalLimiter,
  authLimiter,
  forgotPasswordLimiter,
  contactLimiter,
  quoteLimiter,
  publicReadLimiter,
  noSQLSanitize,
  sanitizeString,
  isValidEmail,
  isValidObjectId,
  hppProtection,
  securityHeaders,
  requestSizeGuard,
  suspiciousRequestDetector,
  buildCorsOptions,
  authMiddleware,
  optionalAuth,
  requireRole,
};
