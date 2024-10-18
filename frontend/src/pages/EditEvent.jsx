import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_EVENT, UPDATE_EVENT } from '../graphql/queries';

const EditEvent = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_EVENT, { variables: { id } });
    const [updateEvent] = useMutation(UPDATE_EVENT);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [organizer, setOrganizer] = useState('');

    useEffect(() => {
        if (data) {
            const event = data.event;
            setTitle(event.title);
            setDescription(event.description);
            setDate(event.date);
            setLocation(event.location);
            setOrganizer(event.organizer.name);
        }
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateEvent({ variables: { id, title, description, date, location, organizer } });
            // Handle success (e.g., redirect to event details)
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>Edit Event</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
                <input type="text" value={organizer} onChange={(e) => setOrganizer(e.target.value)} required />
                <button type="submit">Update Event</button>
            </form>
        </div>
    );
};

export default EditEvent;
