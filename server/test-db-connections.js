#!/usr/bin/env node

/**
 * Database Connection Test Script
 * Tests both MongoDB and MySQL connections
 */

require('dotenv').config();
const mongoose = require('mongoose');
const { Sequelize } = require('sequelize');

console.log('🔍 Testing Database Connections...\n');

// Test MongoDB Connection
async function testMongoDB() {
  console.log('📊 Testing MongoDB Connection...');
  console.log(`MongoDB URI: ${process.env.MONGODB_URI}`);
  
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/invictus-consultants', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ MongoDB connection successful!');
    
    // Test a simple operation
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`📋 Found ${collections.length} collections in database`);
    
    await mongoose.disconnect();
    console.log('✅ MongoDB disconnected successfully\n');
    return true;
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('💡 Make sure MongoDB is running on your system\n');
    return false;
  }
}

// Test MySQL Connection
async function testMySQL() {
  console.log('🗄️  Testing MySQL Connection...');
  console.log(`Host: ${process.env.DB_HOST}`);
  console.log(`Port: ${process.env.DB_PORT}`);
  console.log(`Database: ${process.env.DB_NAME}`);
  console.log(`User: ${process.env.DB_USER}`);
  
  const sequelize = new Sequelize(
    process.env.DB_NAME || 'invictus_consultants',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      dialect: 'mysql',
      logging: false,
      define: {
        timestamps: true,
        underscored: true,
        freezeTableName: true
      }
    }
  );
  
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connection successful!');
    
    // Test a simple query
    const [results] = await sequelize.query('SELECT 1+1 AS result');
    console.log(`🧮 Test query result: ${results[0].result}`);
    
    // Check if database exists and show tables
    const [tables] = await sequelize.query('SHOW TABLES');
    console.log(`📋 Found ${tables.length} tables in database`);
    
    await sequelize.close();
    console.log('✅ MySQL disconnected successfully\n');
    return true;
    
  } catch (error) {
    console.error('❌ MySQL connection failed:', error.message);
    console.log('💡 Make sure MySQL is running and the database exists\n');
    return false;
  }
}

// Test both connections
async function testAllConnections() {
  console.log('🚀 Starting database connection tests...\n');
  
  const mongoResult = await testMongoDB();
  const mysqlResult = await testMySQL();
  
  console.log('📊 Connection Test Results:');
  console.log(`MongoDB: ${mongoResult ? '✅ Connected' : '❌ Failed'}`);
  console.log(`MySQL: ${mysqlResult ? '✅ Connected' : '❌ Failed'}`);
  
  if (mongoResult && mysqlResult) {
    console.log('\n🎉 All database connections are working!');
    console.log('✅ Your backend is ready to run');
  } else {
    console.log('\n⚠️  Some database connections failed');
    console.log('🔧 Please check the following:');
    
    if (!mongoResult) {
      console.log('   - Start MongoDB service: sudo systemctl start mongod');
      console.log('   - Or install MongoDB if not installed');
    }
    
    if (!mysqlResult) {
      console.log('   - Start MySQL service: sudo systemctl start mysql');
      console.log('   - Create database: CREATE DATABASE invictus_consultants;');
      console.log('   - Check MySQL credentials in .env file');
    }
  }
  
  process.exit(mongoResult && mysqlResult ? 0 : 1);
}

// Run the tests
testAllConnections().catch(error => {
  console.error('💥 Test script failed:', error);
  process.exit(1);
});


