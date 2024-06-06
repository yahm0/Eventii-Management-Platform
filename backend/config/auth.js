const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
  if (!token) {
    throw new Error('No token provided');
  }
  const splitToken = token.split(' ')[1]; // Expecting 'Bearer <token>'
  if (!splitToken) {
    throw new Error('Token format is invalid');
  }

  try {
    const decoded = jwt.verify(splitToken, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    throw new Error('Token verification failed: ' + err.message);
  }
};

module.exports = { verifyToken };
