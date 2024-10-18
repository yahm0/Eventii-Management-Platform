import React from 'react';

const EventInfo = ({ event }) => (
    <>
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>
        <p className="event-location">{event.location}</p>
        <p className="event-organizer">Organizer: {event.organizer?.name || 'Unknown'}</p>
    </>
);

export default EventInfo;
