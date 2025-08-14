
import React, { useState } from 'react';
import { Menu, X, Shield, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  isAuthenticated?: boolean;
  onAuthClick?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  isAuthenticated = false, 
  onAuthClick 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'О нас', href: '#about' },
    { label: 'Продукция', href: '#products' },
    { label: 'Клиенты', href: '#clients' },
    { label: 'Развитие', href: '#development' },
    { label: 'Контакты', href: '#contacts' },
  ];

  return (
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="feature-icon">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">STUWA</h1>
              <p className="text-xs text-muted-foreground">Secure Portal</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-link"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Admin</span>
                </div>
                <Button variant="ghost" size="sm">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button onClick={onAuthClick} className="btn-primary px-6">
                Войти
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu md:hidden animate-fade-in">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-200/20">
              <div className="flex items-center space-x-3">
                <div className="feature-icon">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">STUWA</h1>
                  <p className="text-xs text-muted-foreground">Secure Portal</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex-1 px-4 py-6">
              <div className="space-y-4">
                {navItems.map((item, index) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`block text-lg font-medium text-foreground hover:text-primary transition-colors animate-slide-in-right animate-stagger-${index + 1}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-gray-200/20">
              {isAuthenticated ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Admin</p>
                      <p className="text-sm text-muted-foreground">Администратор</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button onClick={onAuthClick} className="btn-primary w-full">
                  Войти в систему
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
