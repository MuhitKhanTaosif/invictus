const express = require('express');
const router = express.Router();
const Services = require('../models/Services');
const { body, validationResult } = require('express-validator');
const { authenticateToken } = require('./auth');

// Get all active services
router.get('/', async (req, res) => {
  try {
    const services = await Services.find({ isActive: true })
      .sort({ order: 1, title: 1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get service by slug
router.get('/:slug', async (req, res) => {
  try {
    const service = await Services.findOne({ 
      slug: req.params.slug, 
      isActive: true 
    });
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new service (Admin only)
router.post('/', authenticateToken, [
  body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
  body('description').trim().isLength({ min: 1 }).withMessage('Description is required'),
  body('shortDescription').trim().isLength({ min: 1 }).withMessage('Short description is required'),
  body('icon').trim().isLength({ min: 1 }).withMessage('Icon is required'),
  body('path').trim().isLength({ min: 1 }).withMessage('Path is required'),
  body('features').isArray({ min: 1 }).withMessage('At least one feature is required'),
  body('approach').isArray({ min: 1 }).withMessage('At least one approach is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const service = new Services(req.body);
    const savedService = await service.save();
    res.status(201).json(savedService);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Service with this title already exists' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// Update service (Admin only)
router.put('/:id', authenticateToken, [
  body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
  body('description').trim().isLength({ min: 1 }).withMessage('Description is required'),
  body('shortDescription').trim().isLength({ min: 1 }).withMessage('Short description is required'),
  body('icon').trim().isLength({ min: 1 }).withMessage('Icon is required'),
  body('path').trim().isLength({ min: 1 }).withMessage('Path is required'),
  body('features').isArray({ min: 1 }).withMessage('At least one feature is required'),
  body('approach').isArray({ min: 1 }).withMessage('At least one approach is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const service = await Services.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Service with this title already exists' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// Delete service (Admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const service = await Services.findByIdAndDelete(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all services (including inactive - Admin only)
router.get('/admin/all', authenticateToken, async (req, res) => {
  try {
    const services = await Services.find()
      .sort({ order: 1, title: 1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;