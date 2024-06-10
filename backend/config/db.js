const mongoose = require('mongoose');
require('dotenv').config();

// const db = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true, 
//       useFindAndModify: false 
//     });
//     console.log(`MongoDB connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error('MongoDB connection failed', error);
//     process.exit(1);
//   }
// };

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://lanbeard105:qMMz33VViTciEU81@eventii.wepmskm.mongodb.net/?retryWrites=true&w=majority&appName=Eventii');

module.exports = mongoose.connection;
