
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  Eye, 
  Send, 
  Trash2, 
  Image as ImageIcon, 
  File, 
  FileSpreadsheet,
  Calendar,
  AlertTriangle,
  X,
  RefreshCw
} from 'lucide-react';
import { DocumentViewer } from './DocumentViewer';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useFileContext } from '@/contexts/FileContext';

interface FileData {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  category_id: string;
  uploaded_at: string;
  uploaded_by?: string;
}

interface PersistentFileDisplayProps {
  categoryId: string;
  categoryTitle: string;
  onSendToOtherDepartment?: (file: FileData) => void;
}

export const PersistentFileDisplay: React.FC<PersistentFileDisplayProps> = ({
  categoryId,
  categoryTitle,
  onSendToOtherDepartment
}) => {
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [showViewer, setShowViewer] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const { toast } = useToast();
  const { getFiles, removeFile, addFiles, getCategoryFilesCount, clearUnknownFiles } = useFileContext();

  const files = getFiles(categoryId);

  useEffect(() => {
    loadFiles();
  }, [categoryId]);

  // Добавляем обработчик клавиши Escape для модального окна удаления
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showDeleteConfirm) {
        console.log('🔒 Закрытие модального окна удаления по Escape');
        setShowDeleteConfirm(null);
      }
    };

    if (showDeleteConfirm) {
      // Блокируем прокрутку фона
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [showDeleteConfirm]);

  const loadFiles = async () => {
    try {
      setLoading(true);
      console.log('📁 Загрузка файлов для категории:', categoryId);
      
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('category', categoryId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Ошибка загрузки файлов:', error);
        throw error;
      }

      if (data && data.length > 0) {
        const transformedData: FileData[] = data.map(doc => ({
          id: doc.id,
          file_name: doc.file_name || doc.title || 'Файл',
          file_url: doc.file_url || '',
          file_type: doc.file_type || 'application/octet-stream',
          file_size: doc.file_size || 0,
          category_id: categoryId,
          uploaded_at: doc.created_at || new Date().toISOString(),
          uploaded_by: doc.created_by
        }));

        console.log(`✅ Загружено ${transformedData.length} файлов для категории ${categoryId}`);
        addFiles(categoryId, transformedData);
      } else {
        console.log(`📂 Нет файлов в категории ${categoryId}`);
      }

    } catch (error) {
      console.error('❌ Ошибка загрузки файлов:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить файлы",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getFileIcon = (fileType: string, fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    if (fileType.startsWith('image/') || ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) {
      return <ImageIcon className="w-8 h-8 text-blue-500" />;
    }
    
    if (fileType === 'application/pdf' || extension === 'pdf') {
      return <FileText className="w-8 h-8 text-red-500" />;
    }
    
    if (['xls', 'xlsx', 'csv'].includes(extension || '') || fileType.includes('spreadsheet')) {
      return <FileSpreadsheet className="w-8 h-8 text-green-600" />;
    }
    
    if (['doc', 'docx'].includes(extension || '') || fileType.includes('document')) {
      return <FileText className="w-8 h-8 text-blue-600" />;
    }
    
    return <File className="w-8 h-8 text-gray-500" />;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewFile = (file: FileData) => {
    console.log('👁️ Открытие файла для просмотра:', file.file_name);
    const documentForViewer = {
      id: file.id,
      title: file.file_name,
      file_name: file.file_name,
      file_url: file.file_url,
      file_type: file.file_type,
      file_size: file.file_size,
      created_at: file.uploaded_at,
      download_count: 0,
      version: 1,
      description: ''
    };
    
    setSelectedFile(documentForViewer);
    setShowViewer(true);
  };

  const handleDownload = (file: FileData) => {
    console.log('📥 Скачивание файла:', file.file_name);
    const link = document.createElement('a');
    link.href = file.file_url;
    link.download = file.file_name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Скачивание началось",
      description: `Файл ${file.file_name} скачивается`,
    });
  };

  const handleSendFile = (file: FileData) => {
    console.log('📤 Отправка файла:', file.file_name);
    if (onSendToOtherDepartment) {
      onSendToOtherDepartment(file);
    } else {
      toast({
        title: "Отправка файла",
        description: `Файл ${file.file_name} отправлен в другой отдел`,
      });
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    console.log('🗑️ Начало удаления файла с ID:', fileId);
    
    try {
      const fileToDelete = files.find(f => f.id === fileId);
      if (!fileToDelete) {
        console.error('❌ Файл не найден для удаления:', fileId);
        return;
      }

      console.log('🗑️ Удаление файла из Supabase:', fileToDelete.file_name);
      
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', fileId);

      if (error) {
        console.error('❌ Ошибка удаления из Supabase:', error);
        throw error;
      }

      // Удаляем из глобального состояния
      removeFile(categoryId, fileId);
      
      // Закрываем модальное окно и восстанавливаем прокрутку
      setShowDeleteConfirm(null);
      console.log('🔒 Модальное окно удаления закрыто');

      toast({
        title: "Файл удален",
        description: `Файл ${fileToDelete.file_name} успешно удален`,
      });

    } catch (error) {
      console.error('❌ Ошибка при удалении файла:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить файл",
        variant: "destructive",
      });
    }
  };

  const handleCancelDelete = () => {
    console.log('❌ Отмена удаления файла');
    setShowDeleteConfirm(null);
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      console.log('🔒 Закрытие модального окна удаления по клику на backdrop');
      setShowDeleteConfirm(null);
    }
  };

  const handleClearAllFiles = () => {
    console.log('🧹 Очистка всех файлов из категории:', categoryId);
    clearUnknownFiles();
    toast({
      title: "Файлы очищены",
      description: "Все неизвестные файлы удалены из всех категорий",
    });
  };

  const canViewInline = (fileType: string, fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return fileType.startsWith('image/') || 
           fileType === 'application/pdf' || 
           extension === 'pdf' ||
           ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '');
  };

  if (loading) {
    return (
      <Card className="glass-card">
        <CardContent className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2 text-muted-foreground">Загрузка файлов...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="glass-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Файлы в категории: {categoryTitle}
              {files.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  📊 {files.length} файл{files.length > 1 ? (files.length > 4 ? 'ов' : 'а') : ''}
                </Badge>
              )}
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={loadFiles}
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Обновить
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleClearAllFiles}
                className="flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Очистить все
              </Button>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            💡 Файлы сохраняются в рамках текущей сессии. При обновлении страницы файлы исчезнут.
          </div>
        </CardHeader>
        <CardContent>
          {files.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">Файлы не загружены</p>
              <p className="text-sm">Загрузите файлы с помощью кнопки "Загрузить файлы" выше</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {files.map((file) => (
                <Card key={file.id} className="glass-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                        {getFileIcon(file.file_type, file.file_name)}
                      </div>
                      
                      <div className="text-center space-y-1 w-full">
                        <p className="font-medium text-sm truncate" title={file.file_name}>
                          {file.file_name}
                        </p>
                        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                          <span>{formatFileSize(file.file_size)}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(file.uploaded_at)}
                          </span>
                        </div>
                      </div>

                      {canViewInline(file.file_type, file.file_name) && (
                        <div className="flex flex-wrap gap-1 justify-center">
                          <Badge variant="secondary" className="text-xs">
                            Просмотр
                          </Badge>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1 w-full">
                        {canViewInline(file.file_type, file.file_name) && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewFile(file)}
                            className="flex-1 text-xs"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            Открыть
                          </Button>
                        )}
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(file)}
                          className="flex-1 text-xs"
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Скачать
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSendFile(file)}
                          className="flex-1 text-xs"
                        >
                          <Send className="w-3 h-3 mr-1" />
                          Отправить
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            console.log('🗑️ Открытие модального окна удаления для файла:', file.file_name);
                            setShowDeleteConfirm(file.id);
                          }}
                          className="flex-1 text-xs text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Удалить
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* МОДАЛЬНОЕ ОКНО УДАЛЕНИЯ */}
      {showDeleteConfirm && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
        >
          <Card className="glass-card w-full max-w-md">
            <CardHeader className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancelDelete}
                className="absolute right-2 top-2 h-8 w-8 p-0"
                aria-label="Закрыть"
              >
                <X className="w-4 h-4" />
              </Button>
              <CardTitle id="delete-dialog-title" className="flex items-center gap-2 text-destructive pr-10">
                <AlertTriangle className="w-5 h-5" />
                Подтверждение удаления
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Вы уверены, что хотите удалить этот файл? Это действие нельзя отменить.
              </p>
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteFile(showDeleteConfirm)}
                  className="flex-1"
                  autoFocus
                >
                  Удалить
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancelDelete}
                  className="flex-1"
                >
                  Отмена
                </Button>
              </div>
              
              <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded text-xs text-yellow-800 dark:text-yellow-200">
                💡 Подсказка: Нажмите Escape или кликните вне окна для отмены
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showViewer && selectedFile && (
        <DocumentViewer
          document={selectedFile}
          onClose={() => {
            console.log('🔒 Закрытие просмотрщика документов');
            setShowViewer(false);
            setSelectedFile(null);
          }}
        />
      )}
    </>
  );
};
