
import fetch from 'node-fetch';

// Configuration that would normally be in environment variables on Vercel
const GPO_FRAME_TOKEN = 'a53787fd-b49e-4469-a6ab-fa6acf19db48';
const GPO_API_URL = 'https://pagamentonline.emis.co.ao/online-payment-gateway/portal/frameToken';
const GPO_CSS_URL = 'https://pagamentonline.emis.co.ao/gpoconfig/qr_code_mobile_v2.css';
const CALLBACK_URL = 'https://office.it.ao/api/gpo-callback'; // Update this to your Vercel deployment URL

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método não permitido' });
    return;
  }

  // Extract parameters from body
  const { reference, amount } = req.body;
  
  if (!reference || !amount) {
    res.status(400).json({ error: 'Parâmetros ausentes' });
    return;
  }

  try {
    const token = await getGpoPurchaseToken(reference, parseFloat(amount));
    
    // Instead of PHP header() redirect, we return a redirect status and location
    res.redirect(302, `https://pagamentonline.emis.co.ao/online-payment-gateway/portal/frame?token=${encodeURIComponent(token)}`);
  } catch (error) {
    console.error('Erro ao processar pagamento:', error);
    res.status(500).json({ error: `Erro: ${error.message}` });
  }
}

async function getGpoPurchaseToken(reference, amount) {
  const payload = {
    reference: reference,
    amount: amount.toFixed(2),
    token: GPO_FRAME_TOKEN,
    mobile: 'AUTHORIZATION',
    card: 'AUTHORIZATION',
    qrCode: 'PAYMENT',
    callbackUrl: CALLBACK_URL,
    cssUrl: GPO_CSS_URL
  };

  const response = await fetch(GPO_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Erro na API GPO: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  
  if (!data.id) {
    throw new Error('Erro GPO: ' + JSON.stringify(data));
  }

  return data.id;
}
