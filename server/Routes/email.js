const express = require('express');
const { body, validationResult } = require('express-validator');
const { sendContactFormEmail, sendFreeQuoteEmail } = require('../services/emailService');
const router = express.Router();

// Contact form email route
router.post('/contact', [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('message').trim().notEmpty().withMessage('Message is required')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { firstName, lastName, email, phone, message } = req.body;
    
    const formData = {
      firstName,
      lastName,
      email,
      phone,
      message
    };

    // Send email
    await sendContactFormEmail(formData);
    
    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully. We will get back to you soon!'
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.'
    });
  }
});

// Free quote form email route
router.post('/quote', [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('selectedCategories').isArray().withMessage('Selected categories must be an array'),
  body('selectedCourses').isArray().withMessage('Selected courses must be an array')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      state,
      preferredContact,
      selectedCategories,
      selectedCourses,
      experience,
      goals,
      additionalInfo,
      categories,
      courses
    } = req.body;
    
    const formData = {
      firstName,
      lastName,
      email,
      phone,
      state,
      preferredContact,
      selectedCategories,
      selectedCourses,
      experience,
      goals,
      additionalInfo
    };

    // Send email with categories and courses data for reference
    await sendFreeQuoteEmail(formData, categories || [], courses || []);
    
    res.status(200).json({
      success: true,
      message: 'Free quote request submitted successfully. We will prepare your personalized quote and get back to you soon!'
    });

  } catch (error) {
    console.error('Free quote form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.'
    });
  }
});

module.exports = router;