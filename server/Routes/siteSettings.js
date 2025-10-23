const express = require('express');
const router = express.Router();
const SiteSettings = require('../models/SiteSettings');
const { authenticateToken } = require('../routes/auth');

// Get site settings (public)
router.get('/public/site-settings', async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings();
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    console.error('Error fetching site settings:', error);
    res.status(500).json({ message: 'Failed to fetch site settings' });
  }
});

// Get site settings (admin)
router.get('/admin/site-settings', authenticateToken, async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings();
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    console.error('Error fetching site settings:', error);
    res.status(500).json({ message: 'Failed to fetch site settings' });
  }
});

// Update site settings (admin only)
router.post('/admin/site-settings', authenticateToken, async (req, res) => {
  try {
    const { contactInfo, socialMedia } = req.body;
    
    // Validate required fields
    if (!contactInfo || !contactInfo.email || !contactInfo.phone || !contactInfo.businessHours) {
      return res.status(400).json({ 
        message: 'Contact information (email, phone, business hours) is required' 
      });
    }
    
    // Get existing settings or create new ones
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings();
    }
    
    // Update settings
    settings.contactInfo = {
      email: contactInfo.email,
      phone: contactInfo.phone,
      phoneSecondary: contactInfo.phoneSecondary || settings.contactInfo.phoneSecondary,
      businessHours: contactInfo.businessHours,
      address: contactInfo.address || settings.contactInfo.address
    };
    
    settings.socialMedia = {
      facebook: socialMedia?.facebook || 'javascript:void(0)',
      instagram: socialMedia?.instagram || 'javascript:void(0)',
      youtube: socialMedia?.youtube || 'javascript:void(0)',
      linkedin: socialMedia?.linkedin || 'javascript:void(0)'
    };
    
    await settings.save();
    
    res.json({ 
      message: 'Site settings updated successfully',
      settings 
    });
  } catch (error) {
    console.error('Error updating site settings:', error);
    res.status(500).json({ message: 'Failed to update site settings' });
  }
});

module.exports = router; 