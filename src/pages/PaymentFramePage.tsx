
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentFramePage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const token = queryParams.get('token');

  useEffect(() => {
    // If token is missing, redirect to home page
    if (!token) {
      window.location.href = '/';
    }
  }, [token]);

  if (!token) {
    return <div className="min-h-screen flex items-center justify-center">Redirecionando...</div>;
  }

  return (
    <div className="min-h-screen">
      <iframe 
        src={`https://pagamentonline.emis.co.ao/online-payment-gateway/portal/frame?token=${encodeURIComponent(token)}`}
        className="w-full h-screen border-none"
        title="Sistema de Pagamento EMIS"
      />
    </div>
  );
};

export default PaymentFramePage;
