
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Upload, File, X, Check, AlertCircle } from 'lucide-react';
import { useSupabaseFiles } from '@/hooks/useSupabaseFiles';
import { toast } from 'sonner';

interface UniversalFileUploadProps {
  department: string;
  categoryId: string;
  onUploadComplete?: (files: any[]) => void;
  maxFiles?: number;
  maxSize?: number; // в байтах
  acceptedFileTypes?: string[];
}

export const UniversalFileUpload: React.FC<UniversalFileUploadProps> = ({
  department,
  categoryId,
  onUploadComplete,
  maxFiles = 10,
  maxSize = 50 * 1024 * 1024, // 50MB по умолчанию
  acceptedFileTypes = ['*']
}) => {
  const [uploadingFiles, setUploadingFiles] = useState<Array<{
    file: File;
    progress: number;
    status: 'uploading' | 'success' | 'error';
    error?: string;
  }>>([]);

  const { saveFile } = useSupabaseFiles(department, categoryId);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    console.log('📁 Начинаем загрузку файлов:', acceptedFiles.map(f => f.name));
    
    // Проверяем ограничения
    if (acceptedFiles.length > maxFiles) {
      toast.error(`Можно загрузить максимум ${maxFiles} файлов одновременно`);
      return;
    }

    const filesWithProgress = acceptedFiles.map(file => ({
      file,
      progress: 0,
      status: 'uploading' as const
    }));

    setUploadingFiles(filesWithProgress);

    const uploadedFiles = [];

    // Загружаем файлы по одному
    for (let i = 0; i < acceptedFiles.length; i++) {
      const file = acceptedFiles[i];
      
      try {
        console.log(`📤 Загружаем файл ${i + 1}/${acceptedFiles.length}:`, file.name);
        
        // Проверяем размер файла
        if (file.size > maxSize) {
          throw new Error(`Файл слишком большой. Максимальный размер: ${Math.round(maxSize / 1024 / 1024)}MB`);
        }

        // Обновляем прогресс
        setUploadingFiles(prev => prev.map((item, index) => 
          index === i ? { ...item, progress: 25 } : item
        ));

        // Сохраняем файл
        const savedFile = await saveFile(file, categoryId, department);
        
        // Обновляем прогресс
        setUploadingFiles(prev => prev.map((item, index) => 
          index === i ? { ...item, progress: 100, status: 'success' } : item
        ));

        uploadedFiles.push(savedFile);
        console.log('✅ Файл успешно загружен:', file.name);
        
      } catch (error: any) {
        console.error('❌ Ошибка загрузки файла:', file.name, error);
        
        setUploadingFiles(prev => prev.map((item, index) => 
          index === i ? { 
            ...item, 
            progress: 0, 
            status: 'error', 
            error: error.message 
          } : item
        ));

        toast.error(`Ошибка загрузки файла "${file.name}": ${error.message}`);
      }
    }

    // Уведомляем о завершении
    if (uploadedFiles.length > 0) {
      toast.success(`Успешно загружено ${uploadedFiles.length} из ${acceptedFiles.length} файлов`);
      onUploadComplete?.(uploadedFiles);
    }

    // Очищаем состояние через 3 секунды
    setTimeout(() => {
      setUploadingFiles([]);
    }, 3000);

  }, [department, categoryId, maxFiles, maxSize, saveFile, onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    maxSize,
    accept: acceptedFileTypes.includes('*') ? undefined : {
      'application/pdf': ['.pdf'],
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    }
  });

  const removeUploadingFile = (index: number) => {
    setUploadingFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full space-y-4">
      <Card>
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer
              transition-colors duration-200 hover:border-primary hover:bg-primary/5
              ${isDragActive ? 'border-primary bg-primary/10' : ''}
            `}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            {isDragActive ? (
              <p className="text-lg text-primary">Отпустите файлы для загрузки...</p>
            ) : (
              <div>
                <p className="text-lg mb-2">Перетащите файлы сюда или нажмите для выбора</p>
                <p className="text-sm text-gray-500">
                  Максимум {maxFiles} файлов, до {Math.round(maxSize / 1024 / 1024)}MB каждый
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {uploadingFiles.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-4">Загрузка файлов</h3>
            <div className="space-y-3">
              {uploadingFiles.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <File className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.file.name}</p>
                    <p className="text-xs text-gray-500">
                      {Math.round(item.file.size / 1024)} KB
                    </p>
                    
                    {item.status === 'uploading' && (
                      <Progress value={item.progress} className="w-full h-2 mt-2" />
                    )}
                    
                    {item.status === 'error' && item.error && (
                      <p className="text-xs text-red-600 mt-1">{item.error}</p>
                    )}
                  </div>
                  
                  <div className="flex-shrink-0">
                    {item.status === 'uploading' && (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                    )}
                    {item.status === 'success' && (
                      <Check className="w-5 h-5 text-green-600" />
                    )}
                    {item.status === 'error' && (
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    )}
                    {item.status !== 'uploading' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeUploadingFile(index)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
