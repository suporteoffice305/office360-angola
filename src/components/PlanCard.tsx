
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, ShoppingCart } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

/**
 * Card de plano individual.
 * - Aceita objeto de plano (id, nome, preço, features, destaque)
 * - Permite selecionar número de usuários (mínimo: 1)
 * - Botão ocupa sempre todo o espaço e é quadrado, responsivo
 * - Integração total com carrinho
 */
interface PlanProps {
  plan: {
    id: string;
    name: string;
    price: number;
    features: string[];
    featured?: boolean;
  }
}

const PlanCard = ({ plan }: PlanProps) => {
  const [users, setUsers] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  // Handler para adicionar ao carrinho
  const handleAddToCart = () => {
    addToCart({
      id: plan.id,
      name: plan.name,
      price: plan.price * users,
      users
    }, 1);
    toast({
      title: "Adicionado ao carrinho",
      description: `${plan.name} para ${users} usuário${users > 1 ? 's' : ''} adicionado.`,
    });
  };

  // Handler do input do número de usuários
  const handleUsersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) setUsers(value);
  };

  return (
    <Card className={`flex flex-col h-full ${plan.featured ? 'border-darkblue border-2 shadow-lg' : ''}`}>
      {/* Destaque para plano popular */}
      {plan.featured && (
        <div className="bg-darkblue text-white py-2 text-center text-sm font-medium rounded-t-lg">
          Mais Popular
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl font-bold text-darkblue">{plan.name}</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Plano licenciado por usuário
        </CardDescription>
        <div className="mt-4">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-darkblue">{plan.price.toLocaleString('pt-AO')}</span>
            <span className="ml-1 text-sm text-gray-500">Kz / usuário</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
              <span className="text-sm text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      {/* Parte inferior fixa, botão sempre alinhado e quadrado */}
      <CardFooter className="flex flex-col space-y-4 pt-4">
        <div className="w-full">
          <label htmlFor={`users-${plan.id}`} className="block text-sm font-medium text-gray-700 mb-1">
            Número de Usuários
          </label>
          <Input
            id={`users-${plan.id}`}
            type="number"
            min="1"
            value={users}
            onChange={handleUsersChange}
            className="w-full"
          />
        </div>
        <div className="w-full">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Total:</span>
            <span className="text-lg font-bold text-darkblue">
              {(plan.price * users).toLocaleString('pt-AO')} Kz
            </span>
          </div>
          <Button
            className="w-full h-12 min-h-[48px] bg-darkblue hover:bg-blue-800 text-white rounded-md flex items-center justify-center transition-all"
            onClick={handleAddToCart}
            type="button"
          >
            <ShoppingCart className="mr-2 h-5 w-5" /> Adicionar ao Carrinho
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PlanCard;
