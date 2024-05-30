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

    registerForEvent: async (_, { eventId, token }, { user }) => {
        const event = await Event.findById(eventId);
        if (!event) throw new Error('Event not found');
  
        // Process payment
        const charge = await createCharge(event.fee, token, `Registration for ${event.title}`);
        if (!charge) throw new Error('Payment failed');
  
        // Add user to event attendees
        event.attendees.push(user.id);
        await event.save();
  
        // Add event to user's registered events
        user.events.push(event.id);
        await user.save();
  
        return event;
      },
    },
  };
  
module.exports = eventResolvers;
