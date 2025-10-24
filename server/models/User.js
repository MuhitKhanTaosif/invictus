const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    maxlength: [255, 'Password cannot exceed 255 characters']
  },
  first_name: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minlength: [1, 'First name must be at least 1 character long'],
    maxlength: [100, 'First name cannot exceed 100 characters']
  },
  last_name: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    minlength: [1, 'Last name must be at least 1 character long'],
    maxlength: [100, 'Last name cannot exceed 100 characters']
  },
  phone: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^[\+]?[\d\s\-\(\)]{7,15}$/.test(v);
      },
      message: 'Please enter a valid phone number'
    },
    set: function(value) {
      if (value) {
        return value.replace(/[\s\-\(\)]/g, '');
      }
      return value;
    }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active',
    required: true
  },
  email_verified: {
    type: Boolean,
    default: false
  },
  email_verification_token: {
    type: String,
    default: null
  },
  password_reset_token: {
    type: String,
    default: null
  },
  password_reset_expires: {
    type: Date,
    default: null
  },
  last_login: {
    type: Date,
    default: null
  },
  login_attempts: {
    type: Number,
    default: 0
  },
  locked_until: {
    type: Date,
    default: null
  },
  avatar: {
    type: String,
    default: null
  },
  preferences: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  stripe_customer_id: {
    type: String,
    default: null
  },
  address: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  }
}, {
  timestamps: { 
    createdAt: 'created_at', 
    updatedAt: 'updated_at' 
  },
  collection: 'users'
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    // Hash password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance methods
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.getFullName = function() {
  return `${this.first_name} ${this.last_name}`;
};

userSchema.methods.isActive = function() {
  return this.status === 'active';
};

userSchema.methods.isLocked = function() {
  return this.locked_until && this.locked_until > new Date();
};

userSchema.methods.incrementLoginAttempts = async function() {
  this.login_attempts += 1;

  // Lock account after 5 failed attempts for 15 minutes
  if (this.login_attempts >= 5) {
    this.locked_until = new Date(Date.now() + 15 * 60 * 1000);
  }

  await this.save();
};

userSchema.methods.resetLoginAttempts = async function() {
  this.login_attempts = 0;
  this.locked_until = null;
  this.last_login = new Date();
  await this.save();
};

// Static methods
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

userSchema.statics.createUser = async function(userData) {
  const user = new this(userData);
  await user.save();
  return user;
};

userSchema.statics.updateUser = async function(id, updateData) {
  const user = await this.findById(id);
  if (!user) {
    throw new Error('User not found');
  }

  Object.assign(user, updateData);
  await user.save();
  return user;
};

userSchema.statics.deleteUser = async function(id) {
  const user = await this.findById(id);
  if (!user) {
    throw new Error('User not found');
  }

  await this.findByIdAndDelete(id);
  return true;
};

// Query helpers (equivalent to Sequelize scopes)
userSchema.query.active = function() {
  return this.where({ status: 'active' });
};

userSchema.query.verified = function() {
  return this.where({ email_verified: true });
};

// Create the User model
const User = mongoose.model('User', userSchema);

// Transform the output when converting to JSON
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();

  // Remove sensitive fields
  delete userObject.password;
  delete userObject.email_verification_token;
  delete userObject.password_reset_token;
  delete userObject.password_reset_expires;
  
  return userObject;
};

module.exports = User;
