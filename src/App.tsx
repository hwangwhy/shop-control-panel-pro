
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AccountManagement from "./pages/AccountManagement";
import ProductManagement from "./pages/ProductManagement";
import PaymentManagement from "./pages/PaymentManagement";
import DashboardLayout from "./components/DashboardLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route 
            path="/accounts" 
            element={
              <DashboardLayout>
                <AccountManagement />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/products" 
            element={
              <DashboardLayout>
                <ProductManagement />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/payments" 
            element={
              <DashboardLayout>
                <PaymentManagement />
              </DashboardLayout>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
