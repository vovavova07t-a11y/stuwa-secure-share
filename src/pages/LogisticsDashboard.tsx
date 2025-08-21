
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Users, Building2, Target, Presentation, FileText, TrendingUp, ArrowLeftRight } from 'lucide-react';
import { UniversalFileUpload } from '@/components/UniversalFileUpload';
import { InterdepartmentDashboard } from '@/components/interdepartment/InterdepartmentDashboard';
import Navigation from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const categories = [
  { id: 'development_client_requests', name: 'Запросы клиентов', icon: Users },
  { id: 'development_client_list', name: 'База клиентов', icon: Building2 },
  { id: 'development_partnerships', name: 'Документы о партнерстве', icon: Target },
  { id: 'development_quotations', name: 'Активные котировки', icon: Presentation },
  { id: 'development_price_lists', name: 'Прайс-листы', icon: FileText },
  { id: 'development_catalogs', name: 'Каталог продукции', icon: TrendingUp }
];

const LogisticsDashboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showUpload, setShowUpload] = useState(false);
  const [showInterdepartment, setShowInterdepartment] = useState(false);

  const getCategoryTitle = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Неизвестная категория';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Главная</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Развитие</BreadcrumbPage>
            </BreadcrumbItem>
            {selectedCategory && !showInterdepartment && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {getCategoryTitle(selectedCategory)}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
            {showInterdepartment && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Межотдельский обмен</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="container mx-auto px-4 pb-20">
        {showInterdepartment ? (
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
                      className="w-full justify-start"
                      onClick={() => setShowInterdepartment(true)}
                    >
                      <ArrowLeftRight className="w-4 h-4 mr-2" />
                      Межотдельский обмен
                      <Badge className="ml-auto bg-red-500 text-white">4</Badge>
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex-1">
                <InterdepartmentDashboard />
              </div>
            </div>
          </div>
        ) : !selectedCategory ? (
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Управление логистики STUWA
              </h1>
              <p className="text-xl text-muted-foreground">
                Развитие бизнеса и управление логистическими процессами
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
                    <Badge className="ml-2 bg-red-500 text-white">4</Badge>
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
                      <Badge className="ml-auto bg-red-500 text-white">4</Badge>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Действия</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button 
                      className="w-full btn-primary"
                      onClick={() => setShowUpload(!showUpload)}
                    >
                      {showUpload ? 'Скрыть загрузку' : 'Загрузить документ'}
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowInterdepartment(true)}
                    >
                      <ArrowLeftRight className="w-4 h-4 mr-2" />
                      Отправить в другой отдел
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="flex-1 space-y-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      {getCategoryTitle(selectedCategory)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {showUpload ? (
                      <UniversalFileUpload
                        title={`Загрузка документов - ${getCategoryTitle(selectedCategory)}`}
                        categoryId={selectedCategory}
                        allowedTypes={['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'jpeg', 'png']}
                        onFilesChange={(files) => {
                          console.log(`Логистические файлы для категории ${selectedCategory}:`, files);
                        }}
                      />
                    ) : (
                      <div className="text-center py-12">
                        <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Документы не загружены</h3>
                        <p className="text-muted-foreground mb-4">
                          Нажмите "Загрузить документ" чтобы добавить файлы в этот раздел
                        </p>
                        <Button onClick={() => setShowUpload(true)} className="btn-primary">
                          Загрузить первый документ
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default LogisticsDashboard;
