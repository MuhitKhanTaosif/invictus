const mongoose = require('mongoose');
const SiteSettings = require('./models/SiteSettings');
require('dotenv').config();

const defaultSettings = {
  contactInfo: {
    email: 'admin@rplsupport.com.au',
    phone: '+61 433 098 399',
    phoneSecondary: '+61 415 820 320',
    businessHours: 'Mon - Sat: 8:00 am - 7:00 pm',
    address: '200 Gilchrist Dr, Campbelltown NSW 2560'
  },
  socialMedia: {
    facebook: 'https://www.facebook.com/profile.php?id=61570517976682',
    instagram: 'https://l.instagram.com/?u=https%3A%2F%2Fwww.facebook.com%2Frplsupport.com.au%3Fmibextid%3DLQQJ4d&e=AT3GqV8_JTXeqmox0o6-gM3P4nkwJfIKyidiTA3vShUNeVS-MZY9MLHj9s1sim2frnzj3yjGit1f5-ysB0eH5QKPmn7xnpWIDmjNT3s',
    youtube: 'https://www.youtube.com/@RPLSupport_Aus'
  }
};

async function seedSiteSettings() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rpl-support');
    console.log('Connected to MongoDB');

    // Check if settings already exist
    const existingSettings = await SiteSettings.findOne();
    
    if (existingSettings) {
      console.log('Site settings already exist. Updating with defaults...');
      existingSettings.contactInfo = defaultSettings.contactInfo;
      existingSettings.socialMedia = defaultSettings.socialMedia;
      await existingSettings.save();
      console.log('Site settings updated successfully');
    } else {
      console.log('Creating new site settings...');
      const settings = new SiteSettings(defaultSettings);
      await settings.save();
      console.log('Site settings created successfully');
    }

    console.log('\n=== SITE SETTINGS SEEDED SUCCESSFULLY ===');
    console.log('Contact Email:', defaultSettings.contactInfo.email);
    console.log('Phone:', defaultSettings.contactInfo.phone);
    console.log('Business Hours:', defaultSettings.contactInfo.businessHours);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding site settings:', error);
    process.exit(1);
  }
}

seedSiteSettings(); 