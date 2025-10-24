const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [5, 'Title must be at least 5 characters'],
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    maxlength: [500, 'Excerpt cannot exceed 500 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    minlength: [100, 'Content must be at least 100 characters']
  },
  contentType: {
    type: String,
    enum: {
      values: ['html', 'markdown'],
      message: 'Content type must be html or markdown'
    },
    default: 'html'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  status: {
    type: String,
    enum: {
      values: ['draft', 'published', 'scheduled', 'archived', 'private'],
      message: 'Status must be draft, published, scheduled, archived, or private'
    },
    default: 'draft'
  },
  featuredImage: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v);
      },
      message: 'Featured image must be a valid image URL'
    }
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [30, 'Tag cannot exceed 30 characters']
  }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date,
    default: null
  },
  readTime: {
    type: Number,
    default: 5,
    min: [1, 'Read time must be at least 1 minute']
  },
  views: {
    type: Number,
    default: 0,
    min: 0
  },
  likes: {
    type: Number,
    default: 0,
    min: 0
  },
  shares: {
    type: Number,
    default: 0,
    min: 0
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
  collection: 'blogs'
});

// Create slug from title
blogSchema.pre('save', function(next) {
  // Generate slug if it doesn't exist or if title is modified
  if (!this.slug || this.isModified('title')) {
    let slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    // Ensure slug is not empty
    if (!slug) {
      slug = 'blog-' + Date.now();
    }
    
    this.slug = slug;
  }
  next();
});

// Set publishedAt when published
blogSchema.pre('save', function(next) {
  if (this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

// Calculate read time based on content
blogSchema.pre('save', function(next) {
  if (this.isModified('content')) {
    const wordsPerMinute = 200;
    const wordCount = this.content.split(/\s+/).length;
    this.readTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  }
  next();
});

// Instance methods
blogSchema.methods.incrementViews = async function() {
  this.views += 1;
  await this.save();
};

blogSchema.methods.incrementLikes = async function() {
  this.likes += 1;
  await this.save();
};

blogSchema.methods.incrementShares = async function() {
  this.shares += 1;
  await this.save();
};

blogSchema.methods.softDelete = async function() {
  this.isDeleted = true;
  this.deletedAt = new Date();
  await this.save();
};

blogSchema.methods.restore = async function() {
  this.isDeleted = false;
  this.deletedAt = null;
  await this.save();
};

// Static methods
blogSchema.statics.findPublished = function() {
  return this.find({ 
    isPublished: true, 
    status: 'published',
    isDeleted: false 
  });
};

blogSchema.statics.findByCategory = function(categoryId) {
  return this.find({ 
    category: categoryId, 
    isDeleted: false 
  });
};

blogSchema.statics.findByAuthor = function(authorId) {
  return this.find({ 
    author: authorId, 
    isDeleted: false 
  });
};

blogSchema.statics.findByTag = function(tag) {
  return this.find({ 
    tags: tag, 
    isDeleted: false 
  });
};

blogSchema.statics.search = function(query) {
  return this.find({
    $text: { $search: query },
    isDeleted: false
  });
};

// Query helpers
blogSchema.query.published = function() {
  return this.where({ 
    isPublished: true, 
    status: 'published',
    isDeleted: false 
  });
};

blogSchema.query.notDeleted = function() {
  return this.where({ isDeleted: false });
};

blogSchema.query.byCategory = function(categoryId) {
  return this.where({ category: categoryId, isDeleted: false });
};

blogSchema.query.byAuthor = function(authorId) {
  return this.where({ author: authorId, isDeleted: false });
};

// Indexes
blogSchema.index({ slug: 1 }, { unique: true });
blogSchema.index({ status: 1 });
blogSchema.index({ isPublished: 1 });
blogSchema.index({ publishedAt: -1 });
blogSchema.index({ views: -1 });
blogSchema.index({ isDeleted: 1 });
blogSchema.index({ author: 1 });
blogSchema.index({ category: 1 });
blogSchema.index({ tags: 1 });
blogSchema.index({ 
  title: 'text', 
  content: 'text', 
  tags: 'text',
  excerpt: 'text'
}, { weights: { title: 10, tags: 5, excerpt: 3, content: 1 } });

module.exports = mongoose.model('Blog', blogSchema);