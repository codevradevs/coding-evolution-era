const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Admin middleware — verifies JWT and checks role === 'admin'
const adminOnly = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ error: 'Authentication required.' });
  try {
    const decoded = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET, { algorithms: ['HS256'] });
    const user = await User.findById(decoded.userId).select('role');
    if (!user || user.role !== 'admin') return res.status(403).json({ error: 'Admin access required.' });
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

// GET /api/users — admin: list all users
router.get('/', adminOnly, async (req, res) => {
  try {
    const { page = 1, limit = 50, search } = req.query;
    const query = search
      ? { $or: [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }] }
      : {};
    const [users, total] = await Promise.all([
      User.find(query).select('-password').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit)),
      User.countDocuments(query),
    ]);
    res.json({ users, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/users/stats — admin: aggregate stats
router.get('/stats', adminOnly, async (req, res) => {
  try {
    const { BlogPost, Challenge, Tip, ContactMessage, Ranking } = require('../models');
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const [total, newThisMonth, admins, providers, blogs, challenges, tips, contacts, rankings] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ createdAt: { $gte: startOfMonth } }),
      User.countDocuments({ role: 'admin' }),
      User.aggregate([{ $group: { _id: '$provider', count: { $sum: 1 } } }]),
      BlogPost.countDocuments(),
      Challenge.countDocuments(),
      Tip.countDocuments(),
      ContactMessage.countDocuments(),
      Ranking.countDocuments(),
    ]);
    res.json({ total, newThisMonth, admins, providers, blogs, challenges, tips, contacts, rankings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH /api/users/:id/role — admin: update user role
router.patch('/:id/role', adminOnly, async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) return res.status(400).json({ error: 'Invalid role.' });
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found.' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/users/:id — admin: delete user
router.delete('/:id', adminOnly, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
