import React from 'react';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

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

export default EventDetails;
