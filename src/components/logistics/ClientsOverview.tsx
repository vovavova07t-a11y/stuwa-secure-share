
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Building, Mail, Phone, MapPin, Filter } from 'lucide-react';
import { ClientModal } from './ClientModal';
import type { LogisticsClient } from '@/types/logistics';

export const ClientsOverview: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<LogisticsClient | null>(null);

  const { data: clients, isLoading, refetch } = useQuery({
    queryKey: ['logistics-clients', searchQuery],
    queryFn: async () => {
      let query = (supabase as any)
        .from('logistics_clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchQuery) {
        query = query.or(`company_name.ilike.%${searchQuery}%,contact_person.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data as unknown as LogisticsClient[]) || [];
    }
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      potential: 'bg-blue-100 text-blue-800'
    };
    return variants[status as keyof typeof variants] || variants.active;
  };

  const getClientTypeBadge = (type: string) => {
    const variants = {
      corporate: 'bg-purple-100 text-purple-800',
      individual: 'bg-orange-100 text-orange-800',
      partner: 'bg-green-100 text-green-800'
    };
    return variants[type as keyof typeof variants] || variants.corporate;
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              Обзор клиентов
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск клиентов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button
                onClick={() => {
                  setSelectedClient(null);
                  setShowModal(true);
                }}
                className="btn-primary"
              >
                <Plus className="w-4 h-4 mr-2" />
                Добавить клиента
              </Button>
            </div>
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
                    <TableHead>Компания</TableHead>
                    <TableHead>Контактное лицо</TableHead>
                    <TableHead>Контакты</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Тип</TableHead>
                    <TableHead>Расположение</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clients?.map((client) => (
                    <TableRow key={client.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{client.company_name}</TableCell>
                      <TableCell>{client.contact_person || '-'}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {client.email && (
                            <div className="flex items-center gap-1 text-sm">
                              <Mail className="w-3 h-3" />
                              {client.email}
                            </div>
                          )}
                          {client.phone && (
                            <div className="flex items-center gap-1 text-sm">
                              <Phone className="w-3 h-3" />
                              {client.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(client.status)}>
                          {client.status === 'active' ? 'Активный' : 
                           client.status === 'inactive' ? 'Неактивный' : 'Потенциальный'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getClientTypeBadge(client.client_type)}>
                          {client.client_type === 'corporate' ? 'Корпоративный' :
                           client.client_type === 'individual' ? 'Частное лицо' : 'Партнер'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {client.city}, {client.country}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedClient(client);
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
        <ClientModal
          client={selectedClient}
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
