import React from 'react';

const UserProfile = () => {
    // Fetch user data from context or API
    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        events: [
            { id: 1, title: 'Event 1' },
            { id: 2, title: 'Event 2' },
        ],
    };

    return (
        <div>
            <h1>User Profile</h1>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <h2>Your Events</h2>
            <ul>
                {user.events.map(event => (
                    <li key={event.id}>{event.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserProfile;
