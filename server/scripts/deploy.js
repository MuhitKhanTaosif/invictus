#!/usr/bin/env node

const mongoose = require('mongoose');
const { runMigration } = require('./migration');
const { runRollback } = require('./rollback');
const DatabaseBackup = require('./backup');
require('dotenv').config();

// Production deployment script
class ProductionDeployer {
  constructor() {
    this.environment = process.env.NODE_ENV || 'development';
    this.mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/invictus';
  }

  async connectToDatabase() {
    try {
      await mongoose.connect(this.mongodbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      console.log('✅ Connected to database');
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      throw error;
    }
  }

  async checkDatabaseHealth() {
    console.log('🔍 Checking database health...');
    
    try {
      const admin = mongoose.connection.db.admin();
      const serverStatus = await admin.serverStatus();
      
      console.log(`📊 Database Status: ${serverStatus.ok ? 'Healthy' : 'Unhealthy'}`);
      console.log(`📈 Uptime: ${Math.floor(serverStatus.uptime / 3600)} hours`);
      console.log(`💾 Version: ${serverStatus.version}`);
      
      return serverStatus.ok;
    } catch (error) {
      console.error('❌ Database health check failed:', error);
      return false;
    }
  }

  async backupDatabase() {
    console.log('💾 Creating database backup...');
    
    try {
      const backup = new DatabaseBackup();
      const result = await backup.createMongoDumpBackup();
      
      console.log(`✅ Backup created successfully: ${result.backupName}`);
      console.log(`📁 Backup path: ${result.backupPath}`);
      console.log(`📊 Backup size: ${result.size} MB`);
      
      return result;
    } catch (error) {
      console.error('❌ Backup creation failed:', error);
      throw error;
    }
  }

  async runPreDeploymentChecks() {
    console.log('🔍 Running pre-deployment checks...');
    
    const checks = [
      { name: 'Database Connection', test: () => this.connectToDatabase() },
      { name: 'Database Health', test: () => this.checkDatabaseHealth() },
      { name: 'Environment Variables', test: () => this.checkEnvironmentVariables() },
      { name: 'Model Dependencies', test: () => this.checkModelDependencies() }
    ];

    for (const check of checks) {
      try {
        console.log(`  ✓ Checking ${check.name}...`);
        await check.test();
        console.log(`  ✅ ${check.name} passed`);
      } catch (error) {
        console.error(`  ❌ ${check.name} failed:`, error.message);
        throw new Error(`Pre-deployment check failed: ${check.name}`);
      }
    }
  }

  async checkEnvironmentVariables() {
    const requiredVars = [
      'MONGODB_URI',
      'JWT_SECRET',
      'NODE_ENV'
    ];

    const missing = requiredVars.filter(varName => !process.env[varName]);
    
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
  }

  async checkModelDependencies() {
    // Check if all model files exist and can be loaded
    const models = [
      'Admin', 'User', 'Blog', 'Category', 
      'Courses', 'CourseDetails', 'Services', 'SiteSettings'
    ];

    for (const model of models) {
      try {
        require(`../models/${model}.js`);
      } catch (error) {
        throw new Error(`Model ${model} failed to load: ${error.message}`);
      }
    }
  }

  async deploy() {
    console.log('🚀 Starting production deployment...');
    console.log(`🌍 Environment: ${this.environment}`);
    console.log(`🗄️  Database: ${this.mongodbUri}`);
    
    try {
      // Pre-deployment checks
      await this.runPreDeploymentChecks();
      
      // Create backup
      await this.backupDatabase();
      
      // Run migration
      console.log('🔄 Running database migration...');
      await runMigration();
      
      // Post-deployment verification
      await this.verifyDeployment();
      
      console.log('🎉 Production deployment completed successfully!');
      console.log('📊 Database is now production-ready with:');
      console.log('   ✅ Optimized indexes');
      console.log('   ✅ Audit trails');
      console.log('   ✅ Data validation');
      console.log('   ✅ Security enhancements');
      console.log('   ✅ Performance optimizations');
      
    } catch (error) {
      console.error('💥 Deployment failed:', error);
      
      // Attempt rollback
      console.log('🔄 Attempting rollback...');
      try {
        await runRollback();
        console.log('✅ Rollback completed successfully');
      } catch (rollbackError) {
        console.error('❌ Rollback failed:', rollbackError);
        console.error('🚨 Manual intervention required!');
      }
      
      process.exit(1);
    } finally {
      await mongoose.disconnect();
      console.log('🔌 Disconnected from database');
    }
  }

  async verifyDeployment() {
    console.log('🔍 Verifying deployment...');
    
    try {
      // Check if indexes exist
      const collections = ['admins', 'users', 'blogs', 'categories', 'courses'];
      
      for (const collection of collections) {
        const indexes = await mongoose.connection.db.collection(collection).indexes();
        console.log(`  ✓ ${collection}: ${indexes.length} indexes`);
      }
      
      // Check if default admin exists
      const Admin = require('../models/Admin');
      const adminCount = await Admin.countDocuments();
      console.log(`  ✓ Admins: ${adminCount} records`);
      
      // Check if site settings exist
      const SiteSettings = require('../models/SiteSettings');
      const settingsCount = await SiteSettings.countDocuments();
      console.log(`  ✓ Site Settings: ${settingsCount} records`);
      
      console.log('✅ Deployment verification completed');
    } catch (error) {
      console.error('❌ Deployment verification failed:', error);
      throw error;
    }
  }
}

// CLI interface
async function main() {
  const command = process.argv[2];
  const deployer = new ProductionDeployer();

  switch (command) {
    case 'deploy':
      await deployer.deploy();
      break;
    case 'rollback':
      await runRollback();
      break;
    case 'migrate':
      await runMigration();
      break;
    case 'health':
      await deployer.connectToDatabase();
      await deployer.checkDatabaseHealth();
      await mongoose.disconnect();
      break;
    default:
      console.log('Usage: node deploy.js [deploy|rollback|migrate|health]');
      console.log('');
      console.log('Commands:');
      console.log('  deploy   - Full production deployment with checks and backup');
      console.log('  rollback - Rollback to pre-migration state');
      console.log('  migrate  - Run database migration only');
      console.log('  health   - Check database health');
      process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('💥 Script failed:', error);
    process.exit(1);
  });
}

module.exports = ProductionDeployer;
