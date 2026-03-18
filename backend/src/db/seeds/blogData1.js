const securityBlogs = [
  {
    title: 'How to Build a Secure Node.js Backend from Scratch',
    slug: 'secure-nodejs-backend-guide',
    category: 'Security',
    excerpt: 'A comprehensive guide to building production-ready Node.js backends with security best practices baked in from day one.',
    content: `# How to Build a Secure Node.js Backend from Scratch

Building a secure backend isn't optional—it's the foundation of trust between you and your users. In this guide, we'll walk through building a production-ready Node.js backend with security at its core.

## 1. Environment Setup

Never hardcode secrets. Use environment variables:

\`\`\`javascript
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
\`\`\`

## 2. Authentication Best Practices

Use bcrypt for password hashing with a salt round of at least 12:

\`\`\`javascript
const bcrypt = require('bcryptjs');
const hashedPassword = await bcrypt.hash(password, 12);
\`\`\`

## 3. Input Validation

Always validate and sanitize user input:

\`\`\`javascript
const { body, validationResult } = require('express-validator');

app.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
});
\`\`\`

## 4. Rate Limiting

Prevent brute force attacks:

\`\`\`javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use('/api/', limiter);
\`\`\`

## 5. CORS Configuration

Be specific about allowed origins:

\`\`\`javascript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
\`\`\`

## 6. Helmet for Security Headers

\`\`\`javascript
const helmet = require('helmet');
app.use(helmet());
\`\`\`

## 7. SQL Injection Prevention

Use parameterized queries or ORMs:

\`\`\`javascript
// Bad
const query = \`SELECT * FROM users WHERE email = '\${email}'\`;

// Good
const query = 'SELECT * FROM users WHERE email = ?';
db.query(query, [email]);
\`\`\`

## 8. JWT Security

- Use strong secrets (256-bit minimum)
- Set short expiration times
- Implement refresh tokens
- Store tokens securely (httpOnly cookies)

## 9. Error Handling

Never expose stack traces in production:

\`\`\`javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message 
  });
});
\`\`\`

## 10. Logging

Log security events but never log sensitive data:

\`\`\`javascript
logger.info('Login attempt', { email, ip: req.ip });
// Never log passwords, tokens, or PII
\`\`\`

## Conclusion

Security is a journey, not a destination. Keep your dependencies updated, run security audits regularly, and stay informed about new vulnerabilities.`,
    readTime: 12,
    tags: ['Node.js', 'Security', 'Backend', 'Authentication'],
    featured: true,
    publishedAt: new Date('2025-02-15')
  },
  {
    title: '5 JWT Vulnerabilities Every Developer Should Know',
    slug: 'jwt-vulnerabilities-guide',
    category: 'Security',
    excerpt: 'Common JWT security pitfalls and how to avoid them. Algorithm confusion, token leakage, and improper validation.',
    content: `# 5 JWT Vulnerabilities Every Developer Should Know

JWTs are everywhere, but they're often implemented incorrectly. Here are the top 5 vulnerabilities and how to fix them.

## 1. Algorithm Confusion Attack

**The Problem:** Attackers can change the algorithm from RS256 to HS256, making the public key the secret.

**The Fix:**
\`\`\`javascript
jwt.verify(token, publicKey, { algorithms: ['RS256'] });
\`\`\`

Always specify allowed algorithms explicitly.

## 2. None Algorithm Attack

**The Problem:** Some libraries accept "none" as an algorithm, bypassing signature verification.

**The Fix:**
\`\`\`javascript
// Never allow 'none'
jwt.verify(token, secret, { algorithms: ['HS256', 'RS256'] });
\`\`\`

## 3. Weak Secret Keys

**The Problem:** Using weak secrets like "secret" or "password123".

**The Fix:**
\`\`\`javascript
// Generate strong secret
const crypto = require('crypto');
const secret = crypto.randomBytes(64).toString('hex');
\`\`\`

Use at least 256 bits of entropy.

## 4. Token Leakage

**The Problem:** Storing JWTs in localStorage exposes them to XSS attacks.

**The Fix:**
\`\`\`javascript
res.cookie('token', jwt, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict'
});
\`\`\`

Use httpOnly cookies instead.

## 5. Missing Expiration

**The Problem:** Tokens that never expire.

**The Fix:**
\`\`\`javascript
const token = jwt.sign(payload, secret, { expiresIn: '15m' });
\`\`\`

Always set short expiration times and implement refresh tokens.

## Bonus: Token Revocation

Implement a token blacklist for logout:

\`\`\`javascript
const blacklist = new Set();

app.post('/logout', (req, res) => {
  blacklist.add(req.token);
  res.json({ message: 'Logged out' });
});

// Middleware
function checkBlacklist(req, res, next) {
  if (blacklist.has(req.token)) {
    return res.status(401).json({ error: 'Token revoked' });
  }
  next();
}
\`\`\`

## Conclusion

JWT security requires attention to detail. Follow these practices and your authentication system will be much more secure.`,
    readTime: 8,
    tags: ['JWT', 'Security', 'Authentication'],
    featured: false,
    publishedAt: new Date('2025-02-12')
  },
  {
    title: 'How to Design a Zero-Trust Backend Architecture',
    slug: 'zero-trust-backend-architecture',
    category: 'Security',
    excerpt: 'Building backend systems where nothing is trusted by default. A practical guide to zero-trust principles.',
    content: `# How to Design a Zero-Trust Backend Architecture

Zero-trust means "never trust, always verify." Here's how to implement it in your backend.

## Core Principles

1. **Verify explicitly** - Always authenticate and authorize
2. **Least privilege access** - Minimal permissions needed
3. **Assume breach** - Design for compromise

## Implementation

### 1. Authentication Everywhere

\`\`\`javascript
// Every endpoint requires auth
app.use('/api', authMiddleware);

// No exceptions
app.get('/api/public', authMiddleware, (req, res) => {
  // Even "public" endpoints verify identity
});
\`\`\`

### 2. Role-Based Access Control

\`\`\`javascript
const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};

app.delete('/api/users/:id', 
  authMiddleware, 
  authorize(['admin']), 
  deleteUser
);
\`\`\`

### 3. Resource-Level Permissions

\`\`\`javascript
// Check ownership
app.get('/api/documents/:id', async (req, res) => {
  const doc = await Document.findById(req.params.id);
  
  if (doc.userId !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  res.json(doc);
});
\`\`\`

### 4. Audit Logging

\`\`\`javascript
function auditLog(action, resource, userId) {
  AuditLog.create({
    action,
    resource,
    userId,
    timestamp: new Date(),
    ip: req.ip
  });
}
\`\`\`

### 5. Network Segmentation

- API Gateway as single entry point
- Internal services not exposed
- Service-to-service authentication

### 6. Encryption Everywhere

\`\`\`javascript
// Encrypt sensitive data at rest
const encrypted = crypto.encrypt(data, key);

// TLS for data in transit
// Force HTTPS
app.use((req, res, next) => {
  if (!req.secure && process.env.NODE_ENV === 'production') {
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
});
\`\`\`

## Monitoring

- Track failed auth attempts
- Alert on unusual patterns
- Regular security audits

## Conclusion

Zero-trust isn't paranoia—it's pragmatism. Build systems that assume compromise and you'll sleep better at night.`,
    readTime: 10,
    tags: ['Security', 'Architecture', 'Zero-Trust'],
    featured: false,
    publishedAt: new Date('2025-02-10')
  }
];

module.exports = { securityBlogs };
