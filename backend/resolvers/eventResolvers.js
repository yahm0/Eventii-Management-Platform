const { events, users } = require('../models');

const eventResolvers = {
  Mutation: {
    createEvent: async (_, { eventInput }) => {
      // Logic to create an event
      const newEvent = new events(eventInput);
      return await newEvent.save();
    },
    updateEvent: async (_, { id, eventInput }) => {
      // Logic to update an event
      return await events.findByIdAndUpdate(id, eventInput, { new: true });
    },
    deleteEvent: async (_, { id }) => {
      // Logic to delete an event
      return await events.findByIdAndDelete(id);
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
      try {
        return await events.find();
      } catch (err) {
        throw new Error('Failed to fetch events');
      }
    },
    event: async (_, { id }) => {
      try {
        return await events.findById(id);
      } catch (err) {
        throw new Error('Failed to fetch event');
      }
    },
  },
};

module.exports = eventResolvers;
