
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, Eye, Trash2, Clock, CheckCircle } from 'lucide-react';
import { InterdepartmentTransfer } from '@/hooks/useInterdepartmentTransfers';

interface FileTransfersTableProps {
  transfers: InterdepartmentTransfer[];
  type: 'incoming' | 'outgoing';
  onDelete: (id: string) => void;
  onStatusUpdate: (id: string, status: string) => void;
  onView: (transfer: InterdepartmentTransfer) => void;
}

export const FileTransfersTable: React.FC<FileTransfersTableProps> = ({
  transfers,
  type,
  onDelete,
  onStatusUpdate,
  onView
}) => {
  const getPriorityBadge = (priority: string) => {
    const colors = {
      urgent: 'bg-red-500 text-white',
      high: 'bg-orange-500 text-white',
      normal: 'bg-blue-500 text-white',
      low: 'bg-gray-500 text-white'
    };
    return colors[priority as keyof typeof colors] || colors.normal;
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      sent: 'bg-blue-500 text-white',
      delivered: 'bg-green-500 text-white',
      viewed: 'bg-purple-500 text-white',
      processed: 'bg-emerald-500 text-white',
      recalled: 'bg-gray-500 text-white'
    };
    return colors[status as keyof typeof colors] || colors.sent;
  };

  const handleViewedChange = (transferId: string, checked: boolean) => {
    console.log('📋 Изменение статуса просмотра:', { transferId, checked });
    if (checked) {
      onStatusUpdate(transferId, 'viewed');
    } else {
      onStatusUpdate(transferId, 'delivered');
    }
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

  const formatFileSize = (bytes: number) => {
    const sizes = ['Б', 'КБ', 'МБ', 'ГБ'];
    if (bytes === 0) return '0 Б';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (transfers.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <div className="mb-4">
          {type === 'incoming' ? '📥' : '📤'}
        </div>
        <p>
          {type === 'incoming' 
            ? 'Входящие документы отсутствуют' 
            : 'Отправленные документы отсутствуют'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="text-left p-3 font-medium text-gray-700">Файл</th>
            <th className="text-left p-3 font-medium text-gray-700">
              {type === 'incoming' ? 'От отдела' : 'В отдел'}
            </th>
            <th className="text-left p-3 font-medium text-gray-700">Приоритет</th>
            <th className="text-left p-3 font-medium text-gray-700">Статус</th>
            <th className="text-left p-3 font-medium text-gray-700">Дата</th>
            {type === 'incoming' && (
              <th className="text-left p-3 font-medium text-gray-700">Просмотрено</th>
            )}
            <th className="text-left p-3 font-medium text-gray-700">Действия</th>
          </tr>
        </thead>
        <tbody>
          {transfers.map((transfer) => (
            <tr key={transfer.id} className="border-b hover:bg-gray-50">
              <td className="p-3">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900 truncate max-w-[200px]">
                    {transfer.file_name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatFileSize(transfer.file_size)} • {transfer.file_type.toUpperCase()}
                  </span>
                </div>
              </td>
              <td className="p-3">
                <span className="text-sm text-gray-700">
                  {type === 'incoming' ? transfer.sender_department : transfer.receiver_department}
                </span>
              </td>
              <td className="p-3">
                <Badge className={`text-xs ${getPriorityBadge(transfer.priority)}`}>
                  {transfer.priority === 'urgent' ? 'Срочно' :
                   transfer.priority === 'high' ? 'Высокий' :
                   transfer.priority === 'normal' ? 'Обычный' : 'Низкий'}
                </Badge>
              </td>
              <td className="p-3">
                <Badge className={`text-xs ${getStatusBadge(transfer.status)}`}>
                  {transfer.status === 'sent' ? 'Отправлено' :
                   transfer.status === 'delivered' ? 'Доставлено' :
                   transfer.status === 'viewed' ? 'Просмотрено' :
                   transfer.status === 'processed' ? 'Обработано' : 'Отозвано'}
                </Badge>
              </td>
              <td className="p-3">
                <span className="text-sm text-gray-600">
                  {formatDate(transfer.created_at)}
                </span>
              </td>
              {type === 'incoming' && (
                <td className="p-3">
                  <Checkbox
                    checked={transfer.status === 'viewed' || transfer.status === 'processed'}
                    onCheckedChange={(checked) => 
                      handleViewedChange(transfer.id, checked as boolean)
                    }
                    className="w-5 h-5"
                  />
                </td>
              )}
              <td className="p-3">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onView(transfer)}
                    className="h-8 w-8 p-0"
                    title="Просмотр"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => window.open(transfer.file_url, '_blank')}
                    className="h-8 w-8 p-0"
                    title="Скачать"
                  >
                    <Download className="h-4 w-4" />
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      if (window.confirm('Вы уверены, что хотите удалить этот документ?')) {
                        onDelete(transfer.id);
                      }
                    }}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                    title="Удалить"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
