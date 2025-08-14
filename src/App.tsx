
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import Index from './pages/Index';
import AboutUs from './pages/AboutUs';
import NotFound from './pages/NotFound';
import TechnicalDashboard from './pages/TechnicalDashboard';
import LogisticsDashboard from "@/pages/LogisticsDashboard";
import CommercialDashboard from "@/pages/CommercialDashboard";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/technical-dashboard" element={<TechnicalDashboard />} />
              <Route path="/logistics-dashboard" element={<LogisticsDashboard />} />
              <Route path="/commercial-dashboard" element={<CommercialDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
