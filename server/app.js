const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(helmet({
  crossOriginOpenerPolicy: false, // Disable COOP for local testing
  crossOriginResourcePolicy: false, // Disable CORP for local testing
  contentSecurityPolicy: false // Disable CSP that might cause HTTPS issues
}));
app.use(compression());
app.use(morgan('combined'));

// CORS configuration for production
const corsOrigins = process.env.NODE_ENV === 'production' 
  ? (req, callback) => {
      // Allow any origin in production for now - restrict this in actual deployment
      callback(null, true);
    }
  : ['http://localhost:3000', 'http://127.0.0.1:3000'];

app.use(cors({
  origin: corsOrigins,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rpl-support', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/categories', require('./routes/categories'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/course-details', require('./routes/courseDetails'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/auth', require('./routes/auth').router);
app.use('/api/upload', require('./routes/upload'));
app.use('/api/public', require('./routes/public'));
app.use('/api', require('./routes/siteSettings'));
app.use('/api/email', require('./routes/email'));

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT} and accessible from external IPs`);
}); 