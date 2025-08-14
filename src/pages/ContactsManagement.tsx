
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Mail, 
  Send, 
  Truck, 
  FileText, 
  Plus, 
  Search,
  Filter,
  Eye,
  Edit,
  Download,
  Calendar,
  User,
  Phone,
  MapPin,
  Euro,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import Navigation from '@/components/Navigation';

const ContactsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('company');

  // Mock data
  const companyProfile = {
    name: 'STUWA GmbH',
    description: 'Ведущая компания в области технических решений и логистических услуг в Германии',
    established: '2015',
    employees: '150+',
    headquarters: 'Berlin, Germany',
    revenue: '€50M+',
    certifications: ['ISO 9001', 'ISO 14001', 'GDPR Compliant'],
    services: [
      'Техническое консультирование',
      'Логистические решения',
      'Коммерческие услуги',
      'Управление проектами'
    ]
  };

  const incomingCorrespondence = [
    {
      id: 1,
      from: 'BMW Group',
      subject: 'Запрос на техническое предложение',
      date: '2024-01-15',
      priority: 'high',
      status: 'unread',
      type: 'inquiry'
    },
    {
      id: 2,
      from: 'Volkswagen AG',
      subject: 'Партнерское соглашение',
      date: '2024-01-14',
      priority: 'medium',
      status: 'read',
      type: 'proposal'
    },
    {
      id: 3,
      from: 'Mercedes-Benz',
      subject: 'Логистическое сотрудничество',
      date: '2024-01-13',
      priority: 'low',
      status: 'responded',
      type: 'partnership'
    }
  ];

  const outgoingCorrespondence = [
    {
      id: 1,
      to: 'Siemens AG',
      subject: 'Предложение по техническому аудиту',
      date: '2024-01-15',
      status: 'sent',
      type: 'proposal'
    },
    {
      id: 2,
      to: 'Bosch GmbH',
      subject: 'Коммерческое предложение',
      date: '2024-01-14',
      status: 'draft',
      type: 'offer'
    },
    {
      id: 3,
      to: 'SAP SE',
      subject: 'Приглашение к сотрудничеству',
      date: '2024-01-12',
      status: 'delivered',
      type: 'invitation'
    }
  ];

  const suppliers = [
    {
      id: 1,
      name: 'TechnoSupply GmbH',
      category: 'Техническое оборудование',
      contact: 'Hans Mueller',
      email: 'h.mueller@technosupply.de',
      phone: '+49 30 123456',
      location: 'Munich',
      rating: 4.8,
      status: 'active',
      lastOrder: '2024-01-10'
    },
    {
      id: 2,
      name: 'LogiFlow Solutions',
      category: 'Логистические услуги',
      contact: 'Anna Schmidt',
      email: 'a.schmidt@logiflow.de',
      phone: '+49 40 987654',
      location: 'Hamburg',
      rating: 4.6,
      status: 'active',
      lastOrder: '2024-01-08'
    },
    {
      id: 3,
      name: 'Office Pro GmbH',
      category: 'Офисные принадлежности',
      contact: 'Peter Weber',
      email: 'p.weber@officepro.de',
      phone: '+49 69 555777',
      location: 'Frankfurt',
      rating: 4.3,
      status: 'pending',
      lastOrder: '2023-12-20'
    }
  ];

  const contracts = [
    {
      id: 1,
      supplier: 'TechnoSupply GmbH',
      contractNumber: 'CONTRACT-2024-001',
      type: 'Долгосрочное соглашение',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      value: '€250,000',
      status: 'active',
      renewalDate: '2024-10-01'
    },
    {
      id: 2,
      supplier: 'LogiFlow Solutions',
      contractNumber: 'CONTRACT-2024-002',
      type: 'Услуги логистики',
      startDate: '2024-01-15',
      endDate: '2024-06-15',
      value: '€150,000',
      status: 'active',
      renewalDate: '2024-05-01'
    },
    {
      id: 3,
      supplier: 'Office Pro GmbH',
      contractNumber: 'CONTRACT-2023-025',
      type: 'Поставка материалов',
      startDate: '2023-12-01',
      endDate: '2024-02-28',
      value: '€75,000',
      status: 'expiring',
      renewalDate: '2024-02-01'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: 'default' as const, label: 'Активный' },
      pending: { variant: 'secondary' as const, label: 'Ожидание' },
      expiring: { variant: 'destructive' as const, label: 'Истекает' },
      sent: { variant: 'default' as const, label: 'Отправлено' },
      draft: { variant: 'secondary' as const, label: 'Черновик' },
      delivered: { variant: 'default' as const, label: 'Доставлено' },
      unread: { variant: 'destructive' as const, label: 'Не прочитано' },
      read: { variant: 'secondary' as const, label: 'Прочитано' },
      responded: { variant: 'default' as const, label: 'Отвечено' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || { variant: 'outline' as const, label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'medium': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Контакты и Корреспонденция
          </h1>
          <p className="text-gray-600">
            Управление корпоративными контактами, корреспонденцией и отношениями с поставщиками
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="company" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Резюме компании
            </TabsTrigger>
            <TabsTrigger value="incoming" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Входящие
            </TabsTrigger>
            <TabsTrigger value="outgoing" className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Исходящие
            </TabsTrigger>
            <TabsTrigger value="suppliers" className="flex items-center gap-2">
              <Truck className="w-4 h-4" />
              Поставщики
            </TabsTrigger>
            <TabsTrigger value="contracts" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Договора
            </TabsTrigger>
          </TabsList>

          {/* Company Profile */}
          <TabsContent value="company" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Профиль компании STUWA
                </CardTitle>
                <CardDescription>
                  Корпоративная информация и ключевые показатели
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900">Основана</h3>
                    <p className="text-2xl font-bold text-primary">{companyProfile.established}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900">Сотрудники</h3>
                    <p className="text-2xl font-bold text-primary">{companyProfile.employees}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900">Оборот</h3>
                    <p className="text-2xl font-bold text-primary">{companyProfile.revenue}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900">Штаб-квартира</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {companyProfile.headquarters}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Описание</h3>
                  <p className="text-gray-600">{companyProfile.description}</p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Услуги</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {companyProfile.services.map((service, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Сертификации</h3>
                  <div className="flex flex-wrap gap-2">
                    {companyProfile.certifications.map((cert, index) => (
                      <Badge key={index} variant="outline">{cert}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Incoming Correspondence */}
          <TabsContent value="incoming" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Входящая корреспонденция
                </CardTitle>
                <CardDescription>
                  Управление входящими коммуникациями и запросами
                </CardDescription>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Поиск корреспонденции..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {incomingCorrespondence.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getPriorityIcon(item.priority)}
                          <div>
                            <h3 className="font-semibold">{item.subject}</h3>
                            <p className="text-sm text-gray-600">От: {item.from}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(item.status)}
                          <Badge variant="outline">{item.type}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {item.date}
                        </span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            Просмотр
                          </Button>
                          <Button size="sm" variant="outline">
                            <Send className="w-4 h-4 mr-1" />
                            Ответить
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Outgoing Correspondence */}
          <TabsContent value="outgoing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Исходящая корреспонденция
                </CardTitle>
                <CardDescription>
                  Отслеживание исходящих коммуникаций и предложений
                </CardDescription>
                <Button className="w-fit">
                  <Plus className="w-4 h-4 mr-2" />
                  Создать письмо
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {outgoingCorrespondence.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{item.subject}</h3>
                          <p className="text-sm text-gray-600">Кому: {item.to}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(item.status)}
                          <Badge variant="outline">{item.type}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {item.date}
                        </span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4 mr-1" />
                            Редактировать
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-1" />
                            Скачать
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Suppliers */}
          <TabsContent value="suppliers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Контакты поставщиков ТРУ
                </CardTitle>
                <CardDescription>
                  Управление отношениями с поставщиками товаров, работ и услуг
                </CardDescription>
                <Button className="w-fit">
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить поставщика
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suppliers.map((supplier) => (
                    <div key={supplier.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{supplier.name}</h3>
                          <p className="text-sm text-gray-600">{supplier.category}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(supplier.status)}
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm font-medium">{supplier.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span>{supplier.contact}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span>{supplier.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{supplier.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{supplier.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          Последний заказ: {supplier.lastOrder}
                        </span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            Просмотр
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4 mr-1" />
                            Редактировать
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contracts */}
          <TabsContent value="contracts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Договора с поставщиками
                </CardTitle>
                <CardDescription>
                  Управление договорами и соглашениями с поставщиками
                </CardDescription>
                <Button className="w-fit">
                  <Plus className="w-4 h-4 mr-2" />
                  Создать договор
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contracts.map((contract) => (
                    <div key={contract.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{contract.contractNumber}</h3>
                          <p className="text-sm text-gray-600">{contract.supplier}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(contract.status)}
                          <Badge variant="outline">{contract.type}</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Начало:</span>
                          <p className="text-gray-600">{contract.startDate}</p>
                        </div>
                        <div>
                          <span className="font-medium">Окончание:</span>
                          <p className="text-gray-600">{contract.endDate}</p>
                        </div>
                        <div>
                          <span className="font-medium">Стоимость:</span>
                          <p className="text-gray-600 flex items-center gap-1">
                            <Euro className="w-4 h-4" />
                            {contract.value}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium">Продление:</span>
                          <p className="text-gray-600">{contract.renewalDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            Просмотр
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4 mr-1" />
                            Редактировать
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-1" />
                            Скачать
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ContactsManagement;
