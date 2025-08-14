
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import FinancialDashboard from "./components/FinancialDashboard";
import TechnicalDashboard from "./pages/TechnicalDashboard";
import LogisticsDashboard from "./pages/LogisticsDashboard";
import CommercialDashboard from "./pages/CommercialDashboard";
import ContactsManagement from "./pages/ContactsManagement";
import AdminDashboard from "./pages/AdminDashboard";
import OrganizerLogin from "./pages/OrganizerLogin";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import InterdepartmentPage from "./pages/InterdepartmentPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-background font-sans antialiased">
              <Navigation />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/executive" element={<ExecutiveDashboard />} />
                <Route path="/financial" element={<FinancialDashboard />} />
                <Route path="/technical" element={<TechnicalDashboard />} />
                <Route path="/logistics" element={<LogisticsDashboard />} />
                <Route path="/commercial" element={<CommercialDashboard />} />
                <Route path="/contacts" element={<ContactsManagement />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/organizer-login" element={<OrganizerLogin />} />
                <Route path="/organizer" element={<OrganizerDashboard />} />
                <Route path="/interdepartment" element={<InterdepartmentPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
