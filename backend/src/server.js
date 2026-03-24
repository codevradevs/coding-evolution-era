require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const passport = require('./config/passport');
const connectDB = require('./db/connection');

const {
  globalLimiter,
  noSQLSanitize,
  hppProtection,
  securityHeaders,
  requestSizeGuard,
  suspiciousRequestDetector,
  buildCorsOptions,
} = require('./middleware/security');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const vaultRoutes = require('./routes/vault');
const challengeRoutes = require('./routes/challenges');
const trackerRoutes = require('./routes/tracker');
const networkRoutes = require('./routes/network');
const contactRoutes = require('./routes/contact');
const tipsRoutes = require('./routes/tips');
const productsRoutes = require('./routes/products');
const profileRoutes = require('./routes/profile');
const certificateRoutes = require('./routes/certificates');
const rankingsRoutes = require('./routes/rankings');
const blogsRoutes = require('./routes/blogs');
const servicesRoutes = require('./routes/services');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// ─── Core Security Headers ────────────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", 'https://api.codevra.co.ke'],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: false,
  crossOriginResourcePolicy: false,
  dnsPrefetchControl: { allow: false },
  frameguard: { action: 'deny' },
  hidePoweredBy: true,
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
  ieNoOpen: true,
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  xssFilter: true,
}));

app.use(securityHeaders);

// ─── CORS ─────────────────────────────────────────────────────────────────────
app.use(cors(buildCorsOptions()));

// ─── Trust proxy (for accurate IP behind Render/Vercel/Nginx) ────────────────
app.set('trust proxy', 1);

// ─── Body Parsing (strict limits) ────────────────────────────────────────────
app.use(requestSizeGuard);
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// ─── NoSQL Injection Prevention ───────────────────────────────────────────────
app.use(noSQLSanitize);

// ─── HTTP Parameter Pollution Prevention ─────────────────────────────────────
app.use(hppProtection);

// ─── Suspicious Request Detection ────────────────────────────────────────────
app.use(suspiciousRequestDetector);

// ─── Global Rate Limiter ──────────────────────────────────────────────────────
app.use('/api/', globalLimiter);

// ─── Session ──────────────────────────────────────────────────────────────────
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  name: 'sid',  // don't expose default 'connect.sid' name
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'strict',
    maxAge: 24 * 60 * 60 * 1000,
  },
}));

app.use(passport.initialize());
app.use(passport.session());

// ─── Health Check (no auth, no rate limit) ───────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Codevra API' });
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/vault', vaultRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/tracker', trackerRoutes);
app.use('/api/network', networkRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/tips', tipsRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/rankings', rankingsRoutes);
app.use('/api/blogs', blogsRoutes);
app.use('/api/services', servicesRoutes);

// ─── 404 ──────────────────────────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ error: 'Not found.' }));

// ─── Global Error Handler (never leak stack traces) ──────────────────────────
app.use((err, req, res, next) => {
  console.error(`[error] ${err.message} — ${req.method} ${req.path} — IP: ${req.ip}`);
  console.error(err.stack);
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'CORS policy violation.' });
  }
  res.status(err.status || 500).json({ error: err.message || 'Something went wrong.' });
});

app.listen(PORT, () => {
  console.log(`🚀 Codevra API running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
});

module.exports = app;
