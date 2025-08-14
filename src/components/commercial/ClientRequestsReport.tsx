
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Search, Plus, Eye, Edit, MessageSquare, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export const ClientRequestsReport: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);

  const requests = [
    {
      id: 'REQ-001',
      client: 'BMW Group',
      subject: 'Запрос на поставку компонентов двигателя',
      status: 'new',
      priority: 'high',
      assignedTo: 'Иван Петров',
      createdAt: '2024-01-15',
      deadline: '2024-01-25'
    },
    {
      id: 'REQ-002',
      client: 'Volkswagen AG',
      subject: 'Техническая консультация по материалам',
      status: 'in_progress',
      priority: 'medium',
      assignedTo: 'Мария Сидорова',
      createdAt: '2024-01-14',
      deadline: '2024-01-22'
    },
    {
      id: 'REQ-003',
      client: 'Mercedes-Benz',
      subject: 'Сертификация продукции',
      status: 'completed',
      priority: 'low',
      assignedTo: 'Алексей Иванов',
      createdAt: '2024-01-12',
      deadline: '2024-01-20'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      new: { label: 'Новый', color: 'bg-blue-100 text-blue-800' },
      in_progress: { label: 'В работе', color: 'bg-yellow-100 text-yellow-800' },
      completed: { label: 'Завершен', color: 'bg-green-100 text-green-800' },
      cancelled: { label: 'Отменен', color: 'bg-red-100 text-red-800' }
    };
    const variant = variants[status as keyof typeof variants] || variants.new;
    return <Badge className={variant.color}>{variant.label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: { label: 'Высокий', color: 'bg-red-100 text-red-800' },
      medium: { label: 'Средний', color: 'bg-orange-100 text-orange-800' },
      low: { label: 'Низкий', color: 'bg-gray-100 text-gray-800' }
    };
    const variant = variants[priority as keyof typeof variants] || variants.medium;
    return <Badge className={variant.color}>{variant.label}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <AlertCircle className="w-4 h-4 text-blue-600" />;
      case 'in_progress':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Отчет по запросам клиентов
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск запросов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="new">Новые</SelectItem>
                  <SelectItem value="in_progress">В работе</SelectItem>
                  <SelectItem value="completed">Завершенные</SelectItem>
                </SelectContent>
              </Select>
              
              <Dialog open={showNewRequestModal} onOpenChange={setShowNewRequestModal}>
                <DialogTrigger asChild>
                  <Button className="btn-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Новый запрос
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Создать новый запрос</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="client">Клиент</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите клиента" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bmw">BMW Group</SelectItem>
                          <SelectItem value="vw">Volkswagen AG</SelectItem>
                          <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="priority">Приоритет</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите приоритет" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">Высокий</SelectItem>
                          <SelectItem value="medium">Средний</SelectItem>
                          <SelectItem value="low">Низкий</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="subject">Тема запроса</Label>
                      <Input id="subject" placeholder="Введите тему запроса" />
                    </div>
                    
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="description">Описание</Label>
                      <Textarea id="description" rows={4} placeholder="Подробное описание запроса" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="assignee">Ответственный</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Назначить сотрудника" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ivan">Иван Петров</SelectItem>
                          <SelectItem value="maria">Мария Сидорова</SelectItem>
                          <SelectItem value="alexey">Алексей Иванов</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="deadline">Срок выполнения</Label>
                      <Input id="deadline" type="date" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline" onClick={() => setShowNewRequestModal(false)}>
                      Отмена
                    </Button>
                    <Button onClick={() => setShowNewRequestModal(false)}>
                      Создать запрос
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Клиент</TableHead>
                  <TableHead>Тема</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Приоритет</TableHead>
                  <TableHead>Ответственный</TableHead>
                  <TableHead>Срок</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>{request.client}</TableCell>
                    <TableCell className="max-w-xs truncate">{request.subject}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(request.status)}
                        {getStatusBadge(request.status)}
                      </div>
                    </TableCell>
                    <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                    <TableCell>{request.assignedTo}</TableCell>
                    <TableCell>{request.deadline}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
