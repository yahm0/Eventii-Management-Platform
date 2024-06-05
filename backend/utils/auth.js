const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    console.log('No authorization header provided');
    return res.status(403).send('Token is required');
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    console.log('Token is missing in authorization header');
    return res.status(403).send('Token is required');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded); // Log the decoded token
    req.user = decoded;
    next();
  } catch (err) {
    console.log('Token verification failed:', err.message);
    return res.status(401).send('Invalid Token');
  }
};

module.exports = authMiddleware;
