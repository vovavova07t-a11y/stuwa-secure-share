
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
import { FileTransferButton } from './FileTransferButton';
import { Download, Eye, Clock, CheckCircle } from 'lucide-react';

interface FileTransfersTableProps {
  department: string;
}

export const FileTransfersTable: React.FC<FileTransfersTableProps> = ({ department }) => {
  // Моковые данные для демонстрации
  const transfers = [
    {
      id: '1',
      fileName: 'Отчет_Q4_2024.pdf',
      fromDepartment: 'Финансовый отдел',
      toDepartment: 'Коммерческий отдел',
      status: 'delivered',
      priority: 'high',
      sentAt: '2024-01-15 14:30',
      size: '2.5 MB'
    },
    {
      id: '2', 
      fileName: 'Техническая_документация.docx',
      fromDepartment: 'Технический отдел',
      toDepartment: 'Логистический отдел',
      status: 'pending',
      priority: 'normal',
      sentAt: '2024-01-15 13:45',
      size: '1.8 MB'
    },
    {
      id: '3',
      fileName: 'Договор_поставки.pdf',
      fromDepartment: 'Логистический отдел', 
      toDepartment: 'Финансовый отдел',
      status: 'viewed',
      priority: 'urgent',
      sentAt: '2024-01-15 12:15',
      size: '890 KB'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Ожидает', variant: 'secondary' as const, icon: Clock },
      delivered: { label: 'Доставлено', variant: 'default' as const, icon: CheckCircle },
      viewed: { label: 'Просмотрено', variant: 'destructive' as const, icon: Eye }
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
      normal: 'bg-blue-100 text-blue-800'
    };

    return (
      <Badge className={priorityColors[priority as keyof typeof priorityColors] || priorityColors.normal}>
        {priority === 'urgent' ? 'Срочно' : priority === 'high' ? 'Высокий' : 'Обычный'}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Передача файлов</h2>
        <FileTransferButton />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Входящие и исходящие передачи</CardTitle>
        </CardHeader>
        <CardContent>
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
                    {transfer.fileName}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <div>От: {transfer.fromDepartment}</div>
                      <div>К: {transfer.toDepartment}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(transfer.status)}
                  </TableCell>
                  <TableCell>
                    {getPriorityBadge(transfer.priority)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {transfer.sentAt}
                  </TableCell>
                  <TableCell className="text-sm">
                    {transfer.size}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
