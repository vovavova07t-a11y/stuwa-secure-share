
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
  HardDrive
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { formatFileSize } from '@/utils/fileUtils';
import { FileData } from '@/hooks/useSupabaseFiles';
import { FileTransferModal } from './interdepartment/FileTransferModal';
import { getCurrentDepartmentFromPath } from './interdepartment/utils/departmentUtils';
import { UniversalFileViewer } from './UniversalFileViewer';
import { downloadFile, canPreview } from '@/utils/fileDownload';

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

  const handlePreview = () => {
    console.log('🔍 Открытие просмотра файла:', file.file_name);
    
    if (canPreview(file.file_name)) {
      setIsViewerOpen(true);
      onView?.(file);
    } else {
      // Если предпросмотр недоступен, предлагаем скачать
      handleDownload();
    }
  };

  const handleDownload = async () => {
    console.log('⬇️ Скачивание файла:', file.file_name);
    
    try {
      await downloadFile(file.file_url, file.file_name);
      onDownload?.(file);
    } catch (error) {
      console.error('❌ Ошибка при скачивании файла:', error);
    }
  };

  const handleSendToOtherDepartment = () => {
    setShowTransferModal(true);
    onSend?.(file);
  };

  return (
    <>
      <Card className="glass-card hover:shadow-lg transition-all duration-300 group">
        <CardContent className="p-4">
          <div className="flex flex-col h-full">
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
                    <DropdownMenuItem onClick={handlePreview}>
                      <Eye className="w-4 h-4 mr-2" />
                      {canPreview(file.file_name) ? 'Предпросмотр' : 'Скачать'}
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

            <h4 className="font-medium text-sm mb-2 line-clamp-2 flex-1">
              {file.file_name}
            </h4>

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

            <div className="flex gap-1 mt-auto">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 text-xs"
                onClick={handlePreview}
              >
                <Eye className="w-3 h-3 mr-1" />
                {canPreview(file.file_name) ? 'Просмотр' : 'Скачать'}
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

      <UniversalFileViewer
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        fileUrl={file.file_url}
        fileName={file.file_name}
        fileSize={file.file_size}
      />

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
