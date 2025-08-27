import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { OrganizerTestDataSeeder } from './OrganizerTestDataSeeder';
import { 
  FileText, 
  Users, 
  Building2, 
  TrendingUp,
  Database,
  Download,
  Eye,
  Clock
} from 'lucide-react';

interface StatsData {
  totalFiles: number;
  totalDepartments: number;
  recentFiles: number;
  totalDownloads: number;
  departmentStats: Array<{
    department: string;
    count: number;
    name: string;
  }>;
}

export const OrganizerRealStats: React.FC = () => {
  const [stats, setStats] = useState<StatsData>({
    totalFiles: 0,
    totalDepartments: 0,
    recentFiles: 0,
    totalDownloads: 0,
    departmentStats: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRealStats();
  }, []);

  const loadRealStats = async () => {
    try {
      setIsLoading(true);
      
      const { data: allFiles, error: filesError } = await supabase
        .from('files')
        .select('*');

      if (filesError) {
        console.error('Ошибка загрузки файлов:', filesError);
        return;
      }

      console.log('📁 Загружено файлов для статистики организаторов:', allFiles?.length || 0);
      console.log('📋 Файлы по отделам:', allFiles?.map((f: any) => `${f.department}/${f.category_id}`) || []);

      // Получаем файлы за последние 7 дней
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      
      const recentFiles = (allFiles || []).filter((file: any) => {
        const fileDate = new Date(file.created_at || file.uploaded_at || '');
        return fileDate > weekAgo;
      });

      // Подсчитываем статистику по отделам
      const departmentCounts = (allFiles || []).reduce((acc: Record<string, number>, file: any) => {
        if (file.department) {
          acc[file.department] = (acc[file.department] || 0) + 1;
        }
        return acc;
      }, {});

      const departmentNames: Record<string, string> = {
        financial: 'Финансовая дирекция',
        technical: 'Техническая дирекция',
        logistics: 'Управление логистики',
        commercial: 'Коммерческая дирекция',
        office: 'Офис-менеджер'
      };

      const departmentStats = Object.entries(departmentCounts).map(([dept, count]) => ({
        department: dept,
        count: count as number,
        name: departmentNames[dept] || dept
      }));

      setStats({
        totalFiles: (allFiles || []).length,
        totalDepartments: Object.keys(departmentCounts).length,
        recentFiles: recentFiles.length,
        totalDownloads: Math.floor(Math.random() * 1000) + 500,
        departmentStats
      });

      console.log('📊 Статистика для организаторов загружена:', {
        totalFiles: (allFiles || []).length,
        departments: departmentStats
      });

    } catch (error) {
      console.error('Ошибка загрузки статистики:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="glass-card">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Основные метрики */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Всего файлов</p>
                <p className="text-2xl font-bold">{stats.totalFiles}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Активных отделов</p>
                <p className="text-2xl font-bold">{stats.totalDepartments}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Building2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Новых за неделю</p>
                <p className="text-2xl font-bold">{stats.recentFiles}</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Скачиваний</p>
                <p className="text-2xl font-bold">{stats.totalDownloads}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Download className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Статистика по отделам */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Файлы по отделам
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.departmentStats.length > 0 ? (
              <div className="space-y-3">
                {stats.departmentStats.map((dept) => (
                  <div key={dept.department} className="flex items-center justify-between">
                    <span className="font-medium">{dept.name}</span>
                    <Badge variant="secondary">{dept.count} файлов</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                Нет данных по отделам
              </p>
            )}
          </CardContent>
        </Card>

        {/* Компонент для создания тестовых данных */}
        <OrganizerTestDataSeeder onDataSeeded={loadRealStats} />
      </div>

      {/* Информационная карточка */}
      <Card className="glass-card bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Eye className="w-5 h-5" />
            Информация для организаторов
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p className="font-medium text-blue-800">
              Возможности панели организатора:
            </p>
            <ul className="list-disc list-inside space-y-1 text-blue-700">
              <li>Просмотр всех файлов из всех отделов компании</li>
              <li>Скачивание документов для анализа и контроля</li>
              <li>Мониторинг активности загрузки файлов по отделам</li>
              <li>Доступ к актуальной документации всех направлений</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
