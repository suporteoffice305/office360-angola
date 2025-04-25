
import { getGpoPurchaseToken } from '../../utils/payment-utils';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método não permitido.' });
    return;
  }

  // Verifica se os parâmetros necessários foram enviados
  const { reference, amount } = req.body;
  if (!reference || amount === undefined) {
    res.status(400).json({ error: 'Parâmetros ausentes.' });
    return;
  }

  try {
    // Obtém o token de compra
    const token = await getGpoPurchaseToken(reference, parseFloat(amount));
    
    // Redireciona para o frame de pagamento
    res.redirect(`/api/gpo-frame?token=${encodeURIComponent(token)}`);
  } catch (error) {
    console.error('Erro ao processar pagamento:', error);
    res.status(500).json({ error: `Erro: ${error.message}` });
  }
}
