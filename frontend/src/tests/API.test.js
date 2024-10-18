import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Events from '../components/Events';

const mock = new MockAdapter(axios);

test('fetches and displays events', async () => {
    mock.onGet('/api/events').reply(200, [{ id: 1, title: 'Mock Event' }]);

    render(<Events />);

    await waitFor(() => {
        const eventElement = screen.getByText(/mock event/i);
        expect(eventElement).toBeInTheDocument();
    });
});
