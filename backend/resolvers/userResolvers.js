const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model

// Function to generate JWT token
const generateToken = (user) => {
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  console.log('Generated Token:', token); // Log the generated token
  return token;
};

const userResolvers = {
  Mutation: {
    signup: async (_, { userInput }) => {
      const { name, email, password } = userInput;
      const user = new User({ name, email, password });
      await user.save();
      const token = generateToken(user); // Generate real token
      console.log('User Signed Up:', user); // Log user details
      return { user, token };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }
      const valid = await user.comparePassword(password);
      if (!valid) {
        throw new Error('Invalid password');
      }
      const token = generateToken(user); // Generate real token
      return { user, token };
    },
  },
  Query: {
    users: async () => {
      return await User.find();
    },
    user: async (_, { id }) => {
      return await User.findById(id);
    },
  },
};

module.exports = userResolvers;
