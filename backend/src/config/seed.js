const mongoose = require('mongoose');
const Project = require('../models/Project');
const User = require('../models/User');

const seedProjects = async () => {
  try {
    // Find admin user
    const admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      console.log('No admin user found. Please run the server first to create initial admin.');
      return;
    }

    // Check if projects already exist
    const existingProjects = await Project.countDocuments();
    if (existingProjects > 0) {
      console.log('Projects already exist. Skipping seed.');
      return;
    }

    // Create initial projects
    const projects = [
      {
        name: 'Bug Tracker Web App',
        description: 'Main bug tracking web application for XYZ Corp',
        status: 'active',
        createdBy: admin._id
      },
      {
        name: 'Mobile App',
        description: 'XYZ Corp mobile application for iOS and Android',
        status: 'active',
        createdBy: admin._id
      },
      {
        name: 'API Gateway',
        description: 'Microservices API gateway and authentication service',
        status: 'active',
        createdBy: admin._id
      },
      {
        name: 'Legacy System',
        description: 'Old legacy system being phased out',
        status: 'inactive',
        createdBy: admin._id
      }
    ];

    await Project.insertMany(projects);
    console.log('✅ Initial projects created successfully');
  } catch (error) {
    console.error('Error seeding projects:', error);
  }
};

module.exports = { seedProjects };
