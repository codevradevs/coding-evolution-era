const express = require('express');
const router = express.Router();
const { BlogPost } = require('../models');
const { withCache } = require('../utils/cache');

router.get('/', withCache('blogs', 120), async (req, res) => {
  try {
    const { category, page = 1, limit = 12, search, featured } = req.query;
    const query = {};
    
    if (category && category !== 'All Posts') query.category = category;
    if (search) query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } }
    ];
    if (featured === 'true') query.featured = true;

    const total = await BlogPost.countDocuments(query);
    const blogs = await BlogPost.find(query)
      .select('-content')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ publishedAt: -1 });

    res.json({
      blogs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/categories', withCache('blogs:categories', 300), async (req, res) => {
  try {
    const categories = await BlogPost.distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:slug', withCache('blogs:slug', 120), async (req, res) => {
  try {
    const blog = await BlogPost.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ error: 'Blog post not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
