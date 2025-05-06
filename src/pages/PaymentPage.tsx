
import React, { useState, useEffect } from 'react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '@/utils/formatters';

const PaymentPage = () => {
  const { items, getTotalPrice } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('express');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      navigate('/carrinho');
    }
  }, [items, navigate]);

  const handleProcessPayment = async () => {
    setIsProcessing(true);
    
    try {
      const reference = `ORDER-${Date.now()}`;
      
      // Process Express payment
      if (paymentMethod === 'express') {
        // This would normally make a request to your backend
        // Simulating a call to the backend to get a token
        const response = await fetch('/api/gpo-frame?token=sample-token');
        
        if (response.ok) {
          // Open in new window
          window.open('/api/gpo-frame?token=sample-token', '_blank');
          
          toast({
            title: "Pagamento iniciado",
            description: "Uma nova janela foi aberta para completar o pagamento.",
          });
        } else {
          throw new Error('Falha ao iniciar pagamento');
        }
      } else {
        // Bank transfer option
        navigate('/pagamento-processo');
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Houve um problema ao processar seu pagamento. Tente novamente.",
        variant: "destructive"
      });
      console.error("Payment error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <main className="container max-w-6xl mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-darkblue">Finalizar Compra</h1>
            <p className="text-gray-600 mt-2">Selecione o método de pagamento para completar sua compra</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          {item.quantity} x {item.users} {item.users === 1 ? 'usuário' : 'usuários'}
                        </p>
                      </div>
                      <span className="font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="w-full flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-darkblue">
                      {formatPrice(getTotalPrice())}
                    </span>
                  </div>
                </CardFooter>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Card className="transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Método de Pagamento</CardTitle>
                  <CardDescription>
                    Escolha como deseja pagar pelo seu pedido
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <RadioGroup 
                      defaultValue="express" 
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-300">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express" className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Express</p>
                              <p className="text-sm text-gray-500">Pagamento rápido via Express</p>
                            </div>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-300">
                        <RadioGroupItem value="bank" id="bank" />
                        <Label htmlFor="bank" className="flex-1 cursor-pointer">
                          <div>
                            <p className="font-medium">Transferência Bancária</p>
                            <p className="text-sm text-gray-500">Transferir para nossa conta bancária</p>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                    
                    {paymentMethod === 'express' && (
                      <div className="space-y-4 mt-6 border rounded-md p-4 bg-gray-50 transition-all duration-300">
                        <h3 className="font-medium">Pagamento via Express:</h3>
                        <p className="text-sm text-gray-600">
                          Clique em "Processar Pagamento" para ser redirecionado para a plataforma Express 
                          e completar seu pagamento de forma segura.
                        </p>
                        <div className="text-sm text-gray-500">
                          <p className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Transação segura e processada pela Express
                          </p>
                        </div>
                        
                        <Button 
                          className="w-full bg-darkblue hover:bg-blue-800 transition-all duration-300 transform hover:scale-[1.02]"
                          onClick={handleProcessPayment}
                          disabled={isProcessing}
                        >
                          {isProcessing ? 'Processando...' : 'Processar Pagamento'}
                        </Button>
                      </div>
                    )}
                    
                    {paymentMethod === 'bank' && (
                      <div className="space-y-4 mt-6 border rounded-md p-4 bg-gray-50 transition-all duration-300">
                        <h3 className="font-medium">Detalhes da Transferência:</h3>
                        <div className="space-y-2 text-sm">
                          <p><span className="font-medium">Banco:</span> Banco Económico</p>
                          <p><span className="font-medium">Titular:</span> Office360 Lda</p>
                          <p><span className="font-medium">Conta:</span> 123456789</p>
                          <p><span className="font-medium">IBAN:</span> AO06 0000 0000 0123 4567 8910 5</p>
                          <p className="text-darkblue font-medium mt-4">
                            Após a transferência, envie o comprovante para payments@office360.co.ao
                          </p>
                        </div>
                        
                        <Button 
                          className="w-full bg-darkblue hover:bg-blue-800 transition-all duration-300 transform hover:scale-[1.02]"
                          onClick={handleProcessPayment}
                          disabled={isProcessing}
                        >
                          Continuar
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;
