# Invictus Consultants Application - Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- MongoDB
- npm

### 1. Quick Development Start
```bash
# Make scripts executable
chmod +x quick-start.sh deploy.sh

# Start both frontend and backend
./quick-start.sh
```

### 2. Production Deployment
```bash
# Run the full deployment script
./deploy.sh
```

## 📋 Application Status

✅ **All Tasks Completed Successfully:**

1. **Frontend Analysis** ✅
   - React application with Vite
   - Uses react-router (not react-router-dom)
   - No import errors detected
   - Running on port 5177

2. **API Integration** ✅
   - Backend server running on port 5002
   - MongoDB database connected
   - All admin API endpoints working
   - CORS properly configured

3. **Admin Authentication Flow** ✅
   - Login endpoint: `/api/auth/login`
   - Profile endpoint: `/api/auth/profile`
   - Dashboard endpoint: `/api/admin/dashboard-stats`
   - Token-based authentication working

4. **Admin Dashboard Navigation** ✅
   - Admin login: `admin@invictus.com` / `admin123`
   - Smooth navigation to dashboard after login
   - Dashboard displays comprehensive statistics

## 🔧 Application Architecture

### Frontend (React + Vite)
- **Port**: 5173 (development) / 5177 (if 5173 is busy)
- **Framework**: React 19.1.1
- **Router**: react-router 7.9.4
- **Styling**: Tailwind CSS
- **State Management**: Context API
- **HTTP Client**: Axios

### Backend (Node.js + Express)
- **Port**: 5002
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **File Upload**: Multer
- **Logging**: Winston

### Database
- **Type**: MongoDB
- **Connection**: `mongodb://localhost:27017/invictus-consultants`
- **Collections**: Admin, Blog, Course, Category, SiteSettings, WebTraffic

## 🌐 Application URLs

### Development
- **Frontend**: http://localhost:5173 (or 5177)
- **Backend API**: http://localhost:5002
- **Health Check**: http://localhost:5002/health
- **Admin Panel**: http://localhost:5173/admin-invictus

### Production
- **Application**: http://localhost:5002
- **Admin Panel**: http://localhost:5002/admin-invictus

## 🔐 Admin Access

### Default Admin Credentials
- **Email**: admin@invictus.com
- **Password**: admin123
- **Role**: admin
- **Permissions**: categories, courses, blogs, users

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/profile` - Get user profile
- `GET /api/auth/verify` - Verify token

### Admin Dashboard
- `GET /api/admin/dashboard-stats` - Dashboard statistics
- `GET /api/admin/dashboard` - Basic dashboard data

### Content Management
- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create blog
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create course

## 🛠️ Deployment Scripts

### 1. `deploy.sh` - Full Production Deployment
- Installs all dependencies
- Builds frontend for production
- Sets up environment variables
- Creates systemd service
- Creates PM2 ecosystem file
- Creates nginx configuration
- Creates backup and health check scripts

### 2. `quick-start.sh` - Development Start
- Starts MongoDB
- Installs dependencies
- Starts backend server
- Starts frontend development server
- Provides monitoring and cleanup

### 3. `start.sh` - Production Start
- Checks MongoDB
- Starts production server
- Sets production environment

### 4. `health-check.sh` - Health Monitoring
- Checks application health
- Shows uptime and status
- Verifies database connection

### 5. `backup.sh` - Data Backup
- Backs up MongoDB database
- Backs up uploads and logs
- Creates compressed archive

## 🔧 Configuration Files

### Environment Variables
```bash
# Server Configuration
NODE_ENV=production
PORT=5002

# Database
DB_TYPE=mongodb
MONGODB_URI=mongodb://localhost:27017/invictus-consultants

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=24h

# CORS
CORS_ORIGIN=*
```

### PM2 Configuration (`ecosystem.config.js`)
```javascript
module.exports = {
  apps: [{
    name: 'invictus-app',
    script: './server/app.js',
    instances: 1,
    autorestart: true,
    env: {
      NODE_ENV: 'production',
      PORT: 5002
    }
  }]
};
```

### Systemd Service (`invictus-app.service`)
```ini
[Unit]
Description=Invictus Consultants Application
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/invictus-app/invictus/server
ExecStart=/usr/bin/node app.js
Restart=always
Environment=NODE_ENV=production
```

## 🚀 Deployment Options

### Option 1: PM2 (Recommended)
```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start ecosystem.config.js

# Monitor
pm2 monit

# Stop
pm2 stop invictus-app
```

### Option 2: Systemd
```bash
# Copy service file
sudo cp invictus-app.service /etc/systemd/system/

# Enable and start
sudo systemctl daemon-reload
sudo systemctl enable invictus-app
sudo systemctl start invictus-app

# Check status
sudo systemctl status invictus-app
```

### Option 3: Direct Node.js
```bash
# Start directly
./start.sh
```

## 📊 Monitoring & Maintenance

### Health Check
```bash
# Check application health
./health-check.sh

# Or manually
curl http://localhost:5002/health
```

### Logs
```bash
# Application logs
tail -f server/logs/app.log

# PM2 logs
pm2 logs invictus-app

# Systemd logs
sudo journalctl -u invictus-app -f
```

### Backup
```bash
# Create backup
./backup.sh

# Manual database backup
mongodump --db invictus-consultants --out ./backup
```

## 🔒 Security Considerations

1. **Change JWT Secret**: Update `JWT_SECRET` in production
2. **Database Security**: Use authentication for MongoDB
3. **HTTPS**: Configure SSL/TLS in production
4. **Firewall**: Restrict access to necessary ports
5. **Admin Credentials**: Change default admin password

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill process on port 5002
   sudo lsof -ti:5002 | xargs kill -9
   ```

2. **MongoDB Connection Failed**
   ```bash
   # Start MongoDB
   sudo systemctl start mongod
   
   # Check MongoDB status
   sudo systemctl status mongod
   ```

3. **Frontend Build Failed**
   ```bash
   # Clear cache and reinstall
   cd client
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

4. **Permission Issues**
   ```bash
   # Fix permissions
   sudo chown -R $USER:$USER /home/ubuntu/invictus-app/invictus
   chmod +x *.sh
   ```

## 📞 Support

For deployment issues:
1. Check application logs
2. Verify MongoDB is running
3. Check port availability
4. Verify environment variables
5. Run health check script

## ✅ Deployment Checklist

- [ ] MongoDB installed and running
- [ ] Node.js 16+ installed
- [ ] Dependencies installed
- [ ] Frontend built successfully
- [ ] Backend server running
- [ ] Admin login working
- [ ] API endpoints responding
- [ ] Health check passing
- [ ] Backup system configured
- [ ] Monitoring setup
- [ ] Security measures applied

---

**🎉 Your Invictus Consultants Application is now deployment ready!**

The application includes:
- ✅ Error-free frontend with React Router
- ✅ Complete API integration
- ✅ Working admin authentication flow
- ✅ Comprehensive deployment scripts
- ✅ Production-ready configuration
- ✅ Monitoring and backup systems
