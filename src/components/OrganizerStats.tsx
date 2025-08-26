
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Cog, 
  Truck, 
  TrendingUp, 
  Phone,
  FileText,
  Calendar,
  Download,
  Eye
} from 'lucide-react';

interface DepartmentStats {
  department: string;
  title: string;
  subtitle: string;
  fileCount: number;
  lastUpdate: string;
  icon: React.ElementType;
  color: string;
}

export const OrganizerStats: React.FC = () => {
  const departmentStats: DepartmentStats[] = [
    {
      department: 'financial',
      title: 'О нас',
      subtitle: 'Финансовая дирекция',
      fileCount: 45,
      lastUpdate: '2 часа назад',
      icon: Building2,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      department: 'technical',
      title: 'Продукция',
      subtitle: 'Техническая дирекция',
      fileCount: 32,
      lastUpdate: '1 час назад',
      icon: Cog,
      color: 'text-green-600 bg-green-50'
    },
    {
      department: 'logistics',
      title: 'Клиенты',
      subtitle: 'Управление логистики',
      fileCount: 28,
      lastUpdate: '3 часа назад',
      icon: Truck,
      color: 'text-orange-600 bg-orange-50'
    },
    {
      department: 'commercial',
      title: 'Развитие',
      subtitle: 'Коммерческая дирекция',
      fileCount: 51,
      lastUpdate: '30 минут назад',
      icon: TrendingUp,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      department: 'contacts',
      title: 'Контакты',
      subtitle: 'Офис менеджер',
      fileCount: 19,
      lastUpdate: '1 день назад',
      icon: Phone,
      color: 'text-red-600 bg-red-50'
    }
  ];

  const totalFiles = departmentStats.reduce((sum, dept) => sum + dept.fileCount, 0);

  return (
    <div className="space-y-6">
      {/* Общая статистика */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Общая статистика файлов
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{totalFiles}</div>
              <div className="text-sm text-muted-foreground">Всего файлов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">5</div>
              <div className="text-sm text-muted-foreground">Отделов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">127</div>
              <div className="text-sm text-muted-foreground">Просмотров сегодня</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">23</div>
              <div className="text-sm text-muted-foreground">Скачиваний сегодня</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Статистика по отделам */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Статистика по отделам</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {departmentStats.map((dept) => {
            const IconComponent = dept.icon;
            return (
              <Card key={dept.department} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${dept.color}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <Badge variant="secondary" className="gap-1">
                      <FileText className="w-3 h-3" />
                      {dept.fileCount}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium">{dept.title}</h4>
                    <p className="text-sm text-muted-foreground">{dept.subtitle}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      Обновлено: {dept.lastUpdate}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
