
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Download, Trash2, Send, Clock, CheckCircle, XCircle } from 'lucide-react';

interface FileTransfer {
  id: string;
  fileName: string;
  fileSize: number;
  fromDepartment: string;
  toDepartment: string;
  status: 'pending' | 'delivered' | 'rejected';
  sentAt: string;
  comment?: string;
}

interface FileTransfersTableProps {
  department: string;
}

export const FileTransfersTable: React.FC<FileTransfersTableProps> = ({ department }) => {
  const [transfers] = useState<FileTransfer[]>([
    {
      id: '1',
      fileName: 'Финансовый отчет Q4.pdf',
      fileSize: 2048576,
      fromDepartment: 'financial',
      toDepartment: 'technical',
      status: 'delivered',
      sentAt: '2024-01-15T10:30:00Z',
      comment: 'Срочный документ для согласования'
    },
    {
      id: '2',
      fileName: 'Техническая спецификация v2.docx',
      fileSize: 1536000,
      fromDepartment: 'technical',
      toDepartment: 'financial',
      status: 'pending',
      sentAt: '2024-01-15T14:20:00Z'
    },
    {
      id: '3',
      fileName: 'Договор поставки.pdf',
      fileSize: 3072000,
      fromDepartment: 'logistics',
      toDepartment: 'financial',
      status: 'rejected',
      sentAt: '2024-01-14T16:45:00Z',
      comment: 'Требуется корректировка условий'
    }
  ]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getDepartmentName = (dept: string): string => {
    const names: Record<string, string> = {
      'financial': 'Финансовая дирекция',
      'technical': 'Техническая дирекция',
      'logistics': 'Управление логистики',
      'commercial': 'Коммерческая дирекция',
      'organizer': 'Офис-менеджер'
    };
    return names[dept] || dept;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Ожидает';
      case 'delivered':
        return 'Доставлено';
      case 'rejected':
        return 'Отклонено';
      default:
        return status;
    }
  };

  const relevantTransfers = transfers.filter(
    transfer => transfer.fromDepartment === department || transfer.toDepartment === department
  );

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            Переданные файлы
            <Badge variant="secondary">{relevantTransfers.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {relevantTransfers.length === 0 ? (
            <div className="text-center py-8">
              <Send className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">Нет переданных файлов</p>
            </div>
          ) : (
            <div className="space-y-4">
              {relevantTransfers.map((transfer) => (
                <Card key={transfer.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">📎</div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{transfer.fileName}</h4>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(transfer.fileSize)} • 
                            {transfer.fromDepartment === department ? 
                              ` → ${getDepartmentName(transfer.toDepartment)}` : 
                              ` ← ${getDepartmentName(transfer.fromDepartment)}`
                            } • 
                            {new Date(transfer.sentAt).toLocaleDateString('ru-RU')}
                          </p>
                          {transfer.comment && (
                            <p className="text-xs text-blue-600 mt-1">💬 {transfer.comment}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          {getStatusIcon(transfer.status)}
                          <span className="text-sm">{getStatusText(transfer.status)}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-primary/10"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-primary/10"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
