const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Import stripe package and initialize it with the secret key

// Function to create a charge using the Stripe API
const createCharge = async (amount, source, description) => {
  return await stripe.charges.create({
    amount: amount * 100, // Amount in cents
    currency: 'usd',
    source: source,
    description: description,
  });
};

module.exports = { createCharge }; // Export the function
