import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import paypal from '@paypal/checkout-server-sdk';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3004;

app.use(cors({ origin: '*' }));
app.use(express.json());

// PayPal client setup
const paypalClient = () => {
  const env = new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  );
  return new paypal.core.PayPalHttpClient(env);
};

app.get('/health', (_, res) => res.json({ status: 'OK', service: 'payment-service', port: PORT }));

// Create PayPal order
app.post('/api/payment/paypal/create-order', async (req, res) => {
  const { amount, currency = 'EUR' } = req.body;
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{ amount: { currency_code: currency, value: String(amount || '0.01') } }]
  });
  try {
    const order = await paypalClient().execute(request);
    res.status(201).json({ id: order.result.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Capture PayPal order
app.post('/api/payment/paypal/capture-order', async (req, res) => {
  const { orderID } = req.body;
  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});
  try {
    const capture = await paypalClient().execute(request);
    res.json({ status: 'success', capture: capture.result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Stripe payment intent (placeholder — add real key to enable)
app.post('/api/payment/stripe/create-intent', async (req, res) => {
  const { amount, currency = 'eur' } = req.body;
  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_placeholder')
    return res.status(400).json({ error: 'Stripe not configured. Add STRIPE_SECRET_KEY to .env' });
  try {
    const { default: Stripe } = await import('stripe');
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const intent = await stripe.paymentIntents.create({ amount: Math.round(amount * 100), currency });
    res.json({ clientSecret: intent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`💳 Payment Service running on port ${PORT}`));
