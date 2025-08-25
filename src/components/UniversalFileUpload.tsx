import React, { useState, useCallback, useRef } from 'react';
import { Upload, File, X, CheckCircle, AlertCircle, Download, Loader2, FileText, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

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

interface UniversalFileUploadProps {
  title?: string;
  categoryId: string;
  maxFileSize?: number;
  allowedTypes?: string[];
  multiple?: boolean;
  onFilesChange?: (files: UploadedFile[]) => void;
}

export const UniversalFileUpload: React.FC<UniversalFileUploadProps> = ({
  title = "Загрузка документов",
  categoryId,
  maxFileSize = 10 * 1024 * 1024,
  allowedTypes = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'jpeg', 'png', 'txt'],
  multiple = true,
  onFilesChange
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const loadStoredFiles = useCallback(() => {
    try {
      const storedFiles = localStorage.getItem(`files_${categoryId}`);
      if (storedFiles) {
        const parsedFiles = JSON.parse(storedFiles);
        const validFiles = parsedFiles
          .filter((file: any) => 
            file && 
            file.fileName && 
            file.id && 
            typeof file.fileName === 'string' &&
            file.fileName !== '' &&
            file.categoryId === categoryId
          )
          .map((file: any) => ({
            ...file,
            uploadedAt: typeof file.uploadedAt === 'string' 
              ? new Date(file.uploadedAt) 
              : file.uploadedAt?.value?.iso 
                ? new Date(file.uploadedAt.value.iso)
                : new Date(file.uploadedAt)
          }));
        
        setUploadedFiles(validFiles);
        console.log(`Загружены файлы для категории ${categoryId}:`, validFiles);
      }
    } catch (error) {
      console.error('Ошибка загрузки сохраненных файлов:', error);
      localStorage.removeItem(`files_${categoryId}`);
    }
  }, [categoryId]);

  React.useEffect(() => {
    loadStoredFiles();
  }, [loadStoredFiles]);

  const saveFilesToStorage = useCallback((files: UploadedFile[]) => {
    try {
      const validFiles = files.filter(file => 
        file && 
        file.fileName && 
        file.id && 
        typeof file.fileName === 'string' &&
        file.fileName !== ''
      );
      
      // Сохраняем файлы с правильным форматом даты
      const filesToSave = validFiles.map(file => ({
        ...file,
        uploadedAt: file.uploadedAt.toISOString()
      }));
      
      localStorage.setItem(`files_${categoryId}`, JSON.stringify(filesToSave));
      console.log(`Сохранены файлы для категории ${categoryId}:`, filesToSave);
      
      // Отправляем событие об обновлении файлов
      window.dispatchEvent(new Event('filesUpdated'));
      
      if (onFilesChange) {
        onFilesChange(validFiles);
      }
    } catch (error) {
      console.error('Ошибка сохранения файлов:', error);
    }
  }, [categoryId, onFilesChange]);

  const validateFile = (file: File): boolean => {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const isValidType = allowedTypes.includes(fileExtension || '');
    const isValidSize = file.size <= maxFileSize;

    if (!isValidType) {
      toast({
        title: 'Неподдерживаемый тип файла',
        description: `Разрешены только файлы: ${allowedTypes.join(', ').toUpperCase()}`,
        variant: 'destructive'
      });
      return false;
    }

    if (!isValidSize) {
      toast({
        title: 'Файл слишком большой',
        description: `Максимальный размер файла: ${formatFileSize(maxFileSize)}`,
        variant: 'destructive'
      });
      return false;
    }

    return true;
  };

  const simulateUpload = (fileId: string): Promise<void> => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setUploadedFiles(prev => {
            const newFiles = prev.map(f => 
              f.id === fileId 
                ? { ...f, status: 'success' as const, progress: 100 }
                : f
            );
            saveFilesToStorage(newFiles);
            return newFiles;
          });
          resolve();
        } else {
          setUploadedFiles(prev => prev.map(f => 
            f.id === fileId 
              ? { ...f, progress }
              : f
          ));
        }
      }, 200);
    });
  };

  const handleFiles = useCallback(async (fileList: FileList | null) => {
    if (!fileList) return;

    const filesToUpload: File[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (validateFile(file)) {
        filesToUpload.push(file);
      }
    }

    if (filesToUpload.length === 0) return;

    const newFiles: UploadedFile[] = filesToUpload.map(file => {
      const fileUrl = URL.createObjectURL(file);
      return {
        id: `${categoryId}_${Date.now()}_${Math.random().toString(36).substring(2)}`,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type || 'unknown',
        status: 'uploading' as const,
        progress: 0,
        uploadedAt: new Date(),
        categoryId,
        fileUrl
      };
    });

    setUploadedFiles(prev => {
      const updatedFiles = [...prev, ...newFiles];
      saveFilesToStorage(updatedFiles);
      return updatedFiles;
    });

    for (const uploadedFile of newFiles) {
      try {
        await simulateUpload(uploadedFile.id);
        toast({
          title: 'Файл загружен',
          description: `${uploadedFile.fileName} успешно загружен в "${title}"`
        });
      } catch (error) {
        setUploadedFiles(prev => {
          const updatedFiles = prev.map(f => 
            f.id === uploadedFile.id 
              ? { ...f, status: 'error' as const }
              : f
          );
          saveFilesToStorage(updatedFiles);
          return updatedFiles;
        });
        toast({
          title: 'Ошибка загрузки',
          description: `Не удалось загрузить ${uploadedFile.fileName}`,
          variant: 'destructive'
        });
      }
    }
  }, [maxFileSize, allowedTypes, toast, categoryId, title, saveFilesToStorage]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => {
      const fileToRemove = prev.find(f => f.id === fileId);
      if (fileToRemove?.fileUrl) {
        URL.revokeObjectURL(fileToRemove.fileUrl);
      }
      
      const newFiles = prev.filter(f => f.id !== fileId);
      saveFilesToStorage(newFiles);
      return newFiles;
    });
    toast({
      title: 'Файл удален',
      description: 'Файл успешно удален из списка'
    });
  };

  const clearAllFiles = () => {
    uploadedFiles.forEach(file => {
      if (file.fileUrl) {
        URL.revokeObjectURL(file.fileUrl);
      }
    });
    
    setUploadedFiles([]);
    localStorage.removeItem(`files_${categoryId}`);
    
    // Отправляем событие об обновлении файлов
    window.dispatchEvent(new Event('filesUpdated'));
    
    toast({
      title: 'Все файлы удалены',
      description: 'Все файлы успешно удалены из списка'
    });
  };

  const downloadFile = (uploadedFile: UploadedFile) => {
    if (uploadedFile.fileUrl) {
      const link = window.document.createElement('a');
      link.href = uploadedFile.fileUrl;
      link.download = uploadedFile.fileName;
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName: string | undefined | null) => {
    if (!fileName || typeof fileName !== 'string') {
      return <FileText className="w-5 h-5 text-gray-500" />;
    }
    
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) {
      return <Image className="w-5 h-5 text-blue-500" />;
    }
    return <FileText className="w-5 h-5 text-gray-500" />;
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              {title}
              <span className="text-xs text-muted-foreground">({categoryId})</span>
            </CardTitle>
            {uploadedFiles.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFiles}
                className="text-destructive hover:text-destructive"
              >
                <X className="w-4 h-4 mr-2" />
                Очистить все
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div
            className={`upload-zone p-8 rounded-2xl text-center transition-all duration-300 border-2 border-dashed cursor-pointer ${
              dragActive 
                ? 'border-primary bg-primary/10 scale-105' 
                : 'border-border hover:border-primary/50 hover:bg-primary/5'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={openFileDialog}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple={multiple}
              onChange={handleFileInput}
              className="hidden"
              accept={allowedTypes.map(type => `.${type}`).join(',')}
            />
            
            <div className="space-y-4">
              <div className="feature-icon mx-auto">
                <Upload className="w-12 h-12 text-primary" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Перетащите файлы сюда или нажмите для выбора
                </h3>
                <p className="text-sm text-muted-foreground">
                  Поддерживаются: {allowedTypes.join(', ').toUpperCase()}
                  <br />
                  Максимальный размер: {formatFileSize(maxFileSize)}
                  <br />
                  {multiple ? 'Можно загружать несколько файлов' : 'Можно загружать один файл'}
                </p>
              </div>

              <Button className="btn-primary" type="button">
                <Upload className="w-4 h-4 mr-2" />
                Выбрать файлы
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {uploadedFiles.length > 0 && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">
              Загруженные файлы ({uploadedFiles.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {uploadedFiles.map((uploadedFile) => (
                <div key={uploadedFile.id} className="glass-card p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        {getFileIcon(uploadedFile.fileName)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{uploadedFile.fileName}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(uploadedFile.fileSize)} • {uploadedFile.uploadedAt.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {uploadedFile.status === 'uploading' && (
                        <div className="flex items-center space-x-2">
                          <Loader2 className="w-4 h-4 animate-spin text-primary" />
                          <span className="text-xs text-primary">{Math.round(uploadedFile.progress)}%</span>
                        </div>
                      )}
                      
                      {uploadedFile.status === 'success' && (
                        <>
                          <div className="flex items-center space-x-1 text-success">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-xs">Загружено</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => downloadFile(uploadedFile)}
                            className="text-primary hover:text-primary-hover"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      
                      {uploadedFile.status === 'error' && (
                        <div className="flex items-center space-x-1 text-destructive">
                          <AlertCircle className="w-4 h-4" />
                          <span className="text-xs">Ошибка</span>
                        </div>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(uploadedFile.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {uploadedFile.status === 'uploading' && (
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadedFile.progress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
