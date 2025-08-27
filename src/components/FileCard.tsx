
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  Eye, 
  Send, 
  Trash2, 
  Image as ImageIcon,
  FileSpreadsheet,
  FileType,
  MoreVertical,
  Calendar,
  HardDrive,
  X,
  ExternalLink
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { formatFileSize } from '@/utils/fileUtils';
import { FileData } from '@/hooks/useSupabaseFiles';
import { FileTransferModal } from './interdepartment/FileTransferModal';
import { getCurrentDepartmentFromPath } from './interdepartment/utils/departmentUtils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface FileCardProps {
  file: FileData;
  onView?: (file: FileData) => void;
  onDownload?: (file: FileData) => void;
  onSend?: (file: FileData) => void;
  onDelete?: (file: FileData) => void;
}

const getFileIcon = (fileName: string, fileType?: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  const type = fileType?.toLowerCase();
  
  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '') || type?.startsWith('image/')) {
    return <ImageIcon className="w-8 h-8 text-blue-500" />;
  }
  if (['pdf'].includes(extension || '') || type?.includes('pdf')) {
    return <FileText className="w-8 h-8 text-red-500" />;
  }
  if (['doc', 'docx'].includes(extension || '') || type?.includes('word')) {
    return <FileType className="w-8 h-8 text-blue-600" />;
  }
  if (['xls', 'xlsx'].includes(extension || '') || type?.includes('sheet')) {
    return <FileSpreadsheet className="w-8 h-8 text-green-600" />;
  }
  return <FileText className="w-8 h-8 text-gray-500" />;
};

const getFileTypeBadge = (fileName: string, fileType?: string) => {
  const extension = fileName.split('.').pop()?.toUpperCase();
  return extension || 'FILE';
};

