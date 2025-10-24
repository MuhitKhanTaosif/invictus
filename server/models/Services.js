const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#4CAF50'
  },
  image: {
    type: String
  },
  features: [{
    type: String,
    required: true
  }],
  approach: [{
    type: String,
    required: true
  }],
  path: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  metaTitle: {
    type: String
  },
  metaDescription: {
    type: String
  },
  seoKeywords: [{
    type: String
  }]
}, {
  timestamps: true
});

// Create slug from title
serviceSchema.pre('save', function(next) {
  if (!this.isModified('title')) return next();
  
  this.slug = this.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  
  next();
});

// Index for search
serviceSchema.index({ title: 'text', description: 'text', shortDescription: 'text' });

module.exports = mongoose.model('Services', serviceSchema); 