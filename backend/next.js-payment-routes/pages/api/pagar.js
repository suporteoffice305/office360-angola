
import { getGpoPurchaseToken } from '../../utils/payment-utils';

export default async function handler(req, res) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido.' });
  }

  // Check if required parameters are present
  const { reference, amount } = req.body;
  if (!reference || amount === undefined) {
    return res.status(400).json({ error: 'Parâmetros ausentes.' });
  }

  try {
    // Get purchase token
    const token = await getGpoPurchaseToken(reference, parseFloat(amount));
    
    // Redirect to payment frame
    res.redirect(302, `/api/gpo-frame?token=${encodeURIComponent(token)}`);
  } catch (error) {
    console.error('Erro ao processar pagamento:', error);
    res.status(500).json({ error: `Erro: ${error.message}` });
  }
}
