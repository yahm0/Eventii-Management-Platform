import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms</Link></li>
                <li><Link to="/auth">Login/Signup</Link></li>
                <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
                <li><Link to="/search-events">Search Events</Link></li>
                <li><Link to="/create-event">Create Event</Link></li>
                <li><Link to="/user-profile">User Profile</Link></li>
            </ul>
        </nav>
    );
};

export default Navigation;
