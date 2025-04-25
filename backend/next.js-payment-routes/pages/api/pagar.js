
import { getGpoPurchaseToken } from '../../utils/payment-utils';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido.' });
  }

  const { reference, amount } = req.body;
  if (!reference || amount === undefined) {
    return res.status(400).json({ error: 'Parâmetros ausentes.' });
  }

  try {
    const token = await getGpoPurchaseToken(reference, parseFloat(amount));
    res.redirect(302, `/api/gpo-frame?token=${encodeURIComponent(token)}`);
  } catch (error) {
    res.status(500).json({ error: `Erro: ${error.message}` });
  }
}
