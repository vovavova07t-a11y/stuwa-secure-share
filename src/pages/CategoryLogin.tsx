
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Shield,
  Lock,
  User,
  AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CategoryLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Define all credentials with their routes
  const loginCredentials = [
    {
      username: 'fin_admin',
      password: 'FinStuwa2024!',
      route: '/about',
      name: 'Финансовая дирекция'
    },
    {
      username: 'tech_admin',
      password: 'TechStuwa2024!',
      route: '/technical',
      name: 'Техническая дирекция'
    },
    {
      username: 'log_admin',
      password: 'LogStuwa2024!',
      route: '/logistics',
      name: 'Управление логистики'
    },
    {
      username: 'com_admin',
      password: 'ComStuwa2024!',
      route: '/commercial',
      name: 'Коммерческая дирекция'
    },
    {
      username: 'office_admin',
      password: 'OfficeStuwa2024!',
      route: '/contacts',
      name: 'Офис-менеджер'
    },
    {
      username: 'inter_admin',
      password: 'InterStuwa2024!',
      route: '/interdepartment',
      name: 'Межотдельское взаимодействие'
    }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.username || !credentials.password) {
      setError('Введите логин и пароль');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate a small delay for better UX
    setTimeout(() => {
      const matchedCredential = loginCredentials.find(cred => 
        credentials.username === cred.username && 
        credentials.password === cred.password
      );
      
      if (matchedCredential) {
        // Successful login - redirect to appropriate section
        navigate(matchedCredential.route);
      } else {
        setError('Неверные учетные данные');
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Вход в систему STUWA
          </h1>
          <p className="text-gray-300">
            Введите ваши учетные данные для входа
          </p>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Авторизация
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
                    disabled={loading}
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
                    disabled={loading}
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
                disabled={loading}
              >
                {loading ? 'Вход...' : 'Войти в систему'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <div className="text-xs text-gray-400 space-y-2">
                <p className="font-medium text-gray-300">Доступные учетные записи:</p>
                {loginCredentials.map((cred, index) => (
                  <div key={index} className="bg-gray-700/50 p-2 rounded text-xs">
                    <p className="text-gray-300">{cred.name}</p>
                    <p>Логин: <span className="text-blue-400">{cred.username}</span></p>
                    <p>Пароль: <span className="text-blue-400">{cred.password}</span></p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CategoryLogin;
