
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
  AlertTriangle
} from 'lucide-react';
import { DocumentViewer } from './DocumentViewer';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
  const [files, setFiles] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [showViewer, setShowViewer] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadFiles();
    
    const subscription = supabase
      .channel(`files_${categoryId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'documents',
          filter: `category=eq.${categoryId}`
        },
        () => {
          loadFiles();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [categoryId]);

  const loadFiles = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('category', categoryId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading files:', error);
        throw error;
      }

      const transformedData: FileData[] = data?.map(doc => ({
        id: doc.id,
        file_name: doc.file_name || doc.title || 'Безымянный файл',
        file_url: doc.file_url || '',
        file_type: doc.file_type || 'application/octet-stream',
        file_size: doc.file_size || 0,
        category_id: categoryId,
        uploaded_at: doc.created_at || new Date().toISOString(),
        uploaded_by: doc.created_by
      })) || [];

      console.log(`Loaded ${transformedData.length} files for category ${categoryId}`);
      setFiles(transformedData);

      const localFiles = localStorage.getItem(`files_${categoryId}`);
      if (localFiles && transformedData.length === 0) {
        try {
          const parsedLocalFiles = JSON.parse(localFiles);
          if (Array.isArray(parsedLocalFiles) && parsedLocalFiles.length > 0) {
            const localFilesData = parsedLocalFiles.map((f: any) => ({
              id: f.id,
              file_name: f.file?.name || f.file_name || 'Файл',
              file_url: f.file ? URL.createObjectURL(f.file) : f.file_url,
              file_type: f.file?.type || f.file_type || 'application/octet-stream',
              file_size: f.file?.size || f.file_size || 0,
              category_id: categoryId,
              uploaded_at: f.uploadedAt || f.uploaded_at || new Date().toISOString()
            }));
            setFiles(localFilesData);
          }
        } catch (e) {
          console.error('Error parsing localStorage:', e);
        }
      }
    } catch (error) {
      console.error('Error loading files:', error);
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
    try {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', fileId);

      if (error) {
        console.error('Error deleting file:', error);
        throw error;
      }

      setFiles(prev => prev.filter(f => f.id !== fileId));
      
      const localFiles = localStorage.getItem(`files_${categoryId}`);
      if (localFiles) {
        try {
          const parsedFiles = JSON.parse(localFiles);
          const updatedFiles = parsedFiles.filter((f: any) => f.id !== fileId);
          localStorage.setItem(`files_${categoryId}`, JSON.stringify(updatedFiles));
        } catch (e) {
          console.error('Error updating localStorage:', e);
        }
      }

      toast({
        title: "Файл удален",
        description: "Файл успешно удален",
      });
    } catch (error) {
      console.error('Error deleting file:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить файл",
        variant: "destructive",
      });
    } finally {
      setShowDeleteConfirm(null);
    }
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

  if (files.length === 0) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Файлы в категории: {categoryTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">Файлы не загружены</p>
            <p className="text-sm">Загрузите файлы с помощью кнопки "Загрузить файлы" выше</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Файлы в категории: {categoryTitle} ({files.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
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

                    <div className="flex flex-wrap gap-1 justify-center">
                      {canViewInline(file.file_type, file.file_name) && (
                        <Badge variant="secondary" className="text-xs">
                          Просмотр
                        </Badge>
                      )}
                    </div>

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
                        onClick={() => setShowDeleteConfirm(file.id)}
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
        </CardContent>
      </Card>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="glass-card w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="w-5 h-5" />
                Подтверждение удаления
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Вы уверены, что хотите удалить этот файл? Это действие нельзя отменить.</p>
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteFile(showDeleteConfirm)}
                  className="flex-1"
                >
                  Удалить
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1"
                >
                  Отмена
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showViewer && selectedFile && (
        <DocumentViewer
          document={selectedFile}
          onClose={() => {
            setShowViewer(false);
            setSelectedFile(null);
          }}
        />
      )}
    </>
  );
};
