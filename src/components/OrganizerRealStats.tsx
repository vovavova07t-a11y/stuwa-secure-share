
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { 
  FileText, 
  Building2, 
  Users, 
  TrendingUp, 
  Phone,
  Loader2
} from 'lucide-react';

interface DepartmentStats {
  name: string;
  table: string;
  icon: any;
  color: string;
  count: number;
}

export const OrganizerRealStats: React.FC = () => {
  const [stats, setStats] = useState<DepartmentStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalDocuments, setTotalDocuments] = useState(0);

  const departments = [
    { 
      name: 'Финансы', 
      table: 'financial_documents', 
      icon: Building2, 
      color: 'bg-blue-500',
      count: 0 
    },
    { 
      name: 'Техническая', 
      table: 'technical_documents', 
      icon: FileText, 
      color: 'bg-green-500',
      count: 0 
    },
    { 
      name: 'Логистика', 
      table: 'logistics_documents', 
      icon: Users, 
      color: 'bg-purple-500',
      count: 0 
    },
    { 
      name: 'Коммерция', 
      table: 'commercial_documents', 
      icon: TrendingUp, 
      color: 'bg-orange-500',
      count: 0 
    },
    { 
      name: 'Офис-менеджер', 
      table: 'office_documents', 
      icon: Phone, 
      color: 'bg-pink-500',
      count: 0 
    }
  ];

  const loadStats = async () => {
    setIsLoading(true);
    let total = 0;
    const updatedStats: DepartmentStats[] = [];

    for (const dept of departments) {
      try {
        console.log(`📊 Подсчет документов в таблице: ${dept.table}`);
        
        const { count, error } = await (supabase as any)
          .from(dept.table)
          .select('*', { count: 'exact', head: true });

        if (error) {
          console.error(`❌ Ошибка подсчета в ${dept.table}:`, error);
          updatedStats.push({ ...dept, count: 0 });
        } else {
          const docCount = count || 0;
          console.log(`✅ Документов в ${dept.table}: ${docCount}`);
          updatedStats.push({ ...dept, count: docCount });
          total += docCount;
        }
      } catch (error) {
        console.error(`💥 Критическая ошибка для ${dept.table}:`, error);
        updatedStats.push({ ...dept, count: 0 });
      }
    }

    setStats(updatedStats);
    setTotalDocuments(total);
    setIsLoading(false);

    console.log(`📈 Общая статистика загружена. Всего документов: ${total}`);
  };

  useEffect(() => {
    console.log('🚀 Загрузка реальной статистики организатора...');
    loadStats();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-center h-16">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {/* Общая статистика */}
      <Card className="glass-card border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-8 h-8 text-primary" />
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              ВСЕГО
            </Badge>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-primary">{totalDocuments}</p>
            <p className="text-xs text-muted-foreground">документов</p>
          </div>
        </CardContent>
      </Card>

      {/* Статистика по отделам */}
      {stats.map((dept) => {
        const Icon = dept.icon;
        return (
          <Card key={dept.table} className="glass-card hover:scale-[1.01] transition-transform">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${dept.color} bg-opacity-10`}>
                  <Icon className={`w-5 h-5 text-${dept.color.split('-')[1]}-600`} />
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-xs bg-${dept.color.split('-')[1]}-50 text-${dept.color.split('-')[1]}-700 border-${dept.color.split('-')[1]}-200`}
                >
                  {dept.count > 0 ? 'Активен' : 'Пустой'}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-lg font-semibold">{dept.count}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {dept.name}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
