
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold text-darkblue leading-tight">
              Licenças Windows & Office para sua Empresa
            </h1>
            <p className="text-lg text-gray-600">
              Soluções completas de software para aumentar a produtividade e segurança da sua equipe, com entrega imediata e suporte dedicado.
            </p>
            <Button size="lg" className="bg-darkblue hover:bg-blue-800 text-white text-lg px-8 py-6">
              Solicitar Orçamento
            </Button>
          </div>
          <div className="md:w-1/2">
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                alt="Professional using Microsoft software" 
                className="w-full h-auto object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
