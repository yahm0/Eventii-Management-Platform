import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PrivacyPolicy from '../pages/PrivacyPolicy';

test('renders privacy policy with title', () => {
    render(<PrivacyPolicy title="Privacy Policy" />);
    const titleElement = screen.getByText(/privacy policy/i);
    expect(titleElement).toBeInTheDocument();
});
