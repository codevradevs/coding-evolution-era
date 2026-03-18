const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  category: String,
  xp: { type: Number, default: 50 },
  starterCode: String,
  testCases: mongoose.Schema.Types.Mixed,
  solution: String
}, { timestamps: true });

module.exports = mongoose.model('Challenge', challengeSchema);
