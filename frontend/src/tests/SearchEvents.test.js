import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchEvents from '../pages/SearchEvents';

test('renders loading state', () => {
    render(<SearchEvents />);
    const loadingElement = screen.getByText(/loading/i);
    expect(loadingElement).toBeInTheDocument();
});

test('renders error state', () => {
    render(<SearchEvents error="Failed to load events" />);
    const errorElement = screen.getByText(/failed to load events/i);
    expect(errorElement).toBeInTheDocument();
});

test('renders events list', () => {
    const events = [{ id: 1, title: 'Event 1' }, { id: 2, title: 'Event 2' }];
    render(<SearchEvents events={events} />);
    const eventElement = screen.getByText(/event 1/i);
    expect(eventElement).toBeInTheDocument();
});
