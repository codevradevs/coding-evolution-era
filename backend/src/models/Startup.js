const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  stage: { type: String, enum: ['Idea', 'MVP', 'Seed', 'Growth'] },
  industry: String,
  location: String,
  website: String,
  lookingFor: [String],
  tags: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Startup', startupSchema);
