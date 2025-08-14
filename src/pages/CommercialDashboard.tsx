
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ClientRequestsReport } from '@/components/commercial/ClientRequestsReport';
import { ClientDatabase } from '@/components/commercial/ClientDatabase';
import { ProductCatalog } from '@/components/commercial/ProductCatalog';
import { PriceLists } from '@/components/commercial/PriceLists';
import { ActiveQuotations } from '@/components/commercial/ActiveQuotations';
import { PartnershipsDocuments } from '@/components/commercial/PartnershipsDocuments';
import { 
  Users, 
  FileText, 
  Package, 
  DollarSign, 
  Quote, 
  Handshake,
  TrendingUp,
  BarChart3
} from 'lucide-react';

const CommercialDashboard: React.FC = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <Card className="glass-card max-w-md mx-auto text-center">
            <CardHeader>
              <CardTitle>Требуется авторизация</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Для доступа к Коммерческой дирекции необходимо войти в систему
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const overviewCards = [
    {
      title: 'Активные клиенты',
      value: '156',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Открытые запросы',
      value: '24',
      change: '+8%',
      icon: FileText,
      color: 'text-orange-600'
    },
    {
      title: 'Активные КП',
      value: '18',
      change: '+15%',
      icon: Quote,
      color: 'text-green-600'
    },
    {
      title: 'Месячная выручка',
      value: '€125,000',
      change: '+22%',
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Коммерческая дирекция
          </h1>
          <p className="text-muted-foreground">
            Управление бизнес-развитием и отношениями с клиентами
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="requests">Запросы</TabsTrigger>
            <TabsTrigger value="clients">Клиенты</TabsTrigger>
            <TabsTrigger value="products">Продукция</TabsTrigger>
            <TabsTrigger value="pricing">Прайс-листы</TabsTrigger>
            <TabsTrigger value="quotations">КП</TabsTrigger>
            <TabsTrigger value="partnerships">Соглашения</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {overviewCards.map((card, index) => (
                <Card key={index} className="glass-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {card.title}
                        </p>
                        <p className="text-2xl font-bold text-foreground">
                          {card.value}
                        </p>
                        <p className="text-sm text-green-600 font-medium">
                          {card.change}
                        </p>
                      </div>
                      <card.icon className={`w-8 h-8 ${card.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Воронка продаж
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Лиды</span>
                      <span className="text-sm text-muted-foreground">45</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Квалификация</span>
                      <span className="text-sm text-muted-foreground">32</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Предложения</span>
                      <span className="text-sm text-muted-foreground">18</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Закрытые сделки</span>
                      <span className="text-sm text-muted-foreground">12</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Недавняя активность</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Новый клиент добавлен</p>
                        <p className="text-xs text-muted-foreground">BMW Group - 2 часа назад</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">КП отправлено</p>
                        <p className="text-xs text-muted-foreground">Volkswagen AG - 4 часа назад</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Обновлен прайс-лист</p>
                        <p className="text-xs text-muted-foreground">Каталог 2024 - 6 часов назад</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Подписан договор</p>
                        <p className="text-xs text-muted-foreground">Mercedes-Benz - 1 день назад</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="requests">
            <ClientRequestsReport />
          </TabsContent>

          <TabsContent value="clients">
            <ClientDatabase />
          </TabsContent>

          <TabsContent value="products">
            <ProductCatalog />
          </TabsContent>

          <TabsContent value="pricing">
            <PriceLists />
          </TabsContent>

          <TabsContent value="quotations">
            <ActiveQuotations />
          </TabsContent>

          <TabsContent value="partnerships">
            <PartnershipsDocuments />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CommercialDashboard;
