
import React from 'react';
import { Check, Users, Star } from 'lucide-react';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Benefits = () => {
  const benefits: Benefit[] = [
    {
      icon: <Check size={32} className="text-darkblue" />,
      title: 'Entrega Imediata',
      description: 'Receba suas licenças em poucos minutos após a confirmação do pagamento.'
    },
    {
      icon: <Users size={32} className="text-darkblue" />,
      title: 'Suporte Dedicado',
      description: 'Equipe técnica especializada à sua disposição para qualquer dúvida ou problema.'
    },
    {
      icon: <Star size={32} className="text-darkblue" />,
      title: 'Compatibilidade Total',
      description: 'Nossas licenças são 100% compatíveis com todas as versões e atualizações.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-darkblue mb-4">Benefícios & Diferenciais</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Por que escolher a Office360 para suas licenças de software empresariais
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-darkblue mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
