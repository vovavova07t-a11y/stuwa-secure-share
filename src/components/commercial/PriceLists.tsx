
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
  Download, 
  Upload,
  DollarSign, 
  Calendar,
  FileText,
  History,
  CheckCircle
} from 'lucide-react';

export const PriceLists: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showNewPriceListModal, setShowNewPriceListModal] = useState(false);

  const priceLists = [
    {
      id: 'PL-001',
      name: 'Прайс-лист Металлы 2024',
      category: 'Металлы',
      version: '2.3',
      status: 'active',
      effectiveDate: '2024-01-01',
      expiryDate: '2024-12-31',
      products: 145,
      lastUpdated: '2024-01-15',
      updatedBy: 'Иван Петров',
      currency: 'EUR',
      discount: 'До 15%'
    },
    {
      id: 'PL-002',
      name: 'Композитные материалы Q1',
      category: 'Композиты',
      version: '1.1',
      status: 'pending',
      effectiveDate: '2024-04-01',
      expiryDate: '2024-06-30',
      products: 67,
      lastUpdated: '2024-01-14',
      updatedBy: 'Мария Сидорова',
      currency: 'EUR',
      discount: 'До 20%'
    },
    {
      id: 'PL-003',
      name: 'Специальные предложения',
      category: 'Промо',
      version: '3.0',
      status: 'expired',
      effectiveDate: '2023-12-01',
      expiryDate: '2023-12-31',
      products: 23,
      lastUpdated: '2023-12-28',
      updatedBy: 'Алексей Иванов',
      currency: 'EUR',
      discount: 'До 30%'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      active: { label: 'Активный', color: 'bg-green-100 text-green-800' },
      pending: { label: 'На утверждении', color: 'bg-yellow-100 text-yellow-800' },
      expired: { label: 'Истёк', color: 'bg-red-100 text-red-800' },
      draft: { label: 'Черновик', color: 'bg-gray-100 text-gray-800' }
    };
    const variant = variants[status as keyof typeof variants] || variants.active;
    return <Badge className={variant.color}>{variant.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Статистика прайс-листов */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Активные прайсы</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Всего продуктов</p>
                <p className="text-2xl font-bold">1,247</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Обновлений в месяц</p>
                <p className="text-2xl font-bold">18</p>
              </div>
              <History className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Макс. скидка</p>
                <p className="text-2xl font-bold">30%</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Управление прайс-листами
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск прайс-листов..."
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
                  <SelectItem value="active">Активные</SelectItem>
                  <SelectItem value="pending">На утверждении</SelectItem>
                  <SelectItem value="expired">Истёкшие</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Загрузить
              </Button>
              
              <Dialog open={showNewPriceListModal} onOpenChange={setShowNewPriceListModal}>
                <DialogTrigger asChild>
                  <Button className="btn-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Новый прайс-лист
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Создать новый прайс-лист</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="priceListName">Название прайс-листа *</Label>
                      <Input id="priceListName" placeholder="Введите название прайс-листа" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Категория</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="metals">Металлы</SelectItem>
                          <SelectItem value="composites">Композиты</SelectItem>
                          <SelectItem value="chemicals">Химия</SelectItem>
                          <SelectItem value="promo">Промо</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="version">Версия</Label>
                      <Input id="version" placeholder="1.0" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="currency">Валюта</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите валюту" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="effectiveDate">Дата вступления в силу</Label>
                      <Input id="effectiveDate" type="date" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Дата истечения</Label>
                      <Input id="expiryDate" type="date" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="maxDiscount">Максимальная скидка (%)</Label>
                      <Input id="maxDiscount" type="number" placeholder="15" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="status">Статус</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите статус" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Черновик</SelectItem>
                          <SelectItem value="pending">На утверждении</SelectItem>
                          <SelectItem value="active">Активный</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="description">Описание</Label>
                      <Textarea id="description" rows={3} placeholder="Описание прайс-листа и условий применения" />
                    </div>
                    
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="notes">Заметки</Label>
                      <Textarea id="notes" rows={2} placeholder="Дополнительные заметки и комментарии" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline" onClick={() => setShowNewPriceListModal(false)}>
                      Отмена
                    </Button>
                    <Button onClick={() => setShowNewPriceListModal(false)}>
                      Создать прайс-лист
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
                  <TableHead>Название</TableHead>
                  <TableHead>Категория</TableHead>
                  <TableHead>Версия</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Период действия</TableHead>
                  <TableHead>Продукты</TableHead>
                  <TableHead>Макс. скидка</TableHead>
                  <TableHead>Обновлен</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {priceLists.map((priceList) => (
                  <TableRow key={priceList.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <div className="font-medium">{priceList.name}</div>
                        <div className="text-sm text-muted-foreground">{priceList.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>{priceList.category}</TableCell>
                    <TableCell>
                      <Badge variant="outline">v{priceList.version}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(priceList.status)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {priceList.effectiveDate}
                        </div>
                        <div className="text-muted-foreground">
                          до {priceList.expiryDate}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{priceList.products}</TableCell>
                    <TableCell>{priceList.discount}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{priceList.lastUpdated}</div>
                        <div className="text-muted-foreground">{priceList.updatedBy}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
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
