
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Settings, 
  ChevronDown
} from 'lucide-react';
import { AuthModal } from './AuthModal';

const Navigation = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const location = useLocation();

  const adminItems = [
    { path: '/executive', label: 'Исполнительная панель', icon: Users },
    { path: '/admin', label: 'Администрация', icon: Settings },
    { path: '/organizer-login', label: 'Вход организатора', icon: Settings },
  ];

  return (
    <>
      <nav className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">STUWA</span>
              <span className="text-xs text-gray-500">Корпоративный портал</span>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            <div className="relative group">
              <Button variant="outline" className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Админ</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
              
              <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
                <div className="p-2">
                  {adminItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                      >
                        <Icon className="w-4 h-4" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            <Link to="/category-login">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-2">
                Войти в систему
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default Navigation;
