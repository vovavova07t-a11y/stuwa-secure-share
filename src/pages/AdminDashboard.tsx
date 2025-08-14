
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Shield, 
  Users, 
  Search, 
  Settings, 
  Database, 
  FileText, 
  BarChart3,
  Globe,
  Lock,
  Download,
  Upload,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  UserPlus,
  Trash2,
  Edit,
  Eye,
  Languages
} from 'lucide-react';
import Navigation from '@/components/Navigation';

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [language, setLanguage] = useState('ru');

  // Mock data for admin functionality
  const systemMetrics = {
    totalUsers: 150,
    activeUsers: 89,
    totalDocuments: 1245,
    systemUptime: '99.8%',
    storageUsed: '45.2 GB',
    storageTotal: '100 GB',
    lastBackup: '2024-01-15 03:00'
  };

  const users = [
    {
      id: 1,
      name: 'Hans Mueller',
      email: 'h.mueller@stuwa.de',
      role: 'Technical Director',
      department: 'technical',
      status: 'active',
      lastLogin: '2024-01-15 14:30',
      permissions: ['read', 'write', 'admin']
    },
    {
      id: 2,
      name: 'Anna Schmidt',
      email: 'a.schmidt@stuwa.de',
      role: 'Logistics Manager',
      department: 'logistics',
      status: 'active',
      lastLogin: '2024-01-15 12:15',
      permissions: ['read', 'write']
    },
    {
      id: 3,
      name: 'Peter Weber',
      email: 'p.weber@stuwa.de',
      role: 'Commercial Staff',
      department: 'commercial',
      status: 'inactive',
      lastLogin: '2024-01-10 16:45',
      permissions: ['read']
    }
  ];

  const auditLogs = [
    {
      id: 1,
      user: 'Hans Mueller',
      action: 'Document Upload',
      resource: 'Technical Specifications',
      timestamp: '2024-01-15 14:30',
      status: 'success',
      ip: '192.168.1.100'
    },
    {
      id: 2,
      user: 'Anna Schmidt',
      action: 'Client Data Update',
      resource: 'BMW Partnership',
      timestamp: '2024-01-15 12:15',
      status: 'success',
      ip: '192.168.1.101'
    },
    {
      id: 3,
      user: 'System',
      action: 'Backup Process',
      resource: 'Database Backup',
      timestamp: '2024-01-15 03:00',
      status: 'success',
      ip: 'localhost'
    }
  ];

  const securityEvents = [
    {
      id: 1,
      type: 'Failed Login',
      user: 'unknown@example.com',
      timestamp: '2024-01-15 15:45',
      severity: 'medium',
      ip: '203.0.113.1'
    },
    {
      id: 2,
      type: 'Permission Change',
      user: 'admin@stuwa.de',
      timestamp: '2024-01-15 10:30',
      severity: 'low',
      ip: '192.168.1.1'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: 'default' as const, label: 'Активный' },
      inactive: { variant: 'secondary' as const, label: 'Неактивный' },
      success: { variant: 'default' as const, label: 'Успешно' },
      error: { variant: 'destructive' as const, label: 'Ошибка' },
      warning: { variant: 'secondary' as const, label: 'Предупреждение' },
      high: { variant: 'destructive' as const, label: 'Высокий' },
      medium: { variant: 'secondary' as const, label: 'Средний' },
      low: { variant: 'outline' as const, label: 'Низкий' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || { variant: 'outline' as const, label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Панель администратора
            </h1>
            <p className="text-gray-600">
              Управление системой, пользователями и безопасностью портала STUWA
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4" />
              <Switch 
                checked={language === 'en'} 
                onCheckedChange={(checked) => setLanguage(checked ? 'en' : 'ru')}
              />
              <span className="text-sm">{language === 'ru' ? 'RU' : 'EN'}</span>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Обзор
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Пользователи
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Безопасность
            </TabsTrigger>
            <TabsTrigger value="audit" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Аудит
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              Система
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Настройки
            </TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Всего пользователей</p>
                      <p className="text-2xl font-bold">{systemMetrics.totalUsers}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Активные пользователи</p>
                      <p className="text-2xl font-bold">{systemMetrics.activeUsers}</p>
                    </div>
                    <Activity className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Документы</p>
                      <p className="text-2xl font-bold">{systemMetrics.totalDocuments}</p>
                    </div>
                    <FileText className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Время работы</p>
                      <p className="text-2xl font-bold">{systemMetrics.systemUptime}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Использование хранилища</CardTitle>
                  <CardDescription>Текущее использование дискового пространства</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Использовано</span>
                      <span>{systemMetrics.storageUsed} из {systemMetrics.storageTotal}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Последнее резервное копирование</CardTitle>
                  <CardDescription>Статус автоматического резервного копирования</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{systemMetrics.lastBackup}</p>
                      <p className="text-sm text-green-600 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Успешно завершено
                      </p>
                    </div>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Скачать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Management */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Управление пользователями
                </CardTitle>
                <CardDescription>
                  Управление учетными записями пользователей и их разрешениями
                </CardDescription>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Поиск пользователей..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Добавить пользователя
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{user.name}</h3>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(user.status)}
                          <Badge variant="outline">{user.department}</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Роль:</span>
                          <p className="text-gray-600">{user.role}</p>
                        </div>
                        <div>
                          <span className="font-medium">Последний вход:</span>
                          <p className="text-gray-600">{user.lastLogin}</p>
                        </div>
                        <div>
                          <span className="font-medium">Разрешения:</span>
                          <div className="flex gap-1 mt-1">
                            {user.permissions.map((perm, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {perm}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
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
                          <Lock className="w-4 h-4 mr-1" />
                          Разрешения
                        </Button>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="w-4 h-4 mr-1" />
                          Удалить
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  События безопасности
                </CardTitle>
                <CardDescription>
                  Мониторинг безопасности и подозрительной активности
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityEvents.map((event) => (
                    <div key={event.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getSeverityIcon(event.severity)}
                          <div>
                            <h3 className="font-semibold">{event.type}</h3>
                            <p className="text-sm text-gray-600">Пользователь: {event.user}</p>
                          </div>
                        </div>
                        {getStatusBadge(event.severity)}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {event.timestamp} • IP: {event.ip}
                        </span>
                        <Button size="sm" variant="outline">
                          Подробности
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audit Logs */}
          <TabsContent value="audit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Журнал аудита
                </CardTitle>
                <CardDescription>
                  Полный журнал действий пользователей в системе
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{log.action}</h3>
                          <p className="text-sm text-gray-600">
                            Пользователь: {log.user} • Ресурс: {log.resource}
                          </p>
                        </div>
                        {getStatusBadge(log.status)}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {log.timestamp} • IP: {log.ip}
                        </span>
                        <Button size="sm" variant="outline">
                          Детали
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Management */}
          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Резервное копирование
                  </CardTitle>
                  <CardDescription>
                    Управление резервными копиями системы
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Автоматическое резервное копирование</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Создать резервную копию
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Upload className="w-4 h-4 mr-2" />
                      Восстановить
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Системные настройки
                  </CardTitle>
                  <CardDescription>
                    Глобальные настройки портала
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Режим обслуживания</span>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Регистрация новых пользователей</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>GDPR соответствие</span>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Настройки портала
                </CardTitle>
                <CardDescription>
                  Конфигурация и персонализация портала STUWA
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Общие настройки</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Название компании</label>
                      <Input defaultValue="STUWA GmbH" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Язык по умолчанию</label>
                      <select className="w-full p-2 border rounded-md">
                        <option value="ru">Русский</option>
                        <option value="en">English</option>
                        <option value="de">Deutsch</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Безопасность</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Двухфакторная аутентификация</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Принудительная смена пароля</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Логирование всех действий</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button>Сохранить изменения</Button>
                  <Button variant="outline">Сбросить</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
