const { generateToken, generateRefreshToken } = require('../config/auth');
const User = require('../models/User');

const login = async (req, res) => {
  const { username, password } = req.body;
  
  // Authenticate user (replace with your authentication logic)
  const user = await User.findOne({ username }); // Example, replace with your logic
  
  if (!user || !user.comparePassword(password)) {
    return res.status(401).send('Invalid credentials');
  }

  const token = generateToken({ id: user.id });
  const refreshToken = generateRefreshToken({ id: user.id });

  res.json({ token, refreshToken });
};

module.exports = { login };
