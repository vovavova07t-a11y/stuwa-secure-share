
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import TechnicalDashboard from "./pages/TechnicalDashboard";
import LogisticsDashboard from "./pages/LogisticsDashboard";
import CommercialDashboard from "./pages/CommercialDashboard";
import ContactsManagement from "./pages/ContactsManagement";
import CategoryLogin from "./pages/CategoryLogin";
import OrganizerLogin from "./pages/OrganizerLogin";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import FinancialDashboard from "./pages/FinancialDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import InterdepartmentPage from "./pages/InterdepartmentPage";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "@/components/theme-provider";
import { FileProvider } from "@/contexts/FileContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <FileProvider>
            <BrowserRouter>
              <div className="min-h-screen flex flex-col">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/financial" element={<FinancialDashboard />} />
                  <Route path="/technical" element={<TechnicalDashboard />} />
                  <Route path="/logistics" element={<LogisticsDashboard />} />
                  <Route path="/commercial" element={<CommercialDashboard />} />
                  <Route path="/contacts" element={<ContactsManagement />} />
                  <Route path="/category-login" element={<CategoryLogin />} />
                  <Route path="/organizer-login" element={<OrganizerLogin />} />
                  <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
                  <Route path="/executive-dashboard" element={<ExecutiveDashboard />} />
                  <Route path="/interdepartment" element={<InterdepartmentPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Toaster />
            </BrowserRouter>
          </FileProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
