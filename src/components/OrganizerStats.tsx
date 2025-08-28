
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { 
  FileText, 
  Building2, 
  Clock,
  TrendingUp,
  Database,
  Users
} from 'lucide-react';

interface StatsData {
  totalFiles: number;
  totalDepartments: number;
  recentFiles: number;
  totalTransfers: number;
}

export const OrganizerStats: React.FC = () => {
  const [stats, setStats] = useState<StatsData>({
    totalFiles: 0,
    totalDepartments: 0,
    recentFiles: 0,
    totalTransfers: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRealStats();
  }, []);

  const loadRealStats = async () => {
    try {
      setIsLoading(true);
      console.log('📊 Loading real statistics for organizers...');
      
      // Load real files from all sources
      const [filesResult, financialResult, transfersResult] = await Promise.allSettled([
        (supabase as any).from('files').select('*'),
        (supabase as any).from('financial_documents').select('*'),
        (supabase as any).from('interdepartment_file_transfers').select('*')
      ]);

      let totalFiles = 0;
      let recentFiles = 0;
      const departments = new Set<string>();
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);

      // Count files from files table
      if (filesResult.status === 'fulfilled' && filesResult.value.data) {
        const files = filesResult.value.data;
        totalFiles += files.length;
        
        files.forEach((file: any) => {
          if (file.department) departments.add(file.department);
          const fileDate = new Date(file.created_at || file.uploaded_at);
          if (fileDate > weekAgo) recentFiles++;
        });
      }

      // Count financial documents
      if (financialResult.status === 'fulfilled' && financialResult.value.data) {
        const financialFiles = financialResult.value.data;
        totalFiles += financialFiles.length;
        departments.add('financial');
        
        financialFiles.forEach((file: any) => {
          const fileDate = new Date(file.created_at);
          if (fileDate > weekAgo) recentFiles++;
        });
      }

      // Count transfers
      let totalTransfers = 0;
      if (transfersResult.status === 'fulfilled' && transfersResult.value.data) {
        totalTransfers = transfersResult.value.data.length;
      }

      const realStats = {
        totalFiles,
        totalDepartments: departments.size,
        recentFiles,
        totalTransfers
      };

      setStats(realStats);
      console.log('📊 Real statistics loaded:', realStats);

    } catch (error) {
      console.error('❌ Error loading real statistics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statsItems = [
    {
      title: 'Всего документов',
      value: stats.totalFiles,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Активных отделов',
      value: stats.totalDepartments,
      icon: Building2,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Новых за неделю',
      value: stats.recentFiles,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Всего передач',
      value: stats.totalTransfers,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <Card key={index} className="glass-card border border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{item.title}</p>
                  <p className={`text-2xl font-bold ${item.color}`}>
                    {isLoading ? '...' : item.value.toLocaleString()}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${item.bgColor}`}>
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
