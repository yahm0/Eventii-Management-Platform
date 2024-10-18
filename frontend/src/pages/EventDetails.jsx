import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_EVENT } from '../graphql/queries';
import ReviewList from '../components/Reviews/ReviewList';
import ReviewForm from '../components/Reviews/ReviewForm';

const EventDetails = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_EVENT, {
        variables: { id },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const event = data.event;

    return (
        <div className="event-details">
            <h1>{event.title}</h1>
            <p>{event.description}</p>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            <p>Location: {event.location}</p>
            <p>Organizer: {event.organizer.name}</p>
            <ReviewList eventId={id} />
            <ReviewForm eventId={id} />
        </div>
    );
};

export default EventDetails;
