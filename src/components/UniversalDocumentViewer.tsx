
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  X, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Maximize2,
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  File
} from 'lucide-react';

interface UniversalDocumentViewerProps {
  document: {
    id: string;
    title: string;
    file_name?: string;
    file_url?: string;
    file_type?: string;
    file_size?: number;
    description?: string;
  };
  onClose: () => void;
}

export const UniversalDocumentViewer: React.FC<UniversalDocumentViewerProps> = ({
  document,
  onClose
}) => {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  const fileType = document.file_type || '';
  const fileUrl = document.file_url || '';
  
  const isPDF = fileType === 'application/pdf' || fileUrl.toLowerCase().endsWith('.pdf');
  const isImage = fileType.startsWith('image/') || /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(fileUrl);
  const isVideo = fileType.startsWith('video/') || /\.(mp4|avi|mov|wmv|flv|webm)$/i.test(fileUrl);
  const isAudio = fileType.startsWith('audio/') || /\.(mp3|wav|ogg|m4a|aac)$/i.test(fileUrl);
  const isText = fileType.startsWith('text/') || /\.(txt|csv|json|xml|html)$/i.test(fileUrl);
  const isOfficeDoc = /\.(doc|docx|xls|xlsx|ppt|pptx)$/i.test(fileUrl) || 
    ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
     'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
     'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'].includes(fileType);

  const handleDownload = () => {
    if (fileUrl) {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = document.file_name || document.title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = () => {
    if (isPDF) return <FileText className="w-6 h-6 text-red-500" />;
    if (isImage) return <ImageIcon className="w-6 h-6 text-blue-500" />;
    if (isVideo) return <Video className="w-6 h-6 text-purple-500" />;
    if (isAudio) return <Music className="w-6 h-6 text-green-500" />;
    return <File className="w-6 h-6 text-gray-500" />;
  };

  const renderDocumentContent = () => {
    if (!fileUrl) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <File className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Файл недоступен</h3>
            <p className="text-muted-foreground">URL файла не найден</p>
          </div>
        </div>
      );
    }

    if (isPDF) {
      return (
        <div className="w-full h-full">
          <iframe
            src={`${fileUrl}#zoom=${zoom}&rotate=${rotation}`}
            className="w-full h-full border-0 rounded-lg"
            title={document.title}
            style={{ 
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              transformOrigin: 'center center'
            }}
          />
        </div>
      );
    }

    if (isImage) {
      return (
        <div className="flex items-center justify-center h-full p-4">
          <img
            src={fileUrl}
            alt={document.title}
            className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
            style={{ 
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              transformOrigin: 'center center'
            }}
          />
        </div>
      );
    }

    if (isVideo) {
      return (
        <div className="flex items-center justify-center h-full p-4">
          <video
            controls
            className="max-w-full max-h-full rounded-lg shadow-lg"
            style={{ 
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'center center'
            }}
          >
            <source src={fileUrl} type={fileType} />
            Ваш браузер не поддерживает воспроизведение видео.
          </video>
        </div>
      );
    }

    if (isAudio) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <Music className="w-24 h-24 text-green-500 mx-auto mb-6" />
            <h3 className="text-xl font-semibold mb-4">{document.title}</h3>
            <audio controls className="w-full max-w-md">
              <source src={fileUrl} type={fileType} />
              Ваш браузер не поддерживает воспроизведение аудио.
            </audio>
          </div>
        </div>
      );
    }

    if (isText) {
      return (
        <div className="w-full h-full p-4">
          <iframe
            src={fileUrl}
            className="w-full h-full border rounded-lg"
            title={document.title}
          />
        </div>
      );
    }

    if (isOfficeDoc) {
      // Для Office документов используем Google Docs Viewer
      const googleViewerUrl = `https://docs.google.com/gdata/docs/3.0/Embed?url=${encodeURIComponent(fileUrl)}&a=v`;
      return (
        <div className="w-full h-full">
          <iframe
            src={googleViewerUrl}
            className="w-full h-full border-0 rounded-lg"
            title={document.title}
          />
        </div>
      );
    }

    // Для неподдерживаемых типов файлов
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <File className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Предварительный просмотр недоступен</h3>
          <p className="text-muted-foreground mb-4">
            Для просмотра этого типа файла скачайте его на компьютер
          </p>
          <Button onClick={handleDownload} className="gap-2">
            <Download className="w-4 h-4" />
            Скачать файл
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] w-[95vw] h-[95vh] p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-background">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {getFileIcon()}
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-semibold truncate">{document.title}</h2>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{document.file_name}</span>
                  {document.file_size && <span>{formatFileSize(document.file_size)}</span>}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {(isPDF || isImage) && (
                <>
                  <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(25, zoom - 25))}>
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <span className="text-sm font-medium min-w-[50px] text-center">{zoom}%</span>
                  <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(300, zoom + 25))}>
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setRotation((rotation + 90) % 360)}>
                    <RotateCw className="w-4 h-4" />
                  </Button>
                </>
              )}
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar with document info */}
            <div className="w-80 border-r bg-muted/20 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Информация о документе</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Тип файла:</span>
                      <span>{fileType || 'Неизвестно'}</span>
                    </div>
                    {document.file_size && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Размер:</span>
                        <span>{formatFileSize(document.file_size)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {document.description && (
                  <div>
                    <h3 className="font-semibold mb-2">Описание</h3>
                    <p className="text-sm text-muted-foreground">{document.description}</p>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold mb-2">Действия</h3>
                  <Button onClick={handleDownload} className="w-full gap-2">
                    <Download className="w-4 h-4" />
                    Скачать файл
                  </Button>
                </div>
              </div>
            </div>

            {/* Document viewer */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                {renderDocumentContent()}
              </ScrollArea>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
