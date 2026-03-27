const express = require('express');
const jwt = require('jsonwebtoken');
const {
  User, BlogPost, Challenge, Tip, Product, Certificate,
  ServiceQuote, Submission, VaultNote, TrackerItem,
  NetworkProfile, UserProfile, Ranking, ContactMessage,
} = require('../models');

const router = express.Router();

// ─── Admin middleware ─────────────────────────────────────────────────────────
const adminOnly = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ error: 'Authentication required.' });
  try {
    const decoded = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET, { algorithms: ['HS256'] });
    const user = await User.findById(decoded.userId).select('role');
    if (!user || user.role !== 'admin') return res.status(403).json({ error: 'Admin access required.' });
    req.userId = decoded.userId;
    next();
  } catch { res.status(401).json({ error: 'Invalid token.' }); }
};

router.use(adminOnly);

// ─── Blogs ────────────────────────────────────────────────────────────────────
router.get('/blogs', async (req, res) => {
  try {
    const { page = 1, limit = 20, search, category } = req.query;
    const q = {};
    if (search) q.$or = [{ title: { $regex: search, $options: 'i' } }, { excerpt: { $regex: search, $options: 'i' } }];
    if (category && category !== 'All') q.category = category;
    const [blogs, total] = await Promise.all([
      BlogPost.find(q).sort({ publishedAt: -1 }).skip((page - 1) * limit).limit(Number(limit)),
      BlogPost.countDocuments(q),
    ]);
    res.json({ blogs, total });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/blogs', async (req, res) => {
  try {
    const { title, slug, category, excerpt, content, readTime, tags, featured } = req.body;
    if (!title || !slug || !category || !excerpt || !content || !readTime) return res.status(400).json({ error: 'Missing required fields.' });
    const blog = await BlogPost.create({ title, slug, category, excerpt, content, readTime, tags: tags || [], featured: !!featured });
    res.status(201).json(blog);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/blogs/:id', async (req, res) => {
  try {
    const blog = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blog) return res.status(404).json({ error: 'Not found.' });
    res.json(blog);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/blogs/:id', async (req, res) => {
  try {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted.' });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ─── Challenges ───────────────────────────────────────────────────────────────
router.get('/challenges', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const [challenges, total] = await Promise.all([
      Challenge.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit)),
      Challenge.countDocuments(),
    ]);
    res.json({ challenges, total });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/challenges', async (req, res) => {
  try {
    const { title, description, difficulty, points, testCases } = req.body;
    if (!title || !description || !difficulty || !points) return res.status(400).json({ error: 'Missing required fields.' });
    const challenge = await Challenge.create({ title, description, difficulty, points, testCases: testCases || [] });
    res.status(201).json(challenge);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/challenges/:id', async (req, res) => {
  try {
    const challenge = await Challenge.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!challenge) return res.status(404).json({ error: 'Not found.' });
    res.json(challenge);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/challenges/:id', async (req, res) => {
  try {
    await Challenge.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted.' });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ─── Tips ─────────────────────────────────────────────────────────────────────
router.get('/tips', async (req, res) => {
  try {
    const { page = 1, limit = 20, category, difficulty } = req.query;
    const q = {};
    if (category) q.category = category;
    if (difficulty) q.difficulty = difficulty;
    const [tips, total] = await Promise.all([
      Tip.find(q).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit)),
      Tip.countDocuments(q),
    ]);
    res.json({ tips, total });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/tips', async (req, res) => {
  try {
    const { title, category, content, codeSnippet, difficulty, track, xp } = req.body;
    if (!title || !category || !content) return res.status(400).json({ error: 'Missing required fields.' });
    const tip = await Tip.create({ title, category, content, codeSnippet, difficulty, track: track || [], xp: xp || 5 });
    res.status(201).json(tip);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/tips/:id', async (req, res) => {
  try {
    const tip = await Tip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tip) return res.status(404).json({ error: 'Not found.' });
    res.json(tip);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/tips/:id', async (req, res) => {
  try {
    await Tip.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted.' });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ─── Products ─────────────────────────────────────────────────────────────────
router.get('/products', async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const q = search ? { $or: [{ name: { $regex: search, $options: 'i' } }, { category: { $regex: search, $options: 'i' } }] } : {};
    const [products, total] = await Promise.all([
      Product.find(q).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit)),
      Product.countDocuments(q),
    ]);
    res.json({ products, total });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/products', async (req, res) => {
  try {
    const { name, category, tagline, description, features, price, timeline, pros } = req.body;
    if (!name || !category || !tagline || !description || !price || !timeline) return res.status(400).json({ error: 'Missing required fields.' });
    const product = await Product.create({ name, category, tagline, description, features: features || [], price, timeline, pros: pros || [] });
    res.status(201).json(product);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ error: 'Not found.' });
    res.json(product);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted.' });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ─── Certificates ─────────────────────────────────────────────────────────────
router.get('/certificates', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const [certs, total] = await Promise.all([
      Certificate.find().populate('userId', 'name email').sort({ awardedAt: -1 }).skip((page - 1) * limit).limit(Number(limit)),
      Certificate.countDocuments(),
    ]);
    res.json({ certificates: certs, total });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/certificates', async (req, res) => {
  try {
    const crypto = require('crypto');
    const { userId, title, description, category, badgeIcon, awardedBy } = req.body;
    if (!userId || !title) return res.status(400).json({ error: 'userId and title required.' });
    const credentialId = `CVR-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    const cert = await Certificate.create({ userId, title, description, category, badgeIcon: badgeIcon || '🏆', awardedBy: awardedBy || 'Codevra', credentialId });
    res.status(201).json(cert);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/certificates/:id', async (req, res) => {
  try {
    const cert = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cert) return res.status(404).json({ error: 'Not found.' });
    res.json(cert);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/certificates/:id', async (req, res) => {
  try {
    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted.' });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ─── Service Quotes ───────────────────────────────────────────────────────────
router.get('/quotes', async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const q = status ? { status } : {};
    const [quotes, total] = await Promise.all([
      ServiceQuote.find(q).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit)),
      ServiceQuote.countDocuments(q),
    ]);
    res.json({ quotes, total });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/quotes/:id', async (req, res) => {
  try {
    const quote = await ServiceQuote.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!quote) return res.status(404).json({ error: 'Not found.' });
    res.json(quote);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/quotes/:id', async (req, res) => {
  try {
    await ServiceQuote.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted.' });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ─── Submissions ──────────────────────────────────────────────────────────────
router.get('/submissions', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const [submissions, total] = await Promise.all([
      Submission.find().populate('userId', 'name email').populate('challengeId', 'title').sort({ submittedAt: -1 }).skip((page - 1) * limit).limit(Number(limit)),
      Submission.countDocuments(),
    ]);
    res.json({ submissions, total });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/submissions/:id', async (req, res) => {
  try {
    await Submission.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted.' });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ─── Vault Notes ──────────────────────────────────────────────────────────────
router.get('/vault', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const [notes, total] = await Promise.all([
      VaultNote.find().populate('userId', 'name email').sort({ updatedAt: -1 }).skip((page - 1) * limit).limit(Number(limit)),
      VaultNote.countDocuments(),
    ]);
    res.json({ notes, total });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/vault/:id', async (req, res) => {
  try {
    await VaultNote.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted.' });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ─── Tracker Items ────────────────────────────────────────────────────────────
router.get('/tracker', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const [items, total] = await Promise.all([
      TrackerItem.find().populate('userId', 'name email').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit)),
      TrackerItem.countDocuments(),
    ]);
    res.json({ items, total });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/tracker/:id', async (req, res) => {
  try {
    await TrackerItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted.' });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ─── Network Profiles ─────────────────────────────────────────────────────────
router.get('/network', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const [profiles, total] = await Promise.all([
      NetworkProfile.find().populate('userId', 'name email').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit)),
      NetworkProfile.countDocuments(),
    ]);
    res.json({ profiles, total });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/network/:id', async (req, res) => {
  try {
    await NetworkProfile.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted.' });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ─── User Profiles ────────────────────────────────────────────────────────────
router.get('/userprofiles', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const [profiles, total] = await Promise.all([
      UserProfile.find().populate('userId', 'name email').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit)),
      UserProfile.countDocuments(),
    ]);
    res.json({ profiles, total });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/userprofiles/:id', async (req, res) => {
  try {
    const profile = await UserProfile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!profile) return res.status(404).json({ error: 'Not found.' });
    res.json(profile);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ─── Rankings ─────────────────────────────────────────────────────────────────
router.get('/rankings', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const [rankings, total] = await Promise.all([
      Ranking.find().populate('userId', 'name email').sort({ xp: -1 }).skip((page - 1) * limit).limit(Number(limit)),
      Ranking.countDocuments(),
    ]);
    res.json({ rankings, total });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/rankings/:id', async (req, res) => {
  try {
    const r = await Ranking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!r) return res.status(404).json({ error: 'Not found.' });
    res.json(r);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/rankings/:id', async (req, res) => {
  try {
    await Ranking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted.' });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ─── Contact Messages ─────────────────────────────────────────────────────────
router.get('/contacts', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const [messages, total] = await Promise.all([
      ContactMessage.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit)),
      ContactMessage.countDocuments(),
    ]);
    res.json({ messages, total });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/contacts/:id', async (req, res) => {
  try {
    await ContactMessage.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted.' });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
