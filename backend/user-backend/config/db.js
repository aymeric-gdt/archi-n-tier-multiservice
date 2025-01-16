const mongoose = require('mongoose');
require('dotenv').config();
const mongoUri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      dbName: 'tp_monolith',
    });
    console.log('Connected to MongoDB');

  } catch (error) {
    console.error('MongoDB connection error:', error.message,' : ', mongoUri);
    if (error.name === 'MongoServerSelectionError') {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
