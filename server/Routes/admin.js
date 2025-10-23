const express = require('express');
const router = express.Router();
const { authenticateToken } = require('./auth');
const Category = require('../models/Category');
const Course = require('../models/Course');
const Blog = require('../models/Blog');
const Admin = require('../models/Admin');
const SiteSettings = require('../models/SiteSettings');

// Apply authentication middleware to all admin routes
router.use(authenticateToken);

// Dashboard statistics
router.get('/dashboard', async (req, res) => {
  try {
    const stats = {
      categories: await Category.countDocuments(),
      courses: await Course.countDocuments(),
      publishedCourses: await Course.countDocuments({ isActive: true }),
      blogs: await Blog.countDocuments(),
      publishedBlogs: await Blog.countDocuments({ isPublished: true }),
      admins: await Admin.countDocuments({ isActive: true })
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get dashboard statistics
router.get('/dashboard-stats', authenticateToken, async (req, res) => {
  try {
    // Get counts
    const [totalCourses, totalCategories, totalBlogs, publishedBlogs] = await Promise.all([
      Course.countDocuments(),
      Category.countDocuments(),
      Blog.countDocuments(),
      Blog.countDocuments({ isPublished: true })
    ]);

    // Get recent activity
    const [recentCourses, recentBlogs, popularCategories] = await Promise.all([
      Course.find().sort({ createdAt: -1 }).limit(5).select('title courseCode createdAt'),
      Blog.find({ isPublished: true }).sort({ publishedAt: -1 }).limit(5).select('title slug publishedAt views'),
      Category.find().sort({ courseCount: -1 }).limit(5).select('name slug courseCount')
    ]);

    // Calculate growth percentages (mock data for now)
    const stats = {
      overview: {
        totalCourses,
        totalCategories,
        totalBlogs,
        publishedBlogs,
        totalViews: 10500, // Mock data
        monthlyGrowth: 12.5 // Mock data
      },
      recentActivity: {
        courses: recentCourses,
        blogs: recentBlogs,
        categories: popularCategories
      },
      trends: {
        coursesGrowth: 12,
        blogsGrowth: 8,
        categoriesGrowth: 5,
        viewsGrowth: 15
      }
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Error fetching dashboard statistics' });
  }
});

// Category management
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find().sort({ order: 1, name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/categories', async (req, res) => {
  try {
    const category = new Category(req.body);
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Category with this name already exists' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

router.put('/categories/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Category with this name already exists' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

router.delete('/categories/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Course management
router.get('/courses', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const courses = await Course.find()
      .populate('category', 'name slug')
      .sort({ title: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Course.countDocuments();

    res.json({
      courses,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/courses', async (req, res) => {
  try {
    const course = new Course(req.body);
    const savedCourse = await course.save();
    
    const populatedCourse = await Course.findById(savedCourse._id)
      .populate('category', 'name slug');

    res.status(201).json(populatedCourse);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Course with this code already exists' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

router.put('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('category', 'name slug');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Course with this code already exists' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

router.delete('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Blog management
router.get('/blogs', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Blog.countDocuments();

    res.json({
      blogs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/blogs', async (req, res) => {
  try {
    const blog = new Blog(req.body);
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Blog with this title already exists' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

router.put('/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(blog);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Blog with this title already exists' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

router.delete('/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Bulk operations
router.post('/bulk-publish-blogs', async (req, res) => {
  try {
    const { blogIds } = req.body;
    
    await Blog.updateMany(
      { _id: { $in: blogIds } },
      { $set: { isPublished: true, publishedAt: new Date() } }
    );

    res.json({ message: 'Blogs published successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/bulk-unpublish-blogs', async (req, res) => {
  try {
    const { blogIds } = req.body;
    
    await Blog.updateMany(
      { _id: { $in: blogIds } },
      { $set: { isPublished: false } }
    );

    res.json({ message: 'Blogs unpublished successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/bulk-activate-courses', async (req, res) => {
  try {
    const { courseIds } = req.body;
    
    await Course.updateMany(
      { _id: { $in: courseIds } },
      { $set: { isActive: true } }
    );

    res.json({ message: 'Courses activated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/bulk-deactivate-courses', async (req, res) => {
  try {
    const { courseIds } = req.body;
    
    await Course.updateMany(
      { _id: { $in: courseIds } },
      { $set: { isActive: false } }
    );

    res.json({ message: 'Courses deactivated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Site Settings Management
router.get('/site-settings', async (req, res) => {
  try {
    // Find settings or create default if none exists
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings();
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/site-settings', async (req, res) => {
  try {
    const settings = await SiteSettings.findOne();
    
    if (!settings) {
      // Create new settings if none exist
      const newSettings = new SiteSettings(req.body);
      const savedSettings = await newSettings.save();
      return res.json(savedSettings);
    }
    
    // Update existing settings
    Object.assign(settings, req.body);
    settings.updatedAt = new Date();
    const updatedSettings = await settings.save();
    
    res.json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Specific endpoint for updating contact information
router.put('/site-settings/contact', async (req, res) => {
  try {
    const settings = await SiteSettings.findOne();
    
    if (!settings) {
      // Create new settings if none exist
      const newSettings = new SiteSettings({ contactInfo: req.body });
      const savedSettings = await newSettings.save();
      return res.json(savedSettings);
    }
    
    // Update contact info
    settings.contactInfo = { ...settings.contactInfo, ...req.body };
    settings.updatedAt = new Date();
    const updatedSettings = await settings.save();
    
    res.json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Specific endpoint for updating social media links
router.put('/site-settings/social', async (req, res) => {
  try {
    const settings = await SiteSettings.findOne();
    
    if (!settings) {
      // Create new settings if none exist
      const newSettings = new SiteSettings({ socialMedia: req.body });
      const savedSettings = await newSettings.save();
      return res.json(savedSettings);
    }
    
    // Update social media links
    settings.socialMedia = { ...settings.socialMedia, ...req.body };
    settings.updatedAt = new Date();
    const updatedSettings = await settings.save();
    
    res.json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 