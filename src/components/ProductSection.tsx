
import React from 'react';
import { FileText, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { formatPrice } from '@/utils/formatters';

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
      image: '/win10.png',
      basePrice: 10000
    },
    {
      id: 'windowsserver',
      name: 'Windows Server 2012 / 2019 / 2022 / 2025',
      icon: <FileText size={28} className="text-darkblue" />,
      description: 'Licença para Windows Server: soluções robustas para servidores empresariais.',
      image: '/server.png',
      basePrice: 150000
    },
    {
      id: 'windows11pro',
      name: 'Exchange Server 2019',
      icon: <FileText size={28} className="text-darkblue" />,
      description: 'Solução robusta de e-mail corporativo, calendário e contatos para empresas.',
      image: '/exchange.png',
      basePrice: 850000
    },
    {
      id: 'office365basic',
      name: 'Office 365 Business Basic',
      icon: <Star size={28} className="text-darkblue" />,
      description: 'Pacote completo de aplicativos Microsoft Office com 1TB de armazenamento na nuvem.',
      image: '/office.png',
      basePrice: 45000
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
                <p className="text-darkblue font-bold mb-6">A partir de {formatPrice(product.basePrice)}</p>
                <Button variant="outline" className="border-darkblue text-darkblue hover:bg-darkblue hover:text-white w-full" asChild>
                  <Link to={`/produto/${product.id}`}>Comprar Agora</Link>
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
