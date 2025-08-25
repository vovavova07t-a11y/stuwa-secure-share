
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye, Calendar, Truck } from 'lucide-react';
import type { LogisticsDocument } from '@/types/logistics';
import { UniversalDocumentViewer } from '../UniversalDocumentViewer';

interface LogisticsDocumentTableProps {
  documents: LogisticsDocument[];
  isLoading: boolean;
  onView: (document: LogisticsDocument) => void;
  onDownload: (document: LogisticsDocument) => void;
}

export const LogisticsDocumentTable: React.FC<LogisticsDocumentTableProps> = ({
  documents,
  isLoading,
  onView,
  onDownload
}) => {
  const [viewingDocument, setViewingDocument] = useState<LogisticsDocument | null>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { label: 'Низкий', variant: 'outline' as const },
      medium: { label: 'Средний', variant: 'secondary' as const },
      high: { label: 'Высокий', variant: 'destructive' as const },
      critical: { label: 'Критический', variant: 'destructive' as const }
    };
    
    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const handleViewDocument = (document: LogisticsDocument) => {
    setViewingDocument(document);
    onView(document);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!documents.length) {
    return (
      <div className="text-center py-12">
        <Truck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">Документы не найдены</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8"></TableHead>
              <TableHead>Название</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead>Приоритет</TableHead>
              <TableHead>Размер</TableHead>
              <TableHead>Скачиваний</TableHead>
              <TableHead>Дата создания</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((document) => (
              <TableRow key={document.id} className="hover:bg-muted/50">
                <TableCell>
                  <FileText className="w-4 h-4 text-primary" />
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{document.title}</p>
                    {document.description && (
                      <p className="text-sm text-muted-foreground">{document.description}</p>
                    )}
                    <p className="text-xs text-muted-foreground">{document.file_name}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{document.category}</Badge>
                </TableCell>
                <TableCell>
                  {document.priority && getPriorityBadge(document.priority)}
                </TableCell>
                <TableCell>{formatFileSize(document.file_size)}</TableCell>
                <TableCell>{document.download_count}</TableCell>
                <TableCell>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(document.created_at)}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDocument(document)}
                      className="hover:bg-primary/10"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDownload(document)}
                      className="hover:bg-primary/10"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {viewingDocument && (
        <UniversalDocumentViewer
          document={viewingDocument}
          onClose={() => setViewingDocument(null)}
        />
      )}
    </>
  );
};
