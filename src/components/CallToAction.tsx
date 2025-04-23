
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

/**
 * Seção de chamada para ação na página inicial.
 * O botão está sempre visível em qualquer tamanho de tela.
 */
const CallToAction = () => {
  return (
    <section className="py-16 bg-darkblue text-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para equipar sua equipe?</h2>
          <p className="text-lg mb-8 text-gray-200">
            Garanta hoje mesmo as melhores soluções em licenciamento de software para sua empresa e eleve a produtividade ao próximo nível.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-darkblue border-2 border-white hover:bg-blue-800 hover:text-white text-lg px-8 py-6 font-bold shadow"
            asChild
          >
            <Link to="/planos">Ver Todos os Planos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
