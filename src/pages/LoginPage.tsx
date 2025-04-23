
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/hooks/useCart';

const LoginPage = () => {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-16">
          <div className="container">
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold text-darkblue mb-6">Login / Cadastro</h1>
              <p className="text-gray-600 mb-4">Página de login em desenvolvimento.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default LoginPage;
