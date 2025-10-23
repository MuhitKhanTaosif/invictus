const express = require('express');
const router = express.Router();
const CourseDetail = require('../models/CourseDetail');

// Get all course details
router.get('/', async (req, res) => {
  try {
    const courseDetails = await CourseDetail.find({ isActive: true });
    res.json(courseDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get course detail by course code
router.get('/:courseCode', async (req, res) => {
  try {
    const courseDetail = await CourseDetail.findOne({ 
      courseCode: req.params.courseCode,
      isActive: true 
    });
    
    if (!courseDetail) {
      return res.status(404).json({ message: 'Course detail not found' });
    }
    
    res.json(courseDetail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new course detail
router.post('/', async (req, res) => {
  try {
    const courseDetail = new CourseDetail(req.body);
    const newCourseDetail = await courseDetail.save();
    res.status(201).json(newCourseDetail);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update course detail
router.put('/:courseCode', async (req, res) => {
  try {
    const courseDetail = await CourseDetail.findOneAndUpdate(
      { courseCode: req.params.courseCode },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!courseDetail) {
      return res.status(404).json({ message: 'Course detail not found' });
    }
    
    res.json(courseDetail);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete course detail (soft delete)
router.delete('/:courseCode', async (req, res) => {
  try {
    const courseDetail = await CourseDetail.findOneAndUpdate(
      { courseCode: req.params.courseCode },
      { isActive: false },
      { new: true }
    );
    
    if (!courseDetail) {
      return res.status(404).json({ message: 'Course detail not found' });
    }
    
    res.json({ message: 'Course detail deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 