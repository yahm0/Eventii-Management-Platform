import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useMutation } from '@apollo/client';
import { REGISTER_FOR_EVENT } from '../../graphql/mutations';

const CheckoutForm = ({ event }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [registerForEvent] = useMutation(REGISTER_FOR_EVENT);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);
    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      console.error(error);
    } else {
      await registerForEvent({ variables: { eventId: event.id, token: token.id } });
      // Handle successful registration (e.g., redirect, show message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay {event.fee} USD</button>
    </form>
  );
};

export default CheckoutForm;
