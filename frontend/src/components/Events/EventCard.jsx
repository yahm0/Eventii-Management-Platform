import React from 'react';
import '../../styles/home.css'; // Adjust the path as necessary
import EventInfo from './EventInfo'; // New base component

// Define the EventCard component to display event details
const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <EventInfo event={event} />
    </div>
  );
};

export default EventCard; // Export the EventCard component
