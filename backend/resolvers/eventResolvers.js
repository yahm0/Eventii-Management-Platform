const { events, users } = require('../models');

const eventResolvers = {
  Mutation: {
    createEvent: async (_, { eventInput }) => {
      // Logic to create an event
    },
    updateEvent: async (_, { id, eventInput }) => {
      // Logic to update an event
    },
    deleteEvent: async (_, { id }) => {
      // Logic to delete an event
    },
    registerForEvent: async (_, { eventId, token }) => {
      const event = await events.findById(eventId);
      if (!event) {
        throw new Error('Event not found');
      }

      const user = await users.findOne({ token });
      if (!user) {
        throw new Error('User not found or invalid token');
      }

      event.attendees.push(user);
      await event.save();

      return event;
    },
  },
  Query: {
    events: async () => {
      // Logic to get all events
    },
    event: async (_, { id }) => {
      // Logic to get a single event by ID
    },
  },
};

module.exports = eventResolvers;
