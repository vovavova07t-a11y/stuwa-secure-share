
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  Eye, 
  Send, 
  Trash2, 
  Calendar,
  HardDrive,
  Loader2
} from 'lucide-react';
import { useSupabaseFiles, type FileData } from '@/hooks/useSupabaseFiles';
import { getCurrentDepartmentFromPath } from './interdepartment/utils/departmentUtils';
import { useToast } from '@/hooks/use-toast';

interface PersistentFileDisplayProps {
  categoryId: string;
  categoryTitle?: string;
  onSendToOtherDepartment?: (file: FileData) => void;
}

export const PersistentFileDisplay: React.FC<PersistentFileDisplayProps> = ({
  categoryId,
  categoryTitle = "Документы",
  onSendToOtherDepartment
}) => {
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const currentDepartment = getCurrentDepartmentFromPath();
  const { files, isLoading, deleteFile } = useSupabaseFiles(currentDepartment, categoryId);
  const { toast } = useToast();

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return '🖼️';
    } else if (fileType.includes('pdf')) {
      return '📄';
    } else if (fileType.includes('doc')) {
      return '📝';
    } else if (fileType.includes('xls') || fileType.includes('sheet')) {
      return '📊';
    } else if (fileType.includes('zip') || fileType.includes('rar')) {
      return '📦';
    }
    return '📄';
  };

  const handleDownload = async (file: FileData) => {
    try {
      console.log('⬇️ Скачивание файла из Supabase:', file.file_name);
      
      if (file.file_url) {
        // Открываем файл в новой вкладке для скачивания
        const link = document.createElement('a');
        link.href = file.file_url;
        link.download = file.file_name;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('✅ Файл скачан');
        toast({
          title: 'Файл скачан',
          description: `Файл ${file.file_name} успешно скачан`
        });
      } else {
        throw new Error('URL файла недоступен');
      }
    } catch (error) {
      console.error('❌ Ошибка скачивания файла:', error);
      toast({
        title: 'Ошибка скачивания',
        description: 'Не удалось скачать файл',
        variant: 'destructive'
      });
    }
  };

  const handleView = (file: FileData) => {
    setSelectedFile(file);
    console.log('👁️ Просмотр файла:', file.file_name);
  };

  const handleDelete = async (file: FileData) => {
    if (window.confirm(`Вы уверены, что хотите удалить файл "${file.file_name}"?`)) {
      await deleteFile(file.id);
    }
  };

  const handleSend = (file: FileData) => {
    if (onSendToOtherDepartment) {
      onSendToOtherDepartment(file);
    }
  };

  if (isLoading) {
    return (
      <Card className="glass-card">
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2">Загрузка файлов...</span>
        </CardContent>
      </Card>
    );
  }

  if (!files || files.length === 0) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="w-5 h-5" />
            {categoryTitle} - Сохраненные файлы
            <Badge variant="secondary">База данных</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>В этой категории пока нет сохраненных файлов</p>
            <p className="text-sm">Загрузите файлы, и они будут сохранены в базе данных</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="w-5 h-5" />
            {categoryTitle} - Сохраненные файлы
            <Badge variant="default">{files.length}</Badge>
            <Badge variant="secondary">База данных Supabase</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {files.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="text-2xl">{getFileIcon(file.file_type)}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{file.file_name}</h4>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span>{formatFileSize(file.file_size)}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(file.uploaded_at)}
                      </span>
                      <span>•</span>
                      <Badge variant="outline" className="text-xs">
                        {file.department} / {file.category_id}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleView(file)}
                    className="hover:bg-primary/10"
                    title="Просмотр"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownload(file)}
                    className="hover:bg-success/10 text-success"
                    title="Скачать"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSend(file)}
                    className="hover:bg-blue-50 text-blue-600"
                    title="Отправить в другой отдел"
                  >
                    <Send className="w-4 h-4" />
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

      {/* Модальное окно просмотра файла */}
      {selectedFile && (
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Просмотр файла: {selectedFile.file_name}</CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedFile(null)}
              >
                ×
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Имя файла:</span> {selectedFile.file_name}
                  </div>
                  <div>
                    <span className="font-medium">Размер:</span> {formatFileSize(selectedFile.file_size)}
                  </div>
                  <div>
                    <span className="font-medium">Тип:</span> {selectedFile.file_type}
                  </div>
                  <div>
                    <span className="font-medium">Отдел:</span> {selectedFile.department}
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">Дата загрузки:</span> {formatDate(selectedFile.uploaded_at)}
                  </div>
                </div>
              </div>

              {/* Предварительный просмотр */}
              <div className="border rounded-lg overflow-hidden" style={{ height: '400px' }}>
                {selectedFile.file_type === 'application/pdf' ? (
                  <iframe
                    src={selectedFile.file_url}
                    className="w-full h-full"
                    title={selectedFile.file_name}
                  />
                ) : selectedFile.file_type.startsWith('image/') ? (
                  <img
                    src={selectedFile.file_url}
                    alt={selectedFile.file_name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-muted/20">
                    <div className="text-center">
                      <div className="text-4xl mb-4">📄</div>
                      <p className="text-muted-foreground">Предварительный просмотр недоступен</p>
                      <p className="text-sm text-muted-foreground">Нажмите "Скачать" для открытия файла</p>
                      <Button 
                        className="mt-4"
                        onClick={() => handleDownload(selectedFile)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Скачать файл
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2 justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => handleDownload(selectedFile)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Скачать
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => handleSend(selectedFile)}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Отправить
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
