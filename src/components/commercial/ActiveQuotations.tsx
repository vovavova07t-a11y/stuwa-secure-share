
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
import { 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Send,
  Clock,
  Quote, 
  Calendar,
  Euro,
  TrendingUp,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export const ActiveQuotations: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showNewQuotationModal, setShowNewQuotationModal] = useState(false);

  const quotations = [
    {
      id: 'QUO-001',
      client: 'BMW Group',
      project: 'Поставка стальных компонентов',
      amount: '€125,000',
      status: 'pending',
      validUntil: '2024-02-15',
      createdDate: '2024-01-15',
      probability: 85,
      items: 15,
      discount: '12%',
      contactPerson: 'Михаель Шмидт',
      manager: 'Иван Петров'
    },
    {
      id: 'QUO-002',
      client: 'Volkswagen AG',
      project: 'Алюминиевые сплавы для двигателей',
      amount: '€89,500',
      status: 'approved',
      validUntil: '2024-02-20',
      createdDate: '2024-01-12',
      probability: 95,
      items: 8,
      discount: '8%',
      contactPerson: 'Анна Мюллер',
      manager: 'Мария Сидорова'
    },
    {
      id: 'QUO-003',
      client: 'Mercedes-Benz',
      project: 'Композитные материалы',
      amount: '€210,000',
      status: 'revision',
      validUntil: '2024-01-25',
      createdDate: '2024-01-08',
      probability: 60,
      items: 22,
      discount: '15%',
      contactPerson: 'Томас Вагнер',
      manager: 'Алексей Иванов'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { label: 'Ожидает', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      approved: { label: 'Одобрено', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      revision: { label: 'На доработке', color: 'bg-orange-100 text-orange-800', icon: AlertCircle },
      rejected: { label: 'Отклонено', color: 'bg-red-100 text-red-800', icon: AlertCircle },
      expired: { label: 'Истекло', color: 'bg-gray-100 text-gray-800', icon: Clock }
    };
    const variant = variants[status as keyof typeof variants] || variants.pending;
    const Icon = variant.icon;
    
    return (
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4" />
        <Badge className={variant.color}>{variant.label}</Badge>
      </div>
    );
  };

  const getProbabilityBadge = (probability: number) => {
    let color = 'bg-red-100 text-red-800';
    if (probability >= 80) color = 'bg-green-100 text-green-800';
    else if (probability >= 60) color = 'bg-yellow-100 text-yellow-800';
    else if (probability >= 40) color = 'bg-orange-100 text-orange-800';
    
    return <Badge className={color}>{probability}%</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Статистика котировок */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Активные КП</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <Quote className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Общая сумма</p>
                <p className="text-2xl font-bold">€2.4M</p>
              </div>
              <Euro className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Средн. вероятность</p>
                <p className="text-2xl font-bold">78%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Истекают скоро</p>
                <p className="text-2xl font-bold">6</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Quote className="w-5 h-5" />
              Активные коммерческие предложения
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск КП..."
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
                  <SelectItem value="pending">Ожидает</SelectItem>
                  <SelectItem value="approved">Одобрено</SelectItem>
                  <SelectItem value="revision">На доработке</SelectItem>
                </SelectContent>
              </Select>
              
              <Dialog open={showNewQuotationModal} onOpenChange={setShowNewQuotationModal}>
                <DialogTrigger asChild>
                  <Button className="btn-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Новое КП
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Создать новое коммерческое предложение</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="client">Клиент *</Label>
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
                      <Label htmlFor="contactPerson">Контактное лицо</Label>
                      <Input id="contactPerson" placeholder="Имя контактного лица" />
                    </div>
                    
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="project">Название проекта *</Label>
                      <Input id="project" placeholder="Введите название проекта" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="amount">Сумма (€)</Label>
                      <Input id="amount" type="number" placeholder="0.00" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="probability">Вероятность закрытия (%)</Label>
                      <Input id="probability" type="number" min="0" max="100" placeholder="75" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="validUntil">Действительно до</Label>
                      <Input id="validUntil" type="date" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="discount">Скидка (%)</Label>
                      <Input id="discount" type="number" min="0" max="100" placeholder="10" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="manager">Ответственный менеджер</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите менеджера" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ivan">Иван Петров</SelectItem>
                          <SelectItem value="maria">Мария Сидорова</SelectItem>
                          <SelectItem value="alexey">Алексей Иванов</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="status">Статус</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите статус" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Черновик</SelectItem>
                          <SelectItem value="pending">Ожидает</SelectItem>
                          <SelectItem value="sent">Отправлено</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="description">Описание проекта</Label>
                      <Textarea id="description" rows={3} placeholder="Подробное описание проекта и требований" />
                    </div>
                    
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="notes">Заметки</Label>
                      <Textarea id="notes" rows={2} placeholder="Внутренние заметки и комментарии" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline" onClick={() => setShowNewQuotationModal(false)}>
                      Отмена
                    </Button>
                    <Button onClick={() => setShowNewQuotationModal(false)}>
                      Создать КП
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
                  <TableHead>ID / Клиент</TableHead>
                  <TableHead>Проект</TableHead>
                  <TableHead>Сумма</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Вероятность</TableHead>
                  <TableHead>Срок действия</TableHead>
                  <TableHead>Менеджер</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotations.map((quotation) => (
                  <TableRow key={quotation.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <div className="font-medium">{quotation.id}</div>
                        <div className="text-sm text-muted-foreground">{quotation.client}</div>
                        <div className="text-xs text-muted-foreground">{quotation.contactPerson}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium max-w-xs truncate">{quotation.project}</div>
                        <div className="text-sm text-muted-foreground">
                          {quotation.items} позиций • Скидка {quotation.discount}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-bold text-green-600">
                      {quotation.amount}
                    </TableCell>
                    <TableCell>{getStatusBadge(quotation.status)}</TableCell>
                    <TableCell>{getProbabilityBadge(quotation.probability)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="w-3 h-3" />
                        {quotation.validUntil}
                      </div>
                    </TableCell>
                    <TableCell>{quotation.manager}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Send className="w-4 h-4" />
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
