const express = require('express');
const { NetworkProfile } = require('../models');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/profiles', async (req, res) => {
  try {
    const profiles = await NetworkProfile.find().populate('userId', 'name email');
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profiles' });
  }
});

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const profile = await NetworkProfile.findOne({ userId: req.userId });
    res.json(profile || null);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

router.post('/profile', authMiddleware, async (req, res) => {
  try {
    const { bio, skills, interests, location, github, twitter, linkedin, lookingFor } = req.body;
    const profile = await NetworkProfile.findOneAndUpdate(
      { userId: req.userId },
      { bio, skills, interests, location, github, twitter, linkedin, lookingFor },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;
