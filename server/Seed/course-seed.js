const mongoose = require('mongoose');
const Category = require('./models/Category');
const Course = require('./models/Course');
const Admin = require('./models/Admin');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Complete categories based on the qualifications file
const categories = [
  {
    name: 'Horticulture & Agriculture',
    slug: 'horticulture-agriculture',
    description: 'Plant care, farming, and agricultural qualifications',
    icon: 'FiLeaf',
    color: '#8BC34A',
    order: 1
  },
  {
    name: 'Food, Baking & Meat',
    slug: 'food-baking-meat',
    description: 'Baking, cooking, and food processing qualifications',
    icon: 'FiCoffee',
    color: '#FF9800',
    order: 2
  },
  {
    name: 'Automotive & Engineering',
    slug: 'automotive-engineering',
    description: 'Vehicle mechanics, engineering, and technical qualifications',
    icon: 'FiSettings',
    color: '#3F51B5',
    order: 3
  },
  {
    name: 'Construction & Building',
    slug: 'construction-building',
    description: 'Building, construction, and trade qualifications',
    icon: 'FiTool',
    color: '#FF9800',
    order: 4
  },
  {
    name: 'Business, Management & HR',
    slug: 'business-management-hr',
    description: 'Business administration, leadership, and HR qualifications',
    icon: 'FiBriefcase',
    color: '#4CAF50',
    order: 5
  },
  {
    name: 'Community Services, Health & Education',
    slug: 'community-services-health-education',
    description: 'Healthcare, education, and community service qualifications',
    icon: 'FiHeart',
    color: '#F44336',
    order: 6
  },
  {
    name: 'Finance & Administration',
    slug: 'finance-administration',
    description: 'Financial services and administrative qualifications',
    icon: 'FiDollarSign',
    color: '#4CAF50',
    order: 7
  },
  {
    name: 'Furniture, Cabinet Making & Joinery',
    slug: 'furniture-cabinet-making-joinery',
    description: 'Furniture making, cabinet making, and joinery qualifications',
    icon: 'FiTool',
    color: '#795548',
    order: 8
  },
  {
    name: 'Civil Construction & Plant Operations',
    slug: 'civil-construction-plant-operations',
    description: 'Civil construction and heavy machinery operation qualifications',
    icon: 'FiTruck',
    color: '#607D8B',
    order: 9
  },
  {
    name: 'Beauty, Hair & Personal Services',
    slug: 'beauty-hair-personal-services',
    description: 'Beauty therapy, hairdressing, and personal care qualifications',
    icon: 'FiScissors',
    color: '#E91E63',
    order: 10
  },
  {
    name: 'Hospitality, Cookery & Patisserie',
    slug: 'hospitality-cookery-patisserie',
    description: 'Hospitality management, cooking, and pastry qualifications',
    icon: 'FiCoffee',
    color: '#795548',
    order: 11
  }
];

// Load parsed courses
const parsedCoursesPath = path.join(__dirname, 'parsed-courses.json');
const parsedCourses = JSON.parse(fs.readFileSync(parsedCoursesPath, 'utf8'));

const adminUser = {
  username: 'admin',
  email: 'admin@rplsupport.com.au',
  password: 'admin123',
  firstName: 'Admin',
  lastName: 'User',
  role: 'admin',
  permissions: {
    categories: true,
    courses: true,
    blogs: true,
    users: true
  }
};

async function seedAllCourses() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rpl-support');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany({});
    await Course.deleteMany({});
    await Admin.deleteMany({});
    console.log('Cleared existing data');

    // Create categories
    const createdCategories = await Category.insertMany(categories);
    console.log(`Created ${createdCategories.length} categories`);

    // Create category mapping
    const categoryMap = {};
    createdCategories.forEach(cat => {
      categoryMap[cat.slug] = cat._id;
    });

    // Process courses with proper category references and unique slugs
    const coursesWithCategories = parsedCourses.map(course => ({
      ...course,
      category: categoryMap[course.category],
      slug: `${course.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${course.code.toLowerCase()}`,
      featured: course.level === 'Certificate III' || course.level === 'Certificate IV' || course.level === 'Diploma'
    }));

    const createdCourses = await Course.insertMany(coursesWithCategories);
    console.log(`Created ${createdCourses.length} courses`);

    // Create admin user
    const admin = new Admin(adminUser);
    await admin.save();
    console.log('Created admin user');

    console.log('\n=== DATABASE SEEDED SUCCESSFULLY ===');
    console.log(`Categories: ${createdCategories.length}`);
    console.log(`Courses: ${createdCourses.length}`);
    console.log('\nAdmin Login Details:');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('Email: admin@rplsupport.com.au');

    // Show courses by category
    console.log('\n=== COURSES BY CATEGORY ===');
    for (const category of createdCategories) {
      const categoryCourses = await Course.find({ category: category._id });
      console.log(`${category.name}: ${categoryCourses.length} courses`);
      categoryCourses.forEach(course => {
        console.log(`  - ${course.code}: ${course.title}`);
      });
    }

    // Show summary by level
    console.log('\n=== COURSES BY LEVEL ===');
    const levelCounts = {};
    createdCourses.forEach(course => {
      levelCounts[course.level] = (levelCounts[course.level] || 0) + 1;
    });
    Object.entries(levelCounts).forEach(([level, count]) => {
      console.log(`${level}: ${count} courses`);
    });

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

seedAllCourses(); 