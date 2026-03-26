const crypto = require('crypto');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');
const passport = require('../config/passport');
const { User } = require('../models');
const { authMiddleware } = require('../middleware/auth');
const { forgotPasswordLimiter, authLimiter } = require('../middleware/security');
const { sendPasswordResetEmail } = require('../utils/mailer');

const router = express.Router();

// In-memory QR sessions (keyed by sessionId)
const qrSessions = {};

const signTokens = (userId) => ({
  accessToken: jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN }),
  refreshToken: jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }),
});

const userPayload = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  avatar: user.avatar,
  provider: user.provider,
});

// ─── Local Auth ───────────────────────────────────────────────────────────────

router.post('/register', authLimiter, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'All fields are required' });
    if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Invalid email format' });
    if (!/^[a-zA-Z0-9\s'\-\.]{2,100}$/.test(name.trim())) return res.status(400).json({ error: 'Name contains invalid characters' });

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(400).json({ error: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
      provider: 'local',
    });

    const tokens = signTokens(user._id);
    res.status(201).json({ user: userPayload(user), ...tokens });
  } catch {
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

    const user = await User.findOne({ email: email.toLowerCase() });

    // Reject OAuth-only accounts trying to use password login
    if (!user || !user.password) return res.status(401).json({ error: 'Invalid credentials' });

    // Check account lock before verifying password
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      const mins = Math.ceil((user.lockedUntil - Date.now()) / 60000);
      return res.status(423).json({ error: `Account locked. Try again in ${mins} minutes.` });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
      user.lastFailedLogin = new Date();
      if (user.failedLoginAttempts >= 10) {
        user.lockedUntil = new Date(Date.now() + 30 * 60 * 1000);
      }
      await user.save();
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    user.failedLoginAttempts = 0;
    user.lockedUntil = undefined;
    user.lastLogin = new Date();
    await user.save();

    const tokens = signTokens(user._id);
    res.json({ user: userPayload(user), ...tokens });
  } catch {
    res.status(500).json({ error: 'Login failed' });
  }
});

router.post('/logout', authMiddleware, (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: 'Refresh token required' });
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, { algorithms: ['HS256'] });
    const tokens = signTokens(decoded.userId);
    res.json(tokens);
  } catch {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
});

// ─── Password Reset ───────────────────────────────────────────────────────────

router.post('/forgot-password', forgotPasswordLimiter, async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const user = await User.findOne({ email: email.toLowerCase() });
    // Only local accounts can reset password; always return same message
    if (!user || user.provider !== 'local') {
      return res.json({ message: 'If that email exists, a reset link was sent' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
    await sendPasswordResetEmail({ name: user.name, email: user.email, resetLink });

    res.json({ message: 'If that email exists, a reset link was sent' });
  } catch {
    res.status(500).json({ error: 'Failed to process request' });
  }
});

router.post('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    if (!password || password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters' });

    const user = await User.findOne({ resetToken: token, resetTokenExpiry: { $gt: new Date() } });
    if (!user) return res.status(400).json({ error: 'Invalid or expired reset link' });

    user.password = await bcrypt.hash(password, 12);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch {
    res.status(500).json({ error: 'Failed to reset password' });
  }
});

// ─── QR Login ─────────────────────────────────────────────────────────────────

router.get('/qr/generate', async (req, res) => {
  try {
    const sessionId = uuidv4();
    qrSessions[sessionId] = { status: 'pending', createdAt: Date.now() };
    setTimeout(() => { delete qrSessions[sessionId]; }, 2 * 60 * 1000);
    const qr = await QRCode.toDataURL(sessionId);
    res.json({ sessionId, qr });
  } catch {
    res.status(500).json({ error: 'Failed to generate QR' });
  }
});

router.get('/qr/status/:sessionId', (req, res) => {
  const session = qrSessions[req.params.sessionId];
  if (!session) return res.status(404).json({ error: 'Session expired or not found' });
  if (session.status === 'approved') {
    const { accessToken, refreshToken } = session;
    delete qrSessions[req.params.sessionId];
    return res.json({ status: 'approved', accessToken, refreshToken });
  }
  res.json({ status: session.status });
});

router.post('/qr/approve', authMiddleware, async (req, res) => {
  try {
    const { sessionId } = req.body;
    if (!sessionId || !qrSessions[sessionId]) return res.status(404).json({ error: 'Session not found or expired' });
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const tokens = signTokens(user._id);
    qrSessions[sessionId] = { status: 'approved', ...tokens };
    res.json({ message: 'QR session approved' });
  } catch {
    res.status(500).json({ error: 'Failed to approve QR session' });
  }
});

// ─── Debug (remove after confirming OAuth works) ────────────────────────────
router.get('/debug-oauth', (req, res) => {
  res.json({
    API_URL: process.env.API_URL,
    CLIENT_URL: process.env.CLIENT_URL,
    NODE_ENV: process.env.NODE_ENV,
    google_callback: `${process.env.API_URL}/api/auth/google/callback`,
    github_callback: `${process.env.API_URL}/api/auth/github/callback`,
  });
});

// ─── OAuth — Google ───────────────────────────────────────────────────────────

router.get('/google', (req, res, next) => {
  console.log('[google:route] /api/auth/google hit');
  console.log('[google:route] API_URL:', process.env.API_URL);
  console.log('[google:route] redirect_uri will be:', `${process.env.API_URL}/api/auth/google/callback`);
  console.log('[google:route] GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })(req, res, next);
});

router.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', { session: false }, (err, user) => {
    if (err || !user) return res.redirect(`${process.env.CLIENT_URL}/auth/login?error=google`);
    const tokens = signTokens(user._id);
    const params = new URLSearchParams({ token: tokens.accessToken, refresh: tokens.refreshToken });
    res.redirect(`${process.env.CLIENT_URL}/auth/callback?${params.toString()}`);
  })(req, res, next);
});

// ─── OAuth — GitHub ───────────────────────────────────────────────────────────

router.get('/github', (req, res, next) => {
  console.log('[github:route] /api/auth/github hit');
  console.log('[github:route] API_URL:', process.env.API_URL);
  console.log('[github:route] redirect_uri will be:', `${process.env.API_URL}/api/auth/github/callback`);
  console.log('[github:route] GITHUB_CLIENT_ID:', process.env.GITHUB_CLIENT_ID);
  passport.authenticate('github', { scope: ['user:email'], session: false })(req, res, next);
});

router.get('/github/callback', (req, res, next) => {
  passport.authenticate('github', { session: false }, (err, user) => {
    if (err || !user) return res.redirect(`${process.env.CLIENT_URL}/auth/login?error=github`);
    const tokens = signTokens(user._id);
    const params = new URLSearchParams({ token: tokens.accessToken, refresh: tokens.refreshToken });
    res.redirect(`${process.env.CLIENT_URL}/auth/callback?${params.toString()}`);
  })(req, res, next);
});

module.exports = router;
