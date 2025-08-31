
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useOrganizerDocuments } from '@/hooks/useOrganizerDocuments';
import { 
  FileText, 
  Building2, 
  TrendingUp, 
  Users, 
  Settings,
  Phone
} from 'lucide-react';

const departments = [
  { key: 'financial', name: 'Финансы', icon: Building2, color: 'text-blue-600' },
  { key: 'technical', name: 'Техническая дирекция', icon: Settings, color: 'text-green-600' },
  { key: 'logistics', name: 'Логистика', icon: Users, color: 'text-purple-600' },
  { key: 'commercial', name: 'Коммерция', icon: TrendingUp, color: 'text-orange-600' },
  { key: 'office', name: 'Офис-менеджер', icon: Phone, color: 'text-pink-600' }
];

export const OrganizerRealStats: React.FC = () => {
  const [stats, setStats] = useState<Record<string, number>>({});
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { getTotalDocumentsCount } = useOrganizerDocuments('', '');

  useEffect(() => {
    const loadStats = async () => {
      setIsLoading(true);
      const departmentStats: Record<string, number> = {};
      let total = 0;

      for (const dept of departments) {
        try {
          const count = await getTotalDocumentsCount(dept.key);
          departmentStats[dept.key] = count;
          total += count;
        } catch (error) {
          console.error(`Ошибка загрузки статистики для ${dept.key}:`, error);
          departmentStats[dept.key] = 0;
        }
      }

      setStats(departmentStats);
      setTotalDocuments(total);
      setIsLoading(false);
    };

    loadStats();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="glass-card animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-8 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const totalStats = [
    {
      title: 'Всего документов',
      value: totalDocuments,
      icon: FileText,
      color: 'text-primary'
    },
    ...departments.map(dept => ({
      title: dept.name,
      value: stats[dept.key] || 0,
      icon: dept.icon,
      color: dept.color
    }))
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
      {totalStats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="glass-card hover:scale-105 transition-transform">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
