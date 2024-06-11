const mongoose = require('mongoose');

// Define the Event schema
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  fee: { type: Number }
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
  versionKey: false  // Removes the __v field (version key)
});

// Ensure indexes are created
eventSchema.index({ title: 1 });

module.exports = mongoose.model('Event', eventSchema);
