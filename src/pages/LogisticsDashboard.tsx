
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Users, TrendingUp, FileText, ShoppingCart, Calendar, MapPin, Target, AlertCircle } from 'lucide-react';
import { LogisticsMetrics } from '@/components/logistics/LogisticsMetrics';
import { ClientsOverview } from '@/components/logistics/ClientsOverview';
import { SalesReport } from '@/components/logistics/SalesReport';
import { ContractsProgress } from '@/components/logistics/ContractsProgress';
import { ProcurementOpportunities } from '@/components/logistics/ProcurementOpportunities';
import { ContractsManagement } from '@/components/logistics/ContractsManagement';
import { InterdepartmentSection } from '@/components/interdepartment/InterdepartmentSection';
import { Separator } from '@/components/ui/separator';

const LogisticsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

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
              <BreadcrumbPage>Управление логистики</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Клиенты</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <div className="animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Управление клиентами STUWA
            </h1>
            <p className="text-xl text-muted-foreground">
              Комплексное управление отношениями с клиентами и продажами
            </p>
          </div>

          {/* Quick Stats */}
          <LogisticsMetrics />

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Обзор</span>
              </TabsTrigger>
              <TabsTrigger value="sales" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Продажи</span>
              </TabsTrigger>
              <TabsTrigger value="contracts" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Договора</span>
              </TabsTrigger>
              <TabsTrigger value="progress" className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span className="hidden sm:inline">Освоение</span>
              </TabsTrigger>
              <TabsTrigger value="procurement" className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Закупки</span>
              </TabsTrigger>
              <TabsTrigger value="current-issues" className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Вопросы</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <ClientsOverview />
            </TabsContent>

            <TabsContent value="sales" className="space-y-6">
              <SalesReport />
            </TabsContent>

            <TabsContent value="contracts" className="space-y-6">
              <ContractsManagement />
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              <ContractsProgress />
            </TabsContent>

            <TabsContent value="procurement" className="space-y-6">
              <ProcurementOpportunities />
            </TabsContent>

            <TabsContent value="current-issues" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Текущие вопросы (Германия)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border border-amber-200 bg-amber-50 rounded-lg">
                      <h3 className="font-semibold text-amber-800 mb-2">Регулятивные изменения</h3>
                      <p className="text-amber-700">Новые требования по упаковке вступают в силу с 1 января 2025 года.</p>
                    </div>
                    <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold text-blue-800 mb-2">Логистические вызовы</h3>
                      <p className="text-blue-700">Повышение тарифов на автомобильные перевозки в регионе Северный Рейн-Вестфалия.</p>
                    </div>
                    <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                      <h3 className="font-semibold text-green-800 mb-2">Возможности роста</h3>
                      <p className="text-green-700">Расширение сети дистрибуции в южных регионах Германии.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Separator className="my-8" />
          <InterdepartmentSection currentDepartment="logistics" />
        </div>
      </div>
    </div>
  );
};

export default LogisticsDashboard;
