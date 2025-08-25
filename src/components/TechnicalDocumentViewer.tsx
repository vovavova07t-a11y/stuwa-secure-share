
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Download, FileText, Calendar, User, Eye, Printer, ZoomIn, ZoomOut, RotateCw, Heart, MessageCircle } from 'lucide-react';
import type { TechnicalDocument } from '@/types/technical';

interface TechnicalDocumentViewerProps {
  document: TechnicalDocument;
  onClose: () => void;
}

export const TechnicalDocumentViewer: React.FC<TechnicalDocumentViewerProps> = ({
  document,
  onClose
}) => {
  const [zoom, setZoom] = useState(100);
  const [showComments, setShowComments] = useState(false);

  // Обработчик клавиши Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        console.log('🔒 Закрытие технического просмотрщика по Escape');
        onClose();
      }
    };

    window.document.addEventListener('keydown', handleEscape);
    return () => window.document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Блокировка прокрутки фона при открытии модального окна
  useEffect(() => {
    window.document.body.style.overflow = 'hidden';
    return () => {
      window.document.body.style.overflow = 'unset';
    };
  }, []);

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

  const handleDownload = () => {
    const link = window.document.createElement('a');
    link.href = document.file_url;
    link.download = document.file_name;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.open(document.file_url, '_blank');
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      console.log('🔒 Закрытие технического просмотрщика по клику на backdrop');
      onClose();
    }
  };

  const isPDF = document.file_type === 'application/pdf';
  const isImage = document.file_type.startsWith('image/');

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'Активный', variant: 'default' as const },
      draft: { label: 'Черновик', variant: 'secondary' as const },
      archived: { label: 'Архив', variant: 'outline' as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tech-document-viewer-title"
    >
      <Card className="glass-card w-full max-w-7xl h-[95vh] flex flex-col animate-scale-in">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <div className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-primary" />
            <div>
              <CardTitle id="tech-document-viewer-title" className="text-lg">{document.title}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-muted-foreground">{document.file_name}</p>
                {getStatusBadge(document.status)}
                {document.print_ready && (
                  <Badge variant="outline" className="text-xs">
                    <Printer className="w-3 h-3 mr-1" />
                    Готов к печати
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isPDF && (
              <>
                <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(50, zoom - 25))}>
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium">{zoom}%</span>
                <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(200, zoom + 25))}>
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </>
            )}
            <Button variant="outline" onClick={() => setShowComments(!showComments)}>
              <MessageCircle className="w-4 h-4 mr-2" />
              Комментарии
            </Button>
            {document.print_ready && (
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="w-4 h-4 mr-2" />
                Печать
              </Button>
            )}
            <Button variant="outline" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Скачать
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-0 flex">
          {/* Document Info Sidebar */}
          <div className={`${showComments ? 'w-80' : 'w-80'} border-r bg-muted/20 p-6 space-y-6 overflow-y-auto`}>
            <div>
              <h3 className="font-semibold mb-3">Информация о документе</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span>{formatFileSize(document.file_size)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  <span>{document.download_count} скачиваний</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{formatDate(document.created_at)}</span>
                </div>
                {document.last_downloaded_at && (
                  <div className="flex items-center space-x-2">
                    <Download className="w-4 h-4 text-muted-foreground" />
                    <span>Последнее: {formatDate(document.last_downloaded_at)}</span>
                  </div>
                )}
              </div>
            </div>

            {document.description && (
              <div>
                <h3 className="font-semibold mb-3">Описание</h3>
                <p className="text-sm text-muted-foreground">{document.description}</p>
              </div>
            )}

            <div>
              <h3 className="font-semibold mb-3">Версия</h3>
              <Badge variant="secondary">
                v{document.version}
              </Badge>
            </div>

            {document.tags && document.tags.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Теги</h3>
                <div className="flex flex-wrap gap-1">
                  {document.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {document.technical_specs && Object.keys(document.technical_specs).length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Технические характеристики</h3>
                <div className="space-y-2 text-sm">
                  {Object.entries(document.technical_specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-muted-foreground">{key}:</span>
                      <span>{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Document Preview */}
          <div className="flex-1 p-6">
            {isPDF ? (
              <div className="h-full">
                <iframe
                  src={`${document.file_url}#zoom=${zoom}`}
                  className="w-full h-full rounded-lg border"
                  title={document.title}
                  style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}
                />
              </div>
            ) : isImage ? (
              <div className="flex items-center justify-center h-full">
                <img
                  src={document.file_url}
                  alt={document.title}
                  className="max-w-full max-h-full object-contain rounded-lg"
                  style={{ transform: `scale(${zoom / 100})` }}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Предварительный просмотр недоступен</h3>
                  <p className="text-muted-foreground mb-4">
                    Для просмотра этого типа файла скачайте его на компьютер
                  </p>
                  <Button onClick={handleDownload} className="btn-primary">
                    <Download className="w-4 h-4 mr-2" />
                    Скачать файл
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        
        <div className="p-4 border-t bg-muted/20 text-center text-xs text-muted-foreground">
          💡 Нажмите Escape или кликните вне окна для закрытия
        </div>
      </Card>
    </div>
  );
};
