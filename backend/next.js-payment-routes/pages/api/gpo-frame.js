
export default function handler(req, res) {
  const { token } = req.query;
  
  if (!token) {
    res.status(400).send("Token não especificado.");
    return;
  }
  
  const htmlContent = `<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <title>Pagamento - EMIS</title>
    <style>
        body { margin: 0; padding: 0; background: #f7f7f7; display: flex; align-items: center; justify-content: center; height: 100vh; }
        iframe { width: 100%; max-width: 600px; height: 650px; border: none; box-shadow: 0 0 10px rgba(0,0,0,0.15); border-radius: 12px; }
    </style>
</head>
<body>
    <iframe src="https://pagamentonline.emis.co.ao/online-payment-gateway/portal/frame?token=${encodeURIComponent(token)}"></iframe>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(htmlContent);
}
