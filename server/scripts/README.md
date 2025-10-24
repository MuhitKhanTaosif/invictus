# Database Migration System

This directory contains production-ready database migration scripts for the Invictus application.

## 📁 Files Overview

- `migration.js` - Main migration script with production enhancements
- `rollback.js` - Rollback script to revert changes
- `deploy.js` - Production deployment script with health checks
- `backup.js` - **NEW** Comprehensive backup and restore system
- `createAdmin.js` - Script to create default admin user

## 🚀 Quick Start

### 1. Run Full Production Deployment
```bash
cd /home/ubuntu/invictus-app/invictus/server
node scripts/deploy.js deploy
```

### 2. Run Migration Only
```bash
node scripts/migration.js
```

### 3. Rollback Changes
```bash
node scripts/deploy.js rollback
```

### 4. Check Database Health
```bash
node scripts/deploy.js health
```

### 5. Create Database Backup
```bash
node scripts/backup.js create
```

### 6. List Available Backups
```bash
node scripts/backup.js list
```

### 7. Restore from Backup
```bash
node scripts/backup.js restore invictus-backup-2025-10-24T03-30-02-638Z.tar.gz
```

## 💾 Backup System

### **NEW: Comprehensive Backup & Restore System**

The backup system provides multiple backup methods and automatic backup creation during migrations.

#### **Backup Methods**

##### **1. MongoDB Dump Backup (Recommended)**
```bash
# Create compressed MongoDB dump
node scripts/backup.js create
```

##### **2. JSON Backup (Alternative)**
```bash
# Create JSON export backup
node scripts/backup.js create-json
```

#### **Backup Management**

##### **List Available Backups**
```bash
node scripts/backup.js list
```

##### **Verify Backup Integrity**
```bash
node scripts/backup.js verify invictus-backup-2025-10-24T03-30-02-638Z.tar.gz
```

##### **Restore from Backup**
```bash
node scripts/backup.js restore invictus-backup-2025-10-24T03-30-02-638Z.tar.gz
```

#### **Automatic Backup Features**

- **Pre-Migration Backup**: Automatic backup before running migrations
- **Backup Compression**: Tar.gz compression to save space
- **Backup Cleanup**: Automatic cleanup of old backups (keeps last 10 by default)
- **Backup Verification**: Integrity checks for all backups
- **Multiple Formats**: MongoDB dump and JSON export options

#### **Backup Configuration**

Set these environment variables to customize backup behavior:

```bash
# Backup directory (default: ./backups)
BACKUP_DIR=/path/to/backups

# Maximum number of backups to keep (default: 10)
MAX_BACKUPS=20

# MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/invictus
```

#### **Backup Safety Features**

- **Automatic Backup**: Created before every migration
- **Backup Verification**: Integrity checks before and after creation
- **Rollback Support**: Easy restoration if migration fails
- **Space Management**: Automatic cleanup of old backups
- **Error Handling**: Graceful failure with backup preservation

## 🔧 Production Enhancements

### Database Indexes
- **Performance Indexes**: Optimized for common queries
- **Text Search Indexes**: Full-text search capabilities
- **Unique Constraints**: Data integrity enforcement
- **Compound Indexes**: Multi-field query optimization

### Security Features
- **Password Hashing**: bcrypt with salt rounds of 12
- **Account Locking**: Failed login attempt protection
- **Audit Trails**: Track all changes with timestamps
- **Soft Deletes**: Preserve data while marking as deleted
- **Input Validation**: Comprehensive data validation

### Data Integrity
- **Foreign Key Relationships**: Proper model relationships
- **Data Validation**: Schema-level validation rules
- **Constraint Enforcement**: Unique and required field validation
- **Data Migration**: Safe migration of existing data

## 📊 Model Enhancements

### Admin Model
- ✅ Enhanced password security
- ✅ Account locking mechanism
- ✅ Role-based permissions
- ✅ Audit trail fields
- ✅ Soft delete functionality

### Blog Model
- ✅ SEO optimization fields
- ✅ Content management features
- ✅ Analytics tracking (views, likes, shares)
- ✅ Author relationships
- ✅ Category relationships

