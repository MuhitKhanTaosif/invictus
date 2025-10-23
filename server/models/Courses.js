const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
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
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  level: {
    type: String,
    required: true,
    enum: ['Certificate I', 'Certificate II', 'Certificate III', 'Certificate IV', 'Diploma', 'Advanced Diploma', 'Graduate Certificate', 'Graduate Diploma']
  },
  duration: {
    type: String,
    default: 'Varies'
  },
  about: {
    type: String,
    required: true
  },
  jobOutcomes: {
    type: String,
    required: true
  },
  entryRequirements: {
    type: String,
    default: 'No formal entry requirements'
  },
  units: [{
    code: String,
    title: String,
    description: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  image: {
    type: String
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
courseSchema.pre('save', function(next) {
  if (!this.isModified('title')) return next();
  
  this.slug = this.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  
  next();
});

// Index for search
courseSchema.index({ title: 'text', code: 'text', about: 'text' });

module.exports = mongoose.model('Courses', courseSchema); 