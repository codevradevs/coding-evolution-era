const express = require('express');
const { Challenge, Submission } = require('../models');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Must be before /:id to avoid being caught by the param route
router.get('/user/submissions', authMiddleware, async (req, res) => {
  try {
    const submissions = await Submission.find({ userId: req.userId }).populate('challengeId').sort({ submittedAt: -1 });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

router.get('/', async (req, res) => {
  try {
    const challenges = await Challenge.find().sort({ createdAt: -1 });
    res.json(challenges);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch challenges' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) return res.status(404).json({ error: 'Challenge not found' });
    res.json(challenge);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch challenge' });
  }
});

router.post('/:id/submit', authMiddleware, async (req, res) => {
  try {
    const { code, language } = req.body;
    if (!code || !language) return res.status(400).json({ error: 'Code and language are required' });

    const allowedLanguages = ['javascript', 'python', 'java', 'cpp', 'c', 'typescript'];
    if (!allowedLanguages.includes(language.toLowerCase())) return res.status(400).json({ error: 'Unsupported language' });

    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) return res.status(404).json({ error: 'Challenge not found' });

    // TODO: integrate real code execution engine
    const passed = false;
    const points = passed ? challenge.points : 0;

    const submission = await Submission.create({
      userId: req.userId,
      challengeId: challenge._id,
      code,
      language,
      passed,
      points,
    });

    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ error: 'Submission failed' });
  }
});

module.exports = router;
