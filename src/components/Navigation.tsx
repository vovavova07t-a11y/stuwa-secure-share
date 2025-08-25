
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { 
  Building2, 
  FileText, 
  Calculator, 
  Truck, 
  Users, 
  BarChart3,
  Bell,
  Menu,
  X
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  // Загружаем количество непрочитанных уведомлений
  const loadUnreadCount = async () => {
    try {
      const { data, error } = await supabase
        .from('interdepartment_notifications' as any)
        .select('id', { count: 'exact' })
        .eq('is_read', false);

      if (error) {
        console.error('Ошибка загрузки уведомлений:', error);
        return;
      }

      setUnreadNotifications(data?.length || 0);
    } catch (error) {
      console.error('Ошибка при подсчете уведомлений:', error);
    }
  };

  useEffect(() => {
    loadUnreadCount();
    
    // Обновляем каждые 30 секунд
    const interval = setInterval(loadUnreadCount, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    {
      title: 'Техническая дирекция',
      path: '/technical',
      icon: Building2,
      color: 'text-blue-600'
    },
    {
      title: 'Финансовая дирекция', 
      path: '/financial',
      icon: Calculator,
      color: 'text-green-600'
    },
    {
      title: 'Коммерческая дирекция',
      path: '/commercial', 
      icon: BarChart3,
      color: 'text-purple-600'
    },
    {
      title: 'Управление логистики',
      path: '/logistics',
      icon: Truck,
      color: 'text-orange-600'
    },
    {
      title: 'Исполнительная дирекция',
      path: '/executive',
      icon: Users,
      color: 'text-red-600'
    },
    {
      title: 'Межотдельский обмен',
      path: '/interdepartment',
      icon: FileText,
      color: 'text-indigo-600',
      badge: unreadNotifications > 0 ? unreadNotifications : undefined
    }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-white dark:bg-gray-900 shadow-lg border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2">
                <Building2 className="h-8 w-8 text-primary" />
                <span className="font-bold text-xl">DocFlow</span>
              </Link>
              
              <div className="flex items-center space-x-6">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${item.color}`} />
                      {item.title}
                      {item.badge && (
                        <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white dark:bg-gray-900 shadow-lg border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">DocFlow</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className="p-2"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={`flex items-center justify-between w-full px-3 py-3 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${item.color}`} />
                      {item.title}
                    </div>
                    {item.badge && (
                      <Badge className="bg-red-500 text-white text-xs px-2 py-1">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;
