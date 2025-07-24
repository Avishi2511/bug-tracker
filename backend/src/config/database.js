const mongoose = require('mongoose');
const { seedDatabase } = require('./seed');

const connectDB = async ({ seed, clear } = {}) => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);

    // Only allow seeding and clearing in development
    if (process.env.NODE_ENV !== 'production') {
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
    } else {
      console.log('Production mode: Skipping database seeding/clearing');
    }
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
