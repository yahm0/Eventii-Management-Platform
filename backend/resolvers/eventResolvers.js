const { events, users } = require('../models');


const eventResolvers = {
  Mutation: {
    createEvent: async (_, { eventInput }) => {
      try {
        console.log('Received eventInput:', eventInput); // Log received input

        // Ensure required fields are provided
        if (!eventInput.title || !eventInput.description || !eventInput.date || !eventInput.location) {
          throw new Error('Missing required fields');
        }

        const newEvent = new events(eventInput);
        const savedEvent = await newEvent.save();

        console.log('Saved event:', savedEvent); // Log saved event

        return {
          ...savedEvent.toObject(),
          id: savedEvent._id,
          organizer: { name: 'Organizer Name' } // Placeholder for organizer, replace with actual data
        };
      } catch (error) {
        console.error('Error in createEvent resolver:', error); // Log error
        throw new Error('Failed to create event');
      }
    },
    updateEvent: async (_, { id, eventInput }) => {
      const updatedEvent = await events.findByIdAndUpdate(id, eventInput, { new: true }).populate('organizer');
      return {
        ...updatedEvent.toObject(),
        id: updatedEvent._id,
        organizer: updatedEvent.organizer || { name: 'Unknown' }
      };
    },
    deleteEvent: async (_, { id }) => {
      const deletedEvent = await events.findByIdAndDelete(id).populate('organizer');
      return {
        ...deletedEvent.toObject(),
        id: deletedEvent._id,
        organizer: deletedEvent.organizer || { name: 'Unknown' }
      };
    },
    registerForEvent: async (_, { eventId, token }) => {
      const event = await events.findById(eventId).populate('organizer');
      if (!event) {
        throw new Error('Event not found');
      }

      const user = await users.findOne({ token });
      if (!user) {
        throw new Error('User not found or invalid token');
      }

      event.attendees.push(user);
      await event.save();

      return {
        ...event.toObject(),
        id: event._id,
        organizer: event.organizer || { name: 'Unknown' }
      };
    },
  },
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
};

module.exports = eventResolvers;
