
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Package, 
  Truck, 
  TrendingUp, 
  Contact, 
  Shield,
  BarChart3,
  Settings,
  Menu,
  X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      title: 'О нас',
      description: 'Финансовая дирекция',
      icon: Building2,
      path: '/about-us',
      color: 'text-blue-600'
    },
    {
      title: 'Продукция',
      description: 'Техническая дирекция',
      icon: Package,
      path: '/technical-dashboard',
      color: 'text-green-600'
    },
    {
      title: 'Клиенты',
      description: 'Управление логистики',
      icon: Truck,
      path: '/logistics-dashboard',
      color: 'text-purple-600'
    },
    {
      title: 'Развитие',
      description: 'Коммерческая дирекция',
      icon: TrendingUp,
      path: '/commercial-dashboard',
      color: 'text-orange-600'
    },
    {
      title: 'Контакты',
      description: 'Офис-менеджер',
      icon: Contact,
      path: '/contacts-management',
      color: 'text-red-600'
    }
  ];

  const adminItems = [
    {
      title: 'Админ-панель',
      description: 'Управление системой',
      icon: Shield,
      path: '/admin-dashboard',
      color: 'text-red-500'
    },
    {
      title: 'Исполнительная панель',
      description: 'Аналитика и отчеты',
      icon: BarChart3,
      path: '/executive-dashboard',
      color: 'text-indigo-500'
    },
    {
      title: 'Организатор',
      description: 'Полный контроль',
      icon: Settings,
      path: '/organizer-login',
      color: 'text-yellow-500'
    }
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">STUWA Portal</h1>
              <p className="text-sm text-gray-600">Корпоративная система управления</p>
            </div>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <Button 
                    variant={isActivePath(item.path) ? "default" : "ghost"} 
                    className="flex items-center space-x-2 h-auto p-3"
                  >
                    <Icon className={`w-5 h-5 ${isActivePath(item.path) ? 'text-white' : item.color}`} />
                    <div className="text-left">
                      <div className={`font-medium text-sm ${isActivePath(item.path) ? 'text-white' : 'text-gray-900'}`}>
                        {item.title}
                      </div>
                      <div className={`text-xs ${isActivePath(item.path) ? 'text-blue-100' : 'text-gray-500'}`}>
                        {item.description}
                      </div>
                    </div>
                  </Button>
                </Link>
              );
            })}

            <div className="w-px h-8 bg-gray-200 mx-2" />

            {adminItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <Button 
                    variant={isActivePath(item.path) ? "default" : "ghost"} 
                    className="flex items-center space-x-2 h-auto p-3"
                  >
                    <Icon className={`w-5 h-5 ${isActivePath(item.path) ? 'text-white' : item.color}`} />
                    <div className="text-left">
                      <div className={`font-medium text-sm ${isActivePath(item.path) ? 'text-white' : 'text-gray-900'}`}>
                        {item.title}
                      </div>
                      <div className={`text-xs ${isActivePath(item.path) ? 'text-blue-100' : 'text-gray-500'}`}>
                        {item.description}
                      </div>
                    </div>
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="space-y-2">
              {[...navigationItems, ...adminItems].map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
                    <Button 
                      variant={isActivePath(item.path) ? "default" : "ghost"} 
                      className="w-full flex items-center space-x-3 h-auto p-4 justify-start"
                    >
                      <Icon className={`w-5 h-5 ${isActivePath(item.path) ? 'text-white' : item.color}`} />
                      <div className="text-left">
                        <div className={`font-medium ${isActivePath(item.path) ? 'text-white' : 'text-gray-900'}`}>
                          {item.title}
                        </div>
                        <div className={`text-sm ${isActivePath(item.path) ? 'text-blue-100' : 'text-gray-500'}`}>
                          {item.description}
                        </div>
                      </div>
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
