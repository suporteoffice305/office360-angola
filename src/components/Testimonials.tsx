
import React, { useState } from 'react';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  text: string;
  image: string;
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Manuel Domingos',
      position: 'CEO',
      company: 'SoftAngola',
      text: 'A Office360 superou nossas expectativas. O processo de compra foi simples, rápido e o suporte técnico é excepcional. Recomendo para todas as empresas que precisam de licenças Microsoft.',
      image: '/homem.png'
    },
    {
      id: 2,
      name: 'Maria João',
      position: 'Diretora de TI',
      company: 'Kixico Digital',
      text: 'Economizamos tempo e dinheiro com as licenças da Office360. Ativação instantânea e zero problemas com compatibilidade ou atualizações. Um parceiro de negócios confiável!',
      image: '/mulher.png'
    },
    {
      id: 3,
      name: 'Joaquim Chissano',
      position: 'Gerente de Operações',
      company: 'Nova Rede',
      text: 'A migração para o Windows Server através da Office360 foi tranquila e sem interrupções. O suporte pós-venda é um diferencial que nos faz cliente fiel há mais de 3 anos.',
      image: '/homem.png'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-darkblue mb-4">Clientes Satisfeitos</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Veja o que nossos clientes estão dizendo sobre nossas soluções e atendimento
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3">
                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-200">
                  <img 
                    src={testimonials[activeIndex].image} 
                    alt={testimonials[activeIndex].name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <div className="mb-6">
                  <p className="text-gray-700 italic text-lg">"{testimonials[activeIndex].text}"</p>
                </div>
                <div>
                  <h4 className="font-semibold text-darkblue">{testimonials[activeIndex].name}</h4>
                  <p className="text-gray-600">
                    {testimonials[activeIndex].position}, {testimonials[activeIndex].company}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8 gap-3">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveIndex(index)} 
                  className={`w-3 h-3 rounded-full transition-colors ${index === activeIndex ? 'bg-darkblue' : 'bg-gray-300'}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-6 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-darkblue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-6 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-darkblue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
