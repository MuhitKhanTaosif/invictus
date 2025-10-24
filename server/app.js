const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

// Import our database configuration
const { connectDatabase, disconnectDatabase, DB_TYPE } = require('./config/database');
const { logger } = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(helmet({
  crossOriginOpenerPolicy: false, // Disable COOP for local testing
  crossOriginResourcePolicy: false, // Disable CORP for local testing
  contentSecurityPolicy: false // Disable CSP that might cause HTTPS issues
}));
app.use(compression());
app.use(morgan('combined'));

// CORS configuration for production
const corsOrigins = process.env.NODE_ENV === 'production' 
  ? (req, callback) => {
      // Allow any origin in production for now - restrict this in actual deployment
      callback(null, true);
    }
  : ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5173', 'http://127.0.0.1:5173'];

app.use(cors({
  origin: corsOrigins,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection using our new configuration
let dbConnection;
const initializeDatabase = async () => {
  try {
    logger.info(`🔌 Connecting to ${DB_TYPE} database...`);
    dbConnection = await connectDatabase();
    logger.info(`✅ ${DB_TYPE.toUpperCase()} database connected successfully`);
  } catch (error) {
    logger.error(`❌ Database connection failed:`, error.message);
    logger.error('Stack trace:', error.stack);
    process.exit(1);
  }
};

// Health check endpoint
app.get('/health', (req, res) => {
  const healthCheck = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: DB_TYPE,
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0'
  };
  
  logger.info('Health check requested', { ip: req.ip, userAgent: req.get('User-Agent') });
  res.status(200).json(healthCheck);
});

// Routes
// app.use('/api/categories', require('./Routes/categories')); // Commented out - file doesn't exist
app.use('/api/courses', require('./Routes/courses'));
app.use('/api/course-details', require('./Routes/courseDetails'));
app.use('/api/blogs', require('./Routes/blogs'));
app.use('/api/services', require('./Routes/services'));
app.use('/api/admin', require('./Routes/admin'));
app.use('/api/auth', require('./Routes/auth').router);
app.use('/api/upload', require('./Routes/upload'));
app.use('/api/public', require('./Routes/Public'));
app.use('/api', require('./Routes/siteSettings'));
app.use('/api/email', require('./Routes/email'));

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

// 404 handler for undefined routes
app.use('*', (req, res) => {
  logger.warn(`404 - Route not found: ${req.method} ${req.originalUrl}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  res.status(404).json({ 
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', {
    error: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  
  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: isDevelopment ? err.message : 'Something went wrong!',
    timestamp: new Date().toISOString(),
    ...(isDevelopment && { stack: err.stack })
  });
});

// Start server
const startServer = async () => {
  try {
    // Initialize database connection
    await initializeDatabase();
    
    // Start the server
    const server = app.listen(PORT, '0.0.0.0', () => {
      logger.info(`🚀 Server running on port ${PORT} and accessible from external IPs`);
      logger.info(`📊 Database: ${DB_TYPE.toUpperCase()}`);
      logger.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`🔗 Health check: http://localhost:${PORT}/health`);
    });

    // Store server globally for graceful shutdown
    global.server = server;

    // Handle server errors
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        logger.error(`❌ Port ${PORT} is already in use`);
        process.exit(1);
      } else {
        logger.error('❌ Server error:', error);
        process.exit(1);
      }
    });

    return server;
  } catch (error) {
    logger.error('❌ Failed to start server:', error.message);
    logger.error('Stack trace:', error.stack);
    process.exit(1);
  }
};

// Graceful shutdown
const gracefulShutdown = async (signal) => {
  logger.info(`🛑 ${signal} received, shutting down gracefully...`);
  
  try {
    // Close database connection
    await disconnectDatabase();
    logger.info('✅ Database connection closed');
    
    // Close server if it exists
    if (global.server) {
      global.server.close(() => {
        logger.info('✅ Server closed');
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  } catch (error) {
    logger.error('❌ Error during graceful shutdown:', error.message);
    process.exit(1);
  }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('💥 Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Start the application
startServer(); 