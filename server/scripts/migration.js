const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const DatabaseBackup = require('./backup');
require('dotenv').config();

// Import existing models
const Admin = require('../models/Admin');
const User = require('../models/User');
const Blog = require('../models/Blog');
const Category = require('../models/Category');
const Courses = require('../models/Courses');
const CourseDetails = require('../models/CourseDetails');
const Services = require('../models/Services');
const SiteSettings = require('../models/SiteSettings');

// Production-ready enhanced schemas
const productionSchemas = {
  // Enhanced Admin Schema
  adminSchema: {
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
  },

  // Enhanced Blog Schema
  blogSchema: {
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
  },

  // Enhanced Category Schema
  categorySchema: {
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
  }
};

// Migration functions
const migrationFunctions = {
  // Create production indexes
  async createIndexes() {
    console.log('🔍 Creating production indexes...');
    
    try {
      // Helper function to create index safely
      const createIndexSafe = async (collection, indexSpec, options = {}) => {
        try {
          await collection.createIndex(indexSpec, options);
          console.log(`  ✓ Created index: ${JSON.stringify(indexSpec)}`);
        } catch (error) {
          if (error.code === 85) { // IndexOptionsConflict
            console.log(`  ⚠️  Index already exists with different options: ${JSON.stringify(indexSpec)}`);
          } else if (error.code === 11000) { // DuplicateKey
            console.log(`  ⚠️  Index already exists: ${JSON.stringify(indexSpec)}`);
          } else {
            throw error;
          }
        }
      };

      // Admin indexes
      await createIndexSafe(Admin.collection, { email: 1 }, { unique: true });
      await createIndexSafe(Admin.collection, { username: 1 }, { unique: true });
      await createIndexSafe(Admin.collection, { isActive: 1 });
      await createIndexSafe(Admin.collection, { role: 1 });
      await createIndexSafe(Admin.collection, { isDeleted: 1 });
      await createIndexSafe(Admin.collection, { createdAt: -1 });

      // User indexes
      await createIndexSafe(User.collection, { email: 1 }, { unique: true });
      await createIndexSafe(User.collection, { status: 1 });
      await createIndexSafe(User.collection, { email_verified: 1 });
      await createIndexSafe(User.collection, { created_at: -1 });
      await createIndexSafe(User.collection, { last_login: -1 });

      // Blog indexes
      await createIndexSafe(Blog.collection, { slug: 1 }, { unique: true });
      await createIndexSafe(Blog.collection, { status: 1 });
      await createIndexSafe(Blog.collection, { isPublished: 1 });
      await createIndexSafe(Blog.collection, { publishedAt: -1 });
      await createIndexSafe(Blog.collection, { views: -1 });
      await createIndexSafe(Blog.collection, { isDeleted: 1 });
      await createIndexSafe(Blog.collection, { author: 1 });
      await createIndexSafe(Blog.collection, { category: 1 });
      await createIndexSafe(Blog.collection, { tags: 1 });
      
      // Text index for blogs (handle existing text indexes)
      try {
        await Blog.collection.createIndex({ 
          title: 'text', 
          content: 'text', 
          tags: 'text',
          excerpt: 'text'
        }, { weights: { title: 10, tags: 5, excerpt: 3, content: 1 } });
        console.log('  ✓ Created enhanced text index for blogs');
      } catch (error) {
        if (error.code === 85) {
          console.log('  ⚠️  Text index already exists, skipping...');
        } else {
          throw error;
        }
      }

      // Category indexes
      await createIndexSafe(Category.collection, { slug: 1 }, { unique: true });
      await createIndexSafe(Category.collection, { isActive: 1 });
      await createIndexSafe(Category.collection, { order: 1 });
      await createIndexSafe(Category.collection, { isDeleted: 1 });
      await createIndexSafe(Category.collection, { parentCategory: 1 });
      await createIndexSafe(Category.collection, { 
        name: 'text', 
        description: 'text' 
      });

      // Course indexes
      await createIndexSafe(Courses.collection, { code: 1 }, { unique: true });
      await createIndexSafe(Courses.collection, { slug: 1 }, { unique: true });
      await createIndexSafe(Courses.collection, { isActive: 1 });
      await createIndexSafe(Courses.collection, { featured: 1 });
      await createIndexSafe(Courses.collection, { category: 1 });
      await createIndexSafe(Courses.collection, { level: 1 });
      await createIndexSafe(Courses.collection, { 
        title: 'text', 
        code: 'text', 
        about: 'text' 
      });

      // Course Details indexes
      await createIndexSafe(CourseDetails.collection, { courseCode: 1 }, { unique: true });
      await createIndexSafe(CourseDetails.collection, { isActive: 1 });
      await createIndexSafe(CourseDetails.collection, { 
        courseTitle: 'text', 
        courseOverview: 'text' 
      });

      // Services indexes
      await createIndexSafe(Services.collection, { slug: 1 }, { unique: true });
      await createIndexSafe(Services.collection, { isActive: 1 });
      await createIndexSafe(Services.collection, { order: 1 });
      await createIndexSafe(Services.collection, { 
        title: 'text', 
        description: 'text', 
        shortDescription: 'text' 
      });

      console.log('✅ All indexes created successfully');
    } catch (error) {
      console.error('❌ Error creating indexes:', error);
      throw error;
    }
  },

  // Add audit fields to existing documents
  async addAuditFields() {
    console.log('📝 Adding audit fields to existing documents...');
    
    try {
      // Add audit fields to existing admins
      await Admin.updateMany(
        { createdBy: { $exists: false } },
        { 
          $set: { 
            createdBy: null,
            updatedBy: null,
            deletedAt: null,
            isDeleted: false,
            loginAttempts: 0,
            lockedUntil: null
          } 
        }
      );

      // Add audit fields to existing blogs
      await Blog.updateMany(
        { createdBy: { $exists: false } },
        { 
          $set: { 
            createdBy: null,
            updatedBy: null,
            deletedAt: null,
            isDeleted: false,
            likes: 0,
            shares: 0
          } 
        }
      );

      // Add audit fields to existing categories
      await Category.updateMany(
        { createdBy: { $exists: false } },
        { 
          $set: { 
            createdBy: null,
            updatedBy: null,
            deletedAt: null,
            isDeleted: false
          } 
        }
      );

      console.log('✅ Audit fields added successfully');
    } catch (error) {
      console.error('❌ Error adding audit fields:', error);
      throw error;
    }
  },

  // Migrate existing data to new schema format
  async migrateData() {
    console.log('🔄 Migrating existing data...');
    
    try {
      // Migrate blog status values
      await Blog.updateMany(
        { status: 'Draft' },
        { $set: { status: 'draft' } }
      );
      await Blog.updateMany(
        { status: 'Published' },
        { $set: { status: 'published' } }
      );
      await Blog.updateMany(
        { status: 'Scheduled' },
        { $set: { status: 'scheduled' } }
      );
      await Blog.updateMany(
        { status: 'Archived' },
        { $set: { status: 'archived' } }
      );
      await Blog.updateMany(
        { status: 'Private' },
        { $set: { status: 'private' } }
      );

      // Ensure all blogs have proper author references
      const blogsWithoutAuthor = await Blog.find({ 
        author: { $type: 'string' } 
      });
      
      for (const blog of blogsWithoutAuthor) {
        // Find an admin to assign as author
        const admin = await Admin.findOne({ role: 'admin' });
        if (admin) {
          blog.author = admin._id;
          await blog.save();
        }
      }

      // Ensure all categories have proper creator references
      const categoriesWithoutCreator = await Category.find({ 
        createdBy: { $exists: false } 
      });
      
      for (const category of categoriesWithoutCreator) {
        const admin = await Admin.findOne({ role: 'admin' });
        if (admin) {
          category.createdBy = admin._id;
          await category.save();
        }
      }

      console.log('✅ Data migration completed successfully');
    } catch (error) {
      console.error('❌ Error migrating data:', error);
      throw error;
    }
  },

  // Create default admin if none exists
  async createDefaultAdmin() {
    console.log('👤 Creating default admin user...');
    
    try {
      const existingAdmin = await Admin.findOne({ role: 'admin' });
      if (!existingAdmin) {
        const defaultAdmin = new Admin({
          username: 'admin',
          email: 'admin@invictus.com',
          password: 'admin123',
          firstName: 'System',
          lastName: 'Administrator',
          role: 'admin',
          isActive: true,
          permissions: {
            categories: true,
            courses: true,
            blogs: true,
            users: true,
            settings: true,
            analytics: true
          }
        });
        
        await defaultAdmin.save();
        console.log('✅ Default admin created successfully');
      } else {
        console.log('ℹ️  Admin user already exists');
      }
    } catch (error) {
      console.error('❌ Error creating default admin:', error);
      throw error;
    }
  },

  // Create default site settings
  async createDefaultSettings() {
    console.log('⚙️  Creating default site settings...');
    
    try {
      const existingSettings = await SiteSettings.findOne();
      if (!existingSettings) {
        const defaultSettings = new SiteSettings({
          contactInfo: {
            email: 'admin@invictus.com',
            phone: '+61 433 098 399',
            phoneSecondary: '+61 415 820 320',
            businessHours: 'Mon - Sat: 8:00 am - 7:00 pm',
            address: '200 Gilchrist Dr, Campbelltown NSW 2560'
          },
          socialMedia: {
            facebook: 'javascript:void(0)',
            instagram: 'javascript:void(0)',
            youtube: 'javascript:void(0)',
            linkedin: 'javascript:void(0)'
          }
        });
        
        await defaultSettings.save();
        console.log('✅ Default site settings created successfully');
      } else {
        console.log('ℹ️  Site settings already exist');
      }
    } catch (error) {
      console.error('❌ Error creating default settings:', error);
      throw error;
    }
  },

  // Validate data integrity
  async validateDataIntegrity() {
    console.log('🔍 Validating data integrity...');
    
    try {
      // Check for orphaned references
      const orphanedBlogs = await Blog.find({ 
        author: { $exists: true },
        $expr: { $not: { $in: ['$author', { $map: { input: { $objectToArray: '$$ROOT' }, as: 'item', in: '$$item.v' } }] } }
      });
      
      if (orphanedBlogs.length > 0) {
        console.warn(`⚠️  Found ${orphanedBlogs.length} blogs with invalid author references`);
      }

      // Check for duplicate slugs
      const duplicateSlugs = await Blog.aggregate([
        { $group: { _id: '$slug', count: { $sum: 1 } } },
        { $match: { count: { $gt: 1 } } }
      ]);
      
      if (duplicateSlugs.length > 0) {
        console.warn(`⚠️  Found ${duplicateSlugs.length} duplicate slugs`);
      }

      console.log('✅ Data integrity validation completed');
    } catch (error) {
      console.error('❌ Error validating data integrity:', error);
      throw error;
    }
  }
};

