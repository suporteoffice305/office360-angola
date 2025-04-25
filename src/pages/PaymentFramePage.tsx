
import React from 'react';
import { useLocation } from 'react-router-dom';
import PaymentFrame from '../components/PaymentFrame';

const PaymentFramePage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  // Obter referência e valor da URL
  const reference = queryParams.get('reference') || `ORDER-${Date.now()}`;
  const amount = parseFloat(queryParams.get('amount') || '0');

  return (
    <div className="min-h-screen">
      <PaymentFrame reference={reference} amount={amount} />
    </div>
  );
};

export default PaymentFramePage;
