
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react";
import { ThemeToggle } from './ThemeToggle';
import {
  Building,
  Package,
  Users,
  TrendingUp,
  Phone,
  FileText
} from 'lucide-react';
import { Bell } from 'lucide-react';
import { NotificationCenter } from './interdepartment/NotificationCenter';

interface NavigationProps {
  onLoginClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onLoginClick = () => {} }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/80">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                STUWA
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/about" 
              className="nav-link flex items-center space-x-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <Building className="w-4 h-4" />
              <span>О нас</span>
            </Link>
            <Link 
              to="/products" 
              className="nav-link flex items-center space-x-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <Package className="w-4 h-4" />
              <span>Продукция</span>
            </Link>
            <Link 
              to="/clients" 
              className="nav-link flex items-center space-x-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <Users className="w-4 h-4" />
              <span>Клиенты</span>
            </Link>
            <Link 
              to="/development" 
              className="nav-link flex items-center space-x-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Развитие</span>
            </Link>
            <Link 
              to="/contacts" 
              className="nav-link flex items-center space-x-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Контакты</span>
            </Link>
            <Link 
              to="/interdepartment" 
              className="nav-link flex items-center space-x-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Межотдельский обмен</span>
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <NotificationCenter />
            
            <ThemeToggle />
            
            <Button 
              onClick={onLoginClick}
              className="btn-primary hidden md:flex"
            >
              Войти в систему
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <Link
              to="/about"
              className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              О нас
            </Link>
            <Link
              to="/products"
              className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Продукция
            </Link>
            <Link
              to="/clients"
              className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Клиенты
            </Link>
            <Link
              to="/development"
              className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Развитие
            </Link>
            <Link
              to="/contacts"
              className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Контакты
            </Link>
            <Link
              to="/interdepartment"
              className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Межотдельский обмен
            </Link>
            <Button onClick={onLoginClick} className="btn-primary w-full mt-2">
              Войти в систему
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
