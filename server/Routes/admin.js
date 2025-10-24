const express = require('express');
const router = express.Router();
const { authenticateToken } = require('./auth');
const Category = require('../models/Category');
const Course = require('../models/Courses');
const Blog = require('../models/Blog');
const Admin = require('../models/Admin');
const SiteSettings = require('../models/SiteSettings');
const WebTraffic = require('../models/WebTraffic');

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

// Get comprehensive dashboard statistics
router.get('/dashboard-stats', authenticateToken, async (req, res) => {
  try {
    const { period = '30d' } = req.query;
    
    // Calculate date range based on period
    const now = new Date();
    let startDate;
    switch (period) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case '1y':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // Get basic counts
    const [
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      scheduledBlogs,
      archivedBlogs,
      totalCategories,
      totalAdmins
    ] = await Promise.all([
      Blog.countDocuments({ isDeleted: false }),
      Blog.countDocuments({ isDeleted: false, status: 'published', isPublished: true }),
      Blog.countDocuments({ isDeleted: false, status: 'draft' }),
      Blog.countDocuments({ isDeleted: false, status: 'scheduled' }),
      Blog.countDocuments({ isDeleted: false, status: 'archived' }),
      Category.countDocuments(),
      Admin.countDocuments({ isActive: true, isDeleted: false })
    ]);

    // Get blog analytics
    const [
      totalBlogViews,
      blogLikesShares,
      recentBlogs,
      topBlogs,
      blogEngagement
    ] = await Promise.all([
      // Total blog views from WebTraffic
      WebTraffic.getBlogViews(startDate, now),
      // Total likes and shares from Blog model
      Blog.aggregate([
        { $match: { isDeleted: false, isPublished: true } },
        { $group: { _id: null, totalLikes: { $sum: '$likes' }, totalShares: { $sum: '$shares' } } }
      ]),
      // Recent published blogs
      Blog.find({ isDeleted: false, isPublished: true })
        .sort({ publishedAt: -1 })
        .limit(5)
        .select('title slug publishedAt views likes shares')
        .populate('author', 'name')
        .populate('category', 'name'),
      // Top performing blogs
      Blog.find({ isDeleted: false, isPublished: true })
        .sort({ views: -1 })
        .limit(5)
        .select('title slug views likes shares publishedAt')
        .populate('author', 'name')
        .populate('category', 'name'),
      // Blog engagement metrics
      Blog.aggregate([
        { $match: { isDeleted: false, isPublished: true } },
        {
          $group: {
            _id: null,
            avgViews: { $avg: '$views' },
            avgLikes: { $avg: '$likes' },
            avgShares: { $avg: '$shares' },
            totalViews: { $sum: '$views' },
            totalLikes: { $sum: '$likes' },
            totalShares: { $sum: '$shares' }
          }
        }
      ])
    ]);

    // Extract likes and shares from aggregation result
    const totalBlogLikes = blogLikesShares[0]?.totalLikes || 0;
    const totalBlogShares = blogLikesShares[0]?.totalShares || 0;

    // Get web traffic analytics
    const [
      totalPageViews,
      uniqueVisitors,
      topPages,
      topBlogPosts,
      deviceStats,
      countryStats,
      dailyStats
    ] = await Promise.all([
      WebTraffic.getPageViews(startDate, now),
      WebTraffic.getUniqueVisitors(startDate, now),
      WebTraffic.getTopPages(startDate, now, 10),
      WebTraffic.getTopBlogPosts(startDate, now, 10),
      WebTraffic.getDeviceStats(startDate, now),
      WebTraffic.getCountryStats(startDate, now),
      WebTraffic.getDailyStats(startDate, now)
    ]);

    // Get previous period data for growth calculation
    const previousStartDate = new Date(startDate.getTime() - (now.getTime() - startDate.getTime()));
    const [
      previousBlogViews,
      previousPageViews,
      previousUniqueVisitors
    ] = await Promise.all([
      WebTraffic.getBlogViews(previousStartDate, startDate),
      WebTraffic.getPageViews(previousStartDate, startDate),
      WebTraffic.getUniqueVisitors(previousStartDate, startDate)
    ]);

    // Calculate growth percentages
    const calculateGrowth = (current, previous) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return Math.round(((current - previous) / previous) * 100);
    };

    const blogViewsGrowth = calculateGrowth(totalBlogViews, previousBlogViews);
    const pageViewsGrowth = calculateGrowth(totalPageViews, previousPageViews);
    const uniqueVisitorsGrowth = calculateGrowth(uniqueVisitors, previousUniqueVisitors);

    // Prepare response
    const stats = {
      overview: {
        // Blog statistics
        totalBlogs,
        publishedBlogs,
        draftBlogs,
        scheduledBlogs,
        archivedBlogs,
        
        // Traffic statistics
        totalPageViews,
        totalBlogViews,
        uniqueVisitors,
        
        // Growth metrics
        blogViewsGrowth,
        pageViewsGrowth,
        uniqueVisitorsGrowth,
        
        // System stats
        totalCategories,
        totalAdmins
      },
      
      blogAnalytics: {
        engagement: blogEngagement[0] || {
          avgViews: 0,
          avgLikes: 0,
          avgShares: 0,
          totalViews: 0,
          totalLikes: 0,
          totalShares: 0
        },
        totalLikes: totalBlogLikes,
        totalShares: totalBlogShares,
        recentBlogs,
        topBlogs
      },
      
      trafficAnalytics: {
        topPages,
        topBlogPosts,
        deviceStats,
        countryStats,
        dailyStats
      },
      
      trends: {
        blogViewsGrowth,
        pageViewsGrowth,
        uniqueVisitorsGrowth,
        blogsGrowth: publishedBlogs > 0 ? Math.round((publishedBlogs / totalBlogs) * 100) : 0
      },
      
      period: {
        startDate,
        endDate: now,
        period
      }
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ 
      message: 'Error fetching dashboard statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
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

// Blog management - Enhanced CRUD operations
router.get('/posts', async (req, res) => {
  try {
    const { page = 1, limit = 20, status, category, author } = req.query;

    let query = { isDeleted: false };
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (author && author !== 'all') {
      query.author = author;
    }

    const posts = await Blog.find(query)
      .populate('category', 'name slug')
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Blog.countDocuments(query);

    res.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single blog post
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id)
      .populate('category', 'name slug')
      .populate('author', 'name email');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new blog post
router.post('/posts', async (req, res) => {
  try {
    const postData = {
      ...req.body,
      author: req.user.id, // Set author from authenticated user
      createdBy: req.user.id
    };

    const post = new Blog(postData);
    const savedPost = await post.save();
    
    const populatedPost = await Blog.findById(savedPost._id)
      .populate('category', 'name slug')
      .populate('author', 'name email');

    res.status(201).json(populatedPost);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Blog with this slug already exists' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// Update blog post
router.put('/posts/:id', async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      updatedBy: req.user.id
    };

    const post = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('category', 'name slug')
     .populate('author', 'name email');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Blog with this slug already exists' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// Patch blog post (for status updates)
router.patch('/posts/:id', async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      updatedBy: req.user.id
    };

    const post = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('category', 'name slug')
     .populate('author', 'name email');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete blog post
router.delete('/posts/:id', async (req, res) => {
  try {
    const post = await Blog.findByIdAndDelete(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Legacy blog endpoints for backward compatibility
router.get('/blogs', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const blogs = await Blog.find({ isDeleted: false })
      .populate('category', 'name slug')
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Blog.countDocuments({ isDeleted: false });

    res.json({
      blogs,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/blogs', async (req, res) => {
  try {
    const blogData = {
      ...req.body,
      author: req.user.id,
      createdBy: req.user.id
    };

    const blog = new Blog(blogData);
    const savedBlog = await blog.save();
    
    const populatedBlog = await Blog.findById(savedBlog._id)
      .populate('category', 'name slug')
      .populate('author', 'name email');

    res.status(201).json(populatedBlog);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Blog with this slug already exists' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

router.put('/blogs/:id', async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      updatedBy: req.user.id
    };

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('category', 'name slug')
     .populate('author', 'name email');

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(blog);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Blog with this slug already exists' });
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

// Web traffic tracking endpoint (for testing)
router.post('/track-visit', async (req, res) => {
  try {
    const {
      page,
      pageTitle,
      sessionId,
      device = 'unknown',
      browser,
      os,
      country,
      city,
      referrer,
      timeOnPage = 0,
      isBounce = true,
      eventType = 'pageview',
      blogPost = null,
      metadata = {}
    } = req.body;

    const trafficData = {
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent'),
      referrer,
      page,
      pageTitle,
      sessionId,
      device,
      browser,
      os,
      country,
      city,
      timeOnPage,
      isBounce,
      eventType,
      blogPost,
      metadata
    };

    const webTraffic = new WebTraffic(trafficData);
    await webTraffic.save();

    res.json({ success: true, message: 'Visit tracked successfully' });
  } catch (error) {
    console.error('Error tracking visit:', error);
    res.status(500).json({ message: 'Error tracking visit' });
  }
});

module.exports = router; 