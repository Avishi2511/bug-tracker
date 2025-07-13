const mongoose = require('mongoose');
const Project = require('../models/Project');
const User = require('../models/User');
const Bug = require('../models/Bug');
const { mockUsers } = require('../data/mockUsers');
const { mockProjects } = require('../data/mockProjects');
const { mockBugs } = require('../data/mockBugs');

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Bug.deleteMany({});
    await Project.deleteMany({});
    await User.deleteMany({});

    // Seed users
    const users = await User.insertMany(mockUsers);
    console.log('✅ Users seeded successfully');

    // Get admin user for project creation
    const admin = users.find(user => user.role === 'admin');
    if (!admin) {
      console.log('No admin user found in mock data.');
      return;
    }

    // Seed projects
    const projectsToSeed = mockProjects.map(project => ({
      ...project,
      createdBy: admin._id
    }));
    const projects = await Project.insertMany(projectsToSeed);
    console.log('✅ Projects seeded successfully');

    // Seed bugs
    const bugsToSeed = mockBugs.map(bug => {
      const project = projects[Math.floor(Math.random() * projects.length)];
      const reporter = users.find(user => user.role === 'tester');
      const assignee = users.find(user => user.role === 'developer');
      return {
        ...bug,
        project: project._id,
        reportedBy: reporter._id,
        assignedTo: assignee._id
      };
    });
    await Bug.insertMany(bugsToSeed);
    console.log('✅ Bugs seeded successfully');

  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

module.exports = { seedDatabase };
