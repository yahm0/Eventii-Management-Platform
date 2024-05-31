import React from 'react'; // Import the React library
import EventList from '../components/Events/EventList'; // Import the EventList component

// Define the Home component to display the home page
const Home = () => {
  return (
    <div>
      <h1>Welcome to the Event Management Platform</h1>
      <EventList />
    </div>
  );
};

export default Home; // Export the Home component
