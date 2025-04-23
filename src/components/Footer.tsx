
import React from 'react';
import { Linkedin, Instagram, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold text-darkblue mb-4">Office350</h3>
            <p className="text-gray-600">
              Sua parceira confiável em licenciamento de software Microsoft para empresas de todos os tamanhos.
            </p>
          </div>

          <div className="col-span-1">
            <h4 className="font-semibold text-gray-800 mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-darkblue">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-darkblue">Licenças Windows</a></li>
              <li><a href="#" className="text-gray-600 hover:text-darkblue">Office 365</a></li>
              <li><a href="#" className="text-gray-600 hover:text-darkblue">Suporte</a></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-semibold text-gray-800 mb-4">Informações</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-darkblue">Sobre nós</a></li>
              <li><a href="#" className="text-gray-600 hover:text-darkblue">Política de Privacidade</a></li>
              <li><a href="#" className="text-gray-600 hover:text-darkblue">Termos de Serviço</a></li>
              <li><a href="#" className="text-gray-600 hover:text-darkblue">FAQ</a></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-semibold text-gray-800 mb-4">Contato</h4>
            <div className="flex items-center mb-3">
              <Phone size={18} className="text-darkblue mr-2" />
              <a href="tel:+244958252301" className="text-gray-600 hover:text-darkblue">
                +244 923 101 076
              </a>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="bg-darkblue text-white p-2 rounded-full hover:bg-blue-800 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="bg-darkblue text-white p-2 rounded-full hover:bg-blue-800 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Office365. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
