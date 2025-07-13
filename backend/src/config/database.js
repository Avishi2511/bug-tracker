const mongoose = require('mongoose');
const { seedDatabase } = require('./seed');

const connectDB = async ({ seed, clear } = {}) => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    if (clear) {
      console.log('Clearing the database...');
      const collections = await mongoose.connection.db.collections();
      for (let collection of collections) {
        await collection.deleteMany({});
      }
      console.log('Database cleared.');
    }

    if (seed) {
      console.log('Seeding database...');
      await seedDatabase();
    }
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
