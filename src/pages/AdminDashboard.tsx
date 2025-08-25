import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Users, 
  FileText, 
  Settings, 
  Shield, 
  BarChart3, 
  Plus,
  Edit,
  Trash2,
  Search,
  Download,
  Upload,
  Eye,
  Lock,
  Unlock
} from 'lucide-react';
import { Navigation } from '@/components/Navigation';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Editor', status: 'Inactive' },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', role: 'Viewer', status: 'Active' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortColumn) {
      const aValue = a[sortColumn as keyof typeof a];
      const bValue = b[sortColumn as keyof typeof b];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
    }
    return 0;
  });

  const filteredUsers = sortedUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Панель администратора
          </h1>
          <p className="text-gray-600">
            Управление пользователями, настройками и данными
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Пользователи
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Настройки
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Данные
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Управление пользователями
                </CardTitle>
                <CardDescription>
                  Добавление, редактирование и удаление пользователей
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="text"
                      placeholder="Поиск пользователей..."
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                    <Search className="w-5 h-5 text-gray-500" />
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Добавить пользователя
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort('name')}
                        >
                          Имя {sortColumn === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort('email')}
                        >
                          Email {sortColumn === 'email' && (sortOrder === 'asc' ? '▲' : '▼')}
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort('role')}
                        >
                          Роль {sortColumn === 'role' && (sortOrder === 'asc' ? '▲' : '▼')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Статус
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Действия
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <Badge variant={user.status === 'Active' ? 'outline' : 'secondary'}>{user.status}</Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              Просмотреть
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4 mr-2" />
                              Редактировать
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-500">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Удалить
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Настройки системы
                </CardTitle>
                <CardDescription>
                  Конфигурация общих параметров системы
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="siteName">Название сайта</Label>
                  <Input type="text" id="siteName" defaultValue="STUWA Portal" />
                </div>
                <div>
                  <Label htmlFor="defaultRole">Роль пользователя по умолчанию</Label>
                  <Input type="text" id="defaultRole" defaultValue="Viewer" />
                </div>
                <Button>Сохранить настройки</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Tab */}
          <TabsContent value="data" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Управление данными
                </CardTitle>
                <CardDescription>
                  Импорт и экспорт данных системы
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Button>
                    <Download className="w-4 h-4 mr-2" />
                    Экспорт данных
                  </Button>
                  <Button>
                    <Upload className="w-4 h-4 mr-2" />
                    Импорт данных
                  </Button>
                </div>
                <div>
                  <Label htmlFor="dataLog">Журнал данных</Label>
                  <Input type="text" id="dataLog" disabled defaultValue="Данные обновлены 10.06.2024" />
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
