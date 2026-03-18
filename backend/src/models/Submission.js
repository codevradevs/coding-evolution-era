const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  challengeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge', required: true },
  code: { type: String, required: true },
  passed: { type: Boolean, default: false },
  executionTime: Number
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);
