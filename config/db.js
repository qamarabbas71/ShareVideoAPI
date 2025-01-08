const mongoose = require('mongoose');
require('dotenv').config(); // To load .env file

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI); // Removed deprecated options

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error: ', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;