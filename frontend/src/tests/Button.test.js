import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Button from '../components/Button';

test('button click changes text', () => {
    render(<Button />);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(buttonElement);
    const changedText = screen.getByText(/clicked/i);
    expect(changedText).toBeInTheDocument();
});
