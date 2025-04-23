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
      id: 'office365basic',
      name: 'Office 365 Business Basic',
      price: 45000,
      features: [
        'Email corporativo com 50 GB',
        'Versões web do Office',
        '1 TB de armazenamento na nuvem',
        'Reuniões online com até 300 pessoas',
        'Suporte 24/7'
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