### Category Model
- ✅ Hierarchical categories
- ✅ Course count tracking
- ✅ SEO optimization
- ✅ Order management

### User Model
- ✅ Enhanced security features
- ✅ Email verification
- ✅ Password reset functionality
- ✅ Account status management
- ✅ Login attempt tracking

## 🔍 Indexes Created

### Admin Indexes
```javascript
{ email: 1 } // Unique
{ username: 1 } // Unique
{ isActive: 1 }
{ role: 1 }
{ isDeleted: 1 }
{ createdAt: -1 }
```

### Blog Indexes
```javascript
{ slug: 1 } // Unique
{ status: 1 }
{ isPublished: 1 }
{ publishedAt: -1 }
{ views: -1 }
{ author: 1 }
{ category: 1 }
{ tags: 1 }
{ title: 'text', content: 'text', tags: 'text', excerpt: 'text' }
```

### Category Indexes
```javascript
{ slug: 1 } // Unique
{ isActive: 1 }
{ order: 1 }
{ parentCategory: 1 }
{ name: 'text', description: 'text' }
```

## 🛡️ Security Features

### Password Security
- Minimum 8 characters
- bcrypt hashing with salt rounds of 12
- Password strength validation

### Account Security
- Login attempt tracking
- Account locking after 5 failed attempts
- 30-minute lockout period
- Last login tracking

### Data Protection
- Soft delete functionality
- Audit trail for all changes
- Input sanitization
- SQL injection prevention

## 📈 Performance Optimizations

### Database Indexes
- Optimized for common query patterns
- Text search capabilities
- Compound indexes for complex queries
- Unique constraints for data integrity

### Query Optimization
- Efficient pagination
- Optimized sorting
- Reduced database calls
- Cached frequently accessed data

## 🔄 Migration Process

### Pre-Migration
1. Database health check
2. Backup creation
3. Environment validation
4. Model dependency check

### Migration Steps
1. Create production indexes
2. Add audit fields
3. Migrate existing data
4. Create default admin
5. Create default settings
6. Validate data integrity

### Post-Migration
1. Verify deployment
2. Test functionality
3. Performance validation
4. Security audit

## 🚨 Rollback Process

### Safe Rollback
1. Remove production indexes
2. Remove audit fields
3. Restore original data format
4. Remove default data

### Rollback Safety
- Preserves existing data
- Reversible operations
- No data loss
- Safe to run multiple times

## 📋 Environment Requirements

### Required Environment Variables
```bash
MONGODB_URI=mongodb://localhost:27017/invictus
JWT_SECRET=your-secret-key
NODE_ENV=production
```

### Database Requirements
- MongoDB 4.4+
- Sufficient disk space for indexes
- Network connectivity
- Backup storage

## 🔧 Troubleshooting

### Common Issues

#### Index Creation Fails
```bash
# Check database permissions
# Verify MongoDB version
# Check disk space
```

#### Migration Fails
```bash
# Check environment variables
# Verify database connection
# Check model dependencies
```

#### Rollback Fails
```bash
# Manual cleanup may be required
# Check database state
# Verify backup availability
```

### Debug Mode
```bash
# Enable debug logging
DEBUG=migration:* node scripts/migration.js
```

## 📊 Monitoring

### Health Checks
- Database connectivity
- Index status
- Data integrity
- Performance metrics

### Logging
- Migration progress
- Error tracking
- Performance monitoring
- Security events

## 🔐 Security Considerations

### Production Security
- Strong password requirements
- Account lockout policies
- Audit trail maintenance
- Regular security updates

### Data Protection
- Encrypted connections
- Secure backups
- Access control
- Data retention policies

## 📚 Additional Resources

### Documentation
- [MongoDB Indexing](https://docs.mongodb.com/manual/indexes/)
- [Mongoose Validation](https://mongoosejs.com/docs/validation.html)
- [bcrypt Security](https://github.com/kelektiv/node.bcrypt.js)

### Best Practices
- Regular backups
- Performance monitoring
- Security audits
- Data validation

## 🆘 Support

For issues or questions:
1. Check the logs for error messages
2. Verify environment variables
3. Test database connectivity
4. Review migration status

---

**⚠️ Important**: Always backup your database before running migrations in production!
