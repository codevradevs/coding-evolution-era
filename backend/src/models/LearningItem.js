const mongoose = require('mongoose');

const learningItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, maxLength: 200 },
  type: { type: String, enum: ['course', 'certification', 'book', 'project'], required: true },
  status: { type: String, enum: ['planned', 'in-progress', 'completed'], default: 'planned' },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  category: String,
  url: String,
  notes: String,
  startedAt: Date,
  completedAt: Date
}, { timestamps: true });

learningItemSchema.index({ userId: 1 });

module.exports = mongoose.model('LearningItem', learningItemSchema);
