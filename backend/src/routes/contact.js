const express = require('express');
const { ContactMessage } = require('../models');
const { sendContactEmails, sendWhatsAppNotification } = require('../utils/mailer');
const { contactLimiter, sanitizeString, isValidEmail } = require('../middleware/security');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const router = express.Router();

const adminOnly = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ error: 'Authentication required.' });
  try {
    const decoded = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET, { algorithms: ['HS256'] });
    const user = await User.findById(decoded.userId).select('role');
    if (!user || user.role !== 'admin') return res.status(403).json({ error: 'Admin access required.' });
    next();
  } catch { res.status(401).json({ error: 'Invalid token.' }); }
};

// GET /api/contact — admin: list all messages
router.get('/', adminOnly, async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 }).limit(100);
    res.json({ messages, total: messages.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', contactLimiter, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) return res.status(400).json({ error: 'All fields are required' });
    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid field types.' });
    }
    if (!isValidEmail(email)) return res.status(400).json({ error: 'Invalid email format' });
    const cleanName = sanitizeString(name, 100);
    const cleanEmail = sanitizeString(email, 200).toLowerCase();
    const cleanSubject = sanitizeString(subject, 200);
    const cleanMessage = sanitizeString(message, 5000);
    if (!cleanName || !cleanMessage) return res.status(400).json({ error: 'Invalid input.' });
    const contact = await ContactMessage.create({
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage,
      type: cleanSubject.startsWith('Project Intake') ? 'intake' : 'contact',
    });
    sendContactEmails({ name: cleanName, email: cleanEmail, subject: cleanSubject, message: cleanMessage })
      .catch(err => console.error('[mailer] Failed to send email:', err.message));

    const isIntake = cleanSubject.startsWith('Project Intake');
    const isConsultation = cleanSubject.toLowerCase().includes('consultation');
    const emoji = isIntake ? '📋' : isConsultation ? '📅' : '✉️';
    const label = isIntake ? 'Project Intake' : isConsultation ? 'Consultation Request' : 'Contact Message';
    const snippet = cleanMessage.substring(0, 300) + (cleanMessage.length > 300 ? '...' : '');

    sendWhatsAppNotification(
      `${emoji} *${label} — Codevra*\n\n` +
      `*Name:* ${cleanName}\n` +
      `*Email:* ${cleanEmail}\n` +
      `*Subject:* ${cleanSubject}\n\n` +
      `*Message:*\n${snippet}`
    ).catch(err => console.error('[whatsapp] Contact WhatsApp failed:', err.message));
    res.status(201).json({ message: 'Message sent successfully', id: contact._id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = router;
