
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Plus, TrendingUp, Euro, Calendar, Filter } from 'lucide-react';
import { SaleModal } from './SaleModal';
import type { LogisticsSale } from '@/types/logistics';

export const SalesReport: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSale, setSelectedSale] = useState<LogisticsSale | null>(null);
  const [dateRange, setDateRange] = useState('month');

  const { data: sales, isLoading, refetch } = useQuery({
    queryKey: ['logistics-sales'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('logistics_sales')
        .select('*')
        .order('sale_date', { ascending: false });
      
      if (error) throw error;
      return (data as unknown as LogisticsSale[]) || [];
    }
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  const chartData = React.useMemo(() => {
    if (!sales) return [];
    
    const monthlyData = sales.reduce((acc: Record<string, number>, sale) => {
      const month = new Date(sale.sale_date).toLocaleDateString('de-DE', { month: 'short', year: 'numeric' });
      acc[month] = (acc[month] || 0) + sale.total_amount;
      return acc;
    }, {});

    return Object.entries(monthlyData).map(([month, amount]) => ({
      month,
      amount
    }));
  }, [sales]);

  const statusData = React.useMemo(() => {
    if (!sales) return [];
    
    const statusCounts = sales.reduce((acc: Record<string, number>, sale) => {
      acc[sale.status] = (acc[sale.status] || 0) + 1;
      return acc;
    }, {});

    const colors = ['#22c55e', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];
    
    return Object.entries(statusCounts).map(([status, count], index) => ({
      name: status === 'pending' ? 'Ожидание' :
            status === 'confirmed' ? 'Подтверждено' :
            status === 'shipped' ? 'Отгружено' :
            status === 'delivered' ? 'Доставлено' : 'Отменено',
      value: count,
      color: colors[index % colors.length]
    }));
  }, [sales]);

  const totalRevenue = sales?.reduce((sum, sale) => sum + sale.total_amount, 0) || 0;
  const avgSaleValue = sales?.length ? totalRevenue / sales.length : 0;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Общий доход</p>
                <p className="text-2xl font-bold">€{totalRevenue.toLocaleString()}</p>
              </div>
              <Euro className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Всего продаж</p>
                <p className="text-2xl font-bold">{sales?.length || 0}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Средняя стоимость</p>
                <p className="text-2xl font-bold">€{Math.round(avgSaleValue).toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Доставлено</p>
                <p className="text-2xl font-bold">
                  {sales?.filter(s => s.status === 'delivered').length || 0}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Динамика продаж</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                amount: {
                  label: "Сумма",
                  color: "hsl(var(--primary))",
                },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="amount" fill="var(--color-amount)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Статус продаж</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{}}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Sales Table */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Отчет по реализации</CardTitle>
            <Button
              onClick={() => {
                setSelectedSale(null);
                setShowModal(true);
              }}
              className="btn-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Добавить продажу
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-muted rounded animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Дата</TableHead>
                    <TableHead>Продукт/Услуга</TableHead>
                    <TableHead>Количество</TableHead>
                    <TableHead>Сумма</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Регион</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sales?.map((sale) => (
                    <TableRow key={sale.id} className="hover:bg-muted/50">
                      <TableCell>
                        {new Date(sale.sale_date).toLocaleDateString('de-DE')}
                      </TableCell>
                      <TableCell className="font-medium">{sale.product_service}</TableCell>
                      <TableCell>{sale.quantity || '-'}</TableCell>
                      <TableCell>€{sale.total_amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(sale.status)}>
                          {sale.status === 'pending' ? 'Ожидание' :
                           sale.status === 'confirmed' ? 'Подтверждено' :
                           sale.status === 'shipped' ? 'Отгружено' :
                           sale.status === 'delivered' ? 'Доставлено' : 'Отменено'}
                        </Badge>
                      </TableCell>
                      <TableCell>{sale.region}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedSale(sale);
                            setShowModal(true);
                          }}
                        >
                          Редактировать
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {showModal && (
        <SaleModal
          sale={selectedSale}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            refetch();
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};
