const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  contactInfo: {
    email: {
      type: String,
      required: true,
      default: 'admin@rplsupport.com.au'
    },
    phone: {
      type: String,
      required: true,
      default: '+61 433 098 399'
    },
    phoneSecondary: {
      type: String,
      default: '+61 415 820 320'
    },
    businessHours: {
      type: String,
      required: true,
      default: 'Mon - Sat: 8:00 am - 7:00 pm'
    },
    address: {
      type: String,
      default: '200 Gilchrist Dr, Campbelltown NSW 2560'
    }
  },
  socialMedia: {
    facebook: {
      type: String,
      default: 'javascript:void(0)'
    },
    instagram: {
      type: String,
      default: 'javascript:void(0)'
    },
    youtube: {
      type: String,
      default: 'javascript:void(0)'
    },
    linkedin: {
      type: String,
      default: 'javascript:void(0)'
    }
  }
}, {
  timestamps: true
});

// Ensure only one settings document exists
siteSettingsSchema.statics.getSettings = async function() {
  let settings = await this.findOne();
  if (!settings) {
    settings = new this();
    await settings.save();
  }
  return settings;
};

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);