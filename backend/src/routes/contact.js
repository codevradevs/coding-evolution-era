const express = require('express');
const { ContactMessage } = require('../models');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) return res.status(400).json({ error: 'All fields are required' });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return res.status(400).json({ error: 'Invalid email format' });
    if (message.length > 5000) return res.status(400).json({ error: 'Message too long' });
    const contact = await ContactMessage.create({ name: name.trim(), email: email.toLowerCase(), subject: subject.trim(), message: message.trim() });
    res.status(201).json({ message: 'Message sent successfully', id: contact._id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = router;
