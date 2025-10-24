const mongoose = require('mongoose');
const Admin = require('../models/Admin');
require('dotenv').config();

const createAdminUser = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/invictus');
    console.log('Connected to database');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@invictus.com' });
    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin.email);
      return;
    }

    // Create new admin user
    const adminData = {
      username: 'admin',
      email: 'admin@invictus.com',
      password: 'admin123', // This will be hashed by the pre-save middleware
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      isActive: true,
      permissions: {
        categories: true,
        courses: true,
        blogs: true,
        users: true
      }
    };

    const admin = new Admin(adminData);
    await admin.save();

    console.log('Admin user created successfully:');
    console.log('Email:', admin.email);
    console.log('Username:', admin.username);
    console.log('Password: admin123');
    console.log('Role:', admin.role);

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from database');
  }
};

// Run the script
createAdminUser();
