
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye, Calendar, Heart, Star, Printer, Clock } from 'lucide-react';
import type { TechnicalDocument } from '@/types/technical';

interface TechnicalDocumentTableProps {
  documents: TechnicalDocument[];
  isLoading: boolean;
  onView: (document: TechnicalDocument) => void;
  onDownload: (document: TechnicalDocument) => void;
  favorites: Set<string>;
  onToggleFavorite: (documentId: string) => void;
}

export const TechnicalDocumentTable: React.FC<TechnicalDocumentTableProps> = ({
  documents,
  isLoading,
  onView,
  onDownload,
  favorites,
  onToggleFavorite
}) => {
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

  const getFileIcon = (fileType: string) => {
    return <FileText className="w-4 h-4 text-primary" />;
  };

  const handleDownload = (document: TechnicalDocument) => {
    const link = document.createElement('a');
    link.href = document.file_url;
    link.download = document.file_name;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onDownload(document);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'Активный', variant: 'default' as const },
      draft: { label: 'Черновик', variant: 'secondary' as const },
      archived: { label: 'Архив', variant: 'outline' as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      development_program: 'text-blue-600 bg-blue-50',
      product_overview: 'text-green-600 bg-green-50',
      product_specification: 'text-orange-600 bg-orange-50',
      activity_presentation: 'text-purple-600 bg-purple-50',
      business_plans: 'text-red-600 bg-red-50',
      company_catalog: 'text-indigo-600 bg-indigo-50',
      product_certificates: 'text-yellow-600 bg-yellow-50'
    };
    return colors[category as keyof typeof colors] || 'text-gray-600 bg-gray-50';
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
        <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">Документы не найдены</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8"></TableHead>
            <TableHead>Название</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Размер</TableHead>
            <TableHead>Версия</TableHead>
            <TableHead>Скачиваний</TableHead>
            <TableHead>Дата создания</TableHead>
            <TableHead className="text-right">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((document) => (
            <TableRow key={document.id} className="hover:bg-muted/50">
              <TableCell>
                {getFileIcon(document.file_type)}
              </TableCell>
              <TableCell>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{document.title}</p>
                    {document.print_ready && (
                      <div title="Готов к печати">
                        <Printer className="w-3 h-3 text-green-600" />
                      </div>
                    )}
                    {favorites.has(document.id) && (
                      <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                    )}
                  </div>
                  {document.description && (
                    <p className="text-sm text-muted-foreground mb-1">{document.description}</p>
                  )}
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">{document.file_name}</p>
                    {document.tags && document.tags.length > 0 && (
                      <div className="flex gap-1">
                        {document.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {getStatusBadge(document.status)}
              </TableCell>
              <TableCell>{formatFileSize(document.file_size)}</TableCell>
              <TableCell>
                <Badge variant="secondary" className="text-xs">
                  v{document.version}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <span>{document.download_count}</span>
                  {document.last_downloaded_at && (
                    <div title="Последнее скачивание">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatDate(document.created_at)}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleFavorite(document.id)}
                    className="hover:bg-primary/10"
                  >
                    <Heart className={`w-4 h-4 ${favorites.has(document.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(document)}
                    className="hover:bg-primary/10"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownload(document)}
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
  );
};
