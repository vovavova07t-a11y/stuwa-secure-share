
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
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  Filter,
  Users,
  TrendingUp
} from 'lucide-react';

export const ClientDatabase: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showNewClientModal, setShowNewClientModal] = useState(false);

  const clients = [
    {
      id: 'CLI-001',
      company: 'BMW Group',
      contactPerson: 'Михаель Шмидт',
      email: 'schmidt@bmw.de',
      phone: '+49 89 382-0',
      city: 'München',
      country: 'Germany',
      type: 'automotive',
      status: 'active',
      revenue: '€2.5M',
      projects: 12,
      lastContact: '2024-01-15'
    },
    {
      id: 'CLI-002',
      company: 'Volkswagen AG',
      contactPerson: 'Анна Мюллер',
      email: 'mueller@volkswagen.de',
      phone: '+49 5361 9-0',
      city: 'Wolfsburg',
      country: 'Germany',
      type: 'automotive',
      status: 'active',
      revenue: '€1.8M',
      projects: 8,
      lastContact: '2024-01-14'
    },
    {
      id: 'CLI-003',
      company: 'Siemens AG',
      contactPerson: 'Томас Вагнер',
      email: 'wagner@siemens.com',
      phone: '+49 89 636-0',
      city: 'Berlin',
      country: 'Germany',
      type: 'industrial',
      status: 'potential',
      revenue: '€950K',
      projects: 3,
      lastContact: '2024-01-10'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      active: { label: 'Активный', color: 'bg-green-100 text-green-800' },
      potential: { label: 'Потенциальный', color: 'bg-blue-100 text-blue-800' },
      inactive: { label: 'Неактивный', color: 'bg-gray-100 text-gray-800' }
    };
    const variant = variants[status as keyof typeof variants] || variants.active;
    return <Badge className={variant.color}>{variant.label}</Badge>;
  };

  const getTypeBadge = (type: string) => {
    const variants = {
      automotive: { label: 'Автомобильная', color: 'bg-purple-100 text-purple-800' },
      industrial: { label: 'Промышленная', color: 'bg-orange-100 text-orange-800' },
      aerospace: { label: 'Авиакосмическая', color: 'bg-indigo-100 text-indigo-800' }
    };
    const variant = variants[type as keyof typeof variants] || variants.industrial;
    return <Badge className={variant.color}>{variant.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Статистика клиентов */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Всего клиентов</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Активные</p>
                <p className="text-2xl font-bold">124</p>
              </div>
              <Building className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Потенциальные</p>
                <p className="text-2xl font-bold">32</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Общая выручка</p>
                <p className="text-2xl font-bold">€12.5M</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              База данных клиентов
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
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Отрасль" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все отрасли</SelectItem>
                  <SelectItem value="automotive">Автомобильная</SelectItem>
                  <SelectItem value="industrial">Промышленная</SelectItem>
                  <SelectItem value="aerospace">Авиакосмическая</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Фильтры
              </Button>
              
              <Dialog open={showNewClientModal} onOpenChange={setShowNewClientModal}>
                <DialogTrigger asChild>
                  <Button className="btn-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Новый клиент
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Добавить нового клиента</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Название компании *</Label>
                      <Input id="company" placeholder="Введите название компании" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson">Контактное лицо</Label>
                      <Input id="contactPerson" placeholder="Имя и фамилия" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="email@company.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input id="phone" placeholder="+49 xxx xxx xxxx" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="city">Город</Label>
                      <Input id="city" placeholder="Название города" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="country">Страна</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите страну" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="germany">Germany</SelectItem>
                          <SelectItem value="austria">Austria</SelectItem>
                          <SelectItem value="switzerland">Switzerland</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="type">Отрасль</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите отрасль" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="automotive">Автомобильная</SelectItem>
                          <SelectItem value="industrial">Промышленная</SelectItem>
                          <SelectItem value="aerospace">Авиакосмическая</SelectItem>
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
                          <SelectItem value="active">Активный</SelectItem>
                          <SelectItem value="potential">Потенциальный</SelectItem>
                          <SelectItem value="inactive">Неактивный</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="address">Адрес</Label>
                      <Input id="address" placeholder="Полный адрес компании" />
                    </div>
                    
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="notes">Заметки</Label>
                      <Textarea id="notes" rows={3} placeholder="Дополнительная информация о клиенте" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline" onClick={() => setShowNewClientModal(false)}>
                      Отмена
                    </Button>
                    <Button onClick={() => setShowNewClientModal(false)}>
                      Добавить клиента
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
                  <TableHead>Компания</TableHead>
                  <TableHead>Контактное лицо</TableHead>
                  <TableHead>Контакты</TableHead>
                  <TableHead>Расположение</TableHead>
                  <TableHead>Отрасль</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Выручка</TableHead>
                  <TableHead>Проекты</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{client.company}</TableCell>
                    <TableCell>{client.contactPerson}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="w-3 h-3" />
                          {client.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="w-3 h-3" />
                          {client.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {client.city}, {client.country}
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(client.type)}</TableCell>
                    <TableCell>{getStatusBadge(client.status)}</TableCell>
                    <TableCell className="font-medium">{client.revenue}</TableCell>
                    <TableCell>{client.projects}</TableCell>
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
