
import React, { useEffect, useState } from 'react';
import { generatePaymentFrame } from '../api/gpo-frame';

interface PaymentFrameProps {
  reference: string;
  amount: number;
}

const PaymentFrame: React.FC<PaymentFrameProps> = ({ reference, amount }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [frameUrl, setFrameUrl] = useState<string | null>(null);

  useEffect(() => {
    async function loadPaymentFrame() {
      try {
        setLoading(true);
        const result = await generatePaymentFrame(reference, amount);
        
        if (result.success && result.frameUrl) {
          setFrameUrl(result.frameUrl);
        } else {
          setError('Não foi possível carregar o frame de pagamento');
        }
      } catch (err) {
        setError('Erro ao processar pagamento');
        console.error('Erro no frame de pagamento:', err);
      } finally {
        setLoading(false);
      }
    }

    loadPaymentFrame();
  }, [reference, amount]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-darkblue"></div>
        <p className="ml-3">Carregando pagamento...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p><strong>Erro:</strong> {error}</p>
          <p>Por favor, tente novamente mais tarde.</p>
        </div>
        <button 
          onClick={() => window.close()} 
          className="mt-4 bg-darkblue hover:bg-blue-800 text-white font-medium py-2 px-4 rounded"
        >
          Fechar
        </button>
      </div>
    );
  }

  // Exibir o iframe de pagamento
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-2">
        {frameUrl ? (
          <iframe 
            src={frameUrl}
            title="Payment Gateway"
            className="w-full h-[650px] border-none"
            sandbox="allow-scripts allow-forms allow-same-origin"
          ></iframe>
        ) : (
          <div className="p-6 text-center">Carregando pagamento...</div>
        )}
      </div>
      <button 
        onClick={() => window.close()} 
        className="mt-4 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded"
      >
        Cancelar pagamento
      </button>
    </div>
  );
};

export default PaymentFrame;
