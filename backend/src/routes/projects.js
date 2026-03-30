const express = require('express');
const router = express.Router();
const { Project } = require('../models');
const { withCache } = require('../utils/cache');

router.get('/', withCache('projects', 120), async (req, res) => {
  try {
    const { category, featured } = req.query;
    const q = {};
    if (category && category !== 'all') q.category = category;
    if (featured !== undefined) q.featured = featured === 'true';
    const projects = await Project.find(q).sort({ order: 1, createdAt: -1 }).select('-images');
    res.json(projects);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/:slug', async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
