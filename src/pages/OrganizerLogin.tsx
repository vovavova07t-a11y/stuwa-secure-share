
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Lock, Key, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrganizerLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    twoFactorCode: ''
  });
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate authentication
      if (formData.username === 'organizer' && formData.password === 'StUwA2024!Admin') {
        if (!showTwoFactor) {
          setShowTwoFactor(true);
          setLoading(false);
          return;
        }
        
        if (formData.twoFactorCode === '123456') {
          // Successful login
          navigate('/organizer-dashboard');
        } else {
          setError('Неверный код двухфакторной аутентификации');
        }
      } else {
        setError('Неверные учетные данные организатора');
      }
    } catch (err) {
      setError('Ошибка при входе в систему');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-white">
              Панель организатора
            </CardTitle>
            <CardDescription className="text-gray-400">
              Авторизация с повышенной безопасностью
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {!showTwoFactor ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-300">
                    Логин организатора
                  </Label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Введите логин"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      required
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
                      name="password"
                      type="password"
                      placeholder="Введите пароль"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="twoFactorCode" className="text-gray-300">
                  Код двухфакторной аутентификации
                </Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="twoFactorCode"
                    name="twoFactorCode"
                    type="text"
                    placeholder="Введите 6-значный код"
                    value={formData.twoFactorCode}
                    onChange={handleInputChange}
                    className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 text-center text-lg tracking-wider"
                    maxLength={6}
                    required
                  />
                </div>
                <p className="text-sm text-gray-400 text-center">
                  Введите код из вашего приложения аутентификации
                </p>
              </div>
            )}

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
              {loading ? (
                'Проверка...'
              ) : showTwoFactor ? (
                'Подтвердить вход'
              ) : (
                'Войти в систему'
              )}
            </Button>

            {showTwoFactor && (
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={() => setShowTwoFactor(false)}
              >
                Назад
              </Button>
            )}
          </form>

          <div className="mt-6 pt-6 border-t border-gray-700">
            <div className="text-xs text-gray-400 text-center space-y-1">
              <p>🔒 Защищенное соединение</p>
              <p>Все действия логируются</p>
              <p>Демо: organizer / StUwA2024!Admin</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizerLogin;
