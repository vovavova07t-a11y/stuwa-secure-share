
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useInterdepartmentTransfers } from '@/hooks/useInterdepartmentTransfers';
import { 
  Download, 
  Eye, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Send,
  Inbox,
  FileText,
  Calendar,
  User,
  Building2,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { formatFileSize } from '@/utils/fileUtils';

interface FileTransfersTableProps {
  department: string;
}

export const FileTransfersTable: React.FC<FileTransfersTableProps> = ({ department }) => {
  const { transfers, isLoading, getIncomingTransfers, getOutgoingTransfers, updateTransferStatus } = useInterdepartmentTransfers(department);
  
  // ИСПРАВЛЕННАЯ ЛОГИКА - ИЗОЛИРОВАННЫЕ ФАЙЛЫ ПО ОТДЕЛАМ
  const incomingFiles = getIncomingTransfers(); // Только файлы присланные В данный отдел
  const outgoingFiles = getOutgoingTransfers(); // Только файлы отправленные ИЗ данного отдела

  console.log(`📋 Отдел ${department}:`, {
    входящие: incomingFiles.length,
    отправленные: outgoingFiles.length,
    всего_в_системе: transfers.length
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Clock className="w-4 h-4 text-orange-500" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'viewed':
        return <Eye className="w-4 h-4 text-purple-500" />;
      case 'processed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      sent: { variant: 'secondary', label: 'Отправлено' },
      delivered: { variant: 'default', label: 'Доставлено' },
      viewed: { variant: 'outline', label: 'Просмотрено' },
      processed: { variant: 'default', label: 'Обработано' }
    };
    
    const config = variants[status] || { variant: 'secondary', label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getDepartmentIcon = (dept: string) => {
    const icons: Record<string, string> = {
      financial: '💰',
      technical: '⚙️', 
      logistics: '🚚',
      commercial: '📈',
      office: '🏢'
    };
    return icons[dept] || '📁';
  };

  const getDepartmentName = (dept: string) => {
    const names: Record<string, string> = {
      financial: 'Финансовая дирекция',
      technical: 'Техническая дирекция',
      logistics: 'Управление логистики', 
      commercial: 'Коммерческая дирекция',
      office: 'Офис-менеджер'
    };
    return names[dept] || dept;
  };

  // ИСПРАВЛЕННАЯ ФУНКЦИЯ БЫСТРОГО ПРОСМОТРА
  const handleQuickView = (transfer: any) => {
    console.log('🚀 Быстрое открытие файла:', transfer.file_name);
    
    // Мгновенное открытие файла в новой вкладке
    window.open(transfer.file_url, '_blank', 'noopener,noreferrer');
    
    // Обновляем статус если файл не был просмотрен
    if (transfer.status === 'sent' || transfer.status === 'delivered') {
      updateTransferStatus(transfer.id, 'viewed');
    }
  };

  const handleDownload = async (transfer: any) => {
    try {
      console.log('⬇️ Скачивание файла:', transfer.file_name);
      
      const response = await fetch(transfer.file_url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      });
      
      if (!response.ok) {
        throw new Error('Ошибка загрузки файла');
      }
      
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = transfer.file_name;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(blobUrl);
      
      console.log('✅ Файл успешно скачан');
    } catch (error) {
      console.error('❌ Ошибка при скачивании:', error);
      window.open(transfer.file_url, '_blank', 'noopener,noreferrer');
    }
  };

  const renderTransferRow = (transfer: any, isIncoming: boolean) => (
    <div key={transfer.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <FileText className="w-8 h-8 text-blue-500 flex-shrink-0" />
          
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm truncate">{transfer.file_name}</h4>
            <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(transfer.created_at).toLocaleDateString('ru-RU')}
              </span>
              <span>{formatFileSize(transfer.file_size)}</span>
              {isIncoming ? (
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  От: {getDepartmentIcon(transfer.sender_department)} {getDepartmentName(transfer.sender_department)}
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <ArrowRight className="w-3 h-3" />
                  В: {getDepartmentIcon(transfer.receiver_department)} {getDepartmentName(transfer.receiver_department)}
                </span>
              )}
            </div>
            {transfer.message && (
              <p className="text-xs text-gray-600 mt-1 truncate">"{transfer.message}"</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4">
          {getStatusIcon(transfer.status)}
          {getStatusBadge(transfer.status)}
          
          <div className="flex gap-1 ml-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleQuickView(transfer)}
              className="flex items-center gap-1"
            >
              <Eye className="w-3 h-3" />
              Открыть
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleDownload(transfer)}
            >
              <Download className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-gray-600">Загружаем файлы отдела...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="w-5 h-5" />
          Межотдельский обмен - {getDepartmentName(department)}
        </CardTitle>
        <p className="text-sm text-gray-600">
          Файлы отправленные и полученные данным отделом
        </p>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="incoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="incoming" className="flex items-center gap-2">
              <Inbox className="w-4 h-4" />
              Входящие ({incomingFiles.length})
            </TabsTrigger>
            <TabsTrigger value="outgoing" className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Отправленные ({outgoingFiles.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="incoming" className="mt-4">
            {incomingFiles.length > 0 ? (
              <div className="space-y-3">
                <div className="text-sm text-gray-600 mb-3">
                  📥 Файлы, полученные отделом "{getDepartmentName(department)}" от других отделов:
                </div>
                {incomingFiles.map(transfer => renderTransferRow(transfer, true))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Inbox className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Нет входящих файлов</h3>
                <p className="text-gray-600">
                  Отдел "{getDepartmentName(department)}" пока не получил файлов от других отделов
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="outgoing" className="mt-4">
            {outgoingFiles.length > 0 ? (
              <div className="space-y-3">
                <div className="text-sm text-gray-600 mb-3">
                  📤 Файлы, отправленные отделом "{getDepartmentName(department)}" в другие отделы:
                </div>
                {outgoingFiles.map(transfer => renderTransferRow(transfer, false))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Send className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Нет отправленных файлов</h3>
                <p className="text-gray-600">
                  Отдел "{getDepartmentName(department)}" пока не отправил файлов в другие отделы
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
