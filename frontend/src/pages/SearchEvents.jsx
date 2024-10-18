import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { SEARCH_EVENTS } from '../graphql/queries';
import EventList from '../components/Events/EventList';

const SearchEvents = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { loading, error, data } = useQuery(SEARCH_EVENTS, {
        variables: { searchTerm },
        skip: !searchTerm,
    });

    const handleSearch = (e) => {
        e.preventDefault();
        // Trigger search
    };

    return (
        <div>
            <h1>Search Events</h1>
            <form onSubmit={handleSearch}>
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." />
                <button type="submit">Search</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data && <EventList events={data.searchEvents} />}
        </div>
    );
};

export default SearchEvents;
