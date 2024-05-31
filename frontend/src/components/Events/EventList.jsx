import React from 'react'; // Import the React library
import { useQuery } from '@apollo/client'; // Import the useQuery hook from Apollo Client
import { GET_EVENTS } from '../../graphql/queries'; // Import the GET_EVENTS query
import EventCard from './EventCard'; // Import the EventCard component

// Define the EventList component to display a list of events
const EventList = () => {
  const { loading, error, data } = useQuery(GET_EVENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Return a list of EventCard components for each event
  return (
    <div>
      {data.events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList; // Export the EventList component
