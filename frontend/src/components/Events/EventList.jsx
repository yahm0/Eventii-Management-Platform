import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_EVENTS } from '../../graphql/queries';
import EventCard from './EventCard';

const EventList = () => {
  const { loading, error, data } = useQuery(GET_EVENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
