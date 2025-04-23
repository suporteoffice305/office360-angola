
// ENVOLVE TUDO NO CartProvider, MAS LOGIN E OUTRAS TELAS AUTÔNOMAS NÃO TÊM HEADER/FOOTER

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

// Para esconder Header/Footer em algumas páginas de autenticação
import React from "react";

const queryClient = new QueryClient();

// Ajuda a decidir se exibe header/footer
function AppRoutesWrapper() {
  const location = window.location.pathname;
  // Páginas sem menu/footer
  const hideLayoutRoutes = ["/login", "/cadastro"];
  const hideLayout = hideLayoutRoutes.includes(location);

  // Para páginas sem menu/footer, renderiza somente a página
  if (hideLayout) {
    return (
      <>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          {/* Adicione a rota de cadastro quando existir */}
        </Routes>
      </>
    );
  }
  // Demais rotas: CartProvider inclui header/footer nas páginas
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/planos" element={<PlansPage />} />
        <Route path="/carrinho" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/pagamento" element={<PaymentPage />} />
        <Route path="/area-cliente" element={<ClientAreaPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/sobre" element={<AboutPage />} />
        <Route path="/produto/:id" element={<ProductDetailPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CartProvider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutesWrapper />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
// Comentários:
// - CartProvider e layout header/footer só nas telas realmente necessárias.
// - Login/Cadastro são páginas limpas, prontas para “API” php/laravel no futuro via fetch.
