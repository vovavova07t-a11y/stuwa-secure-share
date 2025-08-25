
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface NotificationCenterProps {
  department: string;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ department }) => {
  // Моковые данные для демонстрации
  const notifications = [
    {
      id: '1',
      title: 'Новый документ от Финансового отдела',
      message: 'Получен отчет "Финансовые результаты Q4 2024"',
      type: 'info',
      status: 'unread',
      timestamp: '2024-01-15 14:30',
      fromDepartment: 'Финансовый отдел'
    },
    {
      id: '2',
      title: 'Срочный запрос от Коммерческого отдела',
      message: 'Требуется подтверждение договора поставки',
      type: 'urgent',
      status: 'unread',
      timestamp: '2024-01-15 13:45',
      fromDepartment: 'Коммерческий отдел'
    },
    {
      id: '3',
      title: 'Документ обработан',
      message: 'Техническая документация успешно получена',
      type: 'success',
      status: 'read',
      timestamp: '2024-01-15 12:15',
      fromDepartment: 'Технический отдел'
    },
    {
      id: '4',
      title: 'Напоминание',
      message: 'Истекает срок рассмотрения заявки на закупку',
      type: 'warning',
      status: 'unread',
      timestamp: '2024-01-15 11:00',
      fromDepartment: 'Логистический отдел'
    },
    {
      id: '5',
      title: 'Системное уведомление',
      message: 'Запланированное обслуживание системы 16 января',
      type: 'info',
      status: 'read',
      timestamp: '2024-01-15 09:30',
      fromDepartment: 'Системный администратор'
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <Clock className="w-4 h-4 text-orange-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Bell className="w-4 h-4 text-blue-500" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      urgent: { label: 'Срочно', className: 'bg-red-100 text-red-800' },
      warning: { label: 'Внимание', className: 'bg-orange-100 text-orange-800' },
      success: { label: 'Успешно', className: 'bg-green-100 text-green-800' },
      info: { label: 'Информация', className: 'bg-blue-100 text-blue-800' }
    };

    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.info;
    
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">Центр уведомлений</h2>
          {unreadCount > 0 && (
            <Badge className="bg-red-500 text-white">
              {unreadCount} непрочитанных
            </Badge>
          )}
        </div>
        <Button variant="outline">
          Отметить все как прочитанные
        </Button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card 
            key={notification.id}
            className={`transition-all duration-200 hover:shadow-md ${
              notification.status === 'unread' ? 'border-l-4 border-l-primary bg-primary/5' : ''
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1">
                    <CardTitle className="text-base font-semibold mb-1">
                      {notification.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {notification.message}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getTypeBadge(notification.type)}
                  {notification.status === 'unread' && (
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>От: {notification.fromDepartment}</span>
                <span>{notification.timestamp}</span>
              </div>
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline">
                  Просмотреть
                </Button>
                {notification.status === 'unread' && (
                  <Button size="sm" variant="ghost">
                    Отметить как прочитанное
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {notifications.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Bell className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Нет уведомлений</h3>
            <p className="text-muted-foreground">
              Все уведомления появятся здесь
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
