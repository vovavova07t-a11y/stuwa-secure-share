
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRightLeft, 
  Send, 
  Inbox, 
  Clock, 
  Users,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface InterdepartmentSectionProps {
  currentDepartment: string;
}

// Mock data - в реальном приложении это будет загружаться из API
const mockStats = {
  incoming: 5,
  outgoing: 3,
  pending: 2,
  collaborative: 1
};

const DEPARTMENT_NAMES = {
  financial: 'Финансовая дирекция',
  technical: 'Техническая дирекция', 
  commercial: 'Коммерческая дирекция',
  logistics: 'Управление логистики',
  office: 'Офис-менеджер'
};

export const InterdepartmentSection: React.FC<InterdepartmentSectionProps> = ({ 
  currentDepartment 
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <ArrowRightLeft className="w-6 h-6" />
          Межотдельское взаимодействие
        </h2>
        <Link to="/interdepartment">
          <Button variant="outline">
            Открыть полную панель
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Входящие</CardTitle>
            <Inbox className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.incoming}</div>
            <p className="text-xs text-muted-foreground">
              документов требуют внимания
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Исходящие</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.outgoing}</div>
            <p className="text-xs text-muted-foreground">
              отправленных документов
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">На согласовании</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.pending}</div>
            <p className="text-xs text-muted-foreground">
              ожидают решения
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Совместные</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.collaborative}</div>
            <p className="text-xs text-muted-foreground">
              совместных проектов
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Активные процессы
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Бюджет на Q1 2024</p>
                <p className="text-sm text-muted-foreground">От: Финансовая дирекция</p>
              </div>
              <Badge className="bg-orange-100 text-orange-800">В обработке</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Техническая спецификация</p>
                <p className="text-sm text-muted-foreground">От: Техническая дирекция</p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800">Получен</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Договор поставки</p>
                <p className="text-sm text-muted-foreground">От: Коммерческая дирекция</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Утвержден</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Требуют внимания
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg border-red-200 bg-red-50">
              <div>
                <p className="font-medium">Отчет по продажам</p>
                <p className="text-sm text-muted-foreground">Просрочен на 2 дня</p>
              </div>
              <Badge className="bg-red-100 text-red-800">Критический</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg border-orange-200 bg-orange-50">
              <div>
                <p className="font-medium">Логистический план</p>
                <p className="text-sm text-muted-foreground">Срок: завтра</p>
              </div>
              <Badge className="bg-orange-100 text-orange-800">Высокий</Badge>
            </div>
            <div className="text-center py-4">
              <Link to="/interdepartment">
                <Button variant="outline">
                  Посмотреть все документы
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Быстрые действия</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/interdepartment?action=send">
              <Button variant="outline" className="w-full flex items-center gap-2">
                <Send className="w-4 h-4" />
                Отправить документ
              </Button>
            </Link>
            <Link to="/interdepartment?tab=incoming">
              <Button variant="outline" className="w-full flex items-center gap-2">
                <Inbox className="w-4 h-4" />
                Входящие документы
              </Button>
            </Link>
            <Link to="/interdepartment?tab=pending">
              <Button variant="outline" className="w-full flex items-center gap-2">
                <Clock className="w-4 h-4" />
                На согласовании
              </Button>
            </Link>
            <Link to="/interdepartment?tab=collaborative">
              <Button variant="outline" className="w-full flex items-center gap-2">
                <Users className="w-4 h-4" />
                Совместные проекты
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
