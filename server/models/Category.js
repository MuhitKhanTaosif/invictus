const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    minlength: [2, 'Category name must be at least 2 characters'],
    maxlength: [100, 'Category name cannot exceed 100 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  icon: {
    type: String,
    required: [true, 'Icon is required']
  },
  color: {
    type: String,
    default: '#4CAF50',
    match: [/^#[0-9A-Fa-f]{6}$/, 'Color must be a valid hex color']
  },
  image: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v);
      },
      message: 'Image must be a valid image URL'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0,
    min: 0
  },
  courseCount: {
    type: Number,
    default: 0,
    min: 0
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  metaTitle: {
    type: String,
    maxlength: [60, 'Meta title cannot exceed 60 characters']
  },
  metaDescription: {
    type: String,
    maxlength: [160, 'Meta description cannot exceed 160 characters']
  },
  seoKeywords: [{
    type: String,
    trim: true,
    maxlength: [50, 'SEO keyword cannot exceed 50 characters']
  }],
  // Audit fields
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    default: null
  },
  deletedAt: {
    type: Date,
    default: null
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  collection: 'categories'
});

// Create slug from name
categorySchema.pre('save', function(next) {
  if (!this.isModified('name')) return next();
  
  this.slug = this.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  
  next();
});

// Update course count when courses are added/removed
categorySchema.methods.updateCourseCount = async function() {
  const Course = mongoose.model('Courses');
  const count = await Course.countDocuments({ 
    category: this._id, 
    isActive: true,
    isDeleted: false 
  });
  this.courseCount = count;
  await this.save();
};

// Instance methods
categorySchema.methods.softDelete = async function() {
  this.isDeleted = true;
  this.deletedAt = new Date();
  await this.save();
};

categorySchema.methods.restore = async function() {
  this.isDeleted = false;
  this.deletedAt = null;
  await this.save();
};

// Static methods
categorySchema.statics.findActive = function() {
  return this.find({ isActive: true, isDeleted: false });
};

categorySchema.statics.findByParent = function(parentId) {
  return this.find({ parentCategory: parentId, isDeleted: false });
};

categorySchema.statics.findRootCategories = function() {
  return this.find({ 
    parentCategory: null, 
    isActive: true, 
    isDeleted: false 
  });
};

categorySchema.statics.search = function(query) {
  return this.find({
    $text: { $search: query },
    isDeleted: false
  });
};

// Query helpers
categorySchema.query.active = function() {
  return this.where({ isActive: true, isDeleted: false });
};

categorySchema.query.notDeleted = function() {
  return this.where({ isDeleted: false });
};

categorySchema.query.byParent = function(parentId) {
  return this.where({ parentCategory: parentId, isDeleted: false });
};

categorySchema.query.rootCategories = function() {
  return this.where({ 
    parentCategory: null, 
    isActive: true, 
    isDeleted: false 
  });
};

// Indexes
categorySchema.index({ slug: 1 }, { unique: true });
categorySchema.index({ isActive: 1 });
categorySchema.index({ order: 1 });
categorySchema.index({ isDeleted: 1 });
categorySchema.index({ parentCategory: 1 });
categorySchema.index({ 
  name: 'text', 
  description: 'text' 
});

module.exports = mongoose.model('Category', categorySchema);