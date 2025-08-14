
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
  Database, 
  Activity,
  FileText,
  Settings,
  BarChart3,
  Globe,
  Lock,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Clock,
  UserPlus,
  Trash2,
  Edit,
  Eye,
  Search,
  Monitor,
  Server,
  HardDrive,
  Wifi,
  Bell,
  Key,
  LogOut,
  Archive,
  RefreshCw
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const OrganizerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for organizer dashboard
  const systemMetrics = {
    totalUsers: 247,
    activeUsers: 156,
    totalDocuments: 5420,
    systemUptime: '99.9%',
    storageUsed: '78.5 GB',
    storageTotal: '200 GB',
    lastBackup: '2024-01-15 02:00',
    securityAlerts: 3,
    pendingApprovals: 12
  };

  const departmentStats = [
    { name: 'Финансовая дирекция', users: 45, documents: 1230, active: 32 },
    { name: 'Техническая дирекция', users: 67, documents: 2840, active: 51 },
    { name: 'Управление логистики', users: 52, documents: 890, active: 38 },
    { name: 'Коммерческая дирекция', users: 38, documents: 340, active: 24 },
    { name: 'Офис-менеджер', users: 45, documents: 120, active: 11 }
  ];

  const systemUsers = [
    {
      id: 1,
      name: 'Hans Mueller',
      email: 'h.mueller@stuwa.de',
      department: 'Техническая дирекция',
      role: 'Technical Director',
      status: 'active',
      lastLogin: '2024-01-15 14:30',
      permissions: ['read', 'write', 'admin']
    },
    {
      id: 2,
      name: 'Anna Schmidt',
      email: 'a.schmidt@stuwa.de',
      department: 'Управление логистики',
      role: 'Logistics Manager',
      status: 'active',
      lastLogin: '2024-01-15 12:15',
      permissions: ['read', 'write']
    },
    {
      id: 3,
      name: 'Peter Weber',
      email: 'p.weber@stuwa.de',
      department: 'Коммерческая дирекция',
      role: 'Commercial Staff',
      status: 'inactive',
      lastLogin: '2024-01-10 16:45',
      permissions: ['read']
    }
  ];

  const activityData = [
    { time: '00:00', logins: 12, documents: 45, downloads: 23 },
    { time: '04:00', logins: 8, documents: 32, downloads: 15 },
    { time: '08:00', logins: 89, documents: 156, downloads: 78 },
    { time: '12:00', logins: 145, documents: 234, downloads: 123 },
    { time: '16:00', logins: 167, documents: 289, downloads: 145 },
    { time: '20:00', logins: 98, documents: 178, downloads: 89 }
  ];

  const storageData = [
    { name: 'Документы', value: 35, color: '#3b82f6' },
    { name: 'Медиа', value: 25, color: '#10b981' },
    { name: 'Резервные копии', value: 20, color: '#f59e0b' },
    { name: 'Системные файлы', value: 12, color: '#ef4444' },
    { name: 'Свободно', value: 8, color: '#6b7280' }
  ];

  const securityAlerts = [
    {
      id: 1,
      type: 'Подозрительная активность',
      user: 'unknown@example.com',
      timestamp: '2024-01-15 15:45',
      severity: 'high',
      ip: '203.0.113.1',
      description: 'Множественные неудачные попытки входа'
    },
    {
      id: 2,
      type: 'Изменение разрешений',
      user: 'admin@stuwa.de',
      timestamp: '2024-01-15 10:30',
      severity: 'medium',
      ip: '192.168.1.1',
      description: 'Изменены права доступа пользователя'
    },
    {
      id: 3,
      type: 'Доступ к защищенным файлам',
      user: 'j.doe@stuwa.de',
      timestamp: '2024-01-15 09:15',
      severity: 'low',
      ip: '192.168.1.50',
      description: 'Попытка доступа к конфиденциальным документам'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: 'default' as const, label: 'Активный' },
      inactive: { variant: 'secondary' as const, label: 'Неактивный' },
      blocked: { variant: 'destructive' as const, label: 'Заблокирован' },
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
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Organizer Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Shield className="w-8 h-8 text-blue-400" />
              <div>
                <h1 className="text-2xl font-bold">Панель организатора STUWA</h1>
                <p className="text-gray-400">Полный контроль портала</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Уведомления (3)
              </Button>
              <Button variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-gray-800">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Обзор
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Пользователи
            </TabsTrigger>
            <TabsTrigger value="departments" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Отделы
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Безопасность
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Server className="w-4 h-4" />
              Система
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Аналитика
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Настройки
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Всего пользователей</p>
                      <p className="text-2xl font-bold text-white">{systemMetrics.totalUsers}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Активные пользователи</p>
                      <p className="text-2xl font-bold text-white">{systemMetrics.activeUsers}</p>
                    </div>
                    <Activity className="w-8 h-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Всего документов</p>
                      <p className="text-2xl font-bold text-white">{systemMetrics.totalDocuments}</p>
                    </div>
                    <FileText className="w-8 h-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Время работы</p>
                      <p className="text-2xl font-bold text-white">{systemMetrics.systemUptime}</p>
                    </div>
                    <Monitor className="w-8 h-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Активность системы</CardTitle>
                  <CardDescription className="text-gray-400">
                    Активность пользователей за последние 24 часа
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="time" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1f2937',
                          border: '1px solid #374151',
                          borderRadius: '6px',
                          color: '#f9fafb'
                        }}
                      />
                      <Line type="monotone" dataKey="logins" stroke="#3b82f6" strokeWidth={2} />
                      <Line type="monotone" dataKey="documents" stroke="#10b981" strokeWidth={2} />
                      <Line type="monotone" dataKey="downloads" stroke="#f59e0b" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Использование хранилища</CardTitle>
                  <CardDescription className="text-gray-400">
                    Распределение дискового пространства
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={storageData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {storageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1f2937',
                          border: '1px solid #374151',
                          borderRadius: '6px',
                          color: '#f9fafb'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    Предупреждения безопасности
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-400 mb-2">{systemMetrics.securityAlerts}</div>
                  <p className="text-gray-400 text-sm">Требуют внимания</p>
                  <Button className="w-full mt-4" variant="outline">
                    Просмотреть все
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-yellow-400" />
                    Ожидающие утверждения
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-400 mb-2">{systemMetrics.pendingApprovals}</div>
                  <p className="text-gray-400 text-sm">Документов и запросов</p>
                  <Button className="w-full mt-4" variant="outline">
                    Обработать
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <HardDrive className="w-5 h-5 text-blue-400" />
                    Хранилище
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold text-white mb-2">{systemMetrics.storageUsed}</div>
                  <p className="text-gray-400 text-sm">из {systemMetrics.storageTotal}</p>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: '39%' }}></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Management */}
          <TabsContent value="users" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Управление пользователями
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Полный контроль над всеми пользователями портала
                </CardDescription>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Поиск пользователей..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
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
                  {systemUsers.map((user) => (
                    <div key={user.id} className="border border-gray-700 rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-white">{user.name}</h3>
                          <p className="text-sm text-gray-400">{user.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(user.status)}
                          <Badge variant="outline" className="text-gray-300">{user.department}</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-300">Роль:</span>
                          <p className="text-gray-400">{user.role}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-300">Последний вход:</span>
                          <p className="text-gray-400">{user.lastLogin}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-300">Разрешения:</span>
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
                          <Key className="w-4 h-4 mr-1" />
                          Сбросить пароль
                        </Button>
                        <Button size="sm" variant="outline">
                          <Lock className="w-4 h-4 mr-1" />
                          Блокировать
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

          {/* Departments */}
          <TabsContent value="departments" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Статистика по отделам
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Мониторинг активности всех отделов портала
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentStats.map((dept, index) => (
                    <div key={index} className="border border-gray-700 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">{dept.name}</h3>
                        <Button size="sm" variant="outline">
                          Подробнее
                        </Button>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-blue-400">{dept.users}</div>
                          <div className="text-sm text-gray-400">Пользователи</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-400">{dept.documents}</div>
                          <div className="text-sm text-gray-400">Документы</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-yellow-400">{dept.active}</div>
                          <div className="text-sm text-gray-400">Активные</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Мониторинг безопасности
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Отслеживание угроз и подозрительной активности
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityAlerts.map((alert) => (
                    <div key={alert.id} className="border border-gray-700 rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getSeverityIcon(alert.severity)}
                          <div>
                            <h3 className="font-semibold text-white">{alert.type}</h3>
                            <p className="text-sm text-gray-400">{alert.description}</p>
                          </div>
                        </div>
                        {getStatusBadge(alert.severity)}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">
                          {alert.timestamp} • IP: {alert.ip} • Пользователь: {alert.user}
                        </span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Исследовать
                          </Button>
                          <Button size="sm" variant="outline">
                            Заблокировать IP
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System */}
          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Server className="w-5 h-5" />
                    Состояние системы
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">CPU использование</span>
                    <span className="text-green-400">45%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Память</span>
                    <span className="text-yellow-400">72%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Дисковое пространство</span>
                    <span className="text-blue-400">39%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Сетевая активность</span>
                    <span className="text-green-400">Нормальная</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Резервное копирование
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Последнее резервное копирование</span>
                    <span className="text-green-400">{systemMetrics.lastBackup}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Статус</span>
                    <Badge variant="default">Успешно</Badge>
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
            </div>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Статистика по отделам</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={departmentStats}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937',
                        border: '1px solid #374151',
                        borderRadius: '6px',
                        color: '#f9fafb'
                      }}
                    />
                    <Bar dataKey="users" fill="#3b82f6" />
                    <Bar dataKey="active" fill="#10b981" />
                    <Bar dataKey="documents" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Настройки системы
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Глобальные настройки портала STUWA
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-white">Безопасность</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Двухфакторная аутентификация</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Принудительная смена пароля</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Автоматический выход</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-white">Система</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Автоматическое резервное копирование</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Мониторинг производительности</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Отчеты по безопасности</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button>Сохранить изменения</Button>
                  <Button variant="outline">Сбросить</Button>
                  <Button variant="destructive">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Перезагрузить систему
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
