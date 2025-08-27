
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
  Eye,
  Clock
} from 'lucide-react';

interface StatsData {
  totalFiles: number;
  totalDepartments: number;
  recentFiles: number;
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
    departmentStats: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRealStats();
  }, []);

  const loadRealStats = async () => {
    try {
      setIsLoading(true);
      console.log('📊 Загружаем РЕАЛЬНУЮ статистику для организаторов...');
      
      // Загружаем РЕАЛЬНЫЕ файлы из таблицы files (которые загружают сотрудники)
      const { data: realFiles, error: filesError } = await (supabase as any)
        .from('files')
        .select('*')
        .order('created_at', { ascending: false });

      if (filesError) {
        console.error('❌ Ошибка загрузки РЕАЛЬНЫХ файлов:', filesError);
      }

      // Также загружаем файлы из таблицы financial_documents (дополнительные реальные файлы)
      const { data: financialFiles, error: financialError } = await (supabase as any)
        .from('financial_documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (financialError) {
        console.error('❌ Ошибка загрузки финансовых документов:', financialError);
      }

      const allRealFiles = [...(realFiles || []), ...(financialFiles || [])];
      console.log(`📁 Загружено ${allRealFiles.length} РЕАЛЬНЫХ файлов из базы данных`);
      console.log('📋 Файлы:', allRealFiles.map((f: any) => f.file_name || f.title));

      // Получаем файлы за последние 7 дней
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      
      const recentRealFiles = allRealFiles.filter((file: any) => {
        const fileDate = new Date(file.created_at || file.uploaded_at);
        return fileDate > weekAgo;
      });

      // Подсчитываем РЕАЛЬНУЮ статистику по отделам
      const departmentCounts: { [key: string]: number } = {};
      
      allRealFiles.forEach((file: any) => {
        let department = file.department;
        
        // Для financial_documents определяем department как 'financial'
        if (!department && file.category) {
          department = 'financial';
        }
        
        if (department) {
          departmentCounts[department] = (departmentCounts[department] || 0) + 1;
        }
      });

      // Маппинг названий отделов
      const departmentNames: { [key: string]: string } = {
        'financial': 'Финансовая дирекция',
        'technical': 'Техническая дирекция', 
        'logistics': 'Управление логистики',
        'commercial': 'Коммерческая дирекция',
        'office': 'Офис-менеджер'
      };

      const departmentStats = Object.entries(departmentCounts).map(([department, count]) => ({
        department,
        count,
        name: departmentNames[department] || department
      }));

      const realStats = {
        totalFiles: allRealFiles.length,
        totalDepartments: departmentStats.length,
        recentFiles: recentRealFiles.length,
        departmentStats
      };

      setStats(realStats);

      console.log('📊 РЕАЛЬНАЯ статистика для организаторов загружена:', realStats);

    } catch (error) {
      console.error('❌ Ошибка загрузки РЕАЛЬНОЙ статистики:', error);
      setStats({
        totalFiles: 0,
        totalDepartments: 0,
        recentFiles: 0,
        departmentStats: []
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
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
      {/* РЕАЛЬНЫЕ метрики на основе фактических файлов */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">РЕАЛЬНЫХ файлов</p>
                <p className="text-2xl font-bold text-green-600">{stats.totalFiles}</p>
                <p className="text-xs text-muted-foreground">в базе данных</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Активных отделов</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalDepartments}</p>
                <p className="text-xs text-muted-foreground">с документами</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Новых за неделю</p>
                <p className="text-2xl font-bold text-orange-600">{stats.recentFiles}</p>
                <p className="text-xs text-muted-foreground">РЕАЛЬНЫХ файлов</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* РЕАЛЬНАЯ статистика по отделам */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              РЕАЛЬНЫЕ файлы по отделам
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.departmentStats.length > 0 ? (
              <div className="space-y-3">
                {stats.departmentStats.map((dept) => (
                  <div key={dept.department} className="flex items-center justify-between">
                    <span className="font-medium">{dept.name}</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {dept.count} РЕАЛЬН{dept.count === 1 ? 'ЫЙ' : 'ЫХ'} файл{dept.count === 1 ? '' : dept.count < 5 ? 'а' : 'ов'}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                Нет РЕАЛЬНЫХ файлов в базе данных
              </p>
            )}
          </CardContent>
        </Card>

        {/* Компонент для добавления тестовых данных */}
        <OrganizerTestDataSeeder onDataSeeded={loadRealStats} />
      </div>

      {/* Информационная карточка для организаторов */}
      <Card className="glass-card bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <Eye className="w-5 h-5" />
            РЕАЛЬНЫЕ данные для организаторов
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p className="font-medium text-green-800">
              Возможности панели организатора с РЕАЛЬНЫМИ файлами:
            </p>
            <ul className="list-disc list-inside space-y-1 text-green-700">
              <li>Просмотр ВСЕХ реальных файлов из всех отделов компании</li>
              <li>Скачивание настоящих документов для анализа и контроля</li>
              <li>Мониторинг активности загрузки РЕАЛЬНЫХ файлов по отделам</li>
              <li>Доступ к актуальной документации всех направлений</li>
              <li>БЕЗ фейковых данных - только настоящие документы сотрудников!</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
