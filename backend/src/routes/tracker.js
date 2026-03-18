const express = require('express');
const { TrackerItem } = require('../models');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const items = await TrackerItem.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { type, title, status, progress, notes } = req.body;
    if (!type || !title) return res.status(400).json({ error: 'Type and title are required' });
    const item = await TrackerItem.create({ userId: req.userId, type, title, status, progress, notes });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create item' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { status, progress, notes, completedAt } = req.body;
    const item = await TrackerItem.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { status, progress, notes, completedAt },
      { new: true }
    );
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const item = await TrackerItem.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

module.exports = router;
