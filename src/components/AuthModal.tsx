
import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    department: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would be the actual authentication logic
    console.log('Auth attempt:', { isLogin, formData });
    onSuccess?.();
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative glass-card max-w-md w-full mx-4 p-8 rounded-2xl animate-fade-in">
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4"
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </Button>

        <div className="text-center mb-8">
          <div className="feature-icon mx-auto mb-4">
            <User className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold mb-2">
            {isLogin ? 'Вход в систему' : 'Регистрация'}
          </h2>
          <p className="text-muted-foreground">
            {isLogin 
              ? 'Войдите в ваш корпоративный аккаунт STUWA'
              : 'Создайте новый корпоративный аккаунт'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="fullName">Полное имя</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Введите ваше полное имя"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                className="h-12"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="name@stuwa.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="h-12 pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className="h-12 pl-10 pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="department">Отдел</Label>
              <select
                id="department"
                value={formData.department}
                onChange={(e) => handleChange('department', e.target.value)}
                className="w-full h-12 px-3 border border-input rounded-md bg-background"
              >
                <option value="">Выберите отдел</option>
                <option value="admin">Администрация</option>
                <option value="sales">Продажи</option>
                <option value="development">Разработка</option>
                <option value="support">Поддержка</option>
              </select>
            </div>
          )}

          <Button type="submit" className="btn-primary w-full h-12">
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
            <Button
              variant="link"
              className="ml-1 p-0 text-primary hover:text-primary-hover"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Зарегистрироваться' : 'Войти'}
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};
