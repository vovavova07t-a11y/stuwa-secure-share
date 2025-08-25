
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, TrendingUp, Users, Building, FileBarChart, UserCheck, ScrollText, ArrowLeftRight } from 'lucide-react';
import { CategoryFileSection } from '@/components/CategoryFileSection';
import { InterdepartmentDashboard } from '@/components/interdepartment/InterdepartmentDashboard';

const categories = [
  { 
    id: 'about_debt_reports', 
    name: 'Отчеты по задолженностям', 
    icon: FileBarChart,
    description: 'Отчеты и аналитика по дебиторской и кредиторской задолженности'
  },
  { 
    id: 'about_monthly_finance', 
    name: 'Финансовый отчет за месяц', 
    icon: TrendingUp,
    description: 'Ежемесячные финансовые отчеты и сводки'
  },
  { 
    id: 'about_quarterly_tax', 
    name: 'Налоговый отчет за квартал', 
    icon: FileText,
    description: 'Квартальные налоговые декларации и отчеты'
  },
  { 
    id: 'about_annual_finance', 
    name: 'Финансовая отчетность за год', 
    icon: FileBarChart,
    description: 'Годовая финансовая отчетность и баланс'
  },
  { 
    id: 'about_founding_docs', 
    name: 'Учредительные документы', 
    icon: ScrollText,
    description: 'Устав, учредительный договор и регистрационные документы'
  },
  { 
    id: 'about_org_structure', 
    name: 'Оргструктура и штатное расписание', 
    icon: Users,
    description: 'Организационная структура компании и штатное расписание'
  },
  { 
    id: 'about_protocols', 
    name: 'Протоколы НС', 
    icon: Building,
    description: 'Протоколы заседаний наблюдательного совета'
  }
];

export const FinancialDashboard: React.FC = () => {
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
                  ← Финансовая дирекция
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
                  <Badge className="ml-auto bg-red-500 text-white">5</Badge>
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
            <div className="flex justify-center mb-6">
              <img 
                src="/lovable-uploads/731a20c8-27b9-473f-90cc-ce84f4ebac8c.png" 
                alt="STUWA Logo" 
                className="h-16 w-auto"
              />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Финансовая дирекция STUWA
            </h1>
            <p className="text-xl text-muted-foreground">
              Управление финансовой отчетностью и документооборотом
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
              className="glass-card hover:scale-105 transition-all duration-300 cursor-pointer group animate-slide-up animate-stagger-8 border-2 border-primary/20"
              onClick={() => setShowInterdepartment(true)}
            >
              <CardHeader className="text-center">
                <div className="feature-icon mx-auto mb-4 group-hover:scale-110 transition-transform bg-primary/10">
                  <ArrowLeftRight className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                  Межотдельский обмен
                  <Badge className="ml-2 bg-red-500 text-white animate-pulse">5</Badge>
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
                    <Badge className="ml-auto bg-red-500 text-white">5</Badge>
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
