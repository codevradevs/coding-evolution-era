const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['contact', 'intake'], default: 'contact' },
  projectType: String,
  budget: String,
  timeline: String,
  status: { type: String, enum: ['new', 'read', 'replied', 'archived'], default: 'new' }
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
