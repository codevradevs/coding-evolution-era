const express = require('express');
const router = express.Router();
const { Tip, UserTipProgress, User } = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { withCache } = require('../utils/cache');

// Get daily tip
router.get('/daily', withCache('tips:daily', 3600), async (req, res) => {
  try {
    const tip = await Tip.findOne().sort({ createdAt: 1 });
    if (!tip) {
      const randomTip = await Tip.aggregate([{ $sample: { size: 1 } }]);
      return res.json(randomTip[0] || null);
    }
    res.json(tip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all tips
router.get('/', withCache('tips', 300), async (req, res) => {
  try {
    const { category, difficulty, track } = req.query;
    const filter = {};
    
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (track) filter.track = track;
    
    const tips = await Tip.find(filter).sort({ createdAt: -1 });
    res.json(tips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user progress
router.get('/progress', authenticateToken, async (req, res) => {
  try {
    const progress = await UserTipProgress.find({ 
      userId: req.user.userId 
    }).populate('tipId');
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark as viewed
router.post('/:tipId/view', authenticateToken, async (req, res) => {
  try {
    let progress = await UserTipProgress.findOne({
      userId: req.user.userId,
      tipId: req.params.tipId
    });
    
    if (!progress) {
      progress = new UserTipProgress({
        userId: req.user.userId,
        tipId: req.params.tipId,
        viewed: true,
        viewedAt: new Date()
      });
    } else {
      progress.viewed = true;
      progress.viewedAt = new Date();
    }
    
    await progress.save();
    await User.findByIdAndUpdate(req.user.userId, { $inc: { xp: 5 } });
    
    res.json({ message: 'Tip viewed', xp: 5 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save tip
router.post('/:tipId/save', authenticateToken, async (req, res) => {
  try {
    let progress = await UserTipProgress.findOne({
      userId: req.user.userId,
      tipId: req.params.tipId
    });
    
    if (!progress) {
      progress = new UserTipProgress({
        userId: req.user.userId,
        tipId: req.params.tipId,
        saved: true
      });
    } else {
      progress.saved = !progress.saved;
    }
    
    await progress.save();
    
    if (progress.saved) {
      await User.findByIdAndUpdate(req.user.userId, { $inc: { xp: 2 } });
    }
    
    res.json({ message: progress.saved ? 'Tip saved' : 'Tip unsaved', saved: progress.saved, xp: progress.saved ? 2 : 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark as completed
router.post('/:tipId/complete', authenticateToken, async (req, res) => {
  try {
    let progress = await UserTipProgress.findOne({
      userId: req.user.userId,
      tipId: req.params.tipId
    });
    
    if (!progress) {
      progress = new UserTipProgress({
        userId: req.user.userId,
        tipId: req.params.tipId,
        completed: true,
        completedAt: new Date()
      });
    } else {
      progress.completed = true;
      progress.completedAt = new Date();
    }
    
    await progress.save();
    await User.findByIdAndUpdate(req.user.userId, { $inc: { xp: 3 } });
    
    res.json({ message: 'Tip completed', xp: 3 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get saved tips
router.get('/saved', authenticateToken, async (req, res) => {
  try {
    const saved = await UserTipProgress.find({ 
      userId: req.user.userId,
      saved: true 
    }).populate('tipId');
    res.json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
