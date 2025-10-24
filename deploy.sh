#!/bin/bash

# Invictus Consultants Application Deployment Script
# This script prepares and deploys the full-stack application

set -e  # Exit on any error

echo "🚀 Starting Invictus Consultants Application Deployment..."
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root for security reasons"
   exit 1
fi

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

print_status "Working directory: $(pwd)"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    print_error "Node.js version 16 or higher is required. Current version: $(node -v)"
    exit 1
fi

print_success "Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_success "npm version: $(npm -v)"

# 1. Install Backend Dependencies
print_status "Installing backend dependencies..."
cd server
if [ ! -f "package.json" ]; then
    print_error "package.json not found in server directory"
    exit 1
fi

npm install --production
if [ $? -eq 0 ]; then
    print_success "Backend dependencies installed successfully"
else
    print_error "Failed to install backend dependencies"
    exit 1
fi

# 2. Install Frontend Dependencies
print_status "Installing frontend dependencies..."
cd ../client
if [ ! -f "package.json" ]; then
    print_error "package.json not found in client directory"
    exit 1
fi

npm install
if [ $? -eq 0 ]; then
    print_success "Frontend dependencies installed successfully"
else
    print_error "Failed to install frontend dependencies"
    exit 1
fi

# 3. Build Frontend for Production
print_status "Building frontend for production..."
npm run build
if [ $? -eq 0 ]; then
    print_success "Frontend built successfully"
else
    print_error "Failed to build frontend"
    exit 1
fi

# 4. Check if build directory exists
if [ ! -d "build" ]; then
    print_error "Build directory not found. Build may have failed."
    exit 1
fi

print_success "Build directory created successfully"

# 5. Copy build files to server directory for production serving
print_status "Copying build files to server directory..."
cd ..
cp -r client/build server/client-build
if [ $? -eq 0 ]; then
    print_success "Build files copied to server directory"
else
    print_error "Failed to copy build files"
    exit 1
fi

# 6. Set up environment variables
print_status "Setting up environment variables..."

# Create production .env file for server if it doesn't exist
if [ ! -f "server/.env.production" ]; then
    print_status "Creating production environment file..."
    cat > server/.env.production << EOF
# Production Environment Configuration
NODE_ENV=production
PORT=5002

# Database Configuration
DB_TYPE=mongodb
MONGODB_URI=mongodb://localhost:27017/invictus-consultants

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-$(date +%s)
JWT_EXPIRE=24h

# CORS Configuration
CORS_ORIGIN=*

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

# Frontend Build Path
CLIENT_BUILD_PATH=./client-build
EOF
    print_success "Production environment file created"
else
    print_warning "Production environment file already exists"
fi

# 7. Create necessary directories
print_status "Creating necessary directories..."
mkdir -p server/logs
mkdir -p server/uploads
mkdir -p server/temp
print_success "Directories created successfully"

# 8. Set proper permissions
print_status "Setting proper permissions..."
chmod 755 server/logs
chmod 755 server/uploads
chmod 755 server/temp
chmod 644 server/.env.production
print_success "Permissions set successfully"

# 9. Database Setup (Optional - for fresh installations)
print_status "Database setup instructions:"
echo "=================================================="
echo "1. Make sure MongoDB is running on your system"
echo "2. The application will connect to: mongodb://localhost:27017/invictus-consultants"
echo "3. If you need to seed the database, run:"
echo "   cd server && npm run seed:admin"
echo "=================================================="

# 10. Create systemd service file (Optional)
print_status "Creating systemd service file..."
cat > invictus-app.service << EOF
[Unit]
Description=Invictus Consultants Application
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=$SCRIPT_DIR/server
ExecStart=/usr/bin/node app.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=5002

[Install]
WantedBy=multi-user.target
EOF

print_success "Systemd service file created: invictus-app.service"
print_warning "To install the service, run:"
echo "sudo cp invictus-app.service /etc/systemd/system/"
echo "sudo systemctl daemon-reload"
echo "sudo systemctl enable invictus-app"
echo "sudo systemctl start invictus-app"

# 11. Create PM2 ecosystem file (Alternative to systemd)
print_status "Creating PM2 ecosystem file..."
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'invictus-app',
    script: './server/app.js',
    cwd: '$SCRIPT_DIR',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 5002
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
EOF

print_success "PM2 ecosystem file created: ecosystem.config.js"
print_warning "To use PM2, install it first: npm install -g pm2"
print_warning "Then run: pm2 start ecosystem.config.js"

# 12. Create nginx configuration (Optional)
print_status "Creating nginx configuration..."
cat > nginx.conf << EOF
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:5002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # API routes
    location /api {
        proxy_pass http://localhost:5002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # Static files
    location /uploads {
        proxy_pass http://localhost:5002;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

print_success "Nginx configuration created: nginx.conf"

# 13. Create startup script
print_status "Creating startup script..."
cat > start.sh << 'EOF'
#!/bin/bash

# Invictus Consultants Application Startup Script

echo "🚀 Starting Invictus Consultants Application..."

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first."
    echo "   On Ubuntu/Debian: sudo systemctl start mongod"
    echo "   On macOS: brew services start mongodb"
    exit 1
fi

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    exit 1
fi

# Set environment
export NODE_ENV=production

# Start the application
echo "✅ Starting application on port 5002..."
cd server
node app.js
EOF

chmod +x start.sh
print_success "Startup script created: start.sh"

# 14. Create health check script
print_status "Creating health check script..."
cat > health-check.sh << 'EOF'
#!/bin/bash

# Health check script for Invictus Consultants Application

API_URL="http://localhost:5002/health"

echo "🔍 Checking application health..."

# Check if the application is running
if curl -s "$API_URL" > /dev/null; then
    echo "✅ Application is running and healthy"
    
    # Get health status
    HEALTH_STATUS=$(curl -s "$API_URL" | jq -r '.status' 2>/dev/null || echo "unknown")
    echo "📊 Status: $HEALTH_STATUS"
    
    # Get uptime
    UPTIME=$(curl -s "$API_URL" | jq -r '.uptime' 2>/dev/null || echo "unknown")
    echo "⏱️  Uptime: $UPTIME seconds"
    
    # Get database status
    DB_TYPE=$(curl -s "$API_URL" | jq -r '.database' 2>/dev/null || echo "unknown")
    echo "🗄️  Database: $DB_TYPE"
    
else
    echo "❌ Application is not responding"
    echo "   Check if the application is running on port 5002"
    exit 1
fi
EOF

chmod +x health-check.sh
print_success "Health check script created: health-check.sh"

# 15. Create backup script
print_status "Creating backup script..."
cat > backup.sh << 'EOF'
#!/bin/bash

# Backup script for Invictus Consultants Application

BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="invictus_backup_$DATE"

echo "📦 Creating backup: $BACKUP_NAME"

# Create backup directory
mkdir -p "$BACKUP_DIR/$BACKUP_NAME"

# Backup database (MongoDB)
echo "🗄️  Backing up database..."
mongodump --db invictus-consultants --out "$BACKUP_DIR/$BACKUP_NAME/database"

# Backup uploads
echo "📁 Backing up uploads..."
cp -r server/uploads "$BACKUP_DIR/$BACKUP_NAME/"

# Backup logs
echo "📝 Backing up logs..."
cp -r server/logs "$BACKUP_DIR/$BACKUP_NAME/"

# Create archive
echo "📦 Creating archive..."
cd "$BACKUP_DIR"
tar -czf "${BACKUP_NAME}.tar.gz" "$BACKUP_NAME"
rm -rf "$BACKUP_NAME"

echo "✅ Backup completed: $BACKUP_DIR/${BACKUP_NAME}.tar.gz"
EOF

chmod +x backup.sh
print_success "Backup script created: backup.sh"

# 16. Final deployment summary
echo ""
echo "🎉 Deployment Preparation Complete!"
echo "=================================================="
print_success "All components have been prepared for deployment"
echo ""
echo "📋 Next Steps:"
echo "1. Ensure MongoDB is running: sudo systemctl start mongod"
echo "2. Start the application: ./start.sh"
echo "3. Check health: ./health-check.sh"
echo "4. Access the application: http://localhost:5002"
echo "5. Admin panel: http://localhost:5002/admin-invictus"
echo ""
echo "🔧 Optional Setup:"
echo "- Install PM2: npm install -g pm2 && pm2 start ecosystem.config.js"
echo "- Setup nginx: sudo cp nginx.conf /etc/nginx/sites-available/invictus"
echo "- Setup systemd: sudo cp invictus-app.service /etc/systemd/system/"
echo ""
echo "📊 Monitoring:"
echo "- Health check: ./health-check.sh"
echo "- Create backup: ./backup.sh"
echo "- View logs: tail -f server/logs/app.log"
echo ""
print_success "Deployment script completed successfully! 🚀"
