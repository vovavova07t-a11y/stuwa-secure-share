
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Settings, Shield, BarChart3 } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                STUWA
              </span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                to="/"
                className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
              >
                Главная
              </Link>
              
              {/* Technical Department Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1">
                  Техническая дирекция
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link to="/technical-dashboard">Панель управления</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Logistics Department Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1">
                  Управление логистики
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link to="/logistics-dashboard">Панель управления</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Commercial Department Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1">
                  Коммерческая дирекция
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link to="/commercial-dashboard">Панель управления</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Contacts Management */}
              <Link
                to="/contacts-management"
                className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
              >
                Контакты
              </Link>

              <Link
                to="/about-us"
                className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
              >
                О нас
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                {/* Admin/Executive Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Управление
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/executive-dashboard" className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Исполнительная панель
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/admin-dashboard" className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Администрирование
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="outline" size="sm" onClick={signOut}>
                  Выйти
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Войти
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Регистрация</Button>
                </Link>
              </div>
            )}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <Link
              to="/"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Главная
            </Link>
            <Link
              to="/technical-dashboard"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Техническая дирекция
            </Link>
            <Link
              to="/logistics-dashboard"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Управление логистики
            </Link>
            <Link
              to="/commercial-dashboard"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Коммерческая дирекция
            </Link>
            <Link
              to="/contacts-management"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Контакты
            </Link>
            <Link
              to="/executive-dashboard"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Исполнительная панель
            </Link>
            <Link
              to="/admin-dashboard"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Администрирование
            </Link>
            <Link
              to="/about-us"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              О нас
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
