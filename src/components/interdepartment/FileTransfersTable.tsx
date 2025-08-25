
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Download, Eye, Clock, CheckCircle, Send } from 'lucide-react';
import { useInterdepartmentTransfers } from '@/hooks/useInterdepartmentTransfers';

interface FileTransfersTableProps {
  department: string;
}

const DEPARTMENT_LABELS: Record<string, string> = {
  'financial': 'Финансовая дирекция',
  'technical': 'Техническая дирекция',
  'logistics': 'Управление логистики',
  'commercial': 'Коммерческая дирекция',
  'office': 'Офис-менеджер'
};

export const FileTransfersTable: React.FC<FileTransfersTableProps> = ({ department }) => {
  const { transfers, isLoading, updateTransferStatus } = useInterdepartmentTransfers(department);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      sent: { label: 'Отправлено', variant: 'secondary' as const, icon: Send },
      delivered: { label: 'Доставлено', variant: 'default' as const, icon: CheckCircle },
      viewed: { label: 'Просмотрено', variant: 'destructive' as const, icon: Eye },
      processed: { label: 'Обработано', variant: 'default' as const, icon: CheckCircle }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config?.icon || Clock;

    return (
      <Badge variant={config?.variant || 'secondary'} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {config?.label || status}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityColors = {
      urgent: 'bg-red-100 text-red-800',
      high: 'bg-orange-100 text-orange-800', 
      normal: 'bg-blue-100 text-blue-800',
      low: 'bg-gray-100 text-gray-800'
    };

    const priorityLabels = {
      urgent: 'Срочно',
      high: 'Высокий',
      normal: 'Обычный',
      low: 'Низкий'
    };

    return (
      <Badge className={priorityColors[priority as keyof typeof priorityColors] || priorityColors.normal}>
        {priorityLabels[priority as keyof typeof priorityLabels] || priority}
      </Badge>
    );
  };

  const handleDownload = (transfer: any) => {
    const link = window.document.createElement('a');
    link.href = transfer.file_url;
    link.download = transfer.file_name;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);

    // Обновляем статус если файл еще не был просмотрен
    if (transfer.status === 'sent' || transfer.status === 'delivered') {
      updateTransferStatus(transfer.id, 'viewed');
    }
  };

  const handleView = (transfer: any) => {
    window.open(transfer.file_url, '_blank');
    
    // Обновляем статус если файл еще не был просмотрен
    if (transfer.status === 'sent' || transfer.status === 'delivered') {
      updateTransferStatus(transfer.id, 'viewed');
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Передача файлов</h2>
        <div className="text-sm text-gray-500">
          Отдел: {DEPARTMENT_LABELS[department] || department}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Входящие и исходящие передачи</CardTitle>
        </CardHeader>
        <CardContent>
          {transfers.length === 0 ? (
            <div className="text-center py-12">
              <Send className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Нет переданных файлов</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Файл</TableHead>
                  <TableHead>От/К</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Приоритет</TableHead>
                  <TableHead>Дата отправки</TableHead>
                  <TableHead>Размер</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transfers.map((transfer) => (
                  <TableRow key={transfer.id}>
                    <TableCell className="font-medium">
                      <div>
                        <p>{transfer.file_name}</p>
                        {transfer.message && (
                          <p className="text-sm text-muted-foreground mt-1">
                            "{transfer.message}"
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div>От: {DEPARTMENT_LABELS[transfer.sender_department] || transfer.sender_department}</div>
                        <div>К: {DEPARTMENT_LABELS[transfer.receiver_department] || transfer.receiver_department}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(transfer.status)}
                    </TableCell>
                    <TableCell>
                      {getPriorityBadge(transfer.priority)}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(transfer.created_at)}
                    </TableCell>
                    <TableCell className="text-sm">
                      {formatFileSize(transfer.file_size)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleView(transfer)}
                          title="Просмотреть файл"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDownload(transfer)}
                          title="Скачать файл"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
