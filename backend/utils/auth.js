const jwt = require('jsonwebtoken'); // Import jsonwebtoken package
const User = require('../models/User'); // Import User model

// Middleware to authenticate user requests
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return next();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
  } catch (error) {
    console.error(error);
  }
  next();
};

module.exports = authMiddleware; // Export the middleware