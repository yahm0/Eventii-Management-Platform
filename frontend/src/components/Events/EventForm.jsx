import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT } from '../../graphql/mutations';

const EventForm = () => {
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    fee: 0
  });

  const [createEvent, { data, loading, error }] = useMutation(CREATE_EVENT);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: name === 'fee' ? parseFloat(value) : value // Ensure fee is a number
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form State before submit:', formState); // Debugging log

    // Ensure the date is correctly formatted as a string
    const formattedDate = new Date(formState.date).toISOString();
    const variables = {
      eventInput: {
        ...formState,
        date: formattedDate
      }
    };

    console.log('Variables sent to mutation:', variables); // Debugging log

    try {
      const response = await createEvent({ variables });
      console.log('Event created successfully:', response.data.createEvent); // Debugging log
    } catch (err) {
      console.error('Error creating event:', err.message); // Debugging log
      if (err.networkError) {
        console.error('Network error details:', err.networkError.result.errors); // Detailed error log
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formState.title}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formState.description}
        onChange={handleChange}
      />
      <input
        type="date"
        name="date"
        placeholder="Date"
        value={formState.date}
        onChange={handleChange}
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formState.location}
        onChange={handleChange}
      />
      <input
        type="number"
        name="fee"
        placeholder="Fee"
        value={formState.fee}
        onChange={handleChange}
      />
      <button type="submit">Create Event</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Event created successfully!</p>}
    </form>
  );
};

export default EventForm;
