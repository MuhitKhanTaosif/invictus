const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Admin = require('../models/Admin');
const User = require('../models/User');
const Blog = require('../models/Blog');
const Category = require('../models/Category');
const Courses = require('../models/Courses');
const CourseDetails = require('../models/CourseDetails');
const Services = require('../models/Services');
const SiteSettings = require('../models/SiteSettings');

// Rollback functions
const rollbackFunctions = {
  // Remove production indexes
  async removeIndexes() {
    console.log('🗑️  Removing production indexes...');
    
    try {
      // Remove admin indexes
      await Admin.collection.dropIndex({ email: 1 });
      await Admin.collection.dropIndex({ username: 1 });
      await Admin.collection.dropIndex({ isActive: 1 });
      await Admin.collection.dropIndex({ role: 1 });
      await Admin.collection.dropIndex({ isDeleted: 1 });
      await Admin.collection.dropIndex({ createdAt: -1 });

      // Remove user indexes
      await User.collection.dropIndex({ email: 1 });
      await User.collection.dropIndex({ status: 1 });
      await User.collection.dropIndex({ email_verified: 1 });
      await User.collection.dropIndex({ created_at: -1 });
      await User.collection.dropIndex({ last_login: -1 });

      // Remove blog indexes
      await Blog.collection.dropIndex({ slug: 1 });
      await Blog.collection.dropIndex({ status: 1 });
      await Blog.collection.dropIndex({ isPublished: 1 });
      await Blog.collection.dropIndex({ publishedAt: -1 });
      await Blog.collection.dropIndex({ views: -1 });
      await Blog.collection.dropIndex({ isDeleted: 1 });
      await Blog.collection.dropIndex({ author: 1 });
      await Blog.collection.dropIndex({ category: 1 });
      await Blog.collection.dropIndex({ tags: 1 });
      await Blog.collection.dropIndex({ 
        title: 'text', 
        content: 'text', 
        tags: 'text',
        excerpt: 'text'
      });

      // Remove category indexes
      await Category.collection.dropIndex({ slug: 1 });
      await Category.collection.dropIndex({ isActive: 1 });
      await Category.collection.dropIndex({ order: 1 });
      await Category.collection.dropIndex({ isDeleted: 1 });
      await Category.collection.dropIndex({ parentCategory: 1 });
      await Category.collection.dropIndex({ 
        name: 'text', 
        description: 'text' 
      });

      // Remove course indexes
      await Courses.collection.dropIndex({ code: 1 });
      await Courses.collection.dropIndex({ slug: 1 });
      await Courses.collection.dropIndex({ isActive: 1 });
      await Courses.collection.dropIndex({ featured: 1 });
      await Courses.collection.dropIndex({ category: 1 });
      await Courses.collection.dropIndex({ level: 1 });
      await Courses.collection.dropIndex({ 
        title: 'text', 
        code: 'text', 
        about: 'text' 
      });

      // Remove course details indexes
      await CourseDetails.collection.dropIndex({ courseCode: 1 });
      await CourseDetails.collection.dropIndex({ isActive: 1 });
      await CourseDetails.collection.dropIndex({ 
        courseTitle: 'text', 
        courseOverview: 'text' 
      });

      // Remove services indexes
      await Services.collection.dropIndex({ slug: 1 });
      await Services.collection.dropIndex({ isActive: 1 });
      await Services.collection.dropIndex({ order: 1 });
      await Services.collection.dropIndex({ 
        title: 'text', 
        description: 'text', 
        shortDescription: 'text' 
      });

      console.log('✅ All indexes removed successfully');
    } catch (error) {
      console.error('❌ Error removing indexes:', error);
      // Continue with rollback even if index removal fails
    }
  },

  // Remove audit fields
  async removeAuditFields() {
    console.log('🗑️  Removing audit fields...');
    
    try {
      // Remove audit fields from admins
      await Admin.updateMany(
        {},
        { 
          $unset: { 
            createdBy: 1,
            updatedBy: 1,
            deletedAt: 1,
            isDeleted: 1,
            loginAttempts: 1,
            lockedUntil: 1
          } 
        }
      );

      // Remove audit fields from blogs
      await Blog.updateMany(
        {},
        { 
          $unset: { 
            createdBy: 1,
            updatedBy: 1,
            deletedAt: 1,
            isDeleted: 1,
            likes: 1,
            shares: 1
          } 
        }
      );

      // Remove audit fields from categories
      await Category.updateMany(
        {},
        { 
          $unset: { 
            createdBy: 1,
            updatedBy: 1,
            deletedAt: 1,
            isDeleted: 1
          } 
        }
      );

      console.log('✅ Audit fields removed successfully');
    } catch (error) {
      console.error('❌ Error removing audit fields:', error);
      throw error;
    }
  },

  // Restore original data format
  async restoreOriginalData() {
    console.log('🔄 Restoring original data format...');
    
    try {
      // Restore blog status values
      await Blog.updateMany(
        { status: 'draft' },
        { $set: { status: 'Draft' } }
      );
      await Blog.updateMany(
        { status: 'published' },
        { $set: { status: 'Published' } }
      );
      await Blog.updateMany(
        { status: 'scheduled' },
        { $set: { status: 'Scheduled' } }
      );
      await Blog.updateMany(
        { status: 'archived' },
        { $set: { status: 'Archived' } }
      );
      await Blog.updateMany(
        { status: 'private' },
        { $set: { status: 'Private' } }
      );

      console.log('✅ Original data format restored successfully');
    } catch (error) {
      console.error('❌ Error restoring original data:', error);
      throw error;
    }
  },

  // Remove default data
  async removeDefaultData() {
    console.log('🗑️  Removing default data...');
    
    try {
      // Remove default admin
      await Admin.deleteOne({ email: 'admin@invictus.com' });
      
      // Remove default site settings
      await SiteSettings.deleteMany({});

      console.log('✅ Default data removed successfully');
    } catch (error) {
      console.error('❌ Error removing default data:', error);
      throw error;
    }
  }
};

// Main rollback function
async function runRollback() {
  try {
    console.log('🔄 Starting database rollback...');
    
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/invictus');
    console.log('✅ Connected to database');

    // Run rollback steps
    await rollbackFunctions.removeIndexes();
    await rollbackFunctions.removeAuditFields();
    await rollbackFunctions.restoreOriginalData();
    await rollbackFunctions.removeDefaultData();

    console.log('🎉 Rollback completed successfully!');
    console.log('📊 Database has been restored to pre-migration state');

  } catch (error) {
    console.error('💥 Rollback failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from database');
  }
}

// Run rollback if called directly
if (require.main === module) {
  runRollback();
}

module.exports = {
  runRollback,
  rollbackFunctions
};
