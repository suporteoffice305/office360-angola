
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductSection from '@/components/ProductSection';
import Benefits from '@/components/Benefits';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import { CartProvider } from '@/hooks/useCart';

const Index = () => {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Hero />
          <ProductSection />
          <Benefits />
          <Testimonials />
          <CallToAction />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default Index;
