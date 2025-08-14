
import React from 'react';
import { Shield, Mail, Phone, MapPin, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">STUWA</h3>
                <p className="text-sm text-secondary-foreground/70">Secure Portal</p>
              </div>
            </div>
            <p className="text-sm text-secondary-foreground/80 leading-relaxed">
              Профессиональная корпоративная платформа для безопасного обмена файлами 
              с соответствием европейским стандартам безопасности.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Разделы портала</h4>
            <ul className="space-y-2 text-sm">
              {['О нас', 'Продукция', 'Клиенты', 'Развитие', 'Контакты'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Security & Compliance */}
          <div>
            <h4 className="font-semibold mb-4">Безопасность</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-secondary-foreground/70">🔐 AES-256 шифрование</li>
              <li className="text-secondary-foreground/70">🛡️ ISO 27001 сертификация</li>
              <li className="text-secondary-foreground/70">🇪🇺 GDPR соответствие</li>
              <li className="text-secondary-foreground/70">🔍 Аудит действий</li>
              <li className="text-secondary-foreground/70">🔑 2FA аутентификация</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-secondary-foreground/70">support@stuwa.de</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-secondary-foreground/70">+49 (0) 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-secondary-foreground/70">Deutschland, Berlin</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-primary" />
                <span className="text-secondary-foreground/70">www.stuwa.de</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-secondary-foreground/60">
              © 2024 STUWA GmbH. Все права защищены.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#privacy" className="text-secondary-foreground/60 hover:text-secondary-foreground transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#terms" className="text-secondary-foreground/60 hover:text-secondary-foreground transition-colors">
                Условия использования
              </a>
              <a href="#cookies" className="text-secondary-foreground/60 hover:text-secondary-foreground transition-colors">
                Cookie
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
