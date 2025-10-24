const mongoose = require('mongoose');
const { Sequelize } = require('sequelize');
const { logger } = require('../utils/logger');

// Debug: Log environment variables
logger.info('Database Environment Variables:');
logger.info(`DB_TYPE: ${process.env.DB_TYPE || 'mongodb'}`);
logger.info(`DB_HOST: ${process.env.DB_HOST}`);
logger.info(`DB_PORT: ${process.env.DB_PORT}`);
logger.info(`DB_NAME: ${process.env.DB_NAME}`);
logger.info(`DB_USER: ${process.env.DB_USER}`);
logger.info(`DB_PASSWORD: ${process.env.DB_PASSWORD ? '[SET]' : '[NOT SET]'}`);

// Database type configuration
const DB_TYPE = process.env.DB_TYPE || 'mongodb';

// MongoDB configuration
const connectMongoDB = async (retries = 3, delay = 5000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      logger.info(`Using MongoDB database`);
      logger.info(`Connection attempt ${attempt} of ${retries}`);
      
      const mongoUri = process.env.MONGODB_URI || 
        `mongodb://${process.env.DB_USER ? `${process.env.DB_USER}:${process.env.DB_PASSWORD}@` : ''}${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 27017}/${process.env.DB_NAME || 'invictusdb'}`;
      
      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      
      logger.info('MongoDB connection established successfully.');
      
      // Test the connection
      await mongoose.connection.db.admin().ping();
      logger.info('MongoDB connection test successful.');
      
      return mongoose.connection;
    } catch (error) {
      logger.error(`MongoDB connection attempt ${attempt} failed:`, error.message);
      
      if (attempt === retries) {
        logger.error('All MongoDB connection attempts failed.');
        throw error;
      }
      
      logger.info(`Retrying in ${delay / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// MySQL configuration (for backward compatibility)
const sequelize = new Sequelize(
  process.env.DB_NAME || 'clickbitdb',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true
    }
  }
);

// MySQL connection function with retry logic
const connectMySQL = async (retries = 3, delay = 5000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      logger.info(`Using MySQL database`);
      logger.info(`Connection attempt ${attempt} of ${retries}`);
      
      await sequelize.authenticate();
      
      logger.info('MySQL connection established successfully.');
      
      // Test the connection with a simple query
      await sequelize.query('SELECT 1+1 AS result');
      logger.info('MySQL connection test successful.');
      
      return sequelize;
    } catch (error) {
      logger.error(`MySQL connection attempt ${attempt} failed:`, error.message);
      
      if (attempt === retries) {
        logger.error('All MySQL connection attempts failed.');
        throw error;
      }
      
      logger.info(`Retrying in ${delay / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// Main database connection function
const connectDatabase = async (retries = 3, delay = 5000) => {
  if (DB_TYPE === 'mongodb') {
    return await connectMongoDB(retries, delay);
  } else if (DB_TYPE === 'mysql') {
    return await connectMySQL(retries, delay);
  } else {
    throw new Error(`Unsupported database type: ${DB_TYPE}. Supported types: mongodb, mysql`);
  }
};

// Graceful shutdown function
const disconnectDatabase = async () => {
  try {
    if (DB_TYPE === 'mongodb') {
      await mongoose.connection.close();
      logger.info('MongoDB connection closed.');
    } else if (DB_TYPE === 'mysql') {
      await sequelize.close();
      logger.info('MySQL connection closed.');
    }
  } catch (error) {
    logger.error('Error closing database connection:', error.message);
  }
};

// Export database connection functions and instances
module.exports = {
  // Connection functions
  connectDatabase,
  disconnectDatabase,
  
  // Database instances
  mongoose: DB_TYPE === 'mongodb' ? mongoose : null,
  sequelize: DB_TYPE === 'mysql' ? sequelize : null,
  
  // Database type
  DB_TYPE
}; 