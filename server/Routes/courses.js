const express = require('express');
const router = express.Router();
const Course = require('../models/Courses');
const Category = require('../models/Category');
const { body, validationResult } = require('express-validator');

// Get all available categories and qualification levels
router.get('/search-options', async (req, res) => {
  try {
    // Get all active categories
    const categories = await Category.find({ isActive: true })
      .select('name slug')
      .sort({ name: 1 });

    // Get all unique qualification levels from courses
    const levels = await Course.distinct('level', { isActive: true });
    
    res.json({
      categories,
      levels: levels.sort()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all courses with pagination and filters
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      category, 
      level, 
      search, 
      featured 
    } = req.query;

    const query = { isActive: true };

    if (category) {
      const categoryDoc = await Category.findOne({ slug: category });
      if (categoryDoc) {
        query.category = categoryDoc._id;
      }
    }

    if (level) {
      query.level = level;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      populate: { path: 'category', select: 'name slug' },
      sort: { featured: -1, title: 1 }
    };

    const courses = await Course.find(query)
      .populate('category', 'name slug')
      .sort({ featured: -1, title: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Course.countDocuments(query);

    res.json({
      courses,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get course by slug
router.get('/:slug', async (req, res) => {
  try {
    const course = await Course.findOne({ 
      slug: req.params.slug, 
      isActive: true 
    }).populate('category', 'name slug description');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search courses
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const { limit = 10 } = req.query;

    const courses = await Course.find(
      { $text: { $search: query }, isActive: true },
      { score: { $meta: 'textScore' } }
    )
    .populate('category', 'name slug')
    .sort({ score: { $meta: 'textScore' } })
    .limit(parseInt(limit));

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get featured courses
router.get('/featured/list', async (req, res) => {
  try {
    const courses = await Course.find({ 
      featured: true, 
      isActive: true 
    })
    .populate('category', 'name slug')
    .limit(6)
    .sort({ title: 1 });

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new course (Admin only)
router.post('/', [
  body('code').trim().isLength({ min: 1 }).withMessage('Course code is required'),
  body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
  body('category').isMongoId().withMessage('Valid category ID is required'),
  body('level').isIn(['Certificate I', 'Certificate II', 'Certificate III', 'Certificate IV', 'Diploma', 'Advanced Diploma', 'Graduate Certificate', 'Graduate Diploma']).withMessage('Valid level is required'),
  body('about').trim().isLength({ min: 1 }).withMessage('About section is required'),
  body('jobOutcomes').trim().isLength({ min: 1 }).withMessage('Job outcomes are required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const course = new Course(req.body);
    const savedCourse = await course.save();
    
    const populatedCourse = await Course.findById(savedCourse._id)
      .populate('category', 'name slug');

    res.status(201).json(populatedCourse);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Course with this code already exists' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// Update course (Admin only)
router.put('/:id', [
  body('code').trim().isLength({ min: 1 }).withMessage('Course code is required'),
  body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
  body('category').isMongoId().withMessage('Valid category ID is required'),
  body('level').isIn(['Certificate I', 'Certificate II', 'Certificate III', 'Certificate IV', 'Diploma', 'Advanced Diploma', 'Graduate Certificate', 'Graduate Diploma']).withMessage('Valid level is required'),
  body('about').trim().isLength({ min: 1 }).withMessage('About section is required'),
  body('jobOutcomes').trim().isLength({ min: 1 }).withMessage('Job outcomes are required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('category', 'name slug');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Course with this code already exists' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// Delete course (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all courses (including inactive - Admin only)
router.get('/admin/all', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const courses = await Course.find()
      .populate('category', 'name slug')
      .sort({ title: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Course.countDocuments();

    res.json({
      courses,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 