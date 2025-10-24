#!/usr/bin/env node

/**
 * Invictus Consultants Backend Setup Script
 * This script helps set up the backend environment and configurations
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up Invictus Consultants Backend...\n');

// Create necessary directories
const directories = [
  'logs',
  'uploads',
  'uploads/images',
  'uploads/documents',
  'temp'
];

console.log('📁 Creating necessary directories...');
directories.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  } else {
    console.log(`📁 Directory already exists: ${dir}`);
  }
});

// Create .env file if it doesn't exist
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '.env.example');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Created .env file from .env.example');
    console.log('⚠️  Please update the .env file with your actual configuration values');
  } else {
    // Create a basic .env file
    const envContent = `# Server Configuration
NODE_ENV=development
PORT=5002

# Database Configuration
# MongoDB (for some models)
MONGODB_URI=mongodb://localhost:27017/invictus-consultants

# MySQL Database (for User model)
DB_HOST=localhost
DB_PORT=3306
DB_NAME=invictus_consultants
DB_USER=root
DB_PASSWORD=

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=24h

# Email Configuration (if needed)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# Logging Configuration
LOG_LEVEL=info
LOG_FILE=./logs/app.log

# Security Configuration
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100

# Frontend Build Path (for production)
CLIENT_BUILD_PATH=../client/build
`;
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Created basic .env file');
    console.log('⚠️  Please update the .env file with your actual configuration values');
  }
} else {
  console.log('📄 .env file already exists');
}

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('\n📦 Installing dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit', cwd: __dirname });
    console.log('✅ Dependencies installed successfully');
  } catch (error) {
    console.error('❌ Failed to install dependencies:', error.message);
    process.exit(1);
  }
} else {
  console.log('📦 Dependencies already installed');
}

// Create a basic README for the backend
const readmeContent = `# Invictus Consultants Backend

## Overview
This is the backend API for Invictus Consultants - a comprehensive training, consultancy, coaching, mentoring, and counselling platform.

## Features
- **Authentication & Authorization**: JWT-based auth with role-based permissions
- **Content Management**: Courses, blogs, categories, and services
- **User Management**: Customer, manager, and admin roles
- **Email Services**: Contact forms, quotes, and notifications
- **File Upload**: Image and document handling
- **Site Settings**: Configurable contact info and social media

## Tech Stack
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose) + MySQL (Sequelize)
- **Authentication**: JWT
- **File Upload**: Multer
- **Email**: Nodemailer
- **Logging**: Winston

## API Endpoints

### Public Endpoints
- \`GET /api/categories\` - Get all categories
- \`GET /api/courses\` - Get all courses
- \`GET /api/blogs\` - Get all blogs
- \`GET /api/services\` - Get all services
- \`GET /api/public/site-settings\` - Get site settings

### Authentication
- \`POST /api/auth/register\` - User registration
- \`POST /api/auth/login\` - User login
- \`GET /api/auth/verify\` - Verify token
- \`POST /api/auth/forgot-password\` - Password reset

### Admin Endpoints (Protected)
- \`GET /api/admin/dashboard\` - Dashboard stats
- \`GET /api/admin/categories\` - Manage categories
- \`GET /api/admin/courses\` - Manage courses
- \`GET /api/admin/blogs\` - Manage blogs
- \`GET /api/admin/site-settings\` - Manage site settings

### Email
- \`POST /api/email/contact\` - Contact form
- \`POST /api/email/quote\` - Free quote request

### File Upload
- \`POST /api/upload/single\` - Single file upload
- \`POST /api/upload/multiple\` - Multiple files upload
- \`POST /api/upload/image\` - Image upload

## Setup Instructions

1. **Install Dependencies**
   \`\`\`bash
   npm install
   \`\`\`

2. **Environment Configuration**
   - Copy \`.env.example\` to \`.env\`
   - Update database credentials
   - Set JWT secret
   - Configure email settings

3. **Database Setup**
   - Start MongoDB service
   - Start MySQL service
   - Run database migrations

4. **Seed Data (Optional)**
   \`\`\`bash
   npm run seed:admin
   npm run seed:settings
   npm run seed:courses
   \`\`\`

5. **Start Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Environment | development |
| PORT | Server port | 5002 |
| MONGODB_URI | MongoDB connection | mongodb://localhost:27017/invictus-consultants |
| DB_HOST | MySQL host | localhost |
| DB_PORT | MySQL port | 3306 |
| DB_NAME | MySQL database name | invictus_consultants |
| DB_USER | MySQL username | root |
| DB_PASSWORD | MySQL password | (empty) |
| JWT_SECRET | JWT secret key | (required) |
| EMAIL_HOST | SMTP host | smtp.gmail.com |
| EMAIL_USER | SMTP username | (required) |
| EMAIL_PASS | SMTP password | (required) |

## Database Models

### MongoDB Models (Mongoose)
- **Category**: Course categories
- **Courses**: Training courses
- **Blog**: Blog posts
- **Services**: Company services
- **SiteSettings**: Site configuration
- **Admin**: Admin users

### MySQL Models (Sequelize)
- **User**: Customer users with roles

## Security Features
- JWT authentication
- Role-based authorization
- Password hashing with bcrypt
- File upload validation
- CORS configuration
- Rate limiting
- Input validation

## Logging
- Winston logger with multiple transports
- Structured logging for different services
- Log rotation and file management

## Development
- Nodemon for auto-restart
- ESLint for code quality
- Jest for testing

## Production Deployment
- Environment-specific configurations
- Static file serving
- Error handling
- Security headers
- Compression
`;

fs.writeFileSync(path.join(__dirname, 'README.md'), readmeContent);
console.log('✅ Created README.md');

console.log('\n🎉 Setup completed successfully!');
console.log('\nNext steps:');
console.log('1. Update the .env file with your actual configuration');
console.log('2. Start your databases (MongoDB and MySQL)');
console.log('3. Run: npm run dev');
console.log('4. Visit: http://localhost:5002/health');
console.log('\nFor more information, check the README.md file.');
