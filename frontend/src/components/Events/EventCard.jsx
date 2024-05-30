import React from 'react'; // Import the React library

// Define the EventCard component to display event details
const EventCard = ({ event }) => {
  return (
    <div>
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p>{new Date(event.date).toLocaleDateString()}</p>
      <p>{event.location}</p>
      <p>Organizer: {event.organizer.name}</p>
    </div>
  );
};

export default EventCard; // Export the EventCard component
