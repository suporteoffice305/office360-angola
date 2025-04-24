// pages/api/gpo-callback.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      res.status(405).end('Method Not Allowed');
      return;
    }
    const payload = req.body;
    console.log('GPO Callback received at', new Date().toISOString(), payload);
    // Aqui você pode salvar em banco de dados ou serviço de logs
    res.status(200).send('OK');
  }
  