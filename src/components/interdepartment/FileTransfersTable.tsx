import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Eye, Clock, Send, MessageSquare } from 'lucide-react';

export interface FileTransfersTableProps {
  department: string;
}

export const FileTransfersTable: React.FC<FileTransfersTableProps> = ({ department }) => {
  const mockTransfers = [
    {
      id: '1',
      fileName: 'Отчет_по_продажам.pdf',
      senderDepartment: 'financial',
      receiverDepartment: department,
      status: 'delivered',
      priority: 'high',
      createdAt: new Date('2024-01-15'),
      fileSize: 2048576
    },
    {
      id: '2', 
      fileName: 'Техническая_документация.docx',
      senderDepartment: 'technical',
      receiverDepartment: department,
      status: 'viewed',
      priority: 'normal',
      createdAt: new Date('2024-01-14'),
      fileSize: 1024000
    }
  ];

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      sent: { label: 'Отправлено', variant: 'secondary' as const },
      delivered: { label: 'Доставлено', variant: 'default' as const },
      viewed: { label: 'Просмотрено', variant: 'outline' as const },
      processed: { label: 'Обработано', variant: 'default' as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.sent;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="w-5 h-5" />
          Переданные файлы - {department}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Файл</TableHead>
              <TableHead>Отправитель</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Размер</TableHead>
              <TableHead>Дата</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTransfers.map((transfer) => (
              <TableRow key={transfer.id}>
                <TableCell className="font-medium">{transfer.fileName}</TableCell>
                <TableCell>{transfer.senderDepartment}</TableCell>
                <TableCell>{getStatusBadge(transfer.status)}</TableCell>
                <TableCell>{formatFileSize(transfer.fileSize)}</TableCell>
                <TableCell>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    {transfer.createdAt.toLocaleDateString('ru-RU')}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
