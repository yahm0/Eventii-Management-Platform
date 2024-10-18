import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from '../components/Header';

test('renders the header with correct text', () => {
    render(<Header />);
    const headerText = screen.getByText(/Eventii Management/i);
    expect(headerText).toBeInTheDocument();
});
