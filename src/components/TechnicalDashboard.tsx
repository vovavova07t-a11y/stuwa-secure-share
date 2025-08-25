
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Wrench, FileText, Cpu, Database, Shield, ArrowLeftRight } from 'lucide-react';
import { CategoryFileSection } from '@/components/CategoryFileSection';
import { InterdepartmentDashboard } from '@/components/interdepartment/InterdepartmentDashboard';

const categories = [
  { 
    id: 'production_development', 
    name: 'Программа развития', 
    icon: Settings,
    description: 'Документы по программе развития производства и внедрения новых технологий'
  },
  { 
    id: 'production_overview', 
    name: 'Обзор продукции', 
    icon: Wrench,
    description: 'Обзоры и каталоги производимой продукции'
  },
  { 
    id: 'production_specs', 
    name: 'Технические характеристики', 
    icon: FileText,
    description: 'Технические спецификации и характеристики оборудования'
  },
  { 
    id: 'production_hardware', 
    name: 'Аппаратное обеспечение', 
    icon: Cpu,
    description: 'Документация по аппаратному обеспечению и оборудованию'
  },
  { 
    id: 'production_software', 
    name: 'Программное обеспечение', 
    icon: Database,
    description: 'Документация по программному обеспечению и ПО'
  },
  { 
    id: 'production_security', 
    name: 'Системы безопасности', 
    icon: Shield,
    description: 'Документы по системам безопасности и защиты'
  }
];

export const TechnicalDashboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showInterdepartment, setShowInterdepartment] = useState(false);

  const getCategoryInfo = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? { name: category.name, description: category.description } : { name: 'Неизвестная категория', description: '' };
  };

  if (showInterdepartment) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-80 space-y-4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Разделы</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setShowInterdepartment(false)}
                >
                  ← Техническая дирекция
                </Button>
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setShowInterdepartment(false);
                      }}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {category.name}
                    </Button>
                  );
                })}
                <Button
                  variant="default"
                  className="w-full justify-start"
                  onClick={() => setShowInterdepartment(true)}
                >
                  <ArrowLeftRight className="w-4 h-4 mr-2" />
                  Межотдельский обмен
                  <Badge className="ml-auto bg-red-500 text-white">2</Badge>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex-1">
            <InterdepartmentDashboard />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {!selectedCategory ? (
        <div className="animate-fade-in">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Техническая дирекция STUWA
            </h1>
            <p className="text-xl text-muted-foreground">
              Управление технической документацией и разработкой
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card 
                  key={category.id}
                  className={`glass-card hover:scale-105 transition-all duration-300 cursor-pointer group animate-slide-up animate-stagger-${index + 1}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CardHeader className="text-center">
                    <div className="feature-icon mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {category.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 text-center">
                      {category.description}
                    </p>
                    <div className="text-center">
                      <Button 
                        variant="ghost" 
                        className="w-full group-hover:bg-primary/10 transition-colors"
                      >
                        Перейти к документам
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            
            {/* Межотдельский обмен карточка */}
            <Card 
              className="glass-card hover:scale-105 transition-all duration-300 cursor-pointer group animate-slide-up animate-stagger-7"
              onClick={() => setShowInterdepartment(true)}
            >
              <CardHeader className="text-center">
                <div className="feature-icon mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <ArrowLeftRight className="w-8 h-8" />
                </div>
                <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                  Межотдельский обмен
                  <Badge className="ml-2 bg-red-500 text-white">2</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <Button 
                    variant="ghost" 
                    className="w-full group-hover:bg-primary/10 transition-colors"
                  >
                    Обмен файлами
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-80 space-y-4">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">Разделы</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory('')}
                  >
                    ← Все разделы
                  </Button>
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {category.name}
                      </Button>
                    );
                  })}
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setShowInterdepartment(true)}
                  >
                    <ArrowLeftRight className="w-4 h-4 mr-2" />
                    Межотдельский обмен
                    <Badge className="ml-auto bg-red-500 text-white">2</Badge>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="flex-1">
              {/* Display files for selected category */}
              <CategoryFileSection
                categoryId={selectedCategory}
                categoryTitle={getCategoryInfo(selectedCategory).name}
                description={getCategoryInfo(selectedCategory).description}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
