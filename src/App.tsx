
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
import ClientAreaPage from "./pages/ClientAreaPage";
import AdminPage from "./pages/AdminPage";
import AboutPage from "./pages/AboutPage";
import ProductDetailPage from "./pages/ProductDetailPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
