import React from 'react'; // Import the React library
import EventForm from '../components/Events/EventForm'; // Import the EventForm component
import '../styles/dashboard.css'; // Import the CSS file for the Dashboard component

// Define the Dashboard component to display the dashboard
const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <EventForm />
    </div>
  );
};

export default Dashboard; // Export the Dashboard component
