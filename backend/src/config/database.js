const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Create initial admin user if it doesn't exist
    await createInitialAdmin();
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Create initial admin user for testing
const createInitialAdmin = async () => {
  try {
    const User = require('../models/User');
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (!adminExists) {
      const admin = new User({
        username: 'admin',
        email: 'admin@xyzcorp.com',
        password: 'admin123',
        firstName: 'System',
        lastName: 'Administrator',
        role: 'admin'
      });
      
      await admin.save();
      console.log('✅ Initial admin user created (admin@xyzcorp.com / admin123)');
    }
  } catch (error) {
    console.error('Error creating initial admin:', error);
  }
};

module.exports = connectDB;
