
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-4xl font-bold text-darkblue mb-8">Sobre a Office360</h1>
                  <div className="space-y-6 text-gray-600">
                    <p>
                      A Office360 é uma empresa especializada em licenciamento de software Microsoft, 
                      oferecendo soluções completas para empresas de todos os tamanhos em Angola e outros países lusófonos.
                    </p>
                    <p>
                      Fundada em 2018, nossa missão é fornecer as melhores soluções em licenciamento de 
                      software, garantindo que nossos clientes tenham acesso às ferramentas necessárias 
                      para aumentar sua produtividade e segurança digital.
                    </p>
                    <p>
                      Como parceira certificada Microsoft, garantimos preços competitivos, suporte técnico especializado 
                      e atendimento personalizado para cada cliente.
                    </p>
                  </div>
                  <div className="mt-8">
                    <Button className="bg-darkblue hover:bg-blue-800" asChild>
                      <Link to="/planos">Conheça Nossos Planos</Link>
                    </Button>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <img 
                    src="/lovable-uploads/40e955e5-3cd3-459e-b35a-aa9ae0b229d8.png" 
                    alt="Equipe Office360" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-darkblue mb-8">Nossa Equipe</h2>
              <p className="text-lg text-gray-600 mb-12">
                Contamos com profissionais certificados e especializados em soluções Microsoft, 
                prontos para atender às necessidades específicas do seu negócio.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="/lovable-uploads/8d983a1a-eec6-487c-88be-efec0c2f85e1.png" 
                    alt="Membro da equipe" 
                    className="w-full h-auto aspect-[3/4] object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-darkblue">Ana Silva</h3>
                    <p className="text-gray-600">Diretora de Vendas</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="/lovable-uploads/francisco.png"
                    alt="Membro da equipe" 
                    className="w-full h-auto aspect-[3/4] object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-darkblue">Francisco Jamba</h3>
                    <p className="text-gray-600">Especialista em Licenciamento</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="/lovable-uploads/dev.png" 
                    alt="Membro da equipe" 
                    className="w-full h-auto aspect-[3/4] object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-darkblue">João Augusto</h3>
                    <p className="text-gray-600">Suporte Técnico</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
