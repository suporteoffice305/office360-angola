
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PlansPage from "./pages/PlansPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import PaymentPage from "./pages/PaymentPage";
import ClientAreaPage from "./pages/ClientAreaPage";
import AdminPage from "./pages/AdminPage";
import AboutPage from "./pages/AboutPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import { CartProvider } from "@/hooks/useCart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React from "react";

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Wrapper component for routes with conditional Header/Footer
function AppRoutesWrapper() {
  const location = useLocation();
  
  // Pages without header/footer (authentication & admin pages)
  const hideLayoutRoutes = ["/login", "/cadastro", "/admin"];
  const hideLayout = hideLayoutRoutes.some(route => location.pathname.startsWith(route));

  if (hideLayout) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/cadastro" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }
  
  // All other routes with Header/Footer
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/planos" element={<PlansPage />} />
        <Route path="/carrinho" element={<CartPage />} />
        <Route path="/pagamento" element={<PaymentPage />} />
        <Route path="/area-cliente" element={<ClientAreaPage />} />
        <Route path="/sobre" element={<AboutPage />} />
        <Route path="/produto/:id" element={<ProductDetailPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutesWrapper />
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
