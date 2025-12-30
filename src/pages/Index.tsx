
import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { HowToUseSection } from "@/components/HowToUseSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, User, Eye, EyeOff, Shield } from "lucide-react";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Check if user is already authenticated
  useEffect(() => {
    const authStatus = sessionStorage.getItem("stuwa_main_auth");
    if (authStatus === "authenticated") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate credentials
    setTimeout(() => {
      if (username === "stuwakz" && password === "stuw@2026") {
        sessionStorage.setItem("stuwa_main_auth", "authenticated");
        setIsAuthenticated(true);
      } else {
        setError("Неверный логин или пароль");
      }
      setLoading(false);
    }, 500);
  };

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/stuwa-background.png')" }}
        />
        <div className="absolute inset-0 bg-black/30" />
        
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-xl border-white/30 shadow-2xl relative z-10">
          <CardHeader className="text-center space-y-4 pb-2">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-slate-800">STUWA Corporate</CardTitle>
              <p className="text-slate-600 mt-2">Корпоративная система управления документами</p>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Логин</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Введите логин"
                    className="pl-10 bg-white border-slate-300 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Пароль</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Введите пароль"
                    className="pl-10 pr-10 bg-white border-slate-300 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              {error && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-red-200 text-sm text-center">
                  {error}
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-5 shadow-lg"
                disabled={loading}
              >
                {loading ? "Проверка..." : "Войти в систему"}
              </Button>
            </form>
            
            <div className="mt-6 pt-6 border-t border-slate-200 text-center">
              <p className="text-slate-500 text-sm">
                Защищённый доступ к корпоративной системе
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If authenticated, show main page
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <HowToUseSection />
      </main>
    </div>
  );
};

export default Index;
