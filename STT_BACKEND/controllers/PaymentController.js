const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);



const createIntentPayment = async (req, res) => {
  try {
    const { amount, currency, cardNumber, expMonth, expYear, cvc } = req.body;
    const temporaryCustomerId = "cus_PWcFyWqgBkFyfJ";

    // Create a PaymentIntent without confirming it immediately
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      customer: temporaryCustomerId,
    });

    res.json({ paymentIntent: paymentIntent.client_secret,
      paymentIntentData: paymentIntent,
      amount: req.body.amount,
      currency: req.body.currency});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

    

module.exports = {
    createIntentPayment
}