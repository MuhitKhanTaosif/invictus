#!/bin/bash

# Quick Start Script for Invictus Consultants Application
# This script starts both frontend and backend for development/testing

set -e

echo "🚀 Quick Start - Invictus Consultants Application"
echo "=================================================="

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Check if MongoDB is running
print_status "Checking MongoDB..."
if ! pgrep -x "mongod" > /dev/null; then
    print_warning "MongoDB is not running. Starting MongoDB..."
    sudo systemctl start mongod || {
        print_warning "Could not start MongoDB via systemctl. Please start MongoDB manually."
        print_warning "On Ubuntu/Debian: sudo systemctl start mongod"
        print_warning "On macOS: brew services start mongodb"
    }
else
    print_success "MongoDB is running"
fi

# Install dependencies if needed
print_status "Checking dependencies..."

# Backend dependencies
if [ ! -d "server/node_modules" ]; then
    print_status "Installing backend dependencies..."
    cd server
    npm install
    cd ..
    print_success "Backend dependencies installed"
fi

# Frontend dependencies
if [ ! -d "client/node_modules" ]; then
    print_status "Installing frontend dependencies..."
    cd client
    npm install
    cd ..
    print_success "Frontend dependencies installed"
fi

# Start backend server
print_status "Starting backend server..."
cd server
npm start &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Check if backend is running
if curl -s http://localhost:5002/health > /dev/null; then
    print_success "Backend server is running on port 5002"
else
    print_warning "Backend server may not be ready yet"
fi

# Start frontend development server
print_status "Starting frontend development server..."
cd client
npm run dev &
FRONTEND_PID=$!
cd ..

# Wait a moment for frontend to start
sleep 3

# Check if frontend is running
if curl -s http://localhost:5173 > /dev/null 2>&1; then
    print_success "Frontend server is running on port 5173"
else
    print_warning "Frontend server may not be ready yet"
fi

print_success "Application is starting up..."
echo ""
echo "🌐 Application URLs:"
echo "   🎯 MAIN APPLICATION: http://localhost:5173"
echo "   🔧 Backend API: http://localhost:5002"
echo "   📊 Health Check: http://localhost:5002/health"
echo "   👤 Admin Panel: http://localhost:5173/admin-invictus"
echo ""
echo "⚠️  IMPORTANT: Use the FRONTEND URL (port 5173) to access the application!"
echo "   The backend (port 5002) only serves API endpoints, not the web interface."
echo ""
echo "🔐 Admin Credentials:"
echo "   Email: admin@invictus.com"
echo "   Password: admin123"
echo ""
echo "📊 To check application health:"
echo "   curl http://localhost:5002/health"
echo ""
echo "🛑 To stop the application:"
echo "   Press Ctrl+C or run: kill $BACKEND_PID $FRONTEND_PID"
echo ""

# Keep script running and show logs
print_status "Application is running. Press Ctrl+C to stop..."

# Function to cleanup on exit
cleanup() {
    print_status "Stopping application..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true
    print_success "Application stopped"
    exit 0
}

# Set trap for cleanup
trap cleanup SIGINT SIGTERM

# Wait for processes
wait
