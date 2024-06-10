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

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mernshopping');

module.exports = mongoose.connection;
