const mongoose = require('mongoose'); // Import mongoose package

// Define the schema for the Event model
const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  fee: { type: Number, required: true },
});

module.exports = mongoose.model('Event', EventSchema); // Export the model
