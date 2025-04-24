
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider, useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CreditCard, CircleDollarSign, Landmark } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

/**
 * Componente de conteúdo da página de pagamento
 * Preparado para integração com gateway de pagamento emis.ao via backend PHP/Laravel
 */
const PaymentContent = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const { toast } = useToast();

  // Função para lidar com o envio do formulário de pagamento
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsProcessing(true);
    
    // Simula processamento (será substituído pela integração real com emis.ao)
    setTimeout(() => {
      toast({
        title: "Pagamento processado",
        description: "O seu pedido foi processado com sucesso.",
      });
      clearCart();
      setIsProcessing(false);
      
      // Aqui será feita a chamada para a API PHP/Laravel que integrará com emis.ao
      // window.location.href = '/confirmacao-pedido'; // Redirecionar após sucesso
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold text-darkblue mb-6">Finalizar Pagamento</h1>
              <p className="text-gray-600 mb-4">Seu carrinho está vazio. Adicione produtos antes de prosseguir com o pagamento.</p>
              <Button asChild className="bg-darkblue hover:bg-blue-800">
                <a href="/planos">Ver Planos</a>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-darkblue mb-6">Finalizar Pagamento</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="col-span-1 lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Selecione o método de pagamento</CardTitle>
                    <CardDescription>
                      Escolha um método de pagamento seguro
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit}>
                      <RadioGroup 
                        defaultValue="card" 
                        className="grid gap-6 mb-8"
                        value={paymentMethod}
                        onValueChange={setPaymentMethod}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                            <CreditCard className="h-5 w-5" />
                            <span>Cartão de Crédito/Débito</span>
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="multicaixa" id="multicaixa" />
                          <Label htmlFor="multicaixa" className="flex items-center gap-2 cursor-pointer">
                            <CircleDollarSign className="h-5 w-5" />
                            <span>Multicaixa Express</span>
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="bank" id="bank" />
                          <Label htmlFor="bank" className="flex items-center gap-2 cursor-pointer">
                            <Landmark className="h-5 w-5" />
                            <span>Transferência Bancária</span>
                          </Label>
                        </div>
                      </RadioGroup>

                      {/* Campos específicos para cada método de pagamento */}
                      {paymentMethod === 'card' && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <Label htmlFor="cardName">Nome no cartão</Label>
                              <Input id="cardName" placeholder="Nome como aparece no cartão" required />
                            </div>
                            
                            <div>
                              <Label htmlFor="cardNumber">Número do cartão</Label>
                              <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="expiry">Data de validade</Label>
                                <Input id="expiry" placeholder="MM/AA" required />
                              </div>
                              <div>
                                <Label htmlFor="cvv">CVV</Label>
                                <Input id="cvv" placeholder="123" required />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {paymentMethod === 'multicaixa' && (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="phone">Número de telefone</Label>
                            <Input id="phone" placeholder="9XX XXX XXX" required />
                          </div>
                          <p className="text-sm text-gray-500">
                            Irá receber uma notificação no seu telefone para confirmar o pagamento.
                          </p>
                        </div>
                      )}

                      {paymentMethod === 'bank' && (
                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 rounded-md">
                            <p className="font-medium">Detalhes da conta bancária:</p>
                            <ul className="mt-2 space-y-1 text-sm">
                              <li>Banco: BAI</li>
                              <li>Titular: Office360 Lda</li>
                              <li>IBAN: AO06005500000123456789014</li>
                              <li>Referência: Incluir seu email no comprovativo</li>
                            </ul>
                            
                            <div className="mt-4">
                              <Label htmlFor="receipt">Comprovativo de pagamento</Label>
                              <Input id="receipt" type="file" className="mt-1" />
                            </div>
                          </div>
                        </div>
                      )}

                      <Button 
                        type="submit" 
                        className="w-full mt-6 bg-darkblue hover:bg-blue-800"
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Processando...' : 'Finalizar Pagamento'}
                      </Button>
                      
                      <div className="mt-4 text-center text-xs text-gray-500">
                        <p>Pagamento seguro processado por emis.ao</p>
                        <p className="mt-1">Seus dados estão protegidos por criptografia SSL</p>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
              
              <div className="col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Resumo do Pedido</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {items.map((item) => (
                        <li key={item.id} className="flex justify-between">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">
                              {item.quantity} × {item.users} usuários
                            </p>
                          </div>
                          <span className="font-medium">
                            {(item.price * item.quantity).toLocaleString('pt-AO')} Kz
                          </span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-6 border-t pt-4">
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span className="text-lg font-bold text-darkblue">
                          {getTotalPrice().toLocaleString('pt-AO')} Kz
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

/**
 * Página de pagamento envolvida pelo CartProvider
 * Componente preparado para integração com backend PHP/Laravel e gateway emis.ao
 */
const PaymentPage = () => {
  return (
    <CartProvider>
      <PaymentContent />
    </CartProvider>
  );
};

export default PaymentPage;
