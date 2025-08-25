import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  FileText, 
  Euro, 
  Target,
  BarChart3,
  PieChart,
  Activity,
  Building2,
  Truck,
  Wrench,
  DollarSign,
  Calendar,
  Globe,
  Award,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

const ExecutiveDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for executive KPIs
  const executiveKPIs = {
    totalRevenue: '€2.4M',
    revenueGrowth: '+15.3%',
    totalProjects: 89,
    projectsGrowth: '+8.2%',
    totalClients: 156,
    clientsGrowth: '+12.1%',
    teamSize: 150,
    teamGrowth: '+5.8%'
  };

  const departmentPerformance = [
    { name: 'Техническая дирекция', revenue: 850000, projects: 32, efficiency: 94 },
    { name: 'Управление логистики', revenue: 720000, projects: 28, efficiency: 89 },
    { name: 'Коммерческая дирекция', revenue: 830000, projects: 29, efficiency: 92 }
  ];

  const monthlyRevenue = [
    { month: 'Янв', revenue: 180000, projects: 7 },
    { month: 'Фев', revenue: 195000, projects: 8 },
    { month: 'Мар', revenue: 210000, projects: 9 },
    { month: 'Апр', revenue: 198000, projects: 8 },
    { month: 'Май', revenue: 225000, projects: 10 },
    { month: 'Июн', revenue: 240000, projects: 12 }
  ];

  const clientDistribution = [
    { name: 'Автомобильная', value: 35, color: '#0088FE' },
    { name: 'Машиностроение', value: 28, color: '#00C49F' },
    { name: 'Логистика', value: 22, color: '#FFBB28' },
    { name: 'Прочие', value: 15, color: '#FF8042' }
  ];

  const topProjects = [
    {
      id: 1,
      name: 'BMW Production Line Optimization',
      client: 'BMW Group',
      status: 'В процессе',
      value: '€450,000',
      completion: 78,
      priority: 'high'
    },
    {
      id: 2,
      name: 'Volkswagen Logistics Integration',
      client: 'Volkswagen AG',
      status: 'Планирование',
      value: '€320,000',
      completion: 25,
      priority: 'medium'
    },
    {
      id: 3,
      name: 'Mercedes Supply Chain Audit',
      client: 'Mercedes-Benz',
      status: 'Завершен',
      value: '€180,000',
      completion: 100,
      priority: 'low'
    }
  ];

  const riskIndicators = [
    { type: 'Проектные риски', level: 'medium', count: 3, trend: 'stable' },
    { type: 'Финансовые риски', level: 'low', count: 1, trend: 'decreasing' },
    { type: 'Операционные риски', level: 'medium', count: 2, trend: 'increasing' },
    { type: 'Соответствие нормам', level: 'low', count: 0, trend: 'stable' }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'В процессе': { variant: 'default' as const, color: 'blue' },
      'Планирование': { variant: 'secondary' as const, color: 'yellow' },
      'Завершен': { variant: 'default' as const, color: 'green' },
      'Отложен': { variant: 'destructive' as const, color: 'red' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || { variant: 'outline' as const, color: 'gray' };
    return <Badge variant={config.variant}>{status}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { variant: 'destructive' as const, label: 'Высокий' },
      medium: { variant: 'secondary' as const, label: 'Средний' },
      low: { variant: 'outline' as const, label: 'Низкий' }
    };
    
    const config = priorityConfig[priority as keyof typeof priorityConfig] || { variant: 'outline' as const, label: priority };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
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
            Исполнительная панель управления
          </h1>
          <p className="text-gray-600">
            Высокоуровневые KPI и стратегические показатели портала STUWA
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Обзор
            </TabsTrigger>
            <TabsTrigger value="departments" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Департаменты
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Проекты
            </TabsTrigger>
            <TabsTrigger value="risks" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Риски
            </TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Общий доход</p>
                      <p className="text-2xl font-bold">{executiveKPIs.totalRevenue}</p>
                      <p className="text-sm text-green-600 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {executiveKPIs.revenueGrowth}
                      </p>
                    </div>
                    <Euro className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Активные проекты</p>
                      <p className="text-2xl font-bold">{executiveKPIs.totalProjects}</p>
                      <p className="text-sm text-green-600 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {executiveKPIs.projectsGrowth}
                      </p>
                    </div>
                    <Target className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Клиенты</p>
                      <p className="text-2xl font-bold">{executiveKPIs.totalClients}</p>
                      <p className="text-sm text-green-600 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {executiveKPIs.clientsGrowth}
                      </p>
                    </div>
                    <Users className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Команда</p>
                      <p className="text-2xl font-bold">{executiveKPIs.teamSize}</p>
                      <p className="text-sm text-green-600 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {executiveKPIs.teamGrowth}
                      </p>
                    </div>
                    <Building2 className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Динамика доходов</CardTitle>
                  <CardDescription>Месячная динамика доходов и проектов</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value, name) => [
                        name === 'revenue' ? `€${(value as number).toLocaleString()}` : value,
                        name === 'revenue' ? 'Доходы' : 'Проекты'
                      ]} />
                      <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="projects" stroke="#82ca9d" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Распределение клиентов</CardTitle>
                  <CardDescription>По отраслям промышленности</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={clientDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {clientDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Departments */}
          <TabsContent value="departments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Производительность департаментов
                </CardTitle>
                <CardDescription>
                  Сравнительный анализ эффективности подразделений
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {departmentPerformance.map((dept, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">{dept.name}</h3>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Эффективность</p>
                            <p className="font-bold text-green-600">{dept.efficiency}%</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-3">
                          <Euro className="w-8 h-8 text-green-500" />
                          <div>
                            <p className="text-sm text-gray-600">Доходы</p>
                            <p className="font-bold">€{(dept.revenue / 1000).toFixed(0)}K</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Target className="w-8 h-8 text-blue-500" />
                          <div>
                            <p className="text-sm text-gray-600">Проекты</p>
                            <p className="font-bold">{dept.projects}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Activity className="w-8 h-8 text-purple-500" />
                          <div>
                            <p className="text-sm text-gray-600">Средний проект</p>
                            <p className="font-bold">€{Math.round(dept.revenue / dept.projects / 1000)}K</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${dept.efficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects */}
          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Ключевые проекты
                </CardTitle>
                <CardDescription>
                  Статус важнейших проектов компании
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProjects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{project.name}</h3>
                          <p className="text-sm text-gray-600">{project.client}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(project.status)}
                          {getPriorityBadge(project.priority)}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Стоимость</p>
                          <p className="font-bold text-green-600">{project.value}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Выполнение</p>
                          <p className="font-bold">{project.completion}%</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            Подробности
                          </Button>
                        </div>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${project.completion}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Risks */}
          <TabsContent value="risks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Индикаторы рисков
                </CardTitle>
                <CardDescription>
                  Мониторинг бизнес-рисков и соответствия нормам
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {riskIndicators.map((risk, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getRiskIcon(risk.level)}
                          <div>
                            <h3 className="font-semibold">{risk.type}</h3>
                            <p className="text-sm text-gray-600">
                              {risk.count} активных индикаторов
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={risk.level === 'high' ? 'destructive' : risk.level === 'medium' ? 'secondary' : 'outline'}>
                            {risk.level === 'high' ? 'Высокий' : risk.level === 'medium' ? 'Средний' : 'Низкий'}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">
                            {risk.trend === 'increasing' ? '↗ Растет' : risk.trend === 'decreasing' ? '↘ Снижается' : '→ Стабильно'}
                          </p>
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

export default ExecutiveDashboard;
