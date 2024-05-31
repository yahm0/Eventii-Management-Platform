import React from 'react'; // Import the React library
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'; // Import the CardElement, useStripe, and useElements hooks from the Stripe library
import { useMutation } from '@apollo/client'; // Import the useMutation hook from Apollo Client
import { REGISTER_FOR_EVENT } from '../../graphql/mutations'; // Import the REGISTER_FOR_EVENT mutation

// Define the CheckoutForm component to handle event registration
const CheckoutForm = ({ event }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [registerForEvent] = useMutation(REGISTER_FOR_EVENT);

  // Define the handleSubmit function to handle form submission
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

  // Return a form for users to enter their payment information
  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay {event.fee} USD</button>
    </form>
  );
};

export default CheckoutForm; // Export the CheckoutForm component
