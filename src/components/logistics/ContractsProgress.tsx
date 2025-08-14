
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Target, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import type { LogisticsContract } from '@/types/logistics';

export const ContractsProgress: React.FC = () => {
  const { data: contracts, isLoading } = useQuery({
    queryKey: ['logistics-contracts-progress'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('logistics_contracts')
        .select('*')
        .eq('status', 'active')
        .order('progress_percentage', { ascending: false });
      
      if (error) throw error;
      return (data as unknown as LogisticsContract[]) || [];
    }
  });

  const progressData = React.useMemo(() => {
    if (!contracts) return [];
    
    const ranges = [
      { range: '0-25%', min: 0, max: 25, color: '#ef4444' },
      { range: '26-50%', min: 26, max: 50, color: '#f59e0b' },
      { range: '51-75%', min: 51, max: 75, color: '#3b82f6' },
      { range: '76-100%', min: 76, max: 100, color: '#22c55e' }
    ];

    return ranges.map(range => ({
      range: range.range,
      count: contracts.filter(c => 
        c.progress_percentage >= range.min && c.progress_percentage <= range.max
      ).length,
      color: range.color
    }));
  }, [contracts]);

  const avgProgress = contracts?.length 
    ? Math.round(contracts.reduce((sum, c) => sum + c.progress_percentage, 0) / contracts.length)
    : 0;

  const onTrack = contracts?.filter(c => c.progress_percentage >= 75).length || 0;
  const atRisk = contracts?.filter(c => c.progress_percentage < 50).length || 0;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Активные договора</p>
                <p className="text-2xl font-bold">{contracts?.length || 0}</p>
              </div>
              <Target className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Средний прогресс</p>
                <p className="text-2xl font-bold">{avgProgress}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">На финише</p>
                <p className="text-2xl font-bold">{onTrack}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Требуют внимания</p>
                <p className="text-2xl font-bold">{atRisk}</p>
              </div>
              <Clock className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Chart */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Распределение по прогрессу</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Количество",
                  color: "hsl(var(--primary))",
                },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={progressData}>
                  <XAxis dataKey="range" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--color-count)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Contract Details */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Отчет по освоению договоров</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-muted rounded animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {contracts?.map((contract) => (
                  <div key={contract.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{contract.title}</h3>
                        <p className="text-sm text-muted-foreground">{contract.contract_number}</p>
                      </div>
                      <Badge 
                        className={
                          contract.progress_percentage >= 75 ? 'bg-green-100 text-green-800' :
                          contract.progress_percentage >= 50 ? 'bg-blue-100 text-blue-800' :
                          contract.progress_percentage >= 25 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }
                      >
                        {contract.progress_percentage}%
                      </Badge>
                    </div>
                    <Progress value={contract.progress_percentage} className="h-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>€{(contract.total_value || 0).toLocaleString()}</span>
                      {contract.end_date && (
                        <span>До: {new Date(contract.end_date).toLocaleDateString('de-DE')}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
