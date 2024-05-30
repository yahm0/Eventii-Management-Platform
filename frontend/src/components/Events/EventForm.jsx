import React, { useState } from 'react'; // Import the useState hook
import { useMutation } from '@apollo/client'; // Import the useMutation hook from Apollo Client
import { CREATE_EVENT } from '../../graphql/mutations'; // Import the CREATE_EVENT mutation

// Define the EventForm component to handle event creation
const EventForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [fee, setFee] = useState('');
  const [createEvent] = useMutation(CREATE_EVENT);

  // Define the handleSubmit function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEvent({
        variables: { eventInput: { title, description, date, location, fee: parseFloat(fee) } },
      });
      // Handle successful event creation (e.g., redirect, show message)
    } catch (error) {
      console.error(error);
    }
  };

  // Return a form for users to enter event details
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />
      <input
        type="number"
        value={fee}
        onChange={(e) => setFee(e.target.value)}
        placeholder="Fee"
      />
      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventForm; // Export the EventForm component