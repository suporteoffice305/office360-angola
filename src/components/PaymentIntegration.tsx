
import React from 'react';

interface PaymentIntegrationProps {
  reference: string;
  amount: number;
}

const PaymentIntegration: React.FC<PaymentIntegrationProps> = ({ reference, amount }) => {
  const submitPayment = async () => {
    try {
      const response = await fetch('/api/pagar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference, amount }),
      });

      if (response.redirected) {
        window.open(response.url, '_blank', 'width=800,height=700');
        return;
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        if (data?.token) {
          window.open(`/api/gpo-frame?token=${encodeURIComponent(data.token)}`, '_blank', 'width=800,height=700');
        } else {
          alert('Erro ao iniciar pagamento: ' + (data?.error || 'Erro desconhecido'));
        }
      } else {
        const text = await response.text();
        alert('Erro inesperado do servidor: ' + text);
      }
    } catch (err: any) {
      alert('Erro ao processar pagamento: ' + err.message);
    }
  };

  return (
    <div className="mt-4">
      <button 
        onClick={submitPayment}
        className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition-all duration-300"
      >
        Processar Pagamento
      </button>
      <p className="text-sm text-gray-500 mt-2">
        Clique para iniciar o processamento do pagamento via Express
      </p>
    </div>
  );
};

export default PaymentIntegration;
