
import React from 'react';

interface PaymentIntegrationProps {
  reference: string;
  amount: number;
}

/**
 * Component to handle Express payment integration
 * This component is used to submit payment requests to the payment gateway
 */
const PaymentIntegration: React.FC<PaymentIntegrationProps> = ({ reference, amount }) => {
  const submitPayment = () => {
    // Abrimos diretamente uma nova janela com o iframe de pagamento
    const paymentUrl = `/api/gpo-frame?reference=${encodeURIComponent(reference)}&amount=${encodeURIComponent(amount)}`;
    
    window.open(paymentUrl, '_blank', 'width=800,height=700');
    
    console.log(`Enviando pagamento: Referência ${reference}, Valor ${amount}`);
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
