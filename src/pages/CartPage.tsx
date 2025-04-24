
import React from 'react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    // Navigate to the payment page
    navigate('/pagamento');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-darkblue mb-6">Seu Carrinho</h1>
            
            {items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-6">Seu carrinho está vazio.</p>
                <Button asChild className="bg-darkblue hover:bg-blue-800 transition-all duration-300">
                  <Link to="/planos">Ver Planos Disponíveis</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex flex-col md:flex-row justify-between border-b pb-6">
                      <div className="flex-grow mb-4 md:mb-0">
                        <h3 className="font-medium text-lg">{item.name}</h3>
                        <p className="text-gray-600">
                          {item.users} {item.users === 1 ? 'usuário' : 'usuários'}
                        </p>
                        <div className="flex items-center mt-2">
                          <div>
                            <label htmlFor={`quantity-${item.id}`} className="block text-sm text-gray-600 mb-1">
                              Quantidade
                            </label>
                            <input
                              id={`quantity-${item.id}`}
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                              className="w-20 border rounded p-1 text-sm"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-bold text-lg text-darkblue">
                          {(item.price * item.quantity).toLocaleString('pt-AO')} Kz
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center text-red-500 hover:text-red-700 mt-2 transition-colors duration-300"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          <span className="text-sm">Remover</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-medium">Total</span>
                    <span className="text-2xl font-bold text-darkblue">
                      {getTotalPrice().toLocaleString('pt-AO')} Kz
                    </span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild variant="outline" className="flex-1 transition-all duration-300">
                      <Link to="/planos">Continuar Comprando</Link>
                    </Button>
                    <Button 
                      className="flex-1 bg-darkblue hover:bg-blue-800 transition-all duration-300"
                      onClick={handleCheckout}
                    >
                      Finalizar Compra
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