// Main migration function
async function runMigration(createBackup = true) {
  let backupResult = null;
  
  try {
    console.log('🚀 Starting database migration to production...');
    
    // Create backup before migration
    if (createBackup) {
      console.log('💾 Creating database backup before migration...');
      const backup = new DatabaseBackup();
      backupResult = await backup.createMongoDumpBackup();
      console.log(`✅ Backup created: ${backupResult.backupName}`);
      console.log(`📁 Backup path: ${backupResult.backupPath}`);
      console.log(`📊 Backup size: ${backupResult.size} MB`);
    }
    
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/invictus');
    console.log('✅ Connected to database');

    // Run migration steps
    await migrationFunctions.createIndexes();
    await migrationFunctions.addAuditFields();
    await migrationFunctions.migrateData();
    await migrationFunctions.createDefaultAdmin();
    await migrationFunctions.createDefaultSettings();
    await migrationFunctions.validateDataIntegrity();

    console.log('🎉 Migration completed successfully!');
    console.log('📊 Database is now production-ready with:');
    console.log('   ✅ Optimized indexes for performance');
    console.log('   ✅ Audit trails for all entities');
    console.log('   ✅ Data validation and integrity checks');
    console.log('   ✅ Soft delete functionality');
    console.log('   ✅ Default admin and settings');
    console.log('   ✅ Enhanced security features');
    
    if (backupResult) {
      console.log(`💾 Backup available for rollback: ${backupResult.backupName}`);
    }

  } catch (error) {
    console.error('💥 Migration failed:', error);
    
    if (backupResult) {
      console.log('🔄 Backup is available for restoration if needed');
      console.log(`📁 Backup path: ${backupResult.backupPath}`);
    }
    
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from database');
  }
}

// Run migration if called directly
if (require.main === module) {
  runMigration();
}

module.exports = {
  runMigration,
  migrationFunctions,
  productionSchemas
};
