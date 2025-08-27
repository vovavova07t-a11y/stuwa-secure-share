
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSupabaseFiles } from '@/hooks/useSupabaseFiles';
import { useToast } from '@/hooks/use-toast';
import { 
  Download,
  FileText,
  Eye,
  Calendar,
  HardDrive,
  Loader2
} from 'lucide-react';

interface OrganizerDepartmentFilesProps {
  department: string;
  departmentTitle: string;
  categories: Array<{
    id: string;
    title: string;
  }>;
}

export const OrganizerDepartmentFiles: React.FC<OrganizerDepartmentFilesProps> = ({
  department,
  departmentTitle,
  categories
}) => {
  const { toast } = useToast();
  const [allFiles, setAllFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Функция для загрузки всех файлов отдела
  const loadAllDepartmentFiles = async () => {
    setIsLoading(true);
    try {
      const filesPromises = categories.map(async (category) => {
        // Используем хук для каждой категории
        const { files } = useSupabaseFiles(department, category.id);
        return files.map(file => ({
          ...file,
          categoryTitle: category.title,
          departmentTitle
        }));
      });

      const allCategoryFiles = await Promise.all(filesPromises);
      const flatFiles = allCategoryFiles.flat();
      
      setAllFiles(flatFiles);
      console.log(`📁 Загружено ${flatFiles.length} файлов из отдела ${department}`);
    } catch (error) {
      console.error('Ошибка загрузки файлов отдела:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить файлы отдела',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAllDepartmentFiles();
  }, [department, categories]);

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

  const handleDownload = async (file: any) => {
    try {
      console.log('⬇️ Организатор скачивает файл:', file.file_name);
      
      if (file.file_url) {
        const link = document.createElement('a');
        link.href = file.file_url;
        link.download = file.file_name;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
          title: 'Файл скачан',
          description: `${file.file_name} из ${file.categoryTitle}`,
          duration: 3000
        });
      }
    } catch (error) {
      console.error('❌ Ошибка скачивания:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось скачать файл',
        variant: 'destructive'
      });
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return '🖼️';
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('doc')) return '📝';
    if (fileType.includes('xls') || fileType.includes('sheet')) return '📊';
    if (fileType.includes('zip') || fileType.includes('rar')) return '📦';
    return '📄';
  };

  if (isLoading) {
    return (
      <Card className="glass-card">
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2">Загрузка файлов отдела...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HardDrive className="w-5 h-5" />
          Файлы отдела: {departmentTitle}
          <Badge variant="default">{allFiles.length}</Badge>
          <Badge variant="outline" className="gap-1">
            <Eye className="w-3 h-3" />
            Организатор
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {allFiles.length > 0 ? (
          <div className="space-y-4">
            {/* Группировка по категориям */}
            {categories.map((category) => {
              const categoryFiles = allFiles.filter(file => 
                file.category_id === category.id
              );
              
              if (categoryFiles.length === 0) return null;

              return (
                <div key={category.id} className="border-l-4 border-primary/20 pl-4">
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    {category.title}
                    <Badge variant="secondary">{categoryFiles.length}</Badge>
                  </h4>
                  
                  <div className="grid gap-3">
                    {categoryFiles.map((file) => (
                      <div 
                        key={file.id} 
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="text-2xl">{getFileIcon(file.file_type)}</div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-medium text-sm truncate">{file.file_name}</h5>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                              <span>{formatFileSize(file.file_size)}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(file.uploaded_at)}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownload(file)}
                          className="hover:bg-success/10 text-success gap-1"
                        >
                          <Download className="w-4 h-4" />
                          Скачать
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>В этом отделе пока нет файлов</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
