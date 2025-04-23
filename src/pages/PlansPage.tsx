import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { CartProvider } from '@/hooks/useCart';
import PlanCard from '@/components/PlanCard';

const PlansPage = () => {
  const plans = [
    {
      id: 'windows10pro',
      name: 'Windows 10 Pro',
      price: 10000,
      features: [
        'Licença perpétua (uso permanente)',
        'Bitlocker para criptografia de disco',
        'Windows Update para empresas',
        'Acesso à Área de Trabalho Remota',
        'Suporte a políticas de grupo'
      ]
    },
    {
      id: 'windowsserver',
      name: 'Windows Server 2012 / 2019 / 2022 / 2025',
      price: 150000,
      features: [
        'Virtualização avançada com Hyper-V',
        'Gerenciamento centralizado de servidores',
        'Alta disponibilidade e failover',
        'Active Directory e gerenciamento de identidades',
        'Suporte a containers e integração com Azure'
      ]
    },
    {
      id: 'windows11pro',
      name: 'Exchange Server 2019',
      price: 850000,
      features: [
        'Gerenciamento avançado de e-mails, calendários e contatos',
        'Alta disponibilidade e recuperação de desastres',
        'Integração com Active Directory',
        'Acesso via web (OWA) e dispositivos móveis',
        'Proteção contra spam e malware'
      ]
    },
    {
      id: 'office365basic',
      name: 'Office 365 Business Basic',
      price: 45000,
      features: [
        'Email empresarial com 50 GB por usuário',
        'Versões web e mobile do Word, Excel e PowerPoint',
        '1 TB de armazenamento no OneDrive por usuário',
        'Microsoft Teams para reuniões online',
        'Suporte técnico 24/7'
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-darkblue mb-4">
                  Escolha o Plano Ideal
                </h1>
                <p className="text-lg text-gray-600">
                  Selecione o plano que melhor atende às necessidades da sua empresa.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {plans.map((plan) => (
                  <div key={plan.id} className="flex flex-col h-full">
                    <PlanCard plan={plan} />
                  </div>
                ))}
              </div>
              <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-darkblue mb-6">Precisa de ajuda para escolher?</h2>
                <p className="text-gray-600 mb-6">
                  Nossa equipe de especialistas está disponível para ajudar a encontrar a solução ideal para o seu negócio.
                </p>
                <Button className="bg-darkblue hover:bg-blue-800 text-white w-full md:w-auto h-12 rounded-md font-semibold">
                  Fale com um Consultor
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PlansPage;
