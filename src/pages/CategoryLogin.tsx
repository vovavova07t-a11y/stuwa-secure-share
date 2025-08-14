
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  DollarSign, 
  Settings, 
  Package, 
  Truck, 
  Mail, 
  ArrowRightLeft,
  Shield,
  Lock,
  User,
  AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CategoryLogin = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const categories = [
    {
      id: 'financial',
      name: 'Финансовая дирекция',
      icon: DollarSign,
      color: 'from-green-600 to-emerald-600',
      route: '/about',
      username: 'fin_admin',
      password: 'FinStuwa2024!'
    },
    {
      id: 'technical',
      name: 'Техническая дирекция',
      icon: Settings,
      color: 'from-blue-600 to-cyan-600',
      route: '/technical',
      username: 'tech_admin',
      password: 'TechStuwa2024!'
    },
    {
      id: 'logistics',
      name: 'Управление логистики',
      icon: Truck,
      color: 'from-orange-600 to-amber-600',
      route: '/logistics',
      username: 'log_admin',
      password: 'LogStuwa2024!'
    },
    {
      id: 'commercial',
      name: 'Коммерческая дирекция',
      icon: Package,
      color: 'from-purple-600 to-violet-600',
      route: '/commercial',
      username: 'com_admin',
      password: 'ComStuwa2024!'
    },
    {
      id: 'contacts',
      name: 'Офис-менеджер',
      icon: Mail,
      color: 'from-pink-600 to-rose-600',
      route: '/contacts',
      username: 'office_admin',
      password: 'OfficeStuwa2024!'
    },
    {
      id: 'interdepartment',
      name: 'Межотдельское взаимодействие',
      icon: ArrowRightLeft,
      color: 'from-indigo-600 to-blue-600',
      route: '/interdepartment',
      username: 'inter_admin',
      password: 'InterStuwa2024!'
    }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCategory) {
      setError('Выберите категорию');
      return;
    }

    if (!credentials.username || !credentials.password) {
      setError('Введите логин и пароль');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate a small delay for better UX
    setTimeout(() => {
      const category = categories.find(cat => cat.id === selectedCategory);
      
      if (category && 
          credentials.username === category.username && 
          credentials.password === category.password) {
        // Successful login - redirect immediately
        navigate(category.route);
      } else {
        setError('Неверные учетные данные для выбранной категории');
        setLoading(false);
      }
    }, 500);
  };

  const selectedCat = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Вход в систему STUWA
          </h1>
          <p className="text-gray-300">
            Выберите категорию и введите учетные данные
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Category Selection */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Package className="w-5 h-5" />
                Выбор категории
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <div
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setError(''); // Clear error when selecting category
                    }}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedCategory === category.id
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-gray-600 hover:border-gray-500 bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-white font-medium">{category.name}</span>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Login Form */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Авторизация
                {selectedCat && (
                  <span className="text-sm font-normal text-gray-400">
                    - {selectedCat.name}
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-300">
                    Логин
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Введите логин"
                      value={credentials.username}
                      onChange={(e) => {
                        setCredentials({...credentials, username: e.target.value});
                        setError(''); // Clear error when typing
                      }}
                      className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      required
                      disabled={!selectedCategory || loading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">
                    Пароль
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Введите пароль"
                      value={credentials.password}
                      onChange={(e) => {
                        setCredentials({...credentials, password: e.target.value});
                        setError(''); // Clear error when typing
                      }}
                      className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      required
                      disabled={!selectedCategory || loading}
                    />
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 p-3 rounded-md">
                    <AlertTriangle className="w-4 h-4" />
                    {error}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={loading || !selectedCategory}
                >
                  {loading ? 'Вход...' : 'Войти в систему'}
                </Button>
              </form>

              {selectedCat && (
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <div className="text-xs text-gray-400 space-y-1">
                    <p className="font-medium text-gray-300">Демо-данные для {selectedCat.name}:</p>
                    <p>Логин: <span className="text-blue-400">{selectedCat.username}</span></p>
                    <p>Пароль: <span className="text-blue-400">{selectedCat.password}</span></p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CategoryLogin;
