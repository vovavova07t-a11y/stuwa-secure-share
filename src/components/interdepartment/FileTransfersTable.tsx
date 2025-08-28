import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, Eye, Trash2 } from 'lucide-react';
import { FileTransfer } from '@/hooks/useFileTransfers';
import { UniversalFileViewer } from '../UniversalFileViewer';
import { downloadFile, canPreview } from '@/utils/fileDownload';

interface FileTransfersTableProps {
  transfers: FileTransfer[];
  type: 'incoming' | 'outgoing';
  onDelete: (id: string) => void;
  onReadStatusChange: (id: string, isRead: boolean) => void;
  onView: (transfer: FileTransfer) => void;
}

export const FileTransfersTable: React.FC<FileTransfersTableProps> = ({
  transfers,
  type,
  onDelete,
  onReadStatusChange,
  onView
}) => {
  const [viewerTransfer, setViewerTransfer] = useState<FileTransfer | null>(null);

  const handlePreview = (transfer: FileTransfer) => {
    console.log('🔍 Предпросмотр файла передачи:', transfer.file_name);
    
    if (canPreview(transfer.file_name)) {
      setViewerTransfer(transfer);
      onView(transfer);
    } else {
      handleDownload(transfer);
    }
  };

  const handleDownload = async (transfer: FileTransfer) => {
    console.log('⬇️ Скачивание файла передачи:', transfer.file_name);
    
    try {
      await downloadFile(transfer.file_url, transfer.file_name);
    } catch (error) {
      console.error('❌ Ошибка при скачивании файла передачи:', error);
    }
  };

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
      received: 'bg-green-500 text-white',
      deleted: 'bg-gray-500 text-white'
    };
    return colors[status as keyof typeof colors] || colors.sent;
  };

  const handleReadStatusChange = (transferId: string, checked: boolean) => {
    console.log('📋 Изменение статуса прочтения:', { transferId, checked });
    onReadStatusChange(transferId, checked);
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

  const getDepartmentName = (department: string) => {
    const departments = {
      financial: 'Финансовая дирекция',
      technical: 'Техническая дирекция',
      logistics: 'Управление логистики', 
      commercial: 'Коммерческая дирекция',
      office: 'Офис-менеджер'
    };
    return departments[department as keyof typeof departments] || department;
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
    <>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left p-3 font-medium text-gray-700">Файл</th>
              <th className="text-left p-3 font-medium text-gray-700">
                {type === 'incoming' ? 'От отдела' : 'В отдел'}
              </th>
              <th className="text-left p-3 font-medium text-gray-700">Статус</th>
              <th className="text-left p-3 font-medium text-gray-700">Дата</th>
              {type === 'incoming' && (
                <th className="text-left p-3 font-medium text-gray-700">Прочитано</th>
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
                      {formatFileSize(transfer.file_size)}
                    </span>
                    {transfer.comment && (
                      <span className="text-xs text-gray-400 mt-1">
                        {transfer.comment}
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-3">
                  <span className="text-sm text-gray-700">
                    {type === 'incoming' 
                      ? getDepartmentName(transfer.sender_department)
                      : getDepartmentName(transfer.recipient_department)
                    }
                  </span>
                </td>
                <td className="p-3">
                  <Badge className={`text-xs ${getStatusBadge(transfer.status)}`}>
                    {transfer.status === 'sent' ? 'Отправлено' :
                     transfer.status === 'received' ? 'Получено' : 'Удалено'}
                  </Badge>
                  {transfer.is_read && type === 'incoming' && (
                    <div className="mt-1">
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                        Прочитано
                      </Badge>
                    </div>
                  )}
                </td>
                <td className="p-3">
                  <span className="text-sm text-gray-600">
                    {formatDate(transfer.sent_date)}
                  </span>
                </td>
                {type === 'incoming' && (
                  <td className="p-3">
                    <Checkbox
                      checked={transfer.is_read}
                      onCheckedChange={(checked) => 
                        handleReadStatusChange(transfer.id, checked as boolean)
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
                      onClick={() => handlePreview(transfer)}
                      className="h-8 w-8 p-0"
                      title={canPreview(transfer.file_name) ? "Предпросмотр" : "Скачать"}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDownload(transfer)}
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

      {viewerTransfer && (
        <UniversalFileViewer
          isOpen={!!viewerTransfer}
          onClose={() => setViewerTransfer(null)}
          fileUrl={viewerTransfer.file_url}
          fileName={viewerTransfer.file_name}
          fileSize={viewerTransfer.file_size}
        />
      )}
    </>
  );
};
