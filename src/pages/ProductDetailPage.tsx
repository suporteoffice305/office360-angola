
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
    price: 10000,
    image: '/win10.png',
    icon: <FileText size={28} />
  },
  {
    id: 'windowsserver',
    name: 'Windows Server 2012 / 2019 / 2022 / 2025',
    description: 'Licença para Windows Server: soluções robustas para servidores empresariais.',
    longDescription: 'O Windows Server (2012, 2019, 2022, 2025) oferece uma plataforma confiável e escalável para infraestrutura de TI, virtualização, gerenciamento de servidores, armazenamento e segurança. Ideal para empresas que precisam de desempenho, disponibilidade e recursos avançados de rede.',
    features: [
      'Licença perpétua (uso permanente)',
      'Virtualização avançada com Hyper-V',
      'Gerenciamento centralizado de servidores',
      'Recursos de alta disponibilidade e failover',
      'Active Directory e gerenciamento de identidades',
      'Suporte a containers e integração com Azure',
      'Instalação local (on-premises)'
    ],
    requirements: [
      'Processador: 64-bit, Intel ou AMD',
      'RAM: mínimo de 2 GB (recomendado 16 GB ou mais)',
      'Espaço em disco: mínimo de 32 GB',
      'Placa de rede compatível',
      'Firmware: UEFI, compatível com Secure Boot'
    ],
    price: 150000,
    image: '/server.png',
    icon: <FileText size={28} />
  },
  {
    id: 'windows11pro',
    name: 'Exchange Server 2019',
    description: 'Solução robusta de e-mail corporativo, calendário e contatos para empresas.',
    longDescription: 'O Exchange Server 2019 oferece uma plataforma segura, confiável e escalável para gerenciamento de e-mails, calendários e contatos empresariais. Ideal para organizações que buscam controle total sobre sua infraestrutura de comunicação, com recursos avançados de segurança, alta disponibilidade e integração com o Active Directory.',
    features: [
      'Gerenciamento avançado de e-mails, calendários e contatos',
      'Alta disponibilidade e recuperação de desastres',
      'Integração com Active Directory',
      'Suporte a dispositivos móveis e acesso via web (OWA)',
      'Recursos de compliance e arquivamento',
      'Proteção contra spam e malware',
      'Instalação local (on-premises)'
    ],
    requirements: [
      'Processador: 64-bit, Intel ou AMD',
      'RAM: mínimo de 128 GB para Mailbox Role',
      'Espaço em disco: mínimo de 30 GB para instalação',
      'Windows Server 2019 Standard ou Datacenter',
      'Active Directory no Windows Server 2012 R2 ou superior',
      'Conexão de rede confiável'
    ],
    price: 850000,
    image: '/exchange.png',
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
    image: '/office.png',
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
  const navigate = useNavigate(); // Hook para navegação

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
    
    // Redireciona para a página do carrinho após adicionar o produto
    navigate('/carrinho');
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
