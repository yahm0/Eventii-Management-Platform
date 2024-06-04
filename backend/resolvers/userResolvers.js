const User = require('../models/User'); // Import the User model

const userResolvers = {
  Mutation: {
    signup: async (_, { userInput }) => {
      console.log('User input:', userInput); // Add this line to log user input
      const { name, email, password } = userInput;
      const user = new User({ name, email, password });
      console.log('New user instance:', user); // Add this line to log user instance
      await user.save();
      const token = 'dummy-token'; // Replace with real token generation logic
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
      const token = 'dummy-token'; // Replace with real token generation logic
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
