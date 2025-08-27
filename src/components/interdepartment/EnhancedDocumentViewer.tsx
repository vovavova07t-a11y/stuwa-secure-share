
import React, { useState, useEffect } from 'react';
import { X, Download, ExternalLink, FileText, Image, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface DocumentViewerProps {
  document: {
    id: string;
    file_name: string;
    file_url: string;
    file_type: string;
    file_size: number;
  };
  onClose: () => void;
}

export const EnhancedDocumentViewer: React.FC<DocumentViewerProps> = ({ document, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const isPDF = document.file_type === 'application/pdf' || document.file_name.toLowerCase().endsWith('.pdf');
  const isImage = document.file_type?.startsWith('image/') || 
                  ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(
                    document.file_name.split('.').pop()?.toLowerCase() || ''
                  );

  const handleDownload = async () => {
    try {
      console.log('⬇️ Скачивание файла:', document.file_name);
      
      const response = await fetch(document.file_url);
      if (!response.ok) throw new Error('Ошибка загрузки файла');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = document.file_name;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('❌ Ошибка скачивания:', error);
      // Fallback - открыть в новой вкладке
      window.open(document.file_url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleOpenExternal = () => {
    window.open(document.file_url, '_blank', 'noopener,noreferrer');
  };

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    setRetryCount(prev => prev + 1);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Компонент для отображения PDF
  const PDFViewer = () => (
    <div className="w-full h-[70vh] relative bg-gray-50 rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            <p className="text-sm text-gray-600">Загружаем PDF документ...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Alert className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="mt-2">
              <p className="mb-3">Не удалось загрузить PDF документ</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleRetry}>
                  Попробовать снова
                </Button>
                <Button variant="outline" size="sm" onClick={handleOpenExternal}>
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Открыть отдельно
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      )}
      
      <iframe
        key={`pdf-${retryCount}`}
        src={`${document.file_url}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
        className="w-full h-full border-0"
        title={document.file_name}
        onLoad={() => {
          setIsLoading(false);
          setError(null);
        }}
        onError={() => {
          setIsLoading(false);
          setError('Ошибка загрузки PDF');
        }}
      />
    </div>
  );

  // Компонент для отображения изображений
  const ImageViewer = () => (
    <div className="w-full h-[70vh] relative bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            <p className="text-sm text-gray-600">Загружаем изображение...</p>
          </div>
        </div>
      )}
      
      <img
        key={`img-${retryCount}`}
        src={document.file_url}
        alt={document.file_name}
        className="max-w-full max-h-full object-contain"
        onLoad={() => {
          setIsLoading(false);
          setError(null);
        }}
        onError={() => {
          setIsLoading(false);
          setError('Ошибка загрузки изображения');
        }}
      />
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/90">
          <Alert className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <p className="mb-3">Не удалось загрузить изображение</p>
              <Button variant="outline" size="sm" onClick={handleRetry}>
                Попробовать снова
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );

  // Компонент для неподдерживаемых файлов
  const UnsupportedViewer = () => (
    <div className="w-full h-[60vh] flex items-center justify-center bg-gray-50 rounded-lg">
      <div className="text-center max-w-md">
        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">{document.file_name}</h3>
        <p className="text-gray-600 mb-4">
          Предварительный просмотр недоступен для файлов типа {document.file_type}
        </p>
        <div className="flex gap-2 justify-center">
          <Button onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Скачать файл
          </Button>
          <Button variant="outline" onClick={handleOpenExternal}>
            <ExternalLink className="w-4 h-4 mr-2" />
            Открыть отдельно
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl truncate">{document.file_name}</CardTitle>
            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
              <span>Тип: {document.file_type}</span>
              <span>Размер: {formatFileSize(document.file_size)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-1" />
              Скачать
            </Button>
            <Button variant="outline" size="sm" onClick={handleOpenExternal}>
              <ExternalLink className="w-4 h-4 mr-1" />
              Открыть отдельно
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {isPDF ? (
          <PDFViewer />
        ) : isImage ? (
          <ImageViewer />
        ) : (
          <UnsupportedViewer />
        )}
      </CardContent>
    </Card>
  );
};
