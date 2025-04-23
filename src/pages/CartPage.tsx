
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { CartProvider } from '@/hooks/useCart';

const CartPage = () => {
  const { items, updateQuantity, updateUsers, removeFromCart, getTotalPrice } = useCart();

  if (items.length === 0) {
    return (
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow py-16">
            <div className="container">
              <div className="max-w-4xl mx-auto text-center space-y-6">
                <h1 className="text-3xl font-bold text-darkblue">Seu Carrinho está Vazio</h1>
                <p className="text-gray-600">
                  Adicione alguns produtos ao seu carrinho para continuar.
                </p>
                <Button className="bg-darkblue hover:bg-blue-800" asChild>
                  <Link to="/planos">Ver Planos Disponíveis</Link>
                </Button>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </CartProvider>
    );
  }

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-16">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl font-bold text-darkblue mb-8">Carrinho de Compras</h1>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                      <table className="w-full">
                        <thead className="border-b border-gray-200">
                          <tr>
                            <th className="text-left py-3 text-gray-600">Produto</th>
                            <th className="text-center py-3 text-gray-600">Usuários</th>
                            <th className="text-center py-3 text-gray-600">Quantidade</th>
                            <th className="text-right py-3 text-gray-600">Preço</th>
                            <th className="py-3"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {items.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                              <td className="py-4 pr-4">
                                <div className="font-medium text-darkblue">{item.name}</div>
                              </td>
                              <td className="py-4">
                                <div className="flex items-center justify-center">
                                  <button 
                                    className="p-1 rounded-full hover:bg-gray-200"
                                    onClick={() => updateUsers(item.id, Math.max(1, item.users - 1))}
                                  >
                                    <Minus className="h-4 w-4 text-gray-600" />
                                  </button>
                                  <span className="mx-2 w-10 text-center">{item.users}</span>
                                  <button 
                                    className="p-1 rounded-full hover:bg-gray-200"
                                    onClick={() => updateUsers(item.id, item.users + 1)}
                                  >
                                    <Plus className="h-4 w-4 text-gray-600" />
                                  </button>
                                </div>
                              </td>
                              <td className="py-4">
                                <div className="flex items-center justify-center">
                                  <button 
                                    className="p-1 rounded-full hover:bg-gray-200"
                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                  >
                                    <Minus className="h-4 w-4 text-gray-600" />
                                  </button>
                                  <span className="mx-2 w-8 text-center">{item.quantity}</span>
                                  <button 
                                    className="p-1 rounded-full hover:bg-gray-200"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  >
                                    <Plus className="h-4 w-4 text-gray-600" />
                                  </button>
                                </div>
                              </td>
                              <td className="py-4 text-right">
                                <div className="font-medium">{(item.price * item.quantity).toLocaleString('pt-AO')} Kz</div>
                              </td>
                              <td className="py-4 pl-4 text-right">
                                <button 
                                  className="p-1 rounded-full hover:bg-gray-200 text-red-500"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <Trash2 className="h-5 w-5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6 space-y-4">
                      <h2 className="text-xl font-bold text-darkblue border-b border-gray-200 pb-4">Resumo do Pedido</h2>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="font-medium">{getTotalPrice().toLocaleString('pt-AO')} Kz</span>
                        </div>
                        
                        <div className="pt-2">
                          <div className="flex">
                            <Input 
                              placeholder="Código de cupom" 
                              className="rounded-r-none"
                            />
                            <Button variant="outline" className="rounded-l-none border-l-0">
                              Aplicar
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <div className="flex justify-between mb-4">
                          <span className="text-lg font-bold text-darkblue">Total</span>
                          <span className="text-lg font-bold text-darkblue">{getTotalPrice().toLocaleString('pt-AO')} Kz</span>
                        </div>
                        
                        <Button className="w-full bg-darkblue hover:bg-blue-800" size="lg" asChild>
                          <Link to="/pagamento">
                            <CreditCard className="mr-2 h-5 w-5" /> Finalizar Compra
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default CartPage;
