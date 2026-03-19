const crypto = require('crypto');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');
const passport = require('../config/passport');
const { User } = require('../models');
const { authMiddleware } = require('../middleware/auth');

// In-memory QR sessions (keyed by sessionId)
const qrSessions = {};

const { sendPasswordResetEmail } = require('../utils/mailer');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'All fields are required' });
    if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters' });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return res.status(400).json({ error: 'Invalid email format' });

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(400).json({ error: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ name: name.trim(), email: email.toLowerCase(), password: hashedPassword });

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });

    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !user.password) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });

    res.json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
      accessToken,
      refreshToken,
    });
  } catch (error) {
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
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: 'Refresh token required' });
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const accessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    const newRefreshToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });
    res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
});

// Forgot Password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    // Always return same message to prevent user enumeration
    const user = await User.findOne({ email: email.toLowerCase() });
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
  } catch (error) {
    res.status(500).json({ error: 'Failed to process request' });
  }
});

// Reset Password
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    if (!password || password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters' });

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() },
    });
    if (!user) return res.status(400).json({ error: 'Invalid or expired reset link' });

    user.password = await bcrypt.hash(password, 12);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reset password' });
  }
});

// QR Login — generate QR
router.get('/qr/generate', async (req, res) => {
  try {
    const sessionId = uuidv4();
    qrSessions[sessionId] = { status: 'pending', createdAt: Date.now() };
    // Auto-expire after 2 minutes
    setTimeout(() => { delete qrSessions[sessionId]; }, 2 * 60 * 1000);
    const qrDataUrl = await QRCode.toDataURL(sessionId);
    res.json({ sessionId, qr: qrDataUrl });
  } catch {
    res.status(500).json({ error: 'Failed to generate QR' });
  }
});

// QR Login — poll status
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

// QR Login — approve (called from mobile/second device after scanning)
router.post('/qr/approve', authMiddleware, async (req, res) => {
  try {
    const { sessionId } = req.body;
    if (!sessionId || !qrSessions[sessionId]) return res.status(404).json({ error: 'Session not found or expired' });
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });
    qrSessions[sessionId] = { status: 'approved', accessToken, refreshToken };
    res.json({ message: 'QR session approved' });
  } catch {
    res.status(500).json({ error: 'Failed to approve QR session' });
  }
});

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: `${process.env.CLIENT_URL}/auth/login?error=google` }),
  (req, res) => {
    const accessToken = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    const refreshToken = jwt.sign({ userId: req.user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });
    const params = new URLSearchParams({ token: accessToken, refresh: refreshToken });
    res.redirect(`${process.env.CLIENT_URL}/auth/callback?${params.toString()}`);
  }
);

// GitHub OAuth
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback',
  passport.authenticate('github', { session: false, failureRedirect: `${process.env.CLIENT_URL}/auth/callback?error=github` }),
  (req, res) => {
    const accessToken = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    const refreshToken = jwt.sign({ userId: req.user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });
    const params = new URLSearchParams({ token: accessToken, refresh: refreshToken });
    res.redirect(`${process.env.CLIENT_URL}/auth/callback?${params.toString()}`);
  }
);

module.exports = router;
