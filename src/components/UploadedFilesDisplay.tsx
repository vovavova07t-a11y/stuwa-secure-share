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
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface UploadedFile {
  id: string;
  file_name: string;
  file_size: number;
  file_type: string;
  file_url: string;
  category_id: string;
  uploaded_by?: string;
  created_at: string;
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
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const loadFiles = React.useCallback(async () => {
    try {
      setLoading(true);
      console.log(`Загрузка файлов для категории ${categoryId} из базы данных`);
      
      const { data, error } = await supabase
        .from('uploaded_files')
        .select('*')
        .eq('category_id', categoryId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Ошибка загрузки файлов из базы данных:', error);
        return;
      }

      console.log(`Загружены файлы из БД для категории ${categoryId}:`, data);
      setFiles(data || []);
    } catch (error) {
      console.error('Ошибка при загрузке файлов:', error);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    loadFiles();

    // Подписываемся на изменения в таблице uploaded_files
    const subscription = supabase
      .channel('uploaded_files_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'uploaded_files',
          filter: `category_id=eq.${categoryId}`,
        },
        (payload) => {
          console.log('Получено изменение в таблице uploaded_files:', payload);
          loadFiles(); // Перезагружаем файлы при любом изменении
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [loadFiles]);

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
    const link = window.document.createElement('a');
    link.href = file.file_url;
    link.download = file.file_name;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  };

  const handleDelete = async (file: UploadedFile) => {
    try {
      const { error } = await supabase
        .from('uploaded_files')
        .delete()
        .eq('id', file.id);

      if (error) {
        console.error('Ошибка удаления файла:', error);
        toast({
          title: "Ошибка",
          description: "Не удалось удалить файл",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Успех",
        description: "Файл успешно удален"
      });

      if (onFileDelete) {
        onFileDelete(file.id);
      }
      
      // Файлы обновятся автоматически через подписку
    } catch (error) {
      console.error('Ошибка удаления файла:', error);
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при удалении файла",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p className="text-sm text-muted-foreground">Загрузка документов...</p>
        </CardContent>
      </Card>
    );
  }

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
                    {getFileIcon(file.file_name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{file.file_name}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{formatFileSize(file.file_size)}</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(file.created_at)}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {file.file_type.split('/')[1]?.toUpperCase() || 'FILE'}
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
                  
                  {(user?.id === file.uploaded_by || user?.email === 'edikkim20@gmail.com') && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(file)}
                      className="hover:bg-destructive/10 text-destructive"
                      title="Удалить"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
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
            title: selectedFile.file_name,
            file_name: selectedFile.file_name,
            file_url: selectedFile.file_url,
            file_type: selectedFile.file_type,
            file_size: selectedFile.file_size,
            created_at: selectedFile.created_at,
            version: '1.0',
            download_count: 0,
            description: ''
          }}
        />
      )}
    </>
  );
};
