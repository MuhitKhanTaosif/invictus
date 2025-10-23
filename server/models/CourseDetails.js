const mongoose = require('mongoose');

const courseDetailSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  courseTitle: {
    type: String,
    required: true,
    trim: true
  },
  courseOverview: {
    type: String,
    required: true
  },
  aboutCertification: {
    type: String,
    required: true
  },
  scopeOfWork: {
    type: String,
    required: true
  },
  experienceRequirements: {
    type: String,
    required: true
  },
  eligibility: {
    type: String,
    required: true
  },
  regulatoryRequirements: {
    type: String,
    required: true
  },
  careerOutcomes: {
    type: String,
    default: ''
  },
  studyPathway: {
    type: String,
    default: ''
  },
  assessmentMethods: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for search
courseDetailSchema.index({ courseCode: 1 });
courseDetailSchema.index({ courseTitle: 'text', courseOverview: 'text' });

module.exports = mongoose.model('CourseDetail', courseDetailSchema); 