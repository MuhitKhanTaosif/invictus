const mongoose = require('mongoose');
const Admin = require('./models/Admin');

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rpl-support', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create default admin user
    const admin = new Admin({
      username: 'admin',
      email: 'admin@rplsupport.com',
      password: 'admin123', // This will be hashed automatically
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      isActive: true,
      permissions: {
        categories: true,
        courses: true,
        blogs: true,
        users: false
      }
    });

    await admin.save();
    console.log('✅ Admin user created successfully!');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('Please change the password after first login.');
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedAdmin(); 