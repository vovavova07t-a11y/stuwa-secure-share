
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Cog, 
  Truck, 
  TrendingUp, 
  Phone,
  FileText,
  Eye,
  Loader2
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface DepartmentStats {
  department: string;
  title: string;
  subtitle: string;
  fileCount: number;
  lastUpdate: string;
  icon: React.ElementType;
  color: string;
}

interface FileRow {
  id: string;
  uploaded_at: string | null;
  created_at: string | null;
}

export const OrganizerRealStats: React.FC = () => {
  const [stats, setStats] = useState<DepartmentStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalFiles, setTotalFiles] = useState(0);

  const departmentConfig = [
    {
      department: 'financial',
      title: 'О нас',
      subtitle: 'Финансовая дирекция',
      icon: Building2,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      department: 'technical',
      title: 'Продукция',
      subtitle: 'Техническая дирекция',
      icon: Cog,
      color: 'text-green-600 bg-green-50'
    },
    {
      department: 'logistics',
      title: 'Клиенты',
      subtitle: 'Управление логистики',
      icon: Truck,
      color: 'text-orange-600 bg-orange-50'
    },
    {
      department: 'commercial',
      title: 'Развитие',
      subtitle: 'Коммерческая дирекция',
      icon: TrendingUp,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      department: 'contacts',
      title: 'Контакты',
      subtitle: 'Офис менеджер',
      icon: Phone,
      color: 'text-red-600 bg-red-50'
    }
  ];

  useEffect(() => {
    const loadRealStats = async () => {
      try {
        setIsLoading(true);
        const promises = departmentConfig.map(async (config) => {
          const { data, error } = await supabase
            .from('files')
            .select('id, uploaded_at, created_at')
            .eq('department', config.department);

          if (error) {
            console.error(`Ошибка загрузки данных для ${config.department}:`, error);
            return {
              ...config,
              fileCount: 0,
              lastUpdate: 'Нет данных'
            };
          }

          const fileCount = data?.length || 0;
          let lastUpdate = 'Нет файлов';
          
          if (data && data.length > 0) {
            const sortedFiles = [...data].sort((a: FileRow, b: FileRow) => {
              const dateA = new Date(a.uploaded_at || a.created_at || '').getTime();
              const dateB = new Date(b.uploaded_at || b.created_at || '').getTime();
              return dateB - dateA;
            });
            
            const lastFileDate = new Date(sortedFiles[0].uploaded_at || sortedFiles[0].created_at || '');
            const now = new Date();
            const diffTime = Math.abs(now.getTime() - lastFileDate.getTime());
            const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
            
            if (diffHours < 24) {
              lastUpdate = `${diffHours} час${diffHours === 1 ? '' : diffHours < 5 ? 'а' : 'ов'} назад`;
            } else {
              const diffDays = Math.ceil(diffHours / 24);
              lastUpdate = `${diffDays} ${diffDays === 1 ? 'день' : diffDays < 5 ? 'дня' : 'дней'} назад`;
            }
          }

          return {
            ...config,
            fileCount,
            lastUpdate
          };
        });

        const results = await Promise.all(promises);
        setStats(results);
        setTotalFiles(results.reduce((sum, dept) => sum + dept.fileCount, 0));
      } catch (error) {
        console.error('Ошибка при загрузке статистики:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRealStats();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-32">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-2">Загрузка статистики...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
              <div className="text-3xl font-bold text-green-600">{departmentConfig.length}</div>
              <div className="text-sm text-muted-foreground">Отделов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{stats.filter(s => s.fileCount > 0).length}</div>
              <div className="text-sm text-muted-foreground">Активных отделов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">
                {stats.length > 0 ? Math.round((stats.filter(s => s.fileCount > 0).length / stats.length) * 100) : 0}%
              </div>
              <div className="text-sm text-muted-foreground">Заполненность</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Статистика по отделам */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Статистика по отделам</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((dept) => {
            const IconComponent = dept.icon;
            return (
              <Card key={dept.department} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${dept.color}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <Badge variant={dept.fileCount > 0 ? "secondary" : "outline"} className="gap-1">
                      <FileText className="w-3 h-3" />
                      {dept.fileCount}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium">{dept.title}</h4>
                    <p className="text-sm text-muted-foreground">{dept.subtitle}</p>
                    <div className="text-xs text-muted-foreground">
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
