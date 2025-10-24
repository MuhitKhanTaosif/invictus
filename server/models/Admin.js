const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [50, 'Username cannot exceed 50 characters'],
    match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    maxlength: [255, 'Password cannot exceed 255 characters']
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minlength: [1, 'First name must be at least 1 character'],
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    minlength: [1, 'Last name must be at least 1 character'],
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  role: {
    type: String,
    enum: {
      values: ['admin', 'editor', 'moderator'],
      message: 'Role must be admin, editor, or moderator'
    },
    default: 'editor'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: null
  },
  loginAttempts: {
    type: Number,
    default: 0,
    min: 0
  },
  lockedUntil: {
    type: Date,
    default: null
  },
  permissions: {
    categories: { type: Boolean, default: true },
    courses: { type: Boolean, default: true },
    blogs: { type: Boolean, default: true },
    users: { type: Boolean, default: false },
    settings: { type: Boolean, default: false },
    analytics: { type: Boolean, default: false }
  },
  // Audit fields
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    default: null
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
  collection: 'admins'
});

// Hash password before saving
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
adminSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to get full name
adminSchema.methods.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

// Check if account is locked
adminSchema.methods.isLocked = function() {
  return this.lockedUntil && this.lockedUntil > new Date();
};

// Increment login attempts
adminSchema.methods.incrementLoginAttempts = async function() {
  this.loginAttempts += 1;

  // Lock account after 5 failed attempts for 30 minutes
  if (this.loginAttempts >= 5) {
    this.lockedUntil = new Date(Date.now() + 30 * 60 * 1000);
  }

  await this.save();
};

// Reset login attempts
adminSchema.methods.resetLoginAttempts = async function() {
  this.loginAttempts = 0;
  this.lockedUntil = null;
  this.lastLogin = new Date();
  await this.save();
};

// Soft delete
adminSchema.methods.softDelete = async function() {
  this.isDeleted = true;
  this.deletedAt = new Date();
  await this.save();
};

// Restore soft deleted
adminSchema.methods.restore = async function() {
  this.isDeleted = false;
  this.deletedAt = null;
  await this.save();
};

// Static methods
adminSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase(), isDeleted: false });
};

adminSchema.statics.findActive = function() {
  return this.find({ isActive: true, isDeleted: false });
};

adminSchema.statics.findByRole = function(role) {
  return this.find({ role, isActive: true, isDeleted: false });
};

// Query helpers
adminSchema.query.active = function() {
  return this.where({ isActive: true, isDeleted: false });
};

adminSchema.query.notDeleted = function() {
  return this.where({ isDeleted: false });
};

// Transform output when converting to JSON
adminSchema.methods.toJSON = function() {
  const adminObject = this.toObject();
  
  // Remove sensitive fields
  delete adminObject.password;
  delete adminObject.loginAttempts;
  delete adminObject.lockedUntil;
  
  return adminObject;
};

// Indexes
adminSchema.index({ email: 1 }, { unique: true });
adminSchema.index({ username: 1 }, { unique: true });
adminSchema.index({ isActive: 1 });
adminSchema.index({ role: 1 });
adminSchema.index({ isDeleted: 1 });
adminSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Admin', adminSchema);