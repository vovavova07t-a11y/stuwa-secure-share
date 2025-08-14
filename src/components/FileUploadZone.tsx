
import React, { useState, useCallback } from 'react';
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadZoneProps {
  onFileUpload?: (files: File[]) => void;
  maxFileSize?: number; // в байтах
  allowedTypes?: string[];
}

export const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  onFileUpload,
  maxFileSize = 10 * 1024 * 1024, // 10MB по умолчанию
  allowedTypes = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'jpeg', 'png']
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  const validateFile = (file: File): boolean => {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    return allowedTypes.includes(fileExtension || '') && file.size <= maxFileSize;
  };

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(validateFile);
    
    if (validFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...validFiles]);
      setUploadStatus('uploading');
      
      // Симуляция загрузки
      setTimeout(() => {
        setUploadStatus('success');
        onFileUpload?.(validFiles);
      }, 2000);
    } else {
      setUploadStatus('error');
    }
  }, [maxFileSize, allowedTypes, onFileUpload]);

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
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div
        className={`upload-zone p-8 rounded-2xl text-center transition-all duration-300 ${
          dragActive ? 'dragover' : ''
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          onChange={handleFileInput}
          className="hidden"
          id="fileInput"
          accept={allowedTypes.map(type => `.${type}`).join(',')}
        />
        
        <div className="space-y-4">
          <div className="feature-icon mx-auto">
            <Upload className="w-8 h-8" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Перетащите файлы сюда или 
              <label htmlFor="fileInput" className="text-primary cursor-pointer hover:text-primary-hover ml-1">
                выберите файлы
              </label>
            </h3>
            <p className="text-sm text-muted-foreground">
              Поддерживаются: {allowedTypes.join(', ')} 
              <br />
              Максимальный размер: {formatFileSize(maxFileSize)}
            </p>
          </div>

          {uploadStatus === 'uploading' && (
            <div className="animate-pulse">
              <p className="text-sm text-primary">Загрузка файлов...</p>
            </div>
          )}

          {uploadStatus === 'success' && (
            <div className="flex items-center justify-center space-x-2 text-success">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm">Файлы успешно загружены</span>
            </div>
          )}

          {uploadStatus === 'error' && (
            <div className="flex items-center justify-center space-x-2 text-destructive">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">Ошибка загрузки файлов</span>
            </div>
          )}
        </div>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Загруженные файлы ({uploadedFiles.length})</h4>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="glass-card p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <File className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
