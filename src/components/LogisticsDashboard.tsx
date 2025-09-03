import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Truck, Package, Users, FileBarChart, ClipboardList, Building2, ArrowLeftRight } from 'lucide-react';
import { CategoryFileSection } from '@/components/CategoryFileSection';
import { InterdepartmentDashboard } from '@/components/interdepartment/InterdepartmentDashboard';

const categories = [
  { 
    id: 'log_current_issues_germany', 
    name: 'Текущие вопросы (Германия)', 
    icon: Building2,
    description: 'Текущие вопросы по работе с Германией'
  },
  { 
    id: 'log_sales_report', 
    name: 'Отчет по реализации', 
    icon: FileBarChart,
    description: 'Отчеты по реализации продукции и услуг'
  },
  { 
    id: 'log_contract_development', 
    name: 'Отчет по освоению Договоров', 
    icon: ClipboardList,
    description: 'Отчеты по освоению и выполнению договоров'
  },
  { 
    id: 'log_procurement_announcements', 
    name: 'Обзор объявлений о закупе', 
    icon: Package,
    description: 'Обзор и анализ объявлений о закупках'
  },
  { 
    id: 'log_sales_contracts', 
    name: 'Договора на реализацию', 
    icon: Truck,
    description: 'Договоры на реализацию продукции'
  }
];

export const LogisticsDashboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showInterdepartment, setShowInterdepartment] = useState(false);

  const getCategoryInfo = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? { name: category.name, description: category.description } : { name: 'Неизвестная категория', description: '' };
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {!selectedCategory ? (
        <div className="animate-fade-in">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <img 
                src="/lovable-uploads/731a20c8-27b9-473f-90cc-ce84f4ebac8c.png" 
                alt="STUWA Logo" 
                className="h-16 w-auto"
              />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Управление логистики STUWA
            </h1>
            <p className="text-xl text-muted-foreground">
              Управление поставками, складскими операциями и логистикой
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
              className="glass-card hover:scale-105 transition-all duration-300 cursor-pointer group animate-slide-up animate-stagger-6 border-2 border-primary/20"
              onClick={() => setShowInterdepartment(true)}
            >
              <CardHeader className="text-center">
                <div className="feature-icon mx-auto mb-4 group-hover:scale-110 transition-transform bg-primary/10">
                  <ArrowLeftRight className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                  Межотдельский обмен
                  <Badge className="ml-2 bg-red-500 text-white animate-pulse">3</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <Button 
                    variant="default" 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Обмен файлами и документами
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : showInterdepartment ? (
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
                  ← Управление логистики
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
                  className="w-full justify-start bg-primary text-primary-foreground"
                  onClick={() => setShowInterdepartment(true)}
                >
                  <ArrowLeftRight className="w-4 h-4 mr-2" />
                  Межотдельский обмен
                  <Badge className="ml-auto bg-red-500 text-white">3</Badge>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex-1">
            <InterdepartmentDashboard />
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
                    <Badge className="ml-auto bg-red-500 text-white">3</Badge>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="flex-1">
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
