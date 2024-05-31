import React from 'react'; // Import the React library
import CheckoutForm from './CheckoutForm'; // Import the CheckoutForm component
import { loadStripe } from '@stripe/stripe-js'; // Import the loadStripe function from the Stripe library
import { Elements } from '@stripe/react-stripe-js'; // Import the Elements component from the Stripe library

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY); // Load the Stripe publishable key

// Define the EventDetails component to display event details
const EventDetails = ({ event }) => {
  return (
    <div>
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p>{new Date(event.date).toLocaleDateString()}</p>
      <p>{event.location}</p>
      <p>Fee: ${event.fee}</p>
      <Elements stripe={stripePromise}>
        <CheckoutForm event={event} />
      </Elements>
    </div>
  );
};

export default EventDetails; // Export the EventDetails component
