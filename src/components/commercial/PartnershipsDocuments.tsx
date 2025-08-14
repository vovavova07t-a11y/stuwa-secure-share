
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
  Handshake, 
  Calendar,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

export const PartnershipsDocuments: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showNewDocumentModal, setShowNewDocumentModal] = useState(false);

  const documents = [
    {
      id: 'DOC-001',
      title: 'Меморандум о взаимопонимании - BMW Group',
      type: 'memorandum',
      partner: 'BMW Group',
      status: 'active',
      signedDate: '2024-01-10',
      expiryDate: '2025-01-10',
      value: '€2.5M',
      contactPerson: 'Михаель Шмидт',
      department: 'Automotive Division',
      renewalRequired: false,
      confidentiality: 'high'
    },
    {
      id: 'DOC-002',
      title: 'Соглашение о стратегическом партнерстве - Siemens',
      type: 'partnership',
      partner: 'Siemens AG',
      status: 'pending_renewal',
      signedDate: '2023-06-15',
      expiryDate: '2024-02-15',
      value: '€1.8M',
      contactPerson: 'Томас Вагнер',
      department: 'Industrial Solutions',
      renewalRequired: true,
      confidentiality: 'medium'
    },
    {
      id: 'DOC-003',
      title: 'Рамочное соглашение - Volkswagen AG',
      type: 'framework',
      partner: 'Volkswagen AG',
      status: 'draft',
      signedDate: null,
      expiryDate: '2024-12-31',
      value: '€3.2M',
      contactPerson: 'Анна Мюллер',
      department: 'Procurement',
      renewalRequired: false,
      confidentiality: 'high'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      active: { label: 'Активно', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      pending_renewal: { label: 'Требует продления', color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
      draft: { label: 'Черновик', color: 'bg-blue-100 text-blue-800', icon: Clock },
      expired: { label: 'Истекло', color: 'bg-red-100 text-red-800', icon: AlertCircle },
      terminated: { label: 'Расторгнуто', color: 'bg-gray-100 text-gray-800', icon: AlertCircle }
    };
    const variant = variants[status as keyof typeof variants] || variants.active;
    const Icon = variant.icon;
    
    return (
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4" />
        <Badge className={variant.color}>{variant.label}</Badge>
      </div>
    );
  };

  const getTypeBadge = (type: string) => {
    const variants = {
      memorandum: { label: 'Меморандум', color: 'bg-purple-100 text-purple-800' },
      partnership: { label: 'Партнерство', color: 'bg-blue-100 text-blue-800' },
      framework: { label: 'Рамочное', color: 'bg-orange-100 text-orange-800' },
      nda: { label: 'NDA', color: 'bg-red-100 text-red-800' },
      cooperation: { label: 'Сотрудничество', color: 'bg-green-100 text-green-800' }
    };
    const variant = variants[type as keyof typeof variants] || variants.partnership;
    return <Badge className={variant.color}>{variant.label}</Badge>;
  };

  const getConfidentialityBadge = (level: string) => {
    const variants = {
      high: { label: 'Высокая', color: 'bg-red-100 text-red-800' },
      medium: { label: 'Средняя', color: 'bg-yellow-100 text-yellow-800' },
      low: { label: 'Низкая', color: 'bg-green-100 text-green-800' }
    };
    const variant = variants[level as keyof typeof variants] || variants.medium;
    return <Badge className={variant.color}>{variant.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Статистика документов */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Активные соглашения</p>
                <p className="text-2xl font-bold">18</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Требуют продления</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Общая стоимость</p>
                <p className="text-2xl font-bold">€45.2M</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Новых за месяц</p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <Plus className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Handshake className="w-5 h-5" />
              Меморандумы и соглашения о сотрудничестве
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск документов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Тип документа" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все типы</SelectItem>
                  <SelectItem value="memorandum">Меморандумы</SelectItem>
                  <SelectItem value="partnership">Партнерство</SelectItem>
                  <SelectItem value="framework">Рамочные</SelectItem>
                  <SelectItem value="nda">NDA</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Загрузить
              </Button>
              
              <Dialog open={showNewDocumentModal} onOpenChange={setShowNewDocumentModal}>
                <DialogTrigger asChild>
                  <Button className="btn-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Новый документ
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Создать новый документ партнерства</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="title">Название документа *</Label>
                      <Input id="title" placeholder="Введите название документа" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="type">Тип документа</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите тип" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="memorandum">Меморандум</SelectItem>
                          <SelectItem value="partnership">Соглашение о партнерстве</SelectItem>
                          <SelectItem value="framework">Рамочное соглашение</SelectItem>
                          <SelectItem value="nda">NDA</SelectItem>
                          <SelectItem value="cooperation">Соглашение о сотрудничестве</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="partner">Партнер</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите партнера" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bmw">BMW Group</SelectItem>
                          <SelectItem value="vw">Volkswagen AG</SelectItem>
                          <SelectItem value="siemens">Siemens AG</SelectItem>
                          <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson">Контактное лицо</Label>
                      <Input id="contactPerson" placeholder="Имя и фамилия" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="department">Подразделение партнера</Label>
                      <Input id="department" placeholder="Название подразделения" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="value">Стоимость соглашения (€)</Label>
                      <Input id="value" type="number" placeholder="0.00" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signedDate">Дата подписания</Label>
                      <Input id="signedDate" type="date" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Дата истечения</Label>
                      <Input id="expiryDate" type="date" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="status">Статус</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите статус" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Черновик</SelectItem>
                          <SelectItem value="active">Активно</SelectItem>
                          <SelectItem value="pending_renewal">Требует продления</SelectItem>
                          <SelectItem value="expired">Истекло</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confidentiality">Уровень конфиденциальности</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите уровень" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Низкий</SelectItem>
                          <SelectItem value="medium">Средний</SelectItem>
                          <SelectItem value="high">Высокий</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="description">Описание соглашения</Label>
                      <Textarea id="description" rows={3} placeholder="Основные условия и цели соглашения" />
                    </div>
                    
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="notes">Дополнительные заметки</Label>
                      <Textarea id="notes" rows={2} placeholder="Внутренние заметки и комментарии" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline" onClick={() => setShowNewDocumentModal(false)}>
                      Отмена
                    </Button>
                    <Button onClick={() => setShowNewDocumentModal(false)}>
                      Создать документ
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
                  <TableHead>Документ</TableHead>
                  <TableHead>Тип</TableHead>
                  <TableHead>Партнер</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Период действия</TableHead>
                  <TableHead>Стоимость</TableHead>
                  <TableHead>Конфиденциальность</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((document) => (
                  <TableRow key={document.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <div className="font-medium max-w-xs truncate">{document.title}</div>
                        <div className="text-sm text-muted-foreground">{document.id}</div>
                        <div className="text-xs text-muted-foreground">{document.contactPerson}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(document.type)}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{document.partner}</div>
                        <div className="text-sm text-muted-foreground">{document.department}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(document.status)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {document.signedDate && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {document.signedDate}
                          </div>
                        )}
                        <div className="text-muted-foreground">
                          до {document.expiryDate}
                        </div>
                        {document.renewalRequired && (
                          <div className="text-red-600 text-xs">Требует продления</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{document.value}</TableCell>
                    <TableCell>{getConfidentialityBadge(document.confidentiality)}</TableCell>
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
