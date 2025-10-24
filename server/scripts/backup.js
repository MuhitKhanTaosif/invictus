const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
require('dotenv').config();

const execAsync = promisify(exec);

class DatabaseBackup {
  constructor() {
    this.mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/invictus';
    this.backupDir = process.env.BACKUP_DIR || path.join(__dirname, '../backups');
    this.maxBackups = parseInt(process.env.MAX_BACKUPS) || 10;
  }

  // Create backup directory if it doesn't exist
  async ensureBackupDir() {
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
      console.log(`📁 Created backup directory: ${this.backupDir}`);
    }
  }

  // Generate backup filename with timestamp
  generateBackupName() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    return `invictus-backup-${timestamp}`;
  }

  // Create MongoDB dump backup
  async createMongoDumpBackup() {
    console.log('💾 Creating MongoDB dump backup...');
    
    try {
      await this.ensureBackupDir();
      
      const backupName = this.generateBackupName();
      const backupPath = path.join(this.backupDir, backupName);
      
      // Extract database name from URI
      const dbName = this.extractDatabaseName();
      
      // Create mongodump command
      const dumpCommand = `mongodump --uri="${this.mongodbUri}" --out="${backupPath}"`;
      
      console.log(`📦 Creating backup: ${backupName}`);
      console.log(`🗄️  Database: ${dbName}`);
      console.log(`📁 Backup path: ${backupPath}`);
      
      // Execute mongodump
      const { stdout, stderr } = await execAsync(dumpCommand);
      
      if (stderr && !stderr.includes('done dumping')) {
        throw new Error(`MongoDB dump failed: ${stderr}`);
      }
      
      // Compress the backup
      const compressedPath = `${backupPath}.tar.gz`;
      const compressCommand = `tar -czf "${compressedPath}" -C "${this.backupDir}" "${backupName}"`;
      
      console.log('🗜️  Compressing backup...');
      await execAsync(compressCommand);
      
      // Remove uncompressed directory
      await execAsync(`rm -rf "${backupPath}"`);
      
      // Get backup size
      const stats = fs.statSync(compressedPath);
      const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
      
      console.log(`✅ Backup created successfully: ${compressedPath}`);
      console.log(`📊 Backup size: ${sizeInMB} MB`);
      
      // Clean up old backups
      await this.cleanupOldBackups();
      
      return {
        success: true,
        backupPath: compressedPath,
        backupName: backupName,
        size: sizeInMB,
        timestamp: new Date().toISOString()
      };
      
    } catch (error) {
      console.error('❌ MongoDB dump backup failed:', error);
      throw error;
    }
  }

  // Create JSON backup (alternative method)
  async createJsonBackup() {
    console.log('💾 Creating JSON backup...');
    
    try {
      await this.ensureBackupDir();
      
      const backupName = this.generateBackupName();
      const backupPath = path.join(this.backupDir, `${backupName}.json`);
      
      // Connect to database
      await mongoose.connect(this.mongodbUri);
      
      // Get all collections
      const collections = await mongoose.connection.db.listCollections().toArray();
      const backupData = {
        timestamp: new Date().toISOString(),
        database: this.extractDatabaseName(),
        collections: {}
      };
      
      // Export each collection
      for (const collection of collections) {
        const collectionName = collection.name;
        console.log(`📄 Exporting collection: ${collectionName}`);
        
        const documents = await mongoose.connection.db.collection(collectionName).find({}).toArray();
        backupData.collections[collectionName] = documents;
      }
      
      // Write backup to file
      fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2));
      
      // Get backup size
      const stats = fs.statSync(backupPath);
      const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
      
      console.log(`✅ JSON backup created: ${backupPath}`);
      console.log(`📊 Backup size: ${sizeInMB} MB`);
      
      await mongoose.disconnect();
      
      return {
        success: true,
        backupPath: backupPath,
        backupName: backupName,
        size: sizeInMB,
        timestamp: new Date().toISOString()
      };
      
    } catch (error) {
      console.error('❌ JSON backup failed:', error);
      throw error;
    }
  }

  // Extract database name from MongoDB URI
  extractDatabaseName() {
    const match = this.mongodbUri.match(/\/([^/?]+)(\?|$)/);
    return match ? match[1] : 'invictus';
  }

  // Clean up old backups (keep only maxBackups)
  async cleanupOldBackups() {
    try {
      const files = fs.readdirSync(this.backupDir)
        .filter(file => file.startsWith('invictus-backup-') && file.endsWith('.tar.gz'))
        .map(file => ({
          name: file,
          path: path.join(this.backupDir, file),
          stats: fs.statSync(path.join(this.backupDir, file))
        }))
        .sort((a, b) => b.stats.mtime - a.stats.mtime);
      
      if (files.length > this.maxBackups) {
        const filesToDelete = files.slice(this.maxBackups);
        console.log(`🧹 Cleaning up ${filesToDelete.length} old backups...`);
        
        for (const file of filesToDelete) {
          fs.unlinkSync(file.path);
          console.log(`🗑️  Deleted old backup: ${file.name}`);
        }
      }
    } catch (error) {
      console.warn('⚠️  Failed to cleanup old backups:', error.message);
    }
  }

  // List available backups
  async listBackups() {
    try {
      const files = fs.readdirSync(this.backupDir)
        .filter(file => file.startsWith('invictus-backup-') && file.endsWith('.tar.gz'))
        .map(file => {
          const filePath = path.join(this.backupDir, file);
          const stats = fs.statSync(filePath);
          return {
            name: file,
            path: filePath,
            size: (stats.size / (1024 * 1024)).toFixed(2),
            created: stats.birthtime,
            modified: stats.mtime
          };
        })
        .sort((a, b) => b.modified - a.modified);
      
      return files;
    } catch (error) {
      console.error('❌ Failed to list backups:', error);
      return [];
    }
  }

  // Restore from backup
  async restoreFromBackup(backupName) {
    console.log(`🔄 Restoring from backup: ${backupName}`);
    
    try {
      const backupPath = path.join(this.backupDir, backupName);
      
      if (!fs.existsSync(backupPath)) {
        throw new Error(`Backup file not found: ${backupPath}`);
      }
      
      // Extract if compressed
      if (backupName.endsWith('.tar.gz')) {
        const extractPath = path.join(this.backupDir, 'temp-restore');
        await execAsync(`mkdir -p "${extractPath}"`);
        await execAsync(`tar -xzf "${backupPath}" -C "${extractPath}"`);
        
        // Find the extracted database directory
        const extractedDirs = fs.readdirSync(extractPath);
        const dbDir = extractedDirs.find(dir => dir.startsWith('invictus'));
        
        if (!dbDir) {
          throw new Error('Could not find database directory in backup');
        }
        
        const restorePath = path.join(extractPath, dbDir);
        
        // Restore using mongorestore
        const restoreCommand = `mongorestore --uri="${this.mongodbUri}" --drop "${restorePath}"`;
        console.log('🔄 Restoring database...');
        
        const { stdout, stderr } = await execAsync(restoreCommand);
        
        if (stderr && !stderr.includes('done')) {
          throw new Error(`MongoDB restore failed: ${stderr}`);
        }
        
        // Clean up temporary files
        await execAsync(`rm -rf "${extractPath}"`);
        
      } else {
        // JSON restore
        const backupData = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
        
        await mongoose.connect(this.mongodbUri);
        
        // Clear existing collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        for (const collection of collections) {
          await mongoose.connection.db.collection(collection.name).drop();
        }
        
        // Restore collections
        for (const [collectionName, documents] of Object.entries(backupData.collections)) {
          if (documents.length > 0) {
            await mongoose.connection.db.collection(collectionName).insertMany(documents);
            console.log(`✅ Restored collection: ${collectionName} (${documents.length} documents)`);
          }
        }
        
        await mongoose.disconnect();
      }
      
      console.log('✅ Database restored successfully');
      return { success: true };
      
    } catch (error) {
      console.error('❌ Restore failed:', error);
      throw error;
    }
  }

  // Verify backup integrity
  async verifyBackup(backupName) {
    try {
      const backupPath = path.join(this.backupDir, backupName);
      
      if (!fs.existsSync(backupPath)) {
        return { valid: false, error: 'Backup file not found' };
      }
      
      const stats = fs.statSync(backupPath);
      
      if (stats.size === 0) {
        return { valid: false, error: 'Backup file is empty' };
      }
      
      return {
        valid: true,
        size: (stats.size / (1024 * 1024)).toFixed(2),
        created: stats.birthtime,
        modified: stats.mtime
      };
      
    } catch (error) {
      return { valid: false, error: error.message };
    }
  }
}

