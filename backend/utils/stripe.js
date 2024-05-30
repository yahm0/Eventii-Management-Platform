const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createCharge = async (amount, source, description) => {
  return await stripe.charges.create({
    amount,
    currency: 'usd',
    source,
    description,
  });
};

module.exports = { createCharge };