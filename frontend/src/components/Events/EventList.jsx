import React, { useState, useEffect } from 'react'; // Import necessary hooks from React
import { useQuery } from '@apollo/client'; // Import the useQuery hook from Apollo Client
import { GET_EVENTS } from '../../graphql/queries'; // Import the GET_EVENTS query
import EventCard from './EventCard'; // Import the EventCard component
import '../../styles/home.css'; // Import the CSS file

// Define the EventList component to display a list of events
const EventList = () => {
  const { loading, error, data } = useQuery(GET_EVENTS);
  const [displayedEvents, setDisplayedEvents] = useState([]);
  const [page, setPage] = useState(1);
  const eventsPerPage = 9;

  useEffect(() => {
    if (data && data.events) {
      const initialEvents = data.events.slice(0, eventsPerPage);
      setDisplayedEvents(initialEvents);
    }
  }, [data]);

  const loadMoreEvents = () => {
    if (data && data.events) {
      const newEvents = data.events.slice(displayedEvents.length, displayedEvents.length + eventsPerPage);
      if (newEvents.length > 0) {
        setDisplayedEvents(prevEvents => [...prevEvents, ...newEvents]);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
        setPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (page > 1) {
      loadMoreEvents();
    }
  }, [page]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="event-card-container">
      {displayedEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList; // Export the EventList component