// CLI interface
async function main() {
  const command = process.argv[2];
  const backup = new DatabaseBackup();
  
  try {
    switch (command) {
      case 'create':
        const result = await backup.createMongoDumpBackup();
        console.log('🎉 Backup created successfully!');
        console.log(`📁 Path: ${result.backupPath}`);
        console.log(`📊 Size: ${result.size} MB`);
        break;
        
      case 'create-json':
        const jsonResult = await backup.createJsonBackup();
        console.log('🎉 JSON backup created successfully!');
        console.log(`📁 Path: ${jsonResult.backupPath}`);
        console.log(`📊 Size: ${jsonResult.size} MB`);
        break;
        
      case 'list':
        const backups = await backup.listBackups();
        console.log('📋 Available backups:');
        backups.forEach((backup, index) => {
          console.log(`  ${index + 1}. ${backup.name}`);
          console.log(`     Size: ${backup.size} MB`);
          console.log(`     Created: ${backup.created.toISOString()}`);
          console.log('');
        });
        break;
        
      case 'restore':
        const backupName = process.argv[3];
        if (!backupName) {
          console.error('❌ Please specify backup name');
          process.exit(1);
        }
        await backup.restoreFromBackup(backupName);
        break;
        
      case 'verify':
        const verifyName = process.argv[3];
        if (!verifyName) {
          console.error('❌ Please specify backup name');
          process.exit(1);
        }
        const verification = await backup.verifyBackup(verifyName);
        if (verification.valid) {
          console.log('✅ Backup is valid');
          console.log(`📊 Size: ${verification.size} MB`);
          console.log(`📅 Created: ${verification.created.toISOString()}`);
        } else {
          console.log('❌ Backup is invalid:', verification.error);
        }
        break;
        
      default:
        console.log('Usage: node backup.js [create|create-json|list|restore|verify] [backup-name]');
        console.log('');
        console.log('Commands:');
        console.log('  create      - Create MongoDB dump backup');
        console.log('  create-json  - Create JSON backup');
        console.log('  list         - List available backups');
        console.log('  restore      - Restore from backup');
        console.log('  verify       - Verify backup integrity');
        process.exit(1);
    }
  } catch (error) {
    console.error('💥 Backup operation failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = DatabaseBackup;
