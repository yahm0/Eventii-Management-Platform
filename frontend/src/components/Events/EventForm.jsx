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
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form State:', formState); // Debugging log
    try {
      const response = await createEvent({ variables: { eventInput: formState } });
      console.log('Event created successfully:', response.data.createEvent); // Debugging log
    } catch (err) {
      console.error('Error creating event:', err); // Debugging log
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
