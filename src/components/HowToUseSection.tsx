
import React from 'react';
import { LogIn, Upload, Share2, Shield, Users, FileText, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const HowToUseSection: React.FC = () => {
  const navigate = useNavigate();

  const steps = [
    {
      step: '1',
      icon: LogIn,
      title: 'Войдите в систему',
      description: 'Выберите ваш отдел и войдите в безопасную рабочую область',
      color: 'from-blue-500 to-blue-600',
      action: 'Начать работу',
      onClick: () => navigate('/category-login')
    },
    {
      step: '2',
      icon: Upload,
      title: 'Загружайте документы',
      description: 'Перетащите файлы или выберите их для безопасной загрузки',
      color: 'from-green-500 to-green-600',
      action: null
    },
    {
      step: '3',
      icon: Share2,
      title: 'Обменивайтесь файлами',
      description: 'Отправляйте документы между отделами с контролем доступа',
      color: 'from-purple-500 to-purple-600',
      action: null
    },
    {
      step: '4',
      icon: Shield,
      title: 'Контролируйте безопасность',
      description: 'Отслеживайте все действия с документами в режиме реального времени',
      color: 'from-orange-500 to-orange-600',
      action: null
    }
  ];

  const features = [
    {
      icon: Users,
      title: 'Многопользовательский доступ',
      description: 'Работайте в команде с ролевым доступом'
    },
    {
      icon: FileText,
      title: 'Управление документами',
      description: 'Организуйте и структурируйте корпоративные файлы'
    },
    {
      icon: CheckCircle,
      title: 'Отслеживание статусов',
      description: 'Следите за прогрессом обработки документов'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Заголовок секции */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
            Как использовать платформу
          </h2>
          <p className="text-xl text-muted-foreground animate-fade-in animate-stagger-1">
            Простой и безопасный процесс работы с корпоративными документами
          </p>
        </div>

        {/* Шаги использования */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {steps.map((step, index) => (
            <div 
              key={step.step}
              className={`content-card text-center animate-slide-up animate-stagger-${index + 1}`}
            >
              {/* Номер шага */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  {step.step}
                </div>
              </div>

              {/* Иконка */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <step.icon className="w-7 h-7 text-white" />
              </div>
              
              {/* Контент */}
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{step.description}</p>
              
              {/* Кнопка действия */}
              {step.action && (
                <Button 
                  onClick={step.onClick}
                  className="btn-primary w-full"
                >
                  {step.action}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Дополнительные возможности */}
        <div className="glass-card p-8 rounded-3xl animate-slide-up animate-stagger-5">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Дополнительные возможности</h3>
            <p className="text-muted-foreground">
              Платформа STUWA предоставляет полный набор инструментов для корпоративной работы
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={feature.title} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Призыв к действию */}
          <div className="text-center mt-8">
            <Button 
              onClick={() => navigate('/category-login')}
              size="lg"
              className="btn-primary px-8 py-4 text-lg animate-glow"
            >
              Начать работу с платформой
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
