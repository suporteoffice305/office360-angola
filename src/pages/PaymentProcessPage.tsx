
import React, { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const PaymentProcessPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's a selected payment method
    const paymentMethod = localStorage.getItem('selectedPaymentMethod');
    
    if (!paymentMethod) {
      toast({
        title: "Erro no processo de pagamento",
        description: "Por favor, selecione um método de pagamento primeiro.",
        variant: "destructive"
      });
      navigate('/pagamento');
      return;
    }

    toast({
      title: "Redirecionando para o processamento de pagamento",
      description: `Método selecionado: ${paymentMethod === 'express' ? 'Express' : 'Transferência Bancária'}`,
    });

    // This is a placeholder page - the actual payment processing will happen in the PHP page
    // The user will implement the actual form in PHP
  }, [toast, navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Processando Pagamento</h2>
          <p className="mt-2 text-sm text-gray-600">
            Aguarde enquanto redirecionamos você para o processador de pagamento.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-darkblue"></div>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessPage;
