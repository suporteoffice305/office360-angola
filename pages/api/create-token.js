// pages/api/create-token.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const { reference, amount } = req.body;
  if (!reference || !amount) {
    res.status(400).json({ message: 'Missing reference or amount' });
    return;
  }

  const payload = {
    reference,
    amount: parseFloat(amount).toFixed(2),
    token: process.env.GPO_FRAME_TOKEN,
    mobile: 'AUTHORIZATION',
    card: 'AUTHORIZATION',
    qrCode: 'PAYMENT',
    callbackUrl: process.env.CALLBACK_URL,
    cssUrl: process.env.GPO_CSS_URL
  };

  try {
    const response = await fetch(process.env.GPO_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      // timeout em Node-fetch não é nativo, mas a Vercel cuida de timeouts
    });
    const data = await response.json();
    if (!data.id) {
      throw new Error('GPO error: ' + JSON.stringify(data));
    }
    res.status(200).json({ token: data.id });
  } catch (error) {
    console.error('Error creating token:', error);
    res.status(500).json({ message: error.message });
  }
}
