
import React from 'react';
import { Shield, Lock, Key, Eye, Server, UserCheck } from 'lucide-react';

export const SecuritySection: React.FC = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: 'Шифрование AES-256',
      description: 'Все файлы защищены банковским уровнем шифрования',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Lock,
      title: 'Безопасная передача',
      description: 'TLS 1.3 протокол для всех соединений',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Key,
      title: 'Двухфакторная аутентификация',
      description: 'Дополнительный уровень защиты аккаунтов',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Eye,
      title: 'Аудит действий',
      description: 'Полное логирование всех операций с файлами',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Server,
      title: 'Серверы в Германии',
      description: 'Соответствие GDPR и европейским стандартам',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: UserCheck,
      title: 'Контроль доступа',
      description: 'Гранулярные права доступа по ролям',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
            Безопасность корпоративного уровня
          </h2>
          <p className="text-xl text-muted-foreground animate-fade-in animate-stagger-1">
            STUWA Secure Portal использует передовые технологии защиты данных, 
            соответствующие международным стандартам безопасности
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {securityFeatures.map((feature, index) => (
            <div 
              key={feature.title}
              className={`content-card group animate-slide-up animate-stagger-${(index % 3) + 1}`}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 glass-card p-8 rounded-3xl text-center animate-slide-up animate-stagger-4">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-glow">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-4">Сертификация ISO 27001</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Наша система управления информационной безопасностью сертифицирована по международному 
            стандарту ISO 27001, гарантируя высочайший уровень защиты ваших корпоративных данных.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="px-4 py-2 bg-success/10 text-success rounded-full font-medium">
              ISO 27001 ✓
            </span>
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium">
              GDPR Compliant ✓
            </span>
            <span className="px-4 py-2 bg-accent/10 text-accent rounded-full font-medium">
              SOC 2 Type II ✓
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
