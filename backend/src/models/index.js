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
  resetToken: { type: String },
  resetTokenExpiry: { type: Date },
  failedLoginAttempts: { type: Number, default: 0 },
  lockedUntil: { type: Date },
  lastLogin: { type: Date },
  lastFailedLogin: { type: Date },
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
  type: { type: String, enum: ['contact', 'intake'], default: 'contact' },
  createdAt: { type: Date, default: Date.now },
});

const serviceQuoteSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true, maxlength: 200 },
  company: { type: String, default: '', maxlength: 100 },
  serviceTitle: { type: String, required: true, maxlength: 200 },
  serviceCategory: { type: String, required: true, maxlength: 100 },
  requirements: { type: String, required: true, maxlength: 5000 },
  proposal: { type: String, required: true, maxlength: 10000 },
  ip: { type: String, default: '' },
  userAgent: { type: String, default: '' },
  status: { type: String, enum: ['new', 'reviewed', 'contacted', 'closed'], default: 'new' },
}, { timestamps: true });

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

const userProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  bio: { type: String, default: '' },
  avatar: { type: String, default: '' },
  github: { type: String, default: '' },
  twitter: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  website: { type: String, default: '' },
  location: { type: String, default: '' },
  xp: { type: Number, default: 0 },
  timeSpentMinutes: { type: Number, default: 0 },
  lastSeen: { type: Date, default: Date.now },
}, { timestamps: true });

const certificateSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  category: { type: String, enum: ['arena', 'tracker', 'special', 'community'], default: 'special' },
  badgeIcon: { type: String, default: '🏆' },
  awardedBy: { type: String, default: 'Codevra' },
  awardedAt: { type: Date, default: Date.now },
  credentialId: { type: String, unique: true },
}, { timestamps: true });

const rankingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  xp: { type: Number, default: 0 },
  certificateCount: { type: Number, default: 0 },
  timeSpentMinutes: { type: Number, default: 0 },
  challengesSolved: { type: Number, default: 0 },
  rank: { type: Number, default: 0 },
  tier: { type: String, enum: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'], default: 'Bronze' },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const VaultNote = mongoose.model('VaultNote', vaultNoteSchema);
const Challenge = mongoose.model('Challenge', challengeSchema);
const Submission = mongoose.model('Submission', submissionSchema);
const TrackerItem = mongoose.model('TrackerItem', trackerItemSchema);
const NetworkProfile = mongoose.model('NetworkProfile', networkProfileSchema);
const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);
const ServiceQuote = mongoose.model('ServiceQuote', serviceQuoteSchema);
const Tip = mongoose.model('Tip', tipSchema);
const UserTipProgress = mongoose.model('UserTipProgress', userTipProgressSchema);
const Product = mongoose.model('Product', productSchema);
const BlogPost = mongoose.model('BlogPost', blogPostSchema);

const UserProfile = mongoose.model('UserProfile', userProfileSchema);
const Certificate = mongoose.model('Certificate', certificateSchema);
const Ranking = mongoose.model('Ranking', rankingSchema);

module.exports = {
  User,
  UserProfile,
  Certificate,
  Ranking,
  VaultNote,
  Challenge,
  Submission,
  TrackerItem,
  NetworkProfile,
  ContactMessage,
  ServiceQuote,
  Tip,
  UserTipProgress,
  Product,
  BlogPost,
};
