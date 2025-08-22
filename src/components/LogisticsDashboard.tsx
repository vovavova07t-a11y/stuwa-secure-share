
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Truck, Package, MapPin, Clock, Plus, FileText } from 'lucide-react';

export const LogisticsDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Управление логистики</h1>
        <Badge variant="outline">Активно</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Активные поставки</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">+3 новых сегодня</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Товары на складе</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,547</div>
            <p className="text-xs text-muted-foreground">различных позиций</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Маршруты</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">активных направлений</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Среднее время</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4д</div>
            <p className="text-xs text-muted-foreground">время доставки</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Текущие поставки</CardTitle>
            <CardDescription>Отслеживание активных заказов</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Заказ #LG-001</p>
                  <p className="text-sm text-muted-foreground">Москва → Санкт-Петербург</p>
                </div>
                <Badge variant="secondary">В пути</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Заказ #LG-002</p>
                  <p className="text-sm text-muted-foreground">Казань → Нижний Новгород</p>
                </div>
                <Badge variant="outline">Подготовка</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Заказ #LG-003</p>
                  <p className="text-sm text-muted-foreground">Екатеринбург → Челябинск</p>
                </div>
                <Badge variant="default">Доставлено</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Быстрые действия</CardTitle>
            <CardDescription>Основные функции логистики</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Создать новую поставку
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Package className="mr-2 h-4 w-4" />
              Управление складом
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Truck className="mr-2 h-4 w-4" />
              Отслеживание транспорта
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Отчеты по доставкам
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Статистика по регионам</CardTitle>
          <CardDescription>Объемы поставок по направлениям</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Центральный регион</h4>
              <p className="text-2xl font-bold text-blue-600">245</p>
              <p className="text-sm text-muted-foreground">поставок в месяц</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Северо-Запад</h4>
              <p className="text-2xl font-bold text-green-600">189</p>
              <p className="text-sm text-muted-foreground">поставок в месяц</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Урал и Сибирь</h4>
              <p className="text-2xl font-bold text-orange-600">156</p>
              <p className="text-sm text-muted-foreground">поставок в месяц</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
