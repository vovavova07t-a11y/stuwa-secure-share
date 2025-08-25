import React, { useState, useCallback, useRef } from 'react';
import { Upload, File, X, CheckCircle, AlertCircle, Download, Loader2, FileText, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { PersistentFileDisplay } from './PersistentFileDisplay';
import { useSupabaseFiles } from '@/hooks/useSupabaseFiles';
import { validateFile, formatFileSize } from '@/utils/fileUtils';
import { getCurrentDepartmentFromPath } from './interdepartment/utils/departmentUtils';

interface UploadedFile {
  id: string;
  file: File;
  status: 'uploading' | 'success' | 'error';
  progress: number;
  uploadedAt: Date;
  categoryId: string;
  originalName: string;
  error?: string;
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
  maxFileSize = 50 * 1024 * 1024, // 50MB
  allowedTypes = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'jpeg', 'png', 'txt', 'zip', 'rar'],
  multiple = true,
  onFilesChange
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [showUploadArea, setShowUploadArea] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const currentDepartment = getCurrentDepartmentFromPath();
  
  // Используем хук для работы с Supabase
  const { files: persistentFiles, saveFile, isLoading } = useSupabaseFiles(currentDepartment, categoryId);

  const simulateUpload = (fileId: string): Promise<void> => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setUploadedFiles(prev => prev.map(f => 
            f.id === fileId 
              ? { ...f, status: 'success' as const, progress: 100 }
              : f
          ));
          resolve();
        } else {
          setUploadedFiles(prev => prev.map(f => 
            f.id === fileId 
              ? { ...f, progress }
              : f
          ));
        }
      }, 100);
    });
  };

  const handleFiles = useCallback(async (fileList: FileList | null) => {
    if (!fileList) return;

    console.log(`📁 Обработка ${fileList.length} файлов для отдела: ${currentDepartment}`);
    
    const filesToUpload: File[] = [];
    const validationErrors: string[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      console.log(`📄 Проверка файла: ${file.name} (${formatFileSize(file.size)})`);
      
      const validation = validateFile(file, maxFileSize, allowedTypes);
      if (validation.valid) {
        filesToUpload.push(file);
        console.log(`✅ Файл ${file.name} прошел валидацию`);
      } else {
        validationErrors.push(`${file.name}: ${validation.error}`);
        console.log(`❌ Файл ${file.name} не прошел валидацию: ${validation.error}`);
      }
    }

    if (validationErrors.length > 0) {
      toast({
        title: 'Ошибки валидации файлов',
        description: validationErrors.join('\n'),
        variant: 'destructive'
      });
    }

    if (filesToUpload.length === 0) {
      console.log('❌ Нет файлов для загрузки');
      return;
    }

    console.log(`🚀 Начинаем загрузку ${filesToUpload.length} файлов в Supabase`);

    const newFiles: UploadedFile[] = filesToUpload.map(file => ({
      id: crypto.randomUUID(),
      file,
      status: 'uploading' as const,
      progress: 0,
      uploadedAt: new Date(),
      categoryId,
      originalName: file.name
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Загружаем файлы в Supabase
    const uploadPromises = newFiles.map(async (uploadedFile) => {
      try {
        console.log(`⬆️ Загружаем файл в Supabase: ${uploadedFile.originalName}`);
        await simulateUpload(uploadedFile.id);
        await saveFile(uploadedFile.file, categoryId, currentDepartment);
        
        toast({
          title: 'Файл загружен',
          description: `${uploadedFile.originalName} успешно сохранен в базу данных`
        });
        
        console.log(`✅ Файл успешно сохранен: ${uploadedFile.originalName}`);
      } catch (error) {
        console.error(`❌ Ошибка загрузки файла ${uploadedFile.originalName}:`, error);
        
        setUploadedFiles(prev => prev.map(f => 
          f.id === uploadedFile.id 
            ? { 
                ...f, 
                status: 'error' as const,
                error: error instanceof Error ? error.message : 'Неизвестная ошибка'
              }
            : f
        ));
        
        toast({
          title: 'Ошибка загрузки',
          description: `Не удалось сохранить ${uploadedFile.originalName}`,
          variant: 'destructive'
        });
      }
    });

    await Promise.allSettled(uploadPromises);

    if (onFilesChange) {
      onFilesChange(uploadedFiles);
    }

    console.log(`📊 Загрузка завершена. Загружено файлов: ${newFiles.length}`);
  }, [maxFileSize, allowedTypes, toast, onFilesChange, uploadedFiles, categoryId, currentDepartment, saveFile]);

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
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
    toast({
      title: 'Файл удален',
      description: 'Файл успешно удален из списка'
    });
  };

  const retryUpload = async (fileId: string) => {
    const file = uploadedFiles.find(f => f.id === fileId);
    if (!file) return;

    setUploadedFiles(prev => prev.map(f => 
      f.id === fileId 
        ? { ...f, status: 'uploading' as const, progress: 0, error: undefined }
        : f
    ));

    try {
      await simulateUpload(file.id);
      await saveFile(file.file, categoryId, currentDepartment);
      
      toast({
        title: 'Файл загружен',
        description: `${file.originalName} успешно сохранен в базу данных`
      });
    } catch (error) {
      console.error('❌ Ошибка повторной загрузки файла:', error);
      setUploadedFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { 
              ...f, 
              status: 'error' as const,
              error: error instanceof Error ? error.message : 'Неизвестная ошибка'
            }
          : f
      ));
      
      toast({
        title: 'Ошибка загрузки',
        description: `Не удалось сохранить ${file.originalName}`,
        variant: 'destructive'
      });
    }
  };

  const downloadFile = (uploadedFile: UploadedFile) => {
    const url = URL.createObjectURL(uploadedFile.file);
    const link = document.createElement('a');
    link.href = url;
    link.download = uploadedFile.originalName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png'].includes(extension || '')) {
      return <Image className="w-5 h-5 text-blue-500" />;
    }
    return <FileText className="w-5 h-5 text-gray-500" />;
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const currentFilesCount = persistentFiles.length;
  const successfulUploads = uploadedFiles.filter(f => f.status === 'success').length;
  const failedUploads = uploadedFiles.filter(f => f.status === 'error').length;

  return (
    <div className="space-y-6">
      <PersistentFileDisplay 
        categoryId={categoryId}
        categoryTitle={title}
        onSendToOtherDepartment={(file) => {
          toast({
            title: "Отправка файла",
            description: `Файл ${file.file_name} отправлен в другой отдел`,
          });
        }}
      />

      <div className="flex justify-center">
        <Button 
          onClick={() => setShowUploadArea(!showUploadArea)}
          className="btn-primary"
          disabled={isLoading}
        >
          <Upload className="w-4 h-4 mr-2" />
          {showUploadArea ? 'Скрыть загрузку' : `Загрузить новые файлы${currentFilesCount > 0 ? ` (${currentFilesCount})` : ''}`}
        </Button>
      </div>

      {showUploadArea && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              {title}
              <span className="text-xs text-muted-foreground">({categoryId})</span>
              {currentFilesCount > 0 && (
                <span className="text-xs text-green-600">
                  • {currentFilesCount} файл{currentFilesCount > 1 ? (currentFilesCount > 4 ? 'ов' : 'а') : ''} сохранено
                </span>
              )}
            </CardTitle>
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
                    <br />
                    <span className="text-blue-600 font-medium">Файлы сохраняются в базу данных Supabase</span>
                  </p>
                </div>

                <Button className="btn-primary" type="button">
                  <Upload className="w-4 h-4 mr-2" />
                  Выбрать файлы
                </Button>
              </div>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Загружаемые файлы:</h4>
                  {(successfulUploads > 0 || failedUploads > 0) && (
                    <div className="text-sm text-muted-foreground">
                      Успешно: {successfulUploads} • Ошибок: {failedUploads}
                    </div>
                  )}
                </div>
                
                {uploadedFiles.map((uploadedFile) => (
                  <div key={uploadedFile.id} className="glass-card p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          {getFileIcon(uploadedFile.originalName)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{uploadedFile.originalName}</h4>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(uploadedFile.file.size)} • {uploadedFile.uploadedAt.toLocaleString()}
                          </p>
                          {uploadedFile.error && (
                            <p className="text-xs text-destructive mt-1">{uploadedFile.error}</p>
                          )}
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
                              <span className="text-xs">Сохранено в БД</span>
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
                          <>
                            <div className="flex items-center space-x-1 text-destructive">
                              <AlertCircle className="w-4 h-4" />
                              <span className="text-xs">Ошибка</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => retryUpload(uploadedFile.id)}
                              className="text-primary hover:text-primary-hover"
                              title="Повторить загрузку"
                            >
                              <Upload className="w-4 h-4" />
                            </Button>
                          </>
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
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
