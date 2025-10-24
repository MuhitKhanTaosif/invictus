const mongoose = require('mongoose');

const webTrafficSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  },
  referrer: {
    type: String,
    default: null
  },
  page: {
    type: String,
    required: true
  },
  pageTitle: {
    type: String,
    required: true
  },
  sessionId: {
    type: String,
    required: true
  },
  device: {
    type: String,
    enum: ['desktop', 'mobile', 'tablet', 'unknown'],
    default: 'unknown'
  },
  browser: {
    type: String,
    default: 'unknown'
  },
  os: {
    type: String,
    default: 'unknown'
  },
  country: {
    type: String,
    default: 'unknown'
  },
  city: {
    type: String,
    default: 'unknown'
  },
  timeOnPage: {
    type: Number,
    default: 0,
    min: 0
  },
  isBounce: {
    type: Boolean,
    default: true
  },
  eventType: {
    type: String,
    enum: ['pageview', 'click', 'scroll', 'download', 'form_submit', 'custom'],
    default: 'pageview'
  },
  blogPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    default: null
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true,
  collection: 'webtraffic'
});

// Static methods for analytics
webTrafficSchema.statics.getPageViews = function(startDate, endDate) {
  return this.countDocuments({
    eventType: 'pageview',
    createdAt: { $gte: startDate, $lte: endDate }
  });
};

webTrafficSchema.statics.getBlogViews = function(startDate, endDate) {
  return this.countDocuments({
    eventType: 'pageview',
    blogPost: { $exists: true, $ne: null },
    createdAt: { $gte: startDate, $lte: endDate }
  });
};

webTrafficSchema.statics.getUniqueVisitors = function(startDate, endDate) {
  return this.distinct('sessionId', {
    createdAt: { $gte: startDate, $lte: endDate }
  }).then(uniqueSessions => uniqueSessions.length);
};

webTrafficSchema.statics.getTopPages = function(startDate, endDate, limit = 10) {
  return this.aggregate([
    {
      $match: {
        eventType: 'pageview',
        createdAt: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: '$page',
        pageTitle: { $first: '$pageTitle' },
        views: { $sum: 1 },
        uniqueVisitors: { $addToSet: '$sessionId' }
      }
    },
    {
      $project: {
        _id: 1,
        pageTitle: 1,
        views: 1,
        uniqueVisitors: { $size: '$uniqueVisitors' }
      }
    },
    { $sort: { views: -1 } },
    { $limit: limit }
  ]);
};

webTrafficSchema.statics.getTopBlogPosts = function(startDate, endDate, limit = 10) {
  return this.aggregate([
    {
      $match: {
        eventType: 'pageview',
        blogPost: { $exists: true, $ne: null },
        createdAt: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $lookup: {
        from: 'blogs',
        localField: 'blogPost',
        foreignField: '_id',
        as: 'blog'
      }
    },
    {
      $unwind: '$blog'
    },
    {
      $group: {
        _id: '$blogPost',
        title: { $first: '$blog.title' },
        slug: { $first: '$blog.slug' },
        views: { $sum: 1 },
        uniqueVisitors: { $addToSet: '$sessionId' }
      }
    },
    {
      $project: {
        _id: 1,
        title: 1,
        slug: 1,
        views: 1,
        uniqueVisitors: { $size: '$uniqueVisitors' }
      }
    },
    { $sort: { views: -1 } },
    { $limit: limit }
  ]);
};

webTrafficSchema.statics.getDeviceStats = function(startDate, endDate) {
  return this.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: '$device',
        count: { $sum: 1 },
        uniqueVisitors: { $addToSet: '$sessionId' }
      }
    },
    {
      $project: {
        device: '$_id',
        count: 1,
        uniqueVisitors: { $size: '$uniqueVisitors' }
      }
    },
    { $sort: { count: -1 } }
  ]);
};

webTrafficSchema.statics.getCountryStats = function(startDate, endDate) {
  return this.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: '$country',
        count: { $sum: 1 },
        uniqueVisitors: { $addToSet: '$sessionId' }
      }
    },
    {
      $project: {
        country: '$_id',
        count: 1,
        uniqueVisitors: { $size: '$uniqueVisitors' }
      }
    },
    { $sort: { count: -1 } },
    { $limit: 20 }
  ]);
};

webTrafficSchema.statics.getDailyStats = function(startDate, endDate) {
  return this.aggregate([
    {
      $match: {
        eventType: 'pageview',
        createdAt: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
          day: { $dayOfMonth: '$createdAt' }
        },
        views: { $sum: 1 },
        uniqueVisitors: { $addToSet: '$sessionId' }
      }
    },
    {
      $project: {
        date: {
          $dateFromParts: {
            year: '$_id.year',
            month: '$_id.month',
            day: '$_id.day'
          }
        },
        views: 1,
        uniqueVisitors: { $size: '$uniqueVisitors' }
      }
    },
    { $sort: { date: 1 } }
  ]);
};

// Indexes for better performance
webTrafficSchema.index({ createdAt: 1 });
webTrafficSchema.index({ eventType: 1 });
webTrafficSchema.index({ sessionId: 1 });
webTrafficSchema.index({ page: 1 });
webTrafficSchema.index({ blogPost: 1 });
webTrafficSchema.index({ device: 1 });
webTrafficSchema.index({ country: 1 });

module.exports = mongoose.model('WebTraffic', webTrafficSchema);