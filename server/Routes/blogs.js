const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { body, validationResult } = require('express-validator');
const { authenticateToken } = require('./auth');

// Get all published blogs with pagination
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 9, 
      category, 
      tag, 
      search 
    } = req.query;

    const query = { isPublished: true };

    if (category) {
      query.category = category;
    }

    if (tag) {
      query.tags = { $in: [tag] };
    }

    if (search) {
      query.$text = { $search: search };
    }

    const blogs = await Blog.find(query)
      .sort({ publishedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Blog.countDocuments(query);

    res.json({
      blogs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get blog by slug
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ 
      slug: req.params.slug, 
      isPublished: true 
    });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get recent blogs
router.get('/recent/list', async (req, res) => {
  try {
    const { limit = 3 } = req.query;
    
    const blogs = await Blog.find({ isPublished: true })
      .sort({ publishedAt: -1 })
      .limit(parseInt(limit))
      .select('title slug excerpt featuredImage publishedAt readTime');

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get popular blogs
router.get('/popular/list', async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    
    const blogs = await Blog.find({ isPublished: true })
      .sort({ views: -1 })
      .limit(parseInt(limit))
      .select('title slug excerpt featuredImage publishedAt readTime views');

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get blog categories
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await Blog.distinct('category', { isPublished: true });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get blog tags
router.get('/tags/list', async (req, res) => {
  try {
    const tags = await Blog.distinct('tags', { isPublished: true });
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search blogs
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const { limit = 10 } = req.query;

    const blogs = await Blog.find(
      { $text: { $search: query }, isPublished: true },
      { score: { $meta: 'textScore' } }
    )
    .sort({ score: { $meta: 'textScore' } })
    .limit(parseInt(limit));

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new blog (Admin only)
router.post('/', authenticateToken, [
  body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
  body('excerpt').trim().isLength({ min: 1 }).withMessage('Excerpt is required'),
  body('content').trim().isLength({ min: 1 }).withMessage('Content is required'),
  body('author').trim().isLength({ min: 1 }).withMessage('Author is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const blog = new Blog(req.body);
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Blog with this slug already exists. Please try a different title.' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// Update blog (Admin only)
router.put('/:id', authenticateToken, [
  body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
  body('excerpt').trim().isLength({ min: 1 }).withMessage('Excerpt is required'),
  body('content').trim().isLength({ min: 1 }).withMessage('Content is required'),
  body('author').trim().isLength({ min: 1 }).withMessage('Author is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(blog);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Blog with this slug already exists. Please try a different title.' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// Delete blog (Admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all blogs (including unpublished - Admin only)
router.get('/admin/all', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Blog.countDocuments();

    res.json({
      blogs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 