const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, default: 'user' },
  googleId: { type: String, sparse: true },
  githubId: { type: String, sparse: true },
  avatar: { type: String },
  provider: { type: String, enum: ['local', 'google', 'github'], default: 'local' },
  createdAt: { type: Date, default: Date.now },
});

const vaultNoteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  encryptedContent: { type: String, required: true },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const challengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  points: { type: Number, required: true },
  testCases: [{ input: String, output: String }],
  createdAt: { type: Date, default: Date.now },
});

const submissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  challengeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge', required: true },
  code: { type: String, required: true },
  language: { type: String, required: true },
  passed: { type: Boolean, required: true },
  points: { type: Number, default: 0 },
  submittedAt: { type: Date, default: Date.now },
});

const trackerItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['course', 'certification', 'book', 'skill'], required: true },
  title: { type: String, required: true },
  status: { type: String, enum: ['in-progress', 'completed', 'planned'], default: 'in-progress' },
  progress: { type: Number, default: 0 },
  notes: String,
  createdAt: { type: Date, default: Date.now },
  completedAt: Date,
});

const networkProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  bio: String,
  skills: [String],
  interests: [String],
  location: String,
  github: String,
  twitter: String,
  linkedin: String,
  lookingFor: { type: String, enum: ['cofounder', 'developer', 'mentor', 'investor', 'none'], default: 'none' },
  createdAt: { type: Date, default: Date.now },
});

const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const tipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['Git', 'Deployment', 'VS Code', 'JavaScript', 'Security', 'AI', 'DevOps'], required: true },
  content: { type: String, required: true },
  codeSnippet: String,
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  track: [String],
  xp: { type: Number, default: 5 },
}, { timestamps: true });

const userTipProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  tipId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tip', required: true, index: true },
  viewed: { type: Boolean, default: false },
  saved: { type: Boolean, default: false },
  completed: { type: Boolean, default: false },
  viewedAt: Date,
  completedAt: Date,
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  tagline: { type: String, required: true },
  description: { type: String, required: true },
  features: [String],
  price: { type: String, required: true },
  timeline: { type: String, required: true },
  pros: [String],
}, { timestamps: true });

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  readTime: { type: Number, required: true },
  tags: [String],
  featured: { type: Boolean, default: false },
  publishedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const VaultNote = mongoose.model('VaultNote', vaultNoteSchema);
const Challenge = mongoose.model('Challenge', challengeSchema);
const Submission = mongoose.model('Submission', submissionSchema);
const TrackerItem = mongoose.model('TrackerItem', trackerItemSchema);
const NetworkProfile = mongoose.model('NetworkProfile', networkProfileSchema);
const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);
const Tip = mongoose.model('Tip', tipSchema);
const UserTipProgress = mongoose.model('UserTipProgress', userTipProgressSchema);
const Product = mongoose.model('Product', productSchema);
const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = {
  User,
  VaultNote,
  Challenge,
  Submission,
  TrackerItem,
  NetworkProfile,
  ContactMessage,
  Tip,
  UserTipProgress,
  Product,
  BlogPost,
};
