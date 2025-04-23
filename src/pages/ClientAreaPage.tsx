
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/hooks/useCart';

const ClientAreaContent = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-darkblue mb-6">Área do Cliente</h1>
            <p className="text-gray-600 mb-4">Área do cliente em desenvolvimento.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const ClientAreaPage = () => {
  return (
    <CartProvider>
      <ClientAreaContent />
    </CartProvider>
  );
};

export default ClientAreaPage;
