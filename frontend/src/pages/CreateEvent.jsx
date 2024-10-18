import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT } from '../graphql/mutations';

const CreateEvent = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [organizer, setOrganizer] = useState('');

    const [createEvent, { loading, error }] = useMutation(CREATE_EVENT);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createEvent({ variables: { title, description, date, location, organizer } });
            // Handle success (e.g., redirect to event list)
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Create Event</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" required />
                <input type="text" value={organizer} onChange={(e) => setOrganizer(e.target.value)} placeholder="Organizer" required />
                <button type="submit" disabled={loading}>Create Event</button>
                {error && <p>Error: {error.message}</p>}
            </form>
        </div>
    );
};

export default CreateEvent;
