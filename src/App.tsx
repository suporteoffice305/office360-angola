
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PlansPage from "./pages/PlansPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import PaymentPage from "./pages/PaymentPage";
import PaymentProcessPage from "./pages/PaymentProcessPage";
import ClientAreaPage from "./pages/ClientAreaPage";
import AdminPage from "./pages/AdminPage";
import AboutPage from "./pages/AboutPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import { CartProvider } from "@/hooks/useCart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React from "react";

// Add smooth scrolling for the entire app
import "./styles/smoothScroll.css";

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Create the main App component with improved routing
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Routes without header/footer (authentication & admin pages) */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/cadastro" element={<LoginPage />} />
              <Route path="/admin/*" element={<AdminPage />} />
              <Route path="/pagamento-processo" element={<PaymentProcessPage />} />

              {/* Routes with header/footer */}
              <Route path="/" element={
                <>
                  <Header />
                  <Index />
                  <Footer />
                </>
              } />
              <Route path="/planos" element={
                <>
                  <Header />
                  <PlansPage />
                  <Footer />
                </>
              } />
              <Route path="/carrinho" element={
                <>
                  <Header />
                  <CartPage />
                  <Footer />
                </>
              } />
              <Route path="/pagamento" element={
                <>
                  <Header />
                  <PaymentPage />
                  <Footer />
                </>
              } />
              <Route path="/area-cliente" element={
                <>
                  <Header />
                  <ClientAreaPage />
                  <Footer />
                </>
              } />
              <Route path="/sobre" element={
                <>
                  <Header />
                  <AboutPage />
                  <Footer />
                </>
              } />
              <Route path="/produto/:id" element={
                <>
                  <Header />
                  <ProductDetailPage />
                  <Footer />
                </>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
