
import fetch from 'node-fetch';

const GPO_FRAME_TOKEN = 'a53787fd-b49e-4469-a6ab-fa6acf19db48';
const GPO_API_URL = 'https://pagamentonline.emis.co.ao/online-payment-gateway/portal/frameToken';
const GPO_CSS_URL = 'https://pagamentonline.emis.co.ao/gpoconfig/qr_code_mobile_v2.css';

export async function getGpoPurchaseToken(reference, amount) {
  const payload = {
    reference: String(reference),
    amount: Number(amount).toFixed(2),
    token: GPO_FRAME_TOKEN,
    callbackUrl: 'https://office.it.ao/api/gpo-callback',
    cssUrl: GPO_CSS_URL,
    // Os métodos abaixo devem ser enviados apenas se sua conta EMIS estiver habilitada para eles
    mobile: 'AUTHORIZATION', // ou 'PAYMENT' se for o caso
    card: 'AUTHORIZATION',   // ou 'PAYMENT'
    qrCode: 'PAYMENT'        // ou 'AUTHORIZATION'
  };

  try {
    const response = await fetch(GPO_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    if (!data.id) {
      throw new Error(`GPO error: ${JSON.stringify(data)}`);
    }
    return data.id;
  } catch (error) {
    throw error;
  }
}
