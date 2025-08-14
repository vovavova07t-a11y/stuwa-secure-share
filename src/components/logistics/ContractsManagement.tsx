
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Plus, FileText, Calendar, Euro } from 'lucide-react';
import { ContractModal } from './ContractModal';
import type { LogisticsContract } from '@/types/logistics';

export const ContractsManagement: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState<LogisticsContract | null>(null);

  const { data: contracts, isLoading, refetch } = useQuery({
    queryKey: ['logistics-contracts'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('logistics_contracts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return (data as unknown as LogisticsContract[]) || [];
    }
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      draft: 'bg-gray-100 text-gray-800',
      active: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800',
      expired: 'bg-yellow-100 text-yellow-800'
    };
    return variants[status as keyof typeof variants] || variants.draft;
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

  const totalValue = contracts?.reduce((sum, contract) => sum + (contract.total_value || 0), 0) || 0;
  const activeContracts = contracts?.filter(c => c.status === 'active').length || 0;
  const completedContracts = contracts?.filter(c => c.status === 'completed').length || 0;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Всего договоров</p>
                <p className="text-2xl font-bold">{contracts?.length || 0}</p>
              </div>
              <FileText className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Активные</p>
                <p className="text-2xl font-bold">{activeContracts}</p>
              </div>
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Завершенные</p>
                <p className="text-2xl font-bold">{completedContracts}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
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

      {/* Contracts Table */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Договора на реализацию</CardTitle>
            <Button
              onClick={() => {
                setSelectedContract(null);
                setShowModal(true);
              }}
              className="btn-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Добавить договор
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
                    <TableHead>Номер</TableHead>
                    <TableHead>Название</TableHead>
                    <TableHead>Тип</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Прогресс</TableHead>
                    <TableHead>Стоимость</TableHead>
                    <TableHead>Приоритет</TableHead>
                    <TableHead>Сроки</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contracts?.map((contract) => (
                    <TableRow key={contract.id} className="hover:bg-muted/50">
                      <TableCell className="font-mono">{contract.contract_number}</TableCell>
                      <TableCell className="font-medium">{contract.title}</TableCell>
                      <TableCell>
                        {contract.contract_type === 'sales' ? 'Продажи' :
                         contract.contract_type === 'procurement' ? 'Закупки' : 'Услуги'}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(contract.status)}>
                          {contract.status === 'draft' ? 'Черновик' :
                           contract.status === 'active' ? 'Активный' :
                           contract.status === 'completed' ? 'Завершен' :
                           contract.status === 'cancelled' ? 'Отменен' : 'Истек'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Progress value={contract.progress_percentage} className="h-2" />
                          <span className="text-xs text-muted-foreground">
                            {contract.progress_percentage}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        €{(contract.total_value || 0).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityBadge(contract.priority)}>
                          {contract.priority === 'low' ? 'Низкий' :
                           contract.priority === 'medium' ? 'Средний' :
                           contract.priority === 'high' ? 'Высокий' : 'Критический'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {contract.start_date && (
                            <div>От: {new Date(contract.start_date).toLocaleDateString('de-DE')}</div>
                          )}
                          {contract.end_date && (
                            <div>До: {new Date(contract.end_date).toLocaleDateString('de-DE')}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedContract(contract);
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
        <ContractModal
          contract={selectedContract}
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
