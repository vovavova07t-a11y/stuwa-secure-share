
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { ThemeProvider } from "./components/theme-provider";
import { AuthProvider } from "./contexts/AuthContext";
import { FileProvider } from "./contexts/FileContext";
import Index from "./pages/Index";
import CategoryLogin from "./pages/CategoryLogin";
import AdminDashboard from "./pages/AdminDashboard";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import OrganizerLogin from "./pages/OrganizerLogin";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import AboutUs from "./pages/AboutUs";
import TechnicalDashboard from "./pages/TechnicalDashboard";
import FinancialDashboard from "./pages/FinancialDashboard";
import LogisticsDashboard from "./pages/LogisticsDashboard";
import CommercialDashboard from "./pages/CommercialDashboard";
import ContactsManagement from "./pages/ContactsManagement";
import InterdepartmentPage from "./pages/InterdepartmentPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <AuthProvider>
          <FileProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <div className="min-h-screen bg-background font-sans antialiased">
                  <Navigation />
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/category-login" element={<CategoryLogin />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/organizer" element={<OrganizerDashboard />} />
                    <Route path="/organizer-login" element={<OrganizerLogin />} />
                    <Route path="/executive" element={<ExecutiveDashboard />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/technical" element={<TechnicalDashboard />} />
                    <Route path="/financial" element={<FinancialDashboard />} />
                    <Route path="/logistics" element={<LogisticsDashboard />} />
                    <Route path="/commercial" element={<CommercialDashboard />} />
                    <Route path="/contacts" element={<ContactsManagement />} />
                    <Route path="/interdepartment" element={<InterdepartmentPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </BrowserRouter>
            </TooltipProvider>
          </FileProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
