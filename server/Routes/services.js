const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Course = require('../models/Course');
const { body, validationResult } = require('express-validator');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .sort({ order: 1, name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get category by slug
router.get('/:slug', async (req, res) => {
  try {
    const category = await Category.findOne({ 
      slug: req.params.slug, 
      isActive: true 
    });
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get courses by category slug
router.get('/:slug/courses', async (req, res) => {
  try {
    const category = await Category.findOne({ 
      slug: req.params.slug, 
      isActive: true 
    });
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const courses = await Course.find({ 
      category: category._id, 
      isActive: true 
    }).populate('category', 'name slug color');

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new category (Admin only)
router.post('/', [
  body('name').trim().isLength({ min: 1 }).withMessage('Name is required'),
  body('description').trim().isLength({ min: 1 }).withMessage('Description is required'),
  body('icon').trim().isLength({ min: 1 }).withMessage('Icon is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const category = new Category(req.body);
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Category with this name already exists' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// Update category (Admin only)
router.put('/:id', [
  body('name').trim().isLength({ min: 1 }).withMessage('Name is required'),
  body('description').trim().isLength({ min: 1 }).withMessage('Description is required'),
  body('icon').trim().isLength({ min: 1 }).withMessage('Icon is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Category with this name already exists' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// Delete category (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all categories (including inactive - Admin only)
router.get('/admin/all', async (req, res) => {
  try {
    const categories = await Category.find()
      .sort({ order: 1, name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 