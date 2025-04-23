
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check, ShoppingCart, FileText, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { CartProvider } from '@/hooks/useCart';

interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  features: string[];
  requirements: string[];
  price: number;
  image: string;
  icon: React.ReactNode;
}

const productsData: Product[] = [
  {
    id: 'windows10pro',
    name: 'Windows 10 Pro',
    description: 'Licença permanente com acesso a recursos avançados de segurança e gerenciamento.',
    longDescription: 'O Windows 10 Pro é a escolha perfeita para pequenas empresas e profissionais que precisam de recursos avançados de segurança e gerenciamento. Com ele, você pode gerenciar dispositivos e aplicativos, proteger dados sensíveis e acessar recursos como Windows Hello para empresas.',
    features: [
      'Licença perpétua (uso permanente)',
      'Bitlocker para criptografia de disco',
      'Windows Update para empresas',
      'Acesso à Área de Trabalho Remota',
      'Suporte a políticas de grupo',
      'Instalação permitida em 1 dispositivo'
    ],
    requirements: [
      'Processador de 1 GHz ou mais rápido',
      'RAM: 2 GB para 64-bit',
      'Espaço em disco: 20 GB',
      'Placa gráfica: DirectX 9 ou posterior'
    ],
    price: 45000,
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    icon: <FileText size={28} />
  },
  {
    id: 'windows11pro',
    name: 'Windows 11 Pro',
    description: 'Interface moderna e recursos de produtividade aprimorados para sua empresa.',
    longDescription: 'O Windows 11 Pro traz uma experiência completamente renovada, com interface centrada na produtividade. Desfrute de todos os recursos de segurança e gerenciamento do Windows 10 Pro, além de melhorias significativas na experiência do usuário e na integração com o Microsoft 365.',
    features: [
      'Licença perpétua (uso permanente)',
      'Design moderno e intuitivo',
      'Windows Hello avançado',
      'Compatibilidade aprimorada com Microsoft Teams',
      'Proteção avançada contra ameaças',
      'Instalação permitida em 1 dispositivo'
    ],
    requirements: [
      'Processador: 1 GHz com 2 ou mais núcleos',
      'RAM: 4 GB',
      'Espaço em disco: 64 GB',
      'Firmware: UEFI, compatível com Secure Boot',
      'TPM: Versão 2.0'
    ],
    price: 55000,
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    icon: <FileText size={28} />
  },
  {
    id: 'office365basic',
    name: 'Office 365 Business Basic',
    description: 'Pacote completo de aplicativos Microsoft Office com 1TB de armazenamento na nuvem.',
    longDescription: 'O Microsoft 365 Business Basic oferece as ferramentas essenciais para empresas que precisam de soluções de email profissional e versões online dos aplicativos do Office. Inclui armazenamento e compartilhamento de arquivos na nuvem para colaboração em tempo real.',
    features: [
      'Email empresarial com 50 GB por usuário',
      'Versões web e mobile do Word, Excel e PowerPoint',
      '1 TB de armazenamento no OneDrive por usuário',
      'Microsoft Teams para reuniões online',
      'Segurança e conformidade empresarial',
      'Suporte técnico 24/7'
    ],
    requirements: [
      'Conexão com a internet',
      'Navegador moderno (Edge, Chrome, Firefox, Safari)',
      'Sistema operacional: Windows 10 ou superior, macOS, iOS ou Android'
    ],
    price: 45000,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    icon: <Star size={28} />
  },
  {
    id: 'office365premium',
    name: 'Office 365 Business Premium',
    description: 'Soluções avançadas de e-mail, videoconferência e gerenciamento para sua equipe.',
    longDescription: 'O Microsoft 365 Business Premium é a solução completa para empresas que precisam de aplicativos Office completos, email empresarial, armazenamento em nuvem e segurança avançada. Inclui recursos de proteção contra ameaças cibernéticas e ferramentas de gerenciamento de dispositivos.',
    features: [
      'Versões desktop completas do Word, Excel, PowerPoint e Outlook',
      'Email empresarial avançado com 50 GB por usuário',
      '1 TB de armazenamento no OneDrive por usuário',
      'Microsoft Teams avançado para colaboração',
      'Intune e Azure Information Protection',
      'Defender para Office 365',
      'Suporte técnico prioritário 24/7'
    ],
    requirements: [
      'PC: Windows 10 ou superior',
      'Mac: três versões mais recentes do macOS',
      '1 GB de RAM (32 bits) ou 2 GB de RAM (64 bits)',
      '3 GB de espaço disponível em disco',
      'Conexão com a internet'
    ],
    price: 65000,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    icon: <Star size={28} />
  }
];

// Create a separate ProductDetailContent component that uses the hooks
const ProductDetailContent = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [users, setUsers] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const foundProduct = productsData.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price * users,
      users
    }, 1);
    
    toast({
      title: "Adicionado ao carrinho",
      description: `${product.name} para ${users} usuário${users > 1 ? 's' : ''} adicionado.`,
    });
  };

  const handleUsersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setUsers(value);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-darkblue">Produto não encontrado</h1>
            <p className="text-gray-600 mt-2">O produto que você está procurando não existe.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-12 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>

              <div className="space-y-6">
                <div className="flex items-center">
                  <span className="bg-darkblue p-2 rounded-full text-white mr-3">
                    {product.icon}
                  </span>
                  <h1 className="text-3xl font-bold text-darkblue">{product.name}</h1>
                </div>
                
                <p className="text-gray-700 text-lg">{product.longDescription}</p>
                
                <div className="border-t border-b border-gray-200 py-4 my-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-darkblue">{product.price.toLocaleString('pt-AO')}</span>
                    <span className="ml-1 text-sm text-gray-500">Kz / usuário</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="users" className="block text-sm font-medium text-gray-700 mb-1">
                      Número de Usuários
                    </label>
                    <Input
                      id="users"
                      type="number"
                      min="1"
                      value={users}
                      onChange={handleUsersChange}
                      className="max-w-xs"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Total:</p>
                      <p className="text-2xl font-bold text-darkblue">{(product.price * users).toLocaleString('pt-AO')} Kz</p>
                    </div>
                    <Button size="lg" className="bg-darkblue hover:bg-blue-800" onClick={handleAddToCart}>
                      <ShoppingCart className="mr-2 h-5 w-5" /> Adicionar ao Carrinho
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-darkblue mb-6">Características</h2>
                <ul className="space-y-4">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex">
                      <Check className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-darkblue mb-6">Requisitos de Sistema</h2>
                <ul className="space-y-4">
                  {product.requirements.map((req, index) => (
                    <li key={index} className="flex">
                      <Check className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Main ProductDetailPage component that wraps the content with CartProvider
const ProductDetailPage = () => {
  return (
    <CartProvider>
      <ProductDetailContent />
    </CartProvider>
  );
};

export default ProductDetailPage;
