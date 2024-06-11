const Event = require('../models/Event');
const User = require('../models/User');
const { AuthenticationError } = require('apollo-server-express');
const { verifyToken } = require('../utils/auth');

const eventResolvers = {
  Query: {
    events: async () => await Event.find().populate('organizer attendees'),
    event: async (_, { id }) => await Event.findById(id).populate('organizer attendees'),
  },
  Mutation: {
    createEvent: async (_, { eventInput }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Authentication required');
      }
      const event = new Event({ ...eventInput, organizer: context.user.id });
      await event.save();
      await User.findByIdAndUpdate(context.user.id, { $push: { events: event.id } });
      return event.populate('organizer attendees');
    },
    updateEvent: async (_, { id, eventInput }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Authentication required');
      }
      const event = await Event.findByIdAndUpdate(id, eventInput, { new: true }).populate('organizer attendees');
      if (!event) {
        throw new Error('Event not found');
      }
      return event;
    },
    deleteEvent: async (_, { id }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Authentication required');
      }
      const event = await Event.findByIdAndDelete(id).populate('organizer attendees');
      if (!event) {
        throw new Error('Event not found');
      }
      return event;
    },
    registerForEvent: async (_, { eventId, token }) => {
      const decoded = verifyToken(token);
      if (!decoded) {
        throw new AuthenticationError('Invalid token');
      }
      const user = await User.findById(decoded.id);
      if (!user) {
        throw new Error('User not found');
      }
      const event = await Event.findByIdAndUpdate(
        eventId,
        { $addToSet: { attendees: user.id } },
        { new: true }
      ).populate('organizer attendees');
      if (!event) {
        throw new Error('Event not found');
      }
      await User.findByIdAndUpdate(user.id, { $addToSet: { events: event.id } });
      return event;
    },
  },
};

module.exports = eventResolvers;
