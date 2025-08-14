
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Users, FileText, Euro, Target } from 'lucide-react';

export const LogisticsMetrics: React.FC = () => {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['logistics-metrics'],
    queryFn: async () => {
      const [clientsRes, contractsRes, salesRes, opportunitiesRes] = await Promise.allSettled([
        (supabase as any).from('logistics_clients').select('*', { count: 'exact' }),
        (supabase as any).from('logistics_contracts').select('*'),
        (supabase as any).from('logistics_sales').select('*'),
        (supabase as any).from('logistics_procurement_opportunities').select('*')
      ]);

      const clients = clientsRes.status === 'fulfilled' ? clientsRes.value : { count: 0 };
      const contracts = contractsRes.status === 'fulfilled' ? contractsRes.value.data || [] : [];
      const sales = salesRes.status === 'fulfilled' ? salesRes.value.data || [] : [];
      const opportunities = opportunitiesRes.status === 'fulfilled' ? opportunitiesRes.value.data || [] : [];

      const totalRevenue = sales.reduce((sum: number, sale: any) => sum + (sale.total_amount || 0), 0);
      const activeContracts = contracts.filter((c: any) => c.status === 'active').length;
      const avgContractValue = contracts.length > 0 
        ? contracts.reduce((sum: number, c: any) => sum + (c.total_value || 0), 0) / contracts.length 
        : 0;

      return {
        totalClients: clients.count || 0,
        activeContracts,
        totalRevenue,
        avgContractValue,
        openOpportunities: opportunities.filter((o: any) => o.status === 'open').length,
        completedSales: sales.filter((s: any) => s.status === 'delivered').length
      };
    }
  });

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

  const metricsData = [
    {
      title: 'Общее количество клиентов',
      value: metrics?.totalClients || 0,
      icon: Users,
      trend: '+12%',
      trendUp: true
    },
    {
      title: 'Активные договора',
      value: metrics?.activeContracts || 0,
      icon: FileText,
      trend: '+8%',
      trendUp: true
    },
    {
      title: 'Общий доход',
      value: `€${(metrics?.totalRevenue || 0).toLocaleString()}`,
      icon: Euro,
      trend: '+15%',
      trendUp: true
    },
    {
      title: 'Средн. стоимость договора',
      value: `€${(metrics?.avgContractValue || 0).toLocaleString()}`,
      icon: Target,
      trend: '+3%',
      trendUp: true
    },
    {
      title: 'Открытые возможности',
      value: metrics?.openOpportunities || 0,
      icon: TrendingUp,
      trend: '+7%',
      trendUp: true
    },
    {
      title: 'Завершенные продажи',
      value: metrics?.completedSales || 0,
      icon: TrendingUp,
      trend: '+22%',
      trendUp: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
      {metricsData.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card key={index} className="glass-card hover:scale-105 transition-transform">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-5 h-5 text-primary" />
                <span className={`text-sm font-medium flex items-center gap-1 ${
                  metric.trendUp ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {metric.trend}
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{metric.value}</p>
                <p className="text-xs text-muted-foreground">{metric.title}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
