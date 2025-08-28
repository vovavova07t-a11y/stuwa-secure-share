
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, X, ZoomIn, ZoomOut, RotateCw, Maximize } from 'lucide-react';
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

  const fileType = getFileTypeFromName(fileName);

  const handleDownload = async () => {
    await downloadFile(fileUrl, fileName);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 25));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
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
        <div className="flex flex-col items-center justify-center h-96 bg-gray-50 rounded-lg">
          <div className="text-red-500 text-lg mb-4">❌ Ошибка загрузки файла</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={handleDownload} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Скачать файл
          </Button>
        </div>
      );
    }

    switch (fileType) {
      case 'pdf':
        return (
          <div className="w-full h-[70vh] border rounded-lg overflow-hidden bg-gray-100">
            {isLoading && (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-2">Загружаем PDF...</span>
              </div>
            )}
            <iframe
              src={`${fileUrl}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
              className="w-full h-full"
              title={fileName}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setError('Не удалось загрузить PDF файл');
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
          <div className="w-full h-[70vh] flex items-center justify-center bg-gray-50 border rounded-lg overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-2">Загружаем изображение...</span>
              </div>
            )}
            <img
              src={fileUrl}
              alt={fileName}
              className="max-w-full max-h-full object-contain transition-transform duration-200"
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setError('Не удалось загрузить изображение');
              }}
              style={{ 
                transform: `scale(${zoom / 100}) rotate(${rotation}deg)`
              }}
            />
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-96 bg-gray-50 rounded-lg">
            <div className="text-4xl mb-4">📄</div>
            <h3 className="text-lg font-medium mb-2">{fileName}</h3>
            <p className="text-gray-600 mb-4 text-center">
              Предварительный просмотр недоступен для данного типа файла
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
        <DialogHeader className="p-4 border-b bg-white">
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
            
            <div className="flex items-center gap-2 ml-4">
              {fileType === 'image' && (
                <>
                  <Button variant="outline" size="sm" onClick={handleZoomOut}>
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <span className="text-sm px-2 min-w-[50px] text-center">{zoom}%</span>
                  <Button variant="outline" size="sm" onClick={handleZoomIn}>
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleRotate}>
                    <RotateCw className="w-4 h-4" />
                  </Button>
                </>
              )}
              
              {fileType === 'pdf' && (
                <>
                  <Button variant="outline" size="sm" onClick={handleZoomOut}>
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <span className="text-sm px-2 min-w-[50px] text-center">{zoom}%</span>
                  <Button variant="outline" size="sm" onClick={handleZoomIn}>
                    <ZoomIn className="w-4 h-4" />
                  </Button>
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
        
        <div className="p-4">
          {renderFileContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};
