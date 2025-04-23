
import React from 'react';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <section className="py-16 bg-darkblue text-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para equipar sua equipe?</h2>
          <p className="text-lg mb-8 text-gray-200">
            Garanta hoje mesmo as melhores soluções em licenciamento de software para sua empresa e eleve a produtividade ao próximo nível.
          </p>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-darkblue text-lg px-8 py-6">
            Fale com um Especialista
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
