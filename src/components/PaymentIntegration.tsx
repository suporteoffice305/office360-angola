
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
    const form = document.createElement('form');
    form.method = 'POST';
    
    // When using Next.js API routes on Vercel, replace this with:
    // form.action = '/api/pagar';
    form.action = '/backend/pagar.php'; // Keep this for now until migrated to Next.js
    
    form.target = '_blank';

    const refInput = document.createElement('input');
    refInput.type = 'hidden';
    refInput.name = 'reference';
    refInput.value = reference;

    const amountInput = document.createElement('input');
    amountInput.type = 'hidden';
    amountInput.name = 'amount';
    amountInput.value = amount.toString();

    form.appendChild(refInput);
    form.appendChild(amountInput);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
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
