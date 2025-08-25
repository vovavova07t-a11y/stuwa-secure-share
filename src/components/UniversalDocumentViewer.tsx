import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, X, ZoomIn, ZoomOut, RotateCw, Maximize } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  file_name?: string;
  file_url: string;
  file_type: string;
  file_size: number;
  created_at: string;
  version: string;
  download_count: number;
  description?: string;
}

interface UniversalDocumentViewerProps {
  isOpen: boolean;
  onClose: () => void;
  document: Document;
}

export const UniversalDocumentViewer: React.FC<UniversalDocumentViewerProps> = ({
  isOpen,
  onClose,
  document
}) => {
  const [zoom, setZoom] = React.useState(100);
  const [rotation, setRotation] = React.useState(0);

  const handleDownload = () => {
    const link = window.document.createElement('a');
    link.href = document.file_url;
    link.download = document.file_name || document.title;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  };

  const getFileExtension = (fileName: string) => {
    return fileName.split('.').pop()?.toLowerCase() || '';
  };

  const renderDocumentContent = () => {
    const extension = getFileExtension(document.file_name || document.title);
    
    // Изображения
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension)) {
      return (
        <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
          <img
            src={document.file_url}
            alt={document.title}
            className="max-w-full max-h-full object-contain transition-transform duration-200"
            style={{
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
            }}
          />
        </div>
      );
    }

    // PDF файлы
    if (extension === 'pdf') {
      return (
        <div className="h-full">
          <iframe
            src={`${document.file_url}#toolbar=1`}
            className="w-full h-full rounded-lg border"
            title={document.title}
          />
        </div>
      );
    }

    // Текстовые файлы
    if (['txt', 'md', 'json', 'csv'].includes(extension)) {
      const [content, setContent] = React.useState<string>('');
      
      React.useEffect(() => {
        fetch(document.file_url)
          .then(response => response.text())
          .then(text => setContent(text))
          .catch(() => setContent('Не удалось загрузить содержимое файла'));
      }, [document.file_url]);

      return (
        <div className="h-full bg-gray-50 rounded-lg p-4 overflow-auto">
          <pre className="whitespace-pre-wrap text-sm font-mono">{content}</pre>
        </div>
      );
    }

    // Видео файлы
    if (['mp4', 'webm', 'ogg', 'avi', 'mov'].includes(extension)) {
      return (
        <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
          <video
            src={document.file_url}
            controls
            className="max-w-full max-h-full rounded-lg"
          />
        </div>
      );
    }

    // Аудио файлы
    if (['mp3', 'wav', 'ogg', 'aac', 'flac'].includes(extension)) {
      return (
        <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg p-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-4">{document.title}</h3>
            <audio
              src={document.file_url}
              controls
              className="w-full max-w-md"
            />
          </div>
        </div>
      );
    }

    // Office файлы и другие
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg p-8">
        <div className="text-center">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">{document.title}</h3>
          <p className="text-muted-foreground mb-4">
            Предпросмотр недоступен для данного типа файла
          </p>
          <Button onClick={handleDownload} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Скачать для просмотра
          </Button>
        </div>
      </div>
    );
  };

  const canZoom = () => {
    const extension = getFileExtension(document.file_name || document.title);
    return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] p-0">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold truncate">
              {document.title}
            </DialogTitle>
            <div className="flex items-center gap-2">
              {canZoom() && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setZoom(Math.max(25, zoom - 25))}
                    disabled={zoom <= 25}
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground min-w-[3rem] text-center">
                    {zoom}%
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setZoom(Math.min(300, zoom + 25))}
                    disabled={zoom >= 300}
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setRotation((rotation + 90) % 360)}
                  >
                    <RotateCw className="w-4 h-4" />
                  </Button>
                </>
              )}
              <Button variant="ghost" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 p-6 pt-2 overflow-hidden">
          {renderDocumentContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};
