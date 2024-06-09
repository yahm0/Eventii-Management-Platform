import React from 'react';
import '../../styles/home.css'; // Adjust the path as necessary

// Define the EventCard component to display event details
const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      {/* <p className="event-date">{new Date(event.date).toLocaleDateString() || 'Unknown'}</p> */}
      <p className="event-location">{event.location}</p>
      <p className="event-organizer">Organizer: {event.organizer?.name || 'Unknown'}</p>
    </div>
  );
};

export default EventCard; // Export the EventCard component
