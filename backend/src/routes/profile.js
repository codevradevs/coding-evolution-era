const express = require('express');
const crypto = require('crypto');
const { User, UserProfile, Certificate, Ranking, TrackerItem, Submission } = require('../models');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

function getTier(xp) {
  if (xp >= 5000) return 'Diamond';
  if (xp >= 2000) return 'Platinum';
  if (xp >= 1000) return 'Gold';
  if (xp >= 300) return 'Silver';
  return 'Bronze';
}

async function syncRanking(userId) {
  const profile = await UserProfile.findOne({ userId });
  const certs = await Certificate.countDocuments({ userId });
  const submissions = await Submission.countDocuments({ userId, passed: true });
  const xp = profile?.xp || 0;
  await Ranking.findOneAndUpdate(
    { userId },
    { xp, certificateCount: certs, timeSpentMinutes: profile?.timeSpentMinutes || 0, challengesSolved: submissions, tier: getTier(xp), updatedAt: new Date() },
    { upsert: true }
  );
}

// GET /api/profile — full profile + stats
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    let profile = await UserProfile.findOne({ userId: req.userId });
    if (!profile) profile = await UserProfile.create({ userId: req.userId });

    const certificates = await Certificate.find({ userId: req.userId }).sort({ awardedAt: -1 });
    const trackerItems = await TrackerItem.find({ userId: req.userId });
    const submissions = await Submission.find({ userId: req.userId }).sort({ submittedAt: -1 }).limit(10);
    const solvedCount = await Submission.countDocuments({ userId: req.userId, passed: true });

    const completedItems = trackerItems.filter(i => i.status === 'completed').length;
    const inProgressItems = trackerItems.filter(i => i.status === 'in-progress').length;

    res.json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt },
      profile,
      stats: {
        xp: profile.xp,
        tier: getTier(profile.xp),
        certificates: certificates.length,
        challengesSolved: solvedCount,
        trackerCompleted: completedItems,
        trackerInProgress: inProgressItems,
        timeSpentMinutes: profile.timeSpentMinutes,
      },
      certificates,
      recentSubmissions: submissions,
      trackerItems,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/profile — update bio, avatar, socials
router.put('/', authMiddleware, async (req, res) => {
  try {
    const { bio, avatar, github, twitter, linkedin, website, location } = req.body;
    const profile = await UserProfile.findOneAndUpdate(
      { userId: req.userId },
      { bio, avatar, github, twitter, linkedin, website, location },
      { upsert: true, new: true }
    );
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/profile/ping — update lastSeen + increment time
router.post('/ping', authMiddleware, async (req, res) => {
  try {
    const { minutes = 1 } = req.body;
    await UserProfile.findOneAndUpdate(
      { userId: req.userId },
      { $inc: { timeSpentMinutes: minutes }, lastSeen: new Date() },
      { upsert: true }
    );
    await syncRanking(req.userId);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
