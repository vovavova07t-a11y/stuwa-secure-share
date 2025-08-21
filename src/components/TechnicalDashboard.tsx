
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Wrench, FileText, Settings, Book, Shield, Zap } from 'lucide-react';
import { UniversalFileUpload } from './UniversalFileUpload';

const categories = [
  { id: 'production_development', name: 'Программа развития', icon: Book },
  { id: 'production_overview', name: 'Обзор продукции', icon: FileText },
  { id: 'production_specs', name: 'Технические спецификации', icon: Wrench },
  { id: 'production_presentations', name: 'Презентации деятельности', icon: Zap },
  { id: 'production_business_plans', name: 'Бизнес-планы', icon: Shield },
  { id: 'production_catalogs', name: 'Каталоги компании', icon: Settings }
];

export const TechnicalDashboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showUpload, setShowUpload] = useState(false);

  const getCategoryTitle = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Неизвестная категория';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Главная</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Техническая дирекция</BreadcrumbPage>
            </BreadcrumbItem>
            {selectedCategory && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {getCategoryTitle(selectedCategory)}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="container mx-auto px-4 pb-20">
        {!selectedCategory ? (
          /* Category Selection View */
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Техническая дирекция STUWA
              </h1>
              <p className="text-xl text-muted-foreground">
                Управление техническими документами и спецификациями
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
            </div>
          </div>
        ) : (
          /* Document Management View */
          <div className="animate-fade-in">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Sidebar Navigation */}
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
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Действия</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full btn-primary"
                      onClick={() => setShowUpload(!showUpload)}
                    >
                      {showUpload ? 'Скрыть загрузку' : 'Загрузить документ'}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
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
                        allowedTypes={['pdf', 'doc', 'docx', 'txt', 'jpg', 'jpeg', 'png']}
                        onFilesChange={(files) => {
                          console.log(`Технические файлы для категории ${selectedCategory}:`, files);
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
    </div>
  );
};
