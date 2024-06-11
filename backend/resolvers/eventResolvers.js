const { events, users } = require('../models');
const { verifyToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const eventResolvers = {
  Query: {
    events: async () => {
      try {
        const eventsList = await events.find().populate('organizer');
        return eventsList.map(event => ({
          ...event.toObject(),
          id: event._id,
          organizer: event.organizer || { name: 'Unknown' }
        }));
      } catch (err) {
        throw new Error('Failed to fetch events');
      }
    },
    event: async (_, { id }) => {
      try {
        const event = await events.findById(id).populate('organizer');
        if (!event) {
          throw new Error('Event not found');
        }
        return {
          ...event.toObject(),
          id: event._id,
          organizer: event.organizer || { name: 'Unknown' }
        };
      } catch (err) {
        throw new Error('Failed to fetch event');
      }
    },
  },
  Mutation: {
    createEvent: async (_, { eventInput }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Authentication required');
      }

      try {
        console.log('Received eventInput:', eventInput); // Log received input

        // Ensure required fields are provided
        if (!eventInput.title || !eventInput.description || !eventInput.date || !eventInput.location) {
          throw new Error('Missing required fields');
        }

        const newEvent = new events({ ...eventInput, organizer: context.user._id });
        const savedEvent = await newEvent.save();

        console.log('Saved event:', savedEvent); // Log saved event

        return {
          ...savedEvent.toObject(),
          id: savedEvent._id,
          organizer: { ...context.user }
        };
      } catch (error) {
        console.error('Error in createEvent resolver:', error); // Log error
        throw new Error('Failed to create event');
      }
    },
    updateEvent: async (_, { id, eventInput }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Authentication required');
      }
      const updatedEvent = await events.findByIdAndUpdate(id, eventInput, { new: true }).populate('organizer');
      return {
        ...updatedEvent.toObject(),
        id: updatedEvent._id,
        organizer: updatedEvent.organizer || { name: 'Unknown' }
      };
    },
    deleteEvent: async (_, { id }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Authentication required');
      }
      const deletedEvent = await events.findByIdAndDelete(id).populate('organizer');
      return {
        ...deletedEvent.toObject(),
        id: deletedEvent._id,
        organizer: deletedEvent.organizer || { name: 'Unknown' }
      };
    },
    registerForEvent: async (_, { eventId, token }) => {
      const decoded = verifyToken(token);
      if (!decoded) {
        throw new AuthenticationError('Invalid token');
      }
      const user = await users.findById(decoded.id);
      if (!user) {
        throw new Error('User not found');
      }

      const event = await events.findByIdAndUpdate(
        eventId,
        { $addToSet: { attendees: user.id } },
        { new: true }
      ).populate('organizer attendees');
      if (!event) {
        throw new Error('Event not found');
      }

      await users.findByIdAndUpdate(user.id, { $addToSet: { events: event.id } });
      return {
        ...event.toObject(),
        id: event._id,
        organizer: event.organizer || { name: 'Unknown' }
      };
    },
  },
};

module.exports = eventResolvers;
