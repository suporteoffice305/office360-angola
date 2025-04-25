
import React from 'react';
import { useLocation } from 'react-router-dom';
import PaymentIntegration from '../components/PaymentIntegration';

const PaymentFramePage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const reference = queryParams.get('reference') || `ORDER-${Date.now()}`;
  const amount = parseFloat(queryParams.get('amount') || '0');

  return (
    <div className="min-h-screen">
      <PaymentIntegration reference={reference} amount={amount} />
    </div>
  );
};

export default PaymentFramePage;
