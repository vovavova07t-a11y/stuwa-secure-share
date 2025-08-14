
import React from 'react';
import { Shield, Upload, Users, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface HeroSectionProps {
  onGetStarted?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/category-login');
  };

  return (
    <section className="hero-gradient min-h-screen flex items-center justify-center pt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Hero Content */}
          <div className="animate-fade-in">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-float">
                <Shield className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="hero-text mb-6">
              Безопасный обмен файлами
              <br />
              <span className="text-foreground">для STUWA</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Профессиональная корпоративная платформа для безопасного обмена файлами 
              с передовым шифрованием и контролем доступа
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                onClick={handleGetStarted}
                className="btn-primary px-8 py-4 text-lg animate-glow"
              >
                Начать работу
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                className="neuro-btn px-8 py-4 text-lg"
              >
                Узнать больше
              </Button>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                icon: Shield,
                title: 'Безопасность',
                description: 'Шифрование уровня банка',
                delay: '1'
              },
              {
                icon: Upload,
                title: 'Drag & Drop',
                description: 'Простая загрузка файлов',
                delay: '2'
              },
              {
                icon: Users,
                title: 'Команды',
                description: 'Управление пользователями',
                delay: '3'
              },
              {
                icon: Lock,
                title: 'Контроль',
                description: 'Ролевой доступ',
                delay: '4'
              }
            ].map((feature, index) => (
              <div 
                key={feature.title} 
                className={`content-card animate-slide-up animate-stagger-${feature.delay}`}
              >
                <div className="feature-icon mx-auto mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Portal Sections Preview */}
          <div className="glass-card p-8 rounded-3xl animate-slide-up animate-stagger-5">
            <h2 className="text-2xl font-bold mb-6">Разделы портала</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { name: 'О нас', icon: '🏢' },
                { name: 'Продукция', icon: '📦' },
                { name: 'Клиенты', icon: '👥' },
                { name: 'Развитие', icon: '📈' },
                { name: 'Контакты', icon: '📞' }
              ].map((section, index) => (
                <div 
                  key={section.name}
                  className="p-4 rounded-xl bg-white/50 hover:bg-white/70 transition-all duration-200 cursor-pointer"
                >
                  <div className="text-2xl mb-2">{section.icon}</div>
                  <p className="font-medium text-sm">{section.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
