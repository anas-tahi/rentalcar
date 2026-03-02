// paypalController.js
import  client  from '../config/paypalClient.js';
import paypal from '@paypal/checkout-server-sdk';

export const createOrder = async (req, res) => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: '0.01' // Replace with the actual amount
      }
    }]
  });

  try {
    const order = await client.execute(request);
    res.status(201).json({ id: order.result.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const captureOrder = async (req, res) => {
  const { orderID } = req.body;
  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  try {
    const capture = await client.execute(request);
    res.status(200).json({ status: 'success', capture });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
