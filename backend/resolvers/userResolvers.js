const User = require('../models/User'); // Import the User model
const { generateToken } = require('../config/auth'); // Import the generateToken function

// Define the user resolvers
const userResolvers = {
  Query: {
    users: async () => await User.find().populate('events'),
    user: async (_, { id }) => await User.findById(id).populate('events'),
  },
  Mutation: {
    signup: async (_, { userInput }) => {
      const user = new User(userInput);
      await user.save();
      const token = generateToken(user);
      return { user, token };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) throw new Error('Invalid credentials');
      const token = generateToken(user);
      return { user, token };
    },
  },
};

module.exports = userResolvers; // Export the resolvers
