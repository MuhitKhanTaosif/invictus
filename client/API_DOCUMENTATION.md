# Invictus Consultants - API Documentation

## Overview
This document outlines all the required APIs for the Invictus Consultants website. The APIs are designed to support a comprehensive training, consultancy, coaching, mentoring, and counselling platform.

## Base Configuration
- **Base URL**: `https://api.invictusconsultants.com.au`
- **Authentication**: JWT Bearer Token
- **Content-Type**: `application/json`
- **Rate Limiting**: 1000 requests per hour per IP

## Authentication APIs

### 1. User Registration
```http
POST /api/auth/register
```
**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string", 
  "email": "string",
  "password": "string",
  "phone": "string",
  "organization": "string",
  "role": "user|admin"
}
```
**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "role": "user"
  }
}
```

### 2. User Login
```http
POST /api/auth/login
```
**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```
**Response:**
```json
{
  "success": true,
  "token": "jwt_token",
  "user": {
    "id": "uuid",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "role": "user|admin"
  }
}
```

### 3. Password Reset
```http
POST /api/auth/forgot-password
```
**Request Body:**
```json
{
  "email": "string"
}
```

### 4. Verify Token
```http
GET /api/auth/verify
```
**Headers:** `Authorization: Bearer <token>`

## Services APIs

### 5. Get All Services
```http
GET /api/services
```
**Response:**
```json
{
  "success": true,
  "services": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "icon": "string",
      "features": ["string"],
      "approach": ["string"],
      "path": "string"
    }
  ]
}
```

### 6. Get Service by ID
```http
GET /api/services/:id
```

## Courses APIs

### 7. Get All Courses
```http
GET /api/courses
```
**Query Parameters:**
- `category`: Filter by category (first-aid, professional-development, mental-health, wellbeing)
- `delivery`: Filter by delivery method (face-to-face, online, blended)
- `search`: Search in title and description

**Response:**
```json
{
  "success": true,
  "courses": [
    {
      "id": "string",
      "code": "string",
      "title": "string",
      "description": "string",
      "duration": "string",
      "delivery": "string",
      "validity": "string",
      "category": "string",
      "prerequisites": "string",
      "cost": "string",
      "path": "string"
    }
  ]
}
```

### 8. Get Course by ID
```http
GET /api/courses/:id
```

### 9. Create Course (Admin)
```http
POST /api/courses
```
**Request Body:**
```json
{
  "code": "string",
  "title": "string",
  "description": "string",
  "duration": "string",
  "delivery": "string",
  "validity": "string",
  "category": "string",
  "prerequisites": "string",
  "cost": "string"
}
```

### 10. Update Course (Admin)
```http
PUT /api/courses/:id
```

### 11. Delete Course (Admin)
```http
DELETE /api/courses/:id
```

## Blog APIs

### 12. Get All Blogs
```http
GET /api/blogs
```
**Query Parameters:**
- `category`: Filter by category
- `featured`: Filter featured blogs (true/false)
- `search`: Search in title and content
- `page`: Page number for pagination
- `limit`: Number of blogs per page

**Response:**
```json
{
  "success": true,
  "blogs": [
    {
      "id": "string",
      "title": "string",
      "excerpt": "string",
      "content": "string",
      "author": "string",
      "date": "ISO date",
      "category": "string",
      "tags": ["string"],
      "readTime": "string",
      "image": "string",
      "featured": "boolean"
    }
  ],
  "pagination": {
    "currentPage": "number",
    "totalPages": "number",
    "totalBlogs": "number"
  }
}
```

### 13. Get Blog by ID
```http
GET /api/blogs/:id
```

### 14. Create Blog (Admin)
```http
POST /api/blogs
```
**Request Body:**
```json
{
  "title": "string",
  "excerpt": "string",
  "content": "string",
  "author": "string",
  "category": "string",
  "tags": ["string"],
  "image": "string",
  "featured": "boolean"
}
```

### 15. Update Blog (Admin)
```http
PUT /api/blogs/:id
```

### 16. Delete Blog (Admin)
```http
DELETE /api/blogs/:id
```

## Testimonials APIs

### 17. Get All Testimonials
```http
GET /api/testimonials
```

### 18. Create Testimonial
```http
POST /api/testimonials
```
**Request Body:**
```json
{
  "name": "string",
  "role": "string",
  "company": "string",
  "content": "string",
  "rating": "number (1-5)",
  "image": "string"
}
```

## Contact & Consultation APIs

### 19. Submit Contact Form
```http
POST /api/contact
```
**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "subject": "string",
  "message": "string",
  "service": "string"
}
```

