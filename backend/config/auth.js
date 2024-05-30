const jwt = require('jsonwebtoken'); // Import jsonwebtoken package

// Function to generate token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

module.exports = { generateToken }; // Export the function
