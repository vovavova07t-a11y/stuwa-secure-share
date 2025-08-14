
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, ShoppingCart, Calendar, Euro, AlertCircle } from 'lucide-react';
import { ProcurementModal } from './ProcurementModal';
import type { ProcurementOpportunity } from '@/types/logistics';

export const ProcurementOpportunities: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<ProcurementOpportunity | null>(null);

  const { data: opportunities, isLoading, refetch } = useQuery({
    queryKey: ['procurement-opportunities'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('logistics_procurement_opportunities')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return (data as unknown as ProcurementOpportunity[]) || [];
    }
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      open: 'bg-green-100 text-green-800',
      in_progress: 'bg-blue-100 text-blue-800',
      won: 'bg-purple-100 text-purple-800',
      lost: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-800'
    };
    return variants[status as keyof typeof variants] || variants.open;
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800'
    };
    return variants[priority as keyof typeof variants] || variants.medium;
  };

  const isExpiringSoon = (deadline: string) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const daysUntilDeadline = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilDeadline <= 7 && daysUntilDeadline >= 0;
  };

  const totalValue = opportunities?.reduce((sum, opp) => sum + (opp.estimated_value || 0), 0) || 0;
  const openOpportunities = opportunities?.filter(o => o.status === 'open').length || 0;
  const inProgress = opportunities?.filter(o => o.status === 'in_progress').length || 0;
  const won = opportunities?.filter(o => o.status === 'won').length || 0;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Открытые возможности</p>
                <p className="text-2xl font-bold">{openOpportunities}</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">В работе</p>
                <p className="text-2xl font-bold">{inProgress}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Выиграно</p>
                <p className="text-2xl font-bold">{won}</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Общая стоимость</p>
                <p className="text-2xl font-bold">€{totalValue.toLocaleString()}</p>
              </div>
              <Euro className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Opportunities Table */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Обзор объявлений о закупе</CardTitle>
            <Button
              onClick={() => {
                setSelectedOpportunity(null);
                setShowModal(true);
              }}
              className="btn-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Добавить возможность
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
                    <TableHead>Название</TableHead>
                    <TableHead>Компания</TableHead>
                    <TableHead>Оценочная стоимость</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Приоритет</TableHead>
                    <TableHead>Срок</TableHead>
                    <TableHead>Регион</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {opportunities?.map((opportunity) => (
                    <TableRow key={opportunity.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {opportunity.deadline && isExpiringSoon(opportunity.deadline) && (
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          )}
                          {opportunity.title}
                        </div>
                      </TableCell>
                      <TableCell>{opportunity.client_company || '-'}</TableCell>
                      <TableCell>
                        €{(opportunity.estimated_value || 0).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(opportunity.status)}>
                          {opportunity.status === 'open' ? 'Открыто' :
                           opportunity.status === 'in_progress' ? 'В работе' :
                           opportunity.status === 'won' ? 'Выиграно' :
                           opportunity.status === 'lost' ? 'Проиграно' : 'Отменено'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityBadge(opportunity.priority)}>
                          {opportunity.priority === 'low' ? 'Низкий' :
                           opportunity.priority === 'medium' ? 'Средний' :
                           opportunity.priority === 'high' ? 'Высокий' : 'Критический'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {opportunity.deadline ? (
                          <div className={`text-sm ${isExpiringSoon(opportunity.deadline) ? 'text-red-600 font-semibold' : ''}`}>
                            {new Date(opportunity.deadline).toLocaleDateString('de-DE')}
                          </div>
                        ) : '-'}
                      </TableCell>
                      <TableCell>{opportunity.region}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedOpportunity(opportunity);
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
        <ProcurementModal
          opportunity={selectedOpportunity}
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
