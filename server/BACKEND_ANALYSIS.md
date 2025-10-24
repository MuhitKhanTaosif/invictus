# Invictus Consultants Backend Analysis

## Overview
The backend is built on Express.js framework and serves as the API for the Invictus Consultants platform. It handles training, consultancy, coaching, mentoring, and counselling services.

## Architecture Analysis

### 1. Framework & Core Dependencies
- **Express.js**: Main web framework
- **MongoDB (Mongoose)**: Primary database for content management
- **MySQL (Sequelize)**: Secondary database for user management
- **JWT**: Authentication and authorization
- **Winston**: Logging system
- **Multer**: File upload handling
- **Nodemailer**: Email services

### 2. Database Structure

#### MongoDB Collections (Mongoose Models)
- **Categories**: Course categories with metadata
- **Courses**: Training courses with detailed information
- **Blogs**: Blog posts with content management
- **Services**: Company services offered
- **SiteSettings**: Site configuration and contact info
- **Admin**: Admin user management

#### MySQL Tables (Sequelize Models)
- **Users**: Customer users with role-based access
  - Roles: admin, manager, customer
  - Features: authentication, profile management, preferences

### 3. API Endpoints Structure

#### Public Endpoints
```
GET  /api/categories          - Get all categories
GET  /api/courses            - Get all courses
GET  /api/blogs             - Get all blogs
GET  /api/services          - Get all services
GET  /api/public/site-settings - Get site settings
```

#### Authentication Endpoints
```
POST /api/auth/register      - User registration
POST /api/auth/login         - User login
GET  /api/auth/verify        - Verify token
POST /api/auth/forgot-password - Password reset
```

#### Admin Endpoints (Protected)
```
GET  /api/admin/dashboard   - Dashboard statistics
GET  /api/admin/categories  - Manage categories
GET  /api/admin/courses     - Manage courses
GET  /api/admin/blogs       - Manage blogs
GET  /api/admin/site-settings - Manage site settings
```

#### Email Endpoints
```
POST /api/email/contact      - Contact form submission
POST /api/email/quote        - Free quote request
```

#### File Upload Endpoints
```
POST /api/upload/single     - Single file upload
POST /api/upload/multiple   - Multiple files upload
POST /api/upload/image       - Image upload
DELETE /api/upload/:filename - Delete file
```

### 4. Security Features
- **JWT Authentication**: Token-based authentication
- **Role-based Authorization**: Admin, manager, customer roles
- **Password Hashing**: bcrypt with 12 rounds
- **Input Validation**: express-validator for request validation
- **File Upload Security**: Type and size validation
- **CORS Configuration**: Configurable origins
- **Helmet**: Security headers
- **Rate Limiting**: Request throttling

### 5. Key Features Implemented

#### Content Management
- Course management with categories
- Blog system with publishing workflow
- Service catalog management
- Site settings configuration

#### User Management
- Multi-role user system
- Authentication and authorization
- Profile management
- Email verification system

#### Email Services
- Contact form handling
- Quote request processing
- Email verification
- Password reset functionality

#### File Management
- Image and document uploads
- File type validation
- Size limits and security
- Organized storage structure

### 6. Configuration Management

#### Environment Variables Required
```env
# Server
NODE_ENV=development
PORT=5002

# Databases
MONGODB_URI=mongodb://localhost:27017/invictus-consultants
DB_HOST=localhost
DB_PORT=3306
DB_NAME=invictus_consultants
DB_USER=root
DB_PASSWORD=

# Security
JWT_SECRET=your-secret-key
BCRYPT_ROUNDS=12

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 7. Logging System
- **Winston Logger**: Structured logging
- **Multiple Transports**: Console, file, error logs
- **Service-specific Logging**: API, auth, email, database, security
- **Log Rotation**: File size and count limits
- **Performance Logging**: Request duration tracking

### 8. Error Handling
- **Global Error Middleware**: Centralized error handling
- **Validation Errors**: Detailed validation messages
- **Database Errors**: Connection and query error handling
- **File Upload Errors**: Upload failure handling
- **Email Errors**: SMTP error handling

### 9. Production Considerations

#### Security
- Environment-specific configurations
- Secure JWT secrets
- Database connection security
- File upload restrictions
- CORS policy configuration

#### Performance
- Compression middleware
- Static file serving
- Database indexing
- Query optimization
- Caching strategies

#### Monitoring
- Health check endpoint
- Logging and monitoring
- Error tracking
- Performance metrics

### 10. Setup Requirements

#### Prerequisites
- Node.js (>=16.0.0)
- MongoDB (>=4.0)
- MySQL (>=5.7)
- npm (>=8.0.0)

#### Installation Steps
1. Install dependencies: `npm install`
2. Configure environment variables
3. Start databases (MongoDB and MySQL)
4. Run setup script: `node setup.js`
5. Seed initial data (optional)
6. Start development server: `npm run dev`

### 11. API Documentation
The backend provides comprehensive API endpoints for:
- Content management (courses, blogs, services)
- User authentication and management
- Email services (contact, quotes)
- File uploads and management
- Site configuration
- Admin dashboard functionality

### 12. Integration Points
- **Frontend**: Serves static files in production
- **Email Service**: SMTP integration for notifications
- **File Storage**: Local file system with organized structure
- **Database**: Dual database setup for different data types
- **Authentication**: JWT-based stateless authentication

## Recommendations

### 1. Immediate Setup
- Configure environment variables
- Set up databases
- Run the setup script
- Test all endpoints

### 2. Development
- Use the provided seed scripts for initial data
- Implement proper error handling
- Add comprehensive testing
- Set up monitoring

### 3. Production
- Use environment-specific configurations
- Implement proper security measures
- Set up database backups
- Configure monitoring and alerting
- Use a reverse proxy (nginx)
- Implement SSL/TLS

### 4. Security Enhancements
- Implement rate limiting
- Add request validation
- Use HTTPS in production
- Implement proper CORS policies
- Add input sanitization

This backend provides a solid foundation for the Invictus Consultants platform with comprehensive features for content management, user authentication, and business operations.


