const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { authenticateToken } = require('./auth');
const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Allow images and documents
  const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|txt/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only images and documents are allowed!'));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: fileFilter
});

// Single file upload
router.post('/single', authenticateToken, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    res.json({
      success: true,
      message: 'File uploaded successfully',
      file: {
        filename: req.file.filename,
        originalname: req.file.originalname,
        size: req.file.size,
        path: `/uploads/${req.file.filename}`
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Multiple files upload
router.post('/multiple', authenticateToken, upload.array('files', 5), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const files = req.files.map(file => ({
      filename: file.filename,
      originalname: file.originalname,
      size: file.size,
      path: `/uploads/${file.filename}`
    }));

    res.json({
      success: true,
      message: 'Files uploaded successfully',
      files: files
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Image upload specifically
router.post('/image', authenticateToken, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    // Check if it's an image
    const imageTypes = /jpeg|jpg|png|gif/;
    const extname = imageTypes.test(path.extname(req.file.originalname).toLowerCase());
    const mimetype = imageTypes.test(req.file.mimetype);

    if (!mimetype || !extname) {
      // Delete the uploaded file if it's not an image
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: 'Only images are allowed' });
    }

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      image: {
        filename: req.file.filename,
        originalname: req.file.originalname,
        size: req.file.size,
        path: `/uploads/${req.file.filename}`
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete file
router.delete('/:filename', authenticateToken, (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(uploadsDir, filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ success: true, message: 'File deleted successfully' });
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get file info
router.get('/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(uploadsDir, filename);

    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      res.json({
        filename: filename,
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime,
        path: `/uploads/${filename}`
      });
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


