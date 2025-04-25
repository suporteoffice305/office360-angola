
import fetch from 'node-fetch';

const GPO_FRAME_TOKEN = 'a53787fd-b49e-4469-a6ab-fa6acf19db48';
const GPO_API_URL = 'https://pagamentonline.emis.co.ao/online-payment-gateway/portal/frameToken';
const GPO_CSS_URL = 'https://pagamentonline.emis.co.ao/gpoconfig/qr_code_mobile_v2.css';

// Versão em JavaScript da função getGpoPurchaseToken do PHP
export async function getGpoPurchaseToken(reference, amount) {
  const payload = {
    reference: reference,
    amount: amount.toFixed(2),
    token: GPO_FRAME_TOKEN,
    mobile: 'AUTHORIZATION',
    card: 'AUTHORIZATION',
    qrCode: 'PAYMENT',
    callbackUrl: 'https://office.it.ao/api/gpo-callback', // Atualize para URL da Vercel
    cssUrl: GPO_CSS_URL
  };

  try {
    const response = await fetch(GPO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.id) {
      throw new Error(`GPO error: ${JSON.stringify(data)}`);
    }

    return data.id;
  } catch (error) {
    console.error('Error in getGpoPurchaseToken:', error);
    throw error;
  }
}
