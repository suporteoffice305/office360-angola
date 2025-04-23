
import React from 'react';
import { FileText, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  image: string;
  basePrice: number;
}

const ProductSection = () => {
  const products: Product[] = [
    {
      id: 'windows10pro',
      name: 'Windows 10 Pro',
      icon: <FileText size={28} className="text-darkblue" />,
      description: 'Licença permanente com acesso a recursos avançados de segurança e gerenciamento.',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      basePrice: 45000
    },
    {
      id: 'windows11pro',
      name: 'Windows 11 Pro',
      icon: <FileText size={28} className="text-darkblue" />,
      description: 'Interface moderna e recursos de produtividade aprimorados para sua empresa.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      basePrice: 55000
    },
    {
      id: 'office365basic',
      name: 'Office 365 Business Basic',
      icon: <Star size={28} className="text-darkblue" />,
      description: 'Pacote completo de aplicativos Microsoft Office com 1TB de armazenamento na nuvem.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      basePrice: 45000
    },
    {
      id: 'office365premium',
      name: 'Office 365 Business Premium',
      icon: <Star size={28} className="text-darkblue" />,
      description: 'Soluções avançadas de e-mail, videoconferência e gerenciamento para sua equipe.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      basePrice: 65000
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-darkblue mb-4">Nossas Licenças</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Soluções de software premium para impulsionar a produtividade da sua empresa com segurança e confiabilidade.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {product.icon}
                  <h3 className="text-xl font-semibold text-darkblue ml-2">{product.name}</h3>
                </div>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-darkblue font-bold mb-6">A partir de {product.basePrice.toLocaleString('pt-AO')} Kz</p>
                <Button variant="outline" className="border-darkblue text-darkblue hover:bg-darkblue hover:text-white w-full" asChild>
                  <Link to={`/produto/${product.id}`}>Saiba Mais</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
