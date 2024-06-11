const User = require('../models/User');
const Event = require('../models/Event');

const resolvers = {
  Query: {
    users: async () => await User.find(),
    events: async () => await Event.find(),
  },
  Mutation: {
    addUser: async (_, { name, email, password }) => {
      const user = new User({ name, email, password });
      await user.save();
      return user;
    },
    addEvent: async (_, { title, description, date, location, fee }) => {
      const event = new Event({ title, description, date, location, fee });
      await event.save();
      return event;
    },
  },
};

module.exports = resolvers;