### 20. Book Consultation
```http
POST /api/consultations
```
**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "organization": "string",
  "service": "string",
  "preferredDate": "ISO date",
  "preferredTime": "string",
  "message": "string"
}
```

### 21. Get Consultations (Admin)
```http
GET /api/consultations
```

### 22. Update Consultation Status (Admin)
```http
PUT /api/consultations/:id
```
**Request Body:**
```json
{
  "status": "pending|confirmed|completed|cancelled",
  "notes": "string"
}
```

## Newsletter APIs

### 23. Subscribe to Newsletter
```http
POST /api/newsletter/subscribe
```
**Request Body:**
```json
{
  "email": "string",
  "firstName": "string (optional)"
}
```

### 24. Unsubscribe from Newsletter
```http
POST /api/newsletter/unsubscribe
```
**Request Body:**
```json
{
  "email": "string"
}
```

## Course Enrollment APIs

### 25. Enroll in Course
```http
POST /api/enrollments
```
**Request Body:**
```json
{
  "courseId": "string",
  "participantInfo": {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "organization": "string"
  },
  "preferredDate": "ISO date",
  "preferredLocation": "string"
}
```

### 26. Get User Enrollments
```http
GET /api/enrollments
```

### 27. Get Enrollment by ID
```http
GET /api/enrollments/:id
```

### 28. Update Enrollment Status (Admin)
```http
PUT /api/enrollments/:id
```
**Request Body:**
```json
{
  "status": "pending|confirmed|completed|cancelled",
  "certificateIssued": "boolean",
  "notes": "string"
}
```

## Statistics APIs

### 29. Get Statistics
```http
GET /api/statistics
```
**Response:**
```json
{
  "success": true,
  "statistics": {
    "totalClients": "number",
    "totalCourses": "number",
    "totalBlogs": "number",
    "yearsExperience": "number",
    "successRate": "number"
  }
}
```

## File Upload APIs

### 30. Upload Image
```http
POST /api/upload/image
```
**Content-Type:** `multipart/form-data`
**Request Body:** Form data with `image` field

### 31. Upload Document
```http
POST /api/upload/document
```
**Content-Type:** `multipart/form-data`
**Request Body:** Form data with `document` field

## Admin Dashboard APIs

### 32. Get Dashboard Overview
```http
GET /api/admin/dashboard
```
**Response:**
```json
{
  "success": true,
  "overview": {
    "totalUsers": "number",
    "totalCourses": "number",
    "totalBlogs": "number",
    "pendingConsultations": "number",
    "recentEnrollments": "number"
  }
}
```

### 33. Get User Management
```http
GET /api/admin/users
```

### 34. Update User Role (Admin)
```http
PUT /api/admin/users/:id/role
```
**Request Body:**
```json
{
  "role": "user|admin"
}
```

## Error Responses

All APIs return consistent error responses:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": "Additional error details (optional)"
  }
}
```

## Common Error Codes

- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `422` - Validation Error
- `500` - Internal Server Error

## Rate Limiting

- **General APIs**: 1000 requests per hour
- **Authentication APIs**: 10 requests per minute
- **File Upload APIs**: 50 requests per hour
- **Admin APIs**: 500 requests per hour

## Security Headers

All responses include security headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=31536000`

## Webhook Endpoints

### 35. Payment Webhook
```http
POST /api/webhooks/payment
```
**Description:** Handles payment notifications from payment processors

### 36. Email Webhook
```http
POST /api/webhooks/email
```
**Description:** Handles email delivery notifications

## Development Notes

1. **Environment Variables Required:**
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `EMAIL_SERVICE_API_KEY`
   - `PAYMENT_PROCESSOR_KEY`
   - `FILE_STORAGE_URL`

2. **Database Schema:**
   - Users table with authentication
   - Courses table with categories
   - Blogs table with content management
   - Enrollments table with status tracking
   - Consultations table with scheduling

3. **Third-party Integrations:**
   - Email service (SendGrid/AWS SES)
   - Payment processing (Stripe/PayPal)
   - File storage (AWS S3/Cloudinary)
   - Analytics (Google Analytics)

4. **Testing:**
   - Unit tests for all API endpoints
   - Integration tests for database operations
   - Load testing for performance validation

This API documentation provides a comprehensive foundation for building the Invictus Consultants platform with all necessary endpoints for user management, content delivery, course enrollment, and administrative functions.