export const FileCard: React.FC<FileCardProps> = ({
  file,
  onView,
  onDownload,
  onSend,
  onDelete
}) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  
  const currentDepartment = getCurrentDepartmentFromPath();
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const isImage = (fileName: string, fileType?: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '') || fileType?.startsWith('image/');
  };

  const isPDF = (fileName: string, fileType?: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return extension === 'pdf' || fileType?.includes('pdf');
  };

  const isDocument = (fileName: string, fileType?: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return ['doc', 'docx', 'xls', 'xlsx', 'txt', 'rtf'].includes(extension || '') || 
           fileType?.includes('word') || fileType?.includes('sheet') || fileType?.includes('text');
  };

  // КРИТИЧЕСКИ ИСПРАВЛЕННАЯ ФУНКЦИЯ БЫСТРОГО ОТКРЫТИЯ
  const handleQuickOpen = async () => {
    try {
      console.log('🚀 БЫСТРОЕ открытие файла:', file.file_name);
      
      // Для PDF - мгновенное открытие в новой вкладке
      if (isPDF(file.file_name, file.file_type)) {
        console.log('📄 Открываем PDF в новой вкладке');
        window.open(file.file_url, '_blank', 'noopener,noreferrer');
        onView?.(file);
        return;
      }

      // Для изображений - мгновенное открытие в новой вкладке
      if (isImage(file.file_name, file.file_type)) {
        console.log('🖼️ Открываем изображение в новой вкладке');
        window.open(file.file_url, '_blank', 'noopener,noreferrer');
        onView?.(file);
        return;
      }

      // Для документов - показываем в модальном окне или открываем в новой вкладке
      if (isDocument(file.file_name, file.file_type)) {
        console.log('📝 Открываем документ в новой вкладке');
        window.open(file.file_url, '_blank', 'noopener,noreferrer');
        onView?.(file);
        return;
      }

      // Для остальных файлов - показываем превью в модальном окне
      console.log('👁️ Показываем превью в модальном окне');
      setIsViewerOpen(true);
      onView?.(file);
      
    } catch (error) {
      console.error('❌ Ошибка быстрого открытия:', error);
      // Fallback - всегда пытаемся открыть в новой вкладке
      window.open(file.file_url, '_blank', 'noopener,noreferrer');
    }
  };

  // ИСПРАВЛЕННАЯ ФУНКЦИЯ СКАЧИВАНИЯ
  const handleDownload = async () => {
    try {
      console.log('⬇️ Скачивание файла:', file.file_name);
      
      const response = await fetch(file.file_url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      });
      
      if (!response.ok) {
        throw new Error('Ошибка загрузки файла');
      }
      
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = file.file_name;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(blobUrl);
      
      console.log('✅ Файл успешно скачан:', file.file_name);
      onDownload?.(file);
    } catch (error) {
      console.error('❌ Ошибка при скачивании файла:', error);
      window.open(file.file_url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSendToOtherDepartment = () => {
    setShowTransferModal(true);
    onSend?.(file);
  };

  const renderFileViewer = () => {
    if (isPDF(file.file_name, file.file_type)) {
      return (
        <div className="w-full h-[70vh]">
          <iframe
            src={file.file_url}
            className="w-full h-full border-0"
            title={file.file_name}
          />
        </div>
      );
    }
    
    if (isImage(file.file_name, file.file_type)) {
      return (
        <div className="w-full h-[70vh] flex items-center justify-center">
          <img 
            src={file.file_url} 
            alt={file.file_name}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      );
    }
    
    return (
      <div className="w-full h-[70vh] flex flex-col items-center justify-center bg-gray-50">
        <div className="text-center">
          {getFileIcon(file.file_name, file.file_type)}
          <h3 className="text-lg font-medium mt-4 mb-2">{file.file_name}</h3>
          <p className="text-gray-600 mb-4">Предварительный просмотр недоступен</p>
          <div className="flex gap-2">
            <Button onClick={handleDownload} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Скачать файл
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.open(file.file_url, '_blank')} 
              className="flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Открыть в новой вкладке
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Card className="glass-card hover:shadow-lg transition-all duration-300 group">
        <CardContent className="p-4">
          <div className="flex flex-col h-full">
            {/* File Icon and Type Badge */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-shrink-0">
                {getFileIcon(file.file_name, file.file_type)}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {getFileTypeBadge(file.file_name, file.file_type)}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleQuickOpen}>
                      <Eye className="w-4 h-4 mr-2" />
                      Открыть
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDownload}>
                      <Download className="w-4 h-4 mr-2" />
                      Скачать
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSendToOtherDepartment}>
                      <Send className="w-4 h-4 mr-2" />
                      Отправить в отдел
                    </DropdownMenuItem>
                    {onDelete && (
                      <DropdownMenuItem onClick={() => onDelete(file)} className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Удалить
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* File Name */}
            <h4 className="font-medium text-sm mb-2 line-clamp-2 flex-1">
              {file.file_name}
            </h4>

            {/* File Info */}
            <div className="space-y-1 text-xs text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <HardDrive className="w-3 h-3" />
                <span>{formatFileSize(file.file_size)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(file.uploaded_at)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-1 mt-auto">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 text-xs"
                onClick={handleQuickOpen}
              >
                <Eye className="w-3 h-3 mr-1" />
                Открыть
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleDownload}
                className="text-xs"
              >
                <Download className="w-3 h-3" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleSendToOtherDepartment}
                className="text-xs"
                title="Отправить в другой отдел"
              >
                <Send className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Viewer Modal */}
      <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
        <DialogContent className="max-w-6xl w-[95vw] max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold truncate pr-4">
                {file.file_name}
              </DialogTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Скачать
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsViewerOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>
          {renderFileViewer()}
        </DialogContent>
      </Dialog>

      {/* File Transfer Modal */}
      {showTransferModal && (
        <FileTransferModal
          isOpen={showTransferModal}
          onClose={() => setShowTransferModal(false)}
          file={{
            id: file.id,
            name: file.file_name,
            url: file.file_url,
            size: file.file_size,
            type: file.file_type || 'document'
          }}
          currentDepartment={currentDepartment}
          onSuccess={() => {
            setShowTransferModal(false);
          }}
        />
      )}
    </>
  );
};
