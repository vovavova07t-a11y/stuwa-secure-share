
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Cog, 
  Truck, 
  TrendingUp, 
  Phone, 
  Shield,
  Eye,
  Lock,
  User,
  Key
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const CategoryLogin = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const categories = [
    {
      id: 'financial',
      title: 'О нас',
      subtitle: 'Финансовая дирекция',
      icon: Building2,
      route: '/financial-dashboard',
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600'
    },
    {
      id: 'technical',
      title: 'Продукция',
      subtitle: 'Техническая дирекция',
      icon: Cog,
      route: '/technical-dashboard',
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600'
    },
    {
      id: 'logistics', 
      title: 'Клиенты',
      subtitle: 'Управление логистики',
      icon: Truck,
      route: '/logistics-dashboard',
      color: 'bg-orange-50 border-orange-200',
      iconColor: 'text-orange-600'
    },
    {
      id: 'commercial',
      title: 'Развитие',
      subtitle: 'Коммерческая дирекция',
      icon: TrendingUp,
      route: '/commercial-dashboard',
      color: 'bg-purple-50 border-purple-200',
      iconColor: 'text-purple-600'
    },
    {
      id: 'contacts',
      title: 'Контакты',
      subtitle: 'Офис-менеджер',
      icon: Phone,
      route: '/contacts-management',
      color: 'bg-red-50 border-red-200',
      iconColor: 'text-red-600'
    }
  ];

  const testAccounts = [
    {
      category: 'financial',
      username: 'financial_user',
      password: 'fin123',
      role: 'Сотрудник финансов'
    },
    {
      category: 'technical',
      username: 'tech_user',
      password: 'tech123',
      role: 'Технический специалист'
    },
    {
      category: 'logistics',
      username: 'logistics_user',
      password: 'log123',
      role: 'Логист'
    },
    {
      category: 'commercial',
      username: 'commercial_user',
      password: 'com123',
      role: 'Коммерческий менеджер'
    },
    {
      category: 'contacts',
      username: 'contact_manager',
      password: 'cont123',
      role: 'Офис-менеджер'
    },
    {
      category: 'organizer',
      username: 'organizer',
      password: 'StUwA2024!Admin',
      role: 'Организатор системы'
    }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return;

    setIsLoading(true);

    try {
      // Имитация аутентификации
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Специальная обработка для организатора
      if (selectedCategory === 'organizer') {
        if (credentials.username === 'organizer' && credentials.password === 'StUwA2024!Admin') {
          navigate('/organizer-login');
          return;
        } else {
          throw new Error('Неверные учетные данные организатора');
        }
      }

      // Проверка обычных учетных данных
      const testAccount = testAccounts.find(acc => 
        acc.category === selectedCategory &&
        acc.username === credentials.username &&
        acc.password === credentials.password
      );

      if (testAccount) {
        const category = categories.find(cat => cat.id === selectedCategory);
        if (category) {
          navigate(category.route);
        }
      } else {
        throw new Error('Неверные учетные данные');
      }
    } catch (error: any) {
      toast({
        title: 'Ошибка входа',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestAccountLogin = (account: typeof testAccounts[0]) => {
    setCredentials({ username: account.username, password: account.password });
    setSelectedCategory(account.category);
  };

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);
  const isOrganizerSelected = selectedCategory === 'organizer';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Вход в корпоративную систему управления
          </h1>
          <p className="text-gray-600">
            Выберите ваш отдел для входа в систему
          </p>
        </div>

        {!selectedCategory ? (
          <div className="space-y-8">
            {/* Основные отделы */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-center">Отделы компании</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Card 
                      key={category.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${category.color}`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <CardHeader className="text-center">
                        <div className={`w-16 h-16 mx-auto rounded-full bg-white flex items-center justify-center mb-4`}>
                          <IconComponent className={`w-8 h-8 ${category.iconColor}`} />
                        </div>
                        <CardTitle className="text-xl">{category.title}</CardTitle>
                        <CardDescription className="font-medium">
                          {category.subtitle}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Карточка организатора */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-center">Административный доступ</h2>
              <div className="flex justify-center">
                <Card 
                  className="cursor-pointer transition-all hover:shadow-lg bg-gradient-to-r from-gray-800 to-gray-900 text-white max-w-md"
                  onClick={() => setSelectedCategory('organizer')}
                >
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-blue-600 flex items-center justify-center mb-4">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-white">Панель организатора</CardTitle>
                    <CardDescription className="text-gray-300 font-medium">
                      Полный доступ к системе
                    </CardDescription>
                    <Badge variant="secondary" className="mt-2">
                      <Eye className="w-3 h-3 mr-1" />
                      Режим просмотра всех отделов
                    </Badge>
                  </CardHeader>
                </Card>
              </div>
            </div>

            {/* Тестовые учетные записи */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Key className="w-5 h-5" />
                Тестовые учетные записи
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {testAccounts.map((account, index) => (
                  <Card 
                    key={index}
                    className="cursor-pointer hover:shadow-md transition-shadow bg-white"
                    onClick={() => handleTestAccountLogin(account)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        {account.category === 'organizer' ? (
                          <Shield className="w-5 h-5 text-blue-600" />
                        ) : (
                          <User className="w-5 h-5 text-gray-600" />
                        )}
                        <span className="font-medium">{account.role}</span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div><strong>Логин:</strong> {account.username}</div>
                        <div><strong>Пароль:</strong> {account.password}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <Card className={isOrganizerSelected ? "bg-gray-800 border-gray-700" : ""}>
              <CardHeader className="text-center">
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                  isOrganizerSelected ? 'bg-blue-600' : 'bg-gray-100'
                }`}>
                  {isOrganizerSelected ? (
                    <Shield className="w-8 h-8 text-white" />
                  ) : selectedCategoryData ? (
                    <selectedCategoryData.icon className={`w-8 h-8 ${selectedCategoryData.iconColor}`} />
                  ) : null}
                </div>
                <CardTitle className={`text-2xl ${isOrganizerSelected ? 'text-white' : ''}`}>
                  {isOrganizerSelected ? 'Панель организатора' : selectedCategoryData?.title}
                </CardTitle>
                <CardDescription className={isOrganizerSelected ? 'text-gray-300' : ''}>
                  {isOrganizerSelected ? 'Административный вход' : selectedCategoryData?.subtitle}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username" className={isOrganizerSelected ? 'text-gray-300' : ''}>
                      Имя пользователя
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Введите логин"
                      value={credentials.username}
                      onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                      className={isOrganizerSelected ? 'bg-gray-700 border-gray-600 text-white' : ''}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className={isOrganizerSelected ? 'text-gray-300' : ''}>
                      Пароль
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Введите пароль"
                      value={credentials.password}
                      onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                      className={isOrganizerSelected ? 'bg-gray-700 border-gray-600 text-white' : ''}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className={`w-full ${
                      isOrganizerSelected 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-primary hover:bg-primary/90'
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Lock className="w-4 h-4 mr-2 animate-spin" />
                        Вход...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Войти в систему
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSelectedCategory(null);
                      setCredentials({ username: '', password: '' });
                    }}
                  >
                    Назад к выбору отдела
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryLogin;
