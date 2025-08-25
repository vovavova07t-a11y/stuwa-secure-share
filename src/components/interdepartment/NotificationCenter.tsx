
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, CheckCircle, Clock, AlertCircle, FileText, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface NotificationCenterProps {
  department: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  notification_type: string;
  priority: string;
  is_read: boolean;
  created_at: string;
  sender_id?: string;
  document_id?: string;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ department }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadNotifications = async () => {
    try {
      setLoading(true);
      console.log(`🔔 Загрузка уведомлений для отдела: ${department}`);

      // Загружаем уведомления из базы данных
      const { data, error } = await supabase
        .from('interdepartment_notifications' as any)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Ошибка загрузки уведомлений:', error);
        throw error;
      }

      console.log(`📬 Загружено ${data?.length || 0} уведомлений`);
      setNotifications(data || []);
    } catch (error) {
      console.error('Ошибка при загрузке уведомлений:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить уведомления',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('interdepartment_notifications' as any)
        .update({ is_read: true, read_at: new Date().toISOString() })
        .eq('id', notificationId);

      if (error) throw error;

      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
      );
    } catch (error) {
      console.error('Ошибка при отметке уведомления:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadIds = notifications.filter(n => !n.is_read).map(n => n.id);
      
      if (unreadIds.length === 0) return;

      const { error } = await supabase
        .from('interdepartment_notifications' as any)
        .update({ is_read: true, read_at: new Date().toISOString() })
        .in('id', unreadIds);

      if (error) throw error;

      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      
      toast({
        title: 'Готово',
        description: 'Все уведомления отмечены как прочитанные'
      });
    } catch (error) {
      console.error('Ошибка при отметке всех уведомлений:', error);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, [department]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'urgent':
      case 'deadline':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'reminder':
        return <Clock className="w-4 h-4 text-orange-500" />;
      case 'success':
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'document':
        return <FileText className="w-4 h-4 text-blue-500" />;
      case 'transfer':
        return <Users className="w-4 h-4 text-purple-500" />;
      default:
        return <Bell className="w-4 h-4 text-blue-500" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      urgent: { label: 'Срочно', className: 'bg-red-100 text-red-800' },
      deadline: { label: 'Дедлайн', className: 'bg-red-100 text-red-800' },
      reminder: { label: 'Напоминание', className: 'bg-orange-100 text-orange-800' },
      success: { label: 'Успешно', className: 'bg-green-100 text-green-800' },
      completed: { label: 'Завершено', className: 'bg-green-100 text-green-800' },
      document: { label: 'Документ', className: 'bg-blue-100 text-blue-800' },
      transfer: { label: 'Передача', className: 'bg-purple-100 text-purple-800' },
      info: { label: 'Информация', className: 'bg-blue-100 text-blue-800' }
    };

    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.info;
    
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  if (loading) {
    return (
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

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
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            Отметить все как прочитанные
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card 
            key={notification.id}
            className={`transition-all duration-200 hover:shadow-md ${
              !notification.is_read ? 'border-l-4 border-l-primary bg-primary/5' : ''
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {getNotificationIcon(notification.notification_type)}
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
                  {getTypeBadge(notification.notification_type)}
                  {!notification.is_read && (
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{formatDate(notification.created_at)}</span>
              </div>
              <div className="flex gap-2 mt-3">
                {notification.document_id && (
                  <Button size="sm" variant="outline">
                    Просмотреть документ
                  </Button>
                )}
                {!notification.is_read && (
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => markAsRead(notification.id)}
                  >
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
