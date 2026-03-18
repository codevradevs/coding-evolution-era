const express = require('express');
const { VaultNote } = require('../models');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const notes = await VaultNote.find({ userId: req.userId }).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, encryptedContent, tags } = req.body;
    if (!title || !encryptedContent) return res.status(400).json({ error: 'Title and content are required' });
    const note = await VaultNote.create({ userId: req.userId, title: title.trim(), encryptedContent, tags });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create note' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, encryptedContent, tags } = req.body;
    const note = await VaultNote.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { title, encryptedContent, tags, updatedAt: Date.now() },
      { new: true }
    );
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update note' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const note = await VaultNote.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

module.exports = router;
