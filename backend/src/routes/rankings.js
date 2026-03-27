const express = require('express');
const { Ranking, UserProfile } = require('../models');
const { authMiddleware } = require('../middleware/auth');
const { withCache } = require('../utils/cache');

const router = express.Router();

// GET /api/rankings?sort=xp|certificates|time&limit=50
router.get('/', withCache('rankings', 60), async (req, res) => {
  try {
    const { sort = 'xp', limit = 50 } = req.query;

    const sortMap = {
      xp: { xp: -1 },
      certificates: { certificateCount: -1, xp: -1 },
      time: { timeSpentMinutes: -1 },
      challenges: { challengesSolved: -1, xp: -1 },
    };

    const sortField = sortMap[sort] || sortMap.xp;

    const rankings = await Ranking.find()
      .populate('userId', 'name email')
      .sort(sortField)
      .limit(Number(limit));

    // Attach profile avatars
    const userIds = rankings.map(r => r.userId?._id).filter(Boolean);
    const profiles = await UserProfile.find({ userId: { $in: userIds } }).select('userId avatar bio');
    const profileMap = {};
    profiles.forEach(p => { profileMap[p.userId.toString()] = p; });

    const result = rankings.map((r, i) => ({
      rank: i + 1,
      userId: r.userId?._id,
      name: r.userId?.name || 'Unknown',
      email: r.userId?.email,
      avatar: profileMap[r.userId?._id?.toString()]?.avatar || '',
      bio: profileMap[r.userId?._id?.toString()]?.bio || '',
      xp: r.xp,
      tier: r.tier,
      certificateCount: r.certificateCount,
      timeSpentMinutes: r.timeSpentMinutes,
      challengesSolved: r.challengesSolved,
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/rankings/me — get current user's rank
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const allByXP = await Ranking.find().sort({ xp: -1 }).select('userId xp');
    const myRank = allByXP.findIndex(r => r.userId?.toString() === req.userId.toString()) + 1;
    const myRanking = await Ranking.findOne({ userId: req.userId });
    res.json({ rank: myRank || null, ...myRanking?.toObject() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
