const express = require('express');
const crypto = require('crypto');
const { Certificate, UserProfile, Ranking } = require('../models');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

function getTier(xp) {
  if (xp >= 5000) return 'Diamond';
  if (xp >= 2000) return 'Platinum';
  if (xp >= 1000) return 'Gold';
  if (xp >= 300) return 'Silver';
  return 'Bronze';
}

// GET /api/certificates — get my certificates
router.get('/', authMiddleware, async (req, res) => {
  try {
    const certs = await Certificate.find({ userId: req.userId }).sort({ awardedAt: -1 });
    res.json(certs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/certificates/award — admin awards a certificate to a user
router.post('/award', authMiddleware, async (req, res) => {
  try {
    const user = await require('../models').User.findById(req.userId);
    if (user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });

    const { userId, title, description, category, badgeIcon, awardedBy } = req.body;
    if (!userId || !title) return res.status(400).json({ error: 'userId and title required' });

    const credentialId = `CVR-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    const cert = await Certificate.create({ userId, title, description, category, badgeIcon, awardedBy, credentialId });

    // Award XP for certificate
    const xpBonus = 200;
    const profile = await UserProfile.findOneAndUpdate(
      { userId },
      { $inc: { xp: xpBonus } },
      { upsert: true, new: true }
    );
    const certCount = await Certificate.countDocuments({ userId });
    await Ranking.findOneAndUpdate(
      { userId },
      { xp: profile.xp, certificateCount: certCount, tier: getTier(profile.xp), updatedAt: new Date() },
      { upsert: true }
    );

    res.status(201).json({ cert, xpAwarded: xpBonus });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/certificates/all — admin: list all certificates with user info
router.get('/all', authMiddleware, async (req, res) => {
  try {
    const user = await require('../models').User.findById(req.userId);
    if (user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
    const certs = await Certificate.find().populate('userId', 'name email').sort({ awardedAt: -1 });
    res.json(certs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/certificates/:id — admin revoke
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const user = await require('../models').User.findById(req.userId);
    if (user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ message: 'Certificate revoked' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
