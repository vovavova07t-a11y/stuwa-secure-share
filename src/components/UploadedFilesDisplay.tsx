
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Image, 
  Download, 
  Eye, 
  Trash2, 
  Calendar,
  File
} from 'lucide-react';
import { UniversalDocumentViewer } from './UniversalDocumentViewer';

interface UploadedFile {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  status: 'uploading' | 'success' | 'error';
  progress: number;
  uploadedAt: Date;
  categoryId: string;
  fileUrl?: string;
}

interface UploadedFilesDisplayProps {
  categoryId: string;
  title?: string;
  onFileDelete?: (fileId: string) => void;
}

export const UploadedFilesDisplay: React.FC<UploadedFilesDisplayProps> = ({
  categoryId,
  title = "Загруженные документы",
  onFileDelete
}) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [showViewer, setShowViewer] = useState(false);

  const loadFiles = React.useCallback(() => {
    try {
      const storedFiles = localStorage.getItem(`files_${categoryId}`);
      console.log(`Загрузка файлов для категории ${categoryId}:`, storedFiles);
      
      if (storedFiles) {
        const parsedFiles = JSON.parse(storedFiles);
        console.log(`Распарсенные файлы:`, parsedFiles);
        
        const validFiles = parsedFiles
          .filter((file: any) => {
            const isValid = file && 
              file.fileName && 
              file.id && 
              typeof file.fileName === 'string' &&
              file.fileName !== '' &&
              file.categoryId === categoryId &&
              file.status === 'success';
            
            if (!isValid) {
              console.log(`Невалидный файл:`, file);
            }
            return isValid;
          })
          .map((file: any) => ({
            ...file,
            uploadedAt: typeof file.uploadedAt === 'string' 
              ? new Date(file.uploadedAt) 
              : file.uploadedAt?.value?.iso 
                ? new Date(file.uploadedAt.value.iso)
                : new Date(file.uploadedAt)
          }));
        
        console.log(`Валидные файлы для категории ${categoryId}:`, validFiles);
        setFiles(validFiles);
      } else {
        console.log(`Нет сохраненных файлов для категории ${categoryId}`);
        setFiles([]);
      }
    } catch (error) {
      console.error('Ошибка загрузки файлов:', error);
      setFiles([]);
    }
  }, [categoryId]);

  useEffect(() => {
    loadFiles();
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `files_${categoryId}` || e.key === null) {
        loadFiles();
      }
    };

    const handleCustomEvent = () => {
      loadFiles();
    };

    // Слушаем изменения localStorage
    window.addEventListener('storage', handleStorageChange);
    // Слушаем кастомные события обновления файлов
    window.addEventListener('filesUpdated', handleCustomEvent);

    // Также проверяем файлы через интервал для надежности
    const interval = setInterval(loadFiles, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('filesUpdated', handleCustomEvent);
      clearInterval(interval);
    };
  }, [loadFiles]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFileIcon = (fileName: string) => {
    if (!fileName || typeof fileName !== 'string') {
      return <File className="w-5 h-5 text-gray-500" />;
    }
    
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) {
      return <Image className="w-5 h-5 text-blue-500" />;
    }
    return <FileText className="w-5 h-5 text-gray-500" />;
  };

  const handleView = (file: UploadedFile) => {
    setSelectedFile(file);
    setShowViewer(true);
  };

  const handleDownload = (file: UploadedFile) => {
    if (file.fileUrl) {
      const link = window.document.createElement('a');
      link.href = file.fileUrl;
      link.download = file.fileName;
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
    }
  };

  const handleDelete = (file: UploadedFile) => {
    try {
      const storedFiles = localStorage.getItem(`files_${categoryId}`);
      if (storedFiles) {
        const parsedFiles = JSON.parse(storedFiles);
        const updatedFiles = parsedFiles.filter((f: UploadedFile) => f.id !== file.id);
        
        // Освобождаем URL объект
        if (file.fileUrl) {
          URL.revokeObjectURL(file.fileUrl);
        }
        
        localStorage.setItem(`files_${categoryId}`, JSON.stringify(updatedFiles));
        
        // Отправляем событие об обновлении
        window.dispatchEvent(new Event('filesUpdated'));
        
        if (onFileDelete) {
          onFileDelete(file.id);
        }
        
        // Перезагружаем файлы
        loadFiles();
      }
    } catch (error) {
      console.error('Ошибка удаления файла:', error);
    }
  };

  console.log(`Компонент UploadedFilesDisplay для категории ${categoryId}, файлов: ${files.length}`, files);

  if (files.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FileText className="w-16 h-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">
            Документы не загружены
          </h3>
          <p className="text-sm text-muted-foreground text-center">
            Нажмите "Загрузить документ" чтобы добавить файлы в этот раздел
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {title} ({files.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {files.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    {getFileIcon(file.fileName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{file.fileName}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{formatFileSize(file.fileSize)}</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(file.uploadedAt)}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {file.fileType.split('/')[1]?.toUpperCase() || 'FILE'}
                  </Badge>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleView(file)}
                    className="hover:bg-primary/10"
                    title="Предпросмотр"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownload(file)}
                    className="hover:bg-primary/10"
                    title="Скачать"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(file)}
                    className="hover:bg-destructive/10 text-destructive"
                    title="Удалить"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Document Viewer Modal */}
      {showViewer && selectedFile && (
        <UniversalDocumentViewer
          isOpen={showViewer}
          onClose={() => {
            setShowViewer(false);
            setSelectedFile(null);
          }}
          document={{
            id: selectedFile.id,
            title: selectedFile.fileName,
            file_name: selectedFile.fileName,
            file_url: selectedFile.fileUrl || '',
            file_type: selectedFile.fileType,
            file_size: selectedFile.fileSize,
            created_at: selectedFile.uploadedAt.toISOString(),
            version: '1.0',
            download_count: 0,
            description: ''
          }}
        />
      )}
    </>
  );
};
