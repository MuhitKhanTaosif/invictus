# Invictus Consultants Backend

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
- `GET /api/categories` - Get all categories
- `GET /api/courses` - Get all courses
- `GET /api/blogs` - Get all blogs
- `GET /api/services` - Get all services
- `GET /api/public/site-settings` - Get site settings

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify token
- `POST /api/auth/forgot-password` - Password reset

### Admin Endpoints (Protected)
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/categories` - Manage categories
- `GET /api/admin/courses` - Manage courses
- `GET /api/admin/blogs` - Manage blogs
- `GET /api/admin/site-settings` - Manage site settings

### Email
- `POST /api/email/contact` - Contact form
- `POST /api/email/quote` - Free quote request

### File Upload
- `POST /api/upload/single` - Single file upload
- `POST /api/upload/multiple` - Multiple files upload
- `POST /api/upload/image` - Image upload

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   - Copy `.env.example` to `.env`
   - Update database credentials
   - Set JWT secret
   - Configure email settings

3. **Database Setup**
   - Start MongoDB service
   - Start MySQL service
   - Run database migrations

4. **Seed Data (Optional)**
   ```bash
   npm run seed:admin
   npm run seed:settings
   npm run seed:courses
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

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
