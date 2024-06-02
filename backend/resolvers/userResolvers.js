const { users } = require('../models');

const userResolvers = {
  Mutation: {
    signup: async (_, { userInput }) => {
      // Logic to sign up a user
    },
    login: async (_, { email, password }) => {
      // Logic to log in a user
    },
  },
  Query: {
    users: async () => {
      // Logic to get all users
    },
    user: async (_, { id }) => {
      // Logic to get a single user by ID
    },
  },
};

module.exports = userResolvers;
