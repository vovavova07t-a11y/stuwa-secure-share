
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
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  
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

  const handleView = () => {
    if (isImage(file.file_name, file.file_type)) {
      setIsImagePreviewOpen(true);
    } else {
      window.open(file.file_url, '_blank');
    }
    onView?.(file);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = file.file_url;
    link.download = file.file_name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onDownload?.(file);
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
                    <DropdownMenuItem onClick={handleView}>
                      <Eye className="w-4 h-4 mr-2" />
                      Открыть
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDownload}>
                      <Download className="w-4 h-4 mr-2" />
                      Скачать
                    </DropdownMenuItem>
                    {onSend && (
                      <DropdownMenuItem onClick={() => onSend(file)}>
                        <Send className="w-4 h-4 mr-2" />
                        Отправить в отдел
                      </DropdownMenuItem>
                    )}
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
                onClick={handleView}
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
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Image Preview Modal */}
      {isImagePreviewOpen && isImage(file.file_name, file.file_type) && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setIsImagePreviewOpen(false)}
        >
          <div className="relative max-w-4xl max-h-full">
            <Button
              variant="ghost"
              size="sm"
              className="absolute -top-10 right-0 text-white hover:text-white hover:bg-white/10"
              onClick={() => setIsImagePreviewOpen(false)}
            >
              ✕
            </Button>
            <img 
              src={file.file_url} 
              alt={file.file_name}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
};
