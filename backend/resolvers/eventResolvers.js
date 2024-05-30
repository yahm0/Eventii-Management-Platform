const Event = require('../models/Event');
const User = require('../models/User');

const eventResolvers = {
  Query: {
    events: async () => await Event.find().populate('organizer').populate('attendees'),
    event: async (_, { id }) => await Event.findById(id).populate('organizer').populate('attendees'),
  },
  Mutation: {
    createEvent: async (_, { eventInput }, { user }) => {
      const event = new Event({ ...eventInput, organizer: user.id });
      await event.save();
      return event.populate('organizer').execPopulate();
    },
    updateEvent: async (_, { id, eventInput }) => 
      await Event.findByIdAndUpdate(id, eventInput, { new: true }).populate('organizer').populate('attendees'),
    deleteEvent: async (_, { id }) => await Event.findByIdAndDelete(id),
  },
};

module.exports = eventResolvers;
