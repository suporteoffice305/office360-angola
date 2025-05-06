
export default function handler(req, res) {
  const { token } = req.query;

  if (!token) {
    res.status(400).send("Token não especificado.");
    return;
  }

  // For demonstration purposes, we'll create a valid HTML frame
  // that simulates a payment provider iframe
  const htmlContent = `<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <title>Pagamento - EMIS</title>
    <style>
        body { margin: 0; padding: 0; background: #f7f7f7; font-family: Arial, sans-serif; }
        .container { max-width: 600px; margin: 20px auto; padding: 20px; background: white; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { color: #1a365d; margin-bottom: 10px; }
        .payment-form { display: flex; flex-direction: column; gap: 15px; }
        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; margin-bottom: 5px; font-weight: bold; }
        .form-group input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; }
        .btn { background: #1a365d; color: white; border: none; padding: 12px; border-radius: 4px; cursor: pointer; font-size: 16px; }
        .btn:hover { background: #2a4365; }
        .success-message { text-align: center; padding: 20px; background: #f0fff4; border-radius: 4px; border-left: 4px solid #38a169; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Sistema de Pagamento</h1>
            <p>Complete os detalhes abaixo para finalizar seu pagamento</p>
        </div>
        
        <div class="payment-form">
            <div class="form-group">
                <label for="cardNumber">Número do Cartão</label>
                <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456">
            </div>
            
            <div style="display: flex; gap: 15px;">
                <div class="form-group" style="flex: 1;">
                    <label for="expiry">Data de Validade</label>
                    <input type="text" id="expiry" placeholder="MM/AA">
                </div>
                
                <div class="form-group" style="flex: 1;">
                    <label for="cvv">CVV</label>
                    <input type="text" id="cvv" placeholder="123">
                </div>
            </div>
            
            <div class="form-group">
                <label for="name">Nome no Cartão</label>
                <input type="text" id="name" placeholder="NOME COMPLETO">
            </div>
            
            <button class="btn" onclick="showSuccess()">Pagar</button>
            
            <div id="successMessage" style="display: none;" class="success-message">
                <p>✓ Pagamento processado com sucesso!</p>
                <p>Esta janela será fechada em <span id="countdown">5</span> segundos.</p>
            </div>
        </div>
    </div>
    
    <script>
        function showSuccess() {
            document.getElementById('successMessage').style.display = 'block';
            let seconds = 5;
            const countdown = document.getElementById('countdown');
            
            const timer = setInterval(() => {
                seconds--;
                countdown.textContent = seconds;
                
                if (seconds <= 0) {
                    clearInterval(timer);
                    window.close();
                }
            }, 1000);
        }
    </script>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(htmlContent);
}
