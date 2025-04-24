
import React, { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('emis');
  const [loading, setLoading] = useState(false);

  // Check if cart is empty and redirect if needed
  if (items.length === 0) {
    return navigate('/carrinho');
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate payment processing - in production this would integrate with EMIS
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success flow
      toast({
        title: "Pagamento processado com sucesso!",
        description: "Você receberá um email com os detalhes da sua compra.",
      });
      
      // Clear cart after successful payment
      clearCart();
      
      // Redirect to success page or home
      navigate('/');
    } catch (error) {
      toast({
        title: "Erro no processamento do pagamento",
        description: "Por favor, tente novamente ou use outro método de pagamento.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-darkblue">Finalizar Compra</h1>
            <p className="text-gray-600 mt-2">Selecione o método de pagamento para completar sua compra</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Order Summary */}
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
                        {(item.price * item.quantity).toLocaleString('pt-AO')} Kz
                      </span>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="w-full flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-darkblue">
                      {getTotalPrice().toLocaleString('pt-AO')} Kz
                    </span>
                  </div>
                </CardFooter>
              </Card>
            </div>

            {/* Payment Form */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Método de Pagamento</CardTitle>
                  <CardDescription>
                    Escolha como deseja pagar pelo seu pedido
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePayment}>
                    <div className="space-y-6">
                      <RadioGroup 
                        defaultValue="emis" 
                        value={paymentMethod}
                        onValueChange={setPaymentMethod}
                        className="space-y-4"
                      >
                        {/* EMIS Payment Option */}
                        <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-gray-50">
                          <RadioGroupItem value="emis" id="emis" />
                          <Label htmlFor="emis" className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">EMIS (Recomendado)</p>
                                <p className="text-sm text-gray-500">Pagamento seguro via EMIS</p>
                              </div>
                              <img 
                                src="/lovable-uploads/8d983a1a-eec6-487c-88be-efec0c2f85e1.png" 
                                alt="EMIS" 
                                className="h-8"
                              />
                            </div>
                          </Label>
                        </div>

                        {/* Bank Transfer Option */}
                        <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-gray-50">
                          <RadioGroupItem value="bank" id="bank" />
                          <Label htmlFor="bank" className="flex-1 cursor-pointer">
                            <div>
                              <p className="font-medium">Transferência Bancária</p>
                              <p className="text-sm text-gray-500">Transferir para nossa conta bancária</p>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>

                      {/* EMIS Payment Form */}
                      {paymentMethod === 'emis' && (
                        <div className="space-y-4 mt-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                              <Label htmlFor="card-number">Número do Cartão</Label>
                              <Input 
                                id="card-number" 
                                placeholder="0000 0000 0000 0000" 
                                className="mt-1"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="expiry">Data de Validade</Label>
                              <Input 
                                id="expiry" 
                                placeholder="MM/AA" 
                                className="mt-1"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="cvv">CVV</Label>
                              <Input 
                                id="cvv" 
                                placeholder="123" 
                                className="mt-1"
                                maxLength={4}
                                required
                              />
                            </div>
                            <div className="col-span-2">
                              <Label htmlFor="name">Nome no Cartão</Label>
                              <Input 
                                id="name" 
                                placeholder="Nome como aparece no cartão" 
                                className="mt-1"
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="text-sm text-gray-500">
                            <p className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                              Seus dados de pagamento estão seguros e criptografados
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {/* Bank Transfer Details */}
                      {paymentMethod === 'bank' && (
                        <div className="space-y-4 mt-6 border rounded-md p-4 bg-gray-50">
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
                        </div>
                      )}
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-darkblue hover:bg-blue-800"
                        disabled={loading}
                      >
                        {loading ? "Processando..." : `Pagar ${getTotalPrice().toLocaleString('pt-AO')} Kz`}
                      </Button>
                    </div>
                  </form>
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
