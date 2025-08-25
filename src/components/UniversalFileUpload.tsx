import React, { useState, useCallback, useRef } from 'react';
import { Upload, File, X, CheckCircle, AlertCircle, Download, Loader2, FileText, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { PersistentFileDisplay } from './PersistentFileDisplay';

interface UploadedFile {
  id: string;
  file: File;
  status: 'uploading' | 'success' | 'error';
  progress: number;
  uploadedAt: Date;
  categoryId: string;
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
  const [showUploadArea, setShowUploadArea] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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

  const uploadToSupabase = async (file: File, fileId: string): Promise<void> => {
    try {
      console.log('Начинаем загрузку файла:', file.name);
      
      // Загружаем файл в Supabase Storage
      const fileName = `${categoryId}/${fileId}_${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, file);

      if (uploadError) {
        console.error('Ошибка загрузки в Storage:', uploadError);
        throw uploadError;
      }

      console.log('Файл загружен в Storage:', uploadData);

      // Получаем публичную ссылку
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(fileName);

      console.log('Публичная ссылка:', publicUrl);

      // Сохраняем метаданные в таблицу documents (используем существующую)
      const { data: dbData, error: dbError } = await supabase
        .from('documents')
        .insert({
          id: fileId,
          title: file.name,
          file_name: file.name,
          file_url: publicUrl,
          file_type: file.type,
          file_size: file.size,
          category: categoryId,
          description: `Загружено через портал STUWA в категорию ${categoryId}`,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (dbError) {
        console.error('Ошибка сохранения в БД (documents):', dbError);
        throw dbError;
      }

      console.log('Метаданные сохранены в БД:', dbData);

    } catch (error) {
      console.error('Ошибка при загрузке в Supabase:', error);
      throw error;
    }
  };

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

    const newFiles: UploadedFile[] = filesToUpload.map(file => ({
      id: `${categoryId}_${Date.now()}_${Math.random().toString(36).substring(2)}`,
      file,
      status: 'uploading' as const,
      progress: 0,
      uploadedAt: new Date(),
      categoryId
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    for (const uploadedFile of newFiles) {
      try {
        // Загружаем в Supabase
        await uploadToSupabase(uploadedFile.file, uploadedFile.id);
        await simulateUpload(uploadedFile.id);
        
        toast({
          title: 'Файл загружен',
          description: `${uploadedFile.file.name} успешно загружен в "${title}"`
        });
      } catch (error) {
        console.error('Ошибка загрузки файла:', error);
        setUploadedFiles(prev => prev.map(f => 
          f.id === uploadedFile.id 
            ? { ...f, status: 'error' as const }
            : f
        ));
        toast({
          title: 'Ошибка загрузки',
          description: `Не удалось загрузить ${uploadedFile.file.name}`,
          variant: 'destructive'
        });
      }
    }

    if (onFilesChange) {
      onFilesChange(uploadedFiles);
    }
  }, [maxFileSize, allowedTypes, toast, onFilesChange, uploadedFiles, categoryId, title]);

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

  const downloadFile = (uploadedFile: UploadedFile) => {
    const url = URL.createObjectURL(uploadedFile.file);
    const link = document.createElement('a');
    link.href = url;
    link.download = uploadedFile.file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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

  return (
    <div className="space-y-6">
      {/* ПОСТОЯННОЕ ОТОБРАЖЕНИЕ ЗАГРУЖЕННЫХ ФАЙЛОВ */}
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

      {/* КНОПКА ДЛЯ ПОКАЗА/СКРЫТИЯ ОБЛАСТИ ЗАГРУЗКИ */}
      <div className="flex justify-center">
        <Button 
          onClick={() => setShowUploadArea(!showUploadArea)}
          className="btn-primary"
        >
          <Upload className="w-4 h-4 mr-2" />
          {showUploadArea ? 'Скрыть загрузку' : 'Загрузить новые файлы'}
        </Button>
      </div>

      {/* ОБЛАСТЬ ЗАГРУЗКИ (ПОКАЗЫВАЕТСЯ ПО КНОПКЕ) */}
      {showUploadArea && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              {title}
              <span className="text-xs text-muted-foreground">({categoryId})</span>
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
                  </p>
                </div>

                <Button className="btn-primary" type="button">
                  <Upload className="w-4 h-4 mr-2" />
                  Выбрать файлы
                </Button>
              </div>
            </div>

            {/* ПРОЦЕСС ЗАГРУЗКИ */}
            {uploadedFiles.length > 0 && (
              <div className="mt-6 space-y-3">
                <h4 className="font-semibold">Загружаемые файлы:</h4>
                {uploadedFiles.map((uploadedFile) => (
                  <div key={uploadedFile.id} className="glass-card p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          {getFileIcon(uploadedFile.file.name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{uploadedFile.file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(uploadedFile.file.size)} • {uploadedFile.uploadedAt.toLocaleString()}
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
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
