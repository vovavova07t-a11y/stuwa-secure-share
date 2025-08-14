
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Download, FileText, Calendar, User, Eye } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  description?: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  version: number;
  download_count: number;
  created_at: string;
  updated_at: string;
}

interface DocumentViewerProps {
  document: Document;
  onClose: () => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  document,
  onClose
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

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = document.file_url;
    link.download = document.file_name;
    link.click();
  };

  const isPDF = document.file_type === 'application/pdf';
  const isImage = document.file_type.startsWith('image/');

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="glass-card w-full max-w-6xl h-[90vh] flex flex-col animate-scale-in">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <div className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-primary" />
            <div>
              <CardTitle className="text-lg">{document.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{document.file_name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Скачать
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-0 flex">
          {/* Document Info Sidebar */}
          <div className="w-80 border-r bg-muted/20 p-6 space-y-6">
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
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
                v{document.version}
              </span>
            </div>
          </div>

          {/* Document Preview */}
          <div className="flex-1 p-6">
            {isPDF ? (
              <iframe
                src={document.file_url}
                className="w-full h-full rounded-lg border"
                title={document.title}
              />
            ) : isImage ? (
              <div className="flex items-center justify-center h-full">
                <img
                  src={document.file_url}
                  alt={document.title}
                  className="max-w-full max-h-full object-contain rounded-lg"
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
      </Card>
    </div>
  );
};
