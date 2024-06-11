const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://lanbeard105:qMMz33VViTciEU81@eventii.wepmskm.mongodb.net/?retryWrites=true&w=majority&appName=Eventii';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      writeConcern: {
        w: 'majority',
        wtimeout: 1000,
        j: true
      }
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

connectDB();

module.exports = mongoose.connection;
