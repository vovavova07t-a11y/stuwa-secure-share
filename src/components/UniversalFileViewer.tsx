
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, X, ZoomIn, ZoomOut, RotateCw, RefreshCw, AlertCircle } from 'lucide-react';
import { downloadFile, getFileTypeFromName } from '@/utils/fileDownload';
import { toast } from 'sonner';

interface UniversalFileViewerProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string;
  fileName: string;
  fileSize?: number;
}

export const UniversalFileViewer: React.FC<UniversalFileViewerProps> = ({
  isOpen,
  onClose,
  fileUrl,
  fileName,
  fileSize
}) => {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fileType = getFileTypeFromName(fileName);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setError(null);
      setZoom(100);
      setRotation(0);
    }
  }, [isOpen, fileUrl]);

  const handleDownload = async () => {
    try {
      await downloadFile(fileUrl, fileName);
    } catch (error) {
      console.error('❌ Ошибка скачивания:', error);
      toast.error('Не удалось скачать файл');
    }
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 300));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 25));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setError(null);
    setIsLoading(true);
  };

  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return '';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderFileContent = () => {
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-[60vh] bg-gray-50 rounded-lg">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h3 className="text-lg font-medium mb-2">Ошибка загрузки файла</h3>
          <p className="text-gray-600 mb-4 text-center max-w-md">{error}</p>
          <div className="flex gap-3">
            <Button onClick={handleRetry} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Попробовать снова
            </Button>
            <Button onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Скачать файл
            </Button>
          </div>
        </div>
      );
    }

    switch (fileType) {
      case 'pdf':
        return (
          <div className="w-full h-[70vh] border rounded-lg overflow-hidden bg-gray-100 relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-10">
                <div className="flex flex-col items-center gap-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p className="text-sm text-gray-600">Загружаем PDF...</p>
                </div>
              </div>
            )}
            <iframe
              key={`pdf-${retryCount}`}
              src={`${fileUrl}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
              className="w-full h-full"
              title={fileName}
              onLoad={() => {
                setIsLoading(false);
                setError(null);
              }}
              onError={() => {
                setIsLoading(false);
                setError('Не удалось загрузить PDF файл. Возможно, файл поврежден или недоступен.');
              }}
              style={{ 
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'top left'
              }}
            />
          </div>
        );

      case 'image':
        return (
          <div className="w-full h-[70vh] flex items-center justify-center bg-gray-50 border rounded-lg overflow-hidden relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-10">
                <div className="flex flex-col items-center gap-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p className="text-sm text-gray-600">Загружаем изображение...</p>
                </div>
              </div>
            )}
            <img
              key={`img-${retryCount}`}
              src={fileUrl}
              alt={fileName}
              className="max-w-full max-h-full object-contain transition-transform duration-200"
              onLoad={() => {
                setIsLoading(false);
                setError(null);
              }}
              onError={() => {
                setIsLoading(false);
                setError('Не удалось загрузить изображение. Проверьте формат файла.');
              }}
              style={{ 
                transform: `scale(${zoom / 100}) rotate(${rotation}deg)`
              }}
            />
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] bg-gray-50 rounded-lg">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-lg font-medium mb-2">{fileName}</h3>
            <p className="text-gray-600 mb-4 text-center max-w-md">
              Предварительный просмотр недоступен для файлов данного типа.
              Используйте кнопку "Скачать" для открытия файла в соответствующем приложении.
            </p>
            <Button onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Скачать файл
            </Button>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-[95vw] max-h-[95vh] overflow-hidden p-0">
        <DialogHeader className="p-4 border-b bg-white shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-lg font-semibold truncate pr-4">
                {fileName}
              </DialogTitle>
              {fileSize && (
                <p className="text-sm text-gray-600 mt-1">
                  Размер: {formatFileSize(fileSize)}
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-2 ml-4 shrink-0">
              {(fileType === 'image' || fileType === 'pdf') && !error && (
                <>
                  <Button variant="outline" size="sm" onClick={handleZoomOut} disabled={isLoading}>
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <span className="text-sm px-2 min-w-[50px] text-center">{zoom}%</span>
                  <Button variant="outline" size="sm" onClick={handleZoomIn} disabled={isLoading}>
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  {fileType === 'image' && (
                    <Button variant="outline" size="sm" onClick={handleRotate} disabled={isLoading}>
                      <RotateCw className="w-4 h-4" />
                    </Button>
                  )}
                </>
              )}
              
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-1" />
                Скачать
              </Button>
              
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="p-4 overflow-auto">
          {renderFileContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};
