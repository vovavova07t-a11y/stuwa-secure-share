
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileCard } from './FileCard';
import { useSupabaseFiles } from '@/hooks/useSupabaseFiles';
import { useToast } from '@/hooks/use-toast';
import { 
  Search,
  SortAsc,
  FileText,
  Download,
  Eye,
  Grid3X3,
  List,
  CheckCircle
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface OrganizerFileSectionProps {
  categoryId: string;
  categoryTitle: string;
  department: string;
  isViewOnly?: boolean;
}

type SortOption = 'name' | 'date' | 'size' | 'type';
type ViewMode = 'grid' | 'list';

export const OrganizerFileSection: React.FC<OrganizerFileSectionProps> = ({
  categoryId,
  categoryTitle,
  department,
  isViewOnly = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [downloadingFiles, setDownloadingFiles] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const { files, isLoading, loadFiles } = useSupabaseFiles(department, categoryId);

  // Фильтрация и сортировка файлов
  const filteredAndSortedFiles = React.useMemo(() => {
    let filtered = files.filter(file => 
      file.file_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.file_name.localeCompare(b.file_name);
        case 'date':
          return new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime();
        case 'size':
          return b.file_size - a.file_size;
        case 'type':
          const aExt = a.file_name.split('.').pop() || '';
          const bExt = b.file_name.split('.').pop() || '';
          return aExt.localeCompare(bExt);
        default:
          return 0;
      }
    });

    return filtered;
  }, [files, searchQuery, sortBy]);

  const logOrganizerDownload = async (file: any) => {
    try {
      // Логирование скачивания организатором
      console.log('Organizer download:', {
        department,
        category: categoryId,
        fileName: file.file_name,
        fileId: file.id,
        timestamp: new Date().toISOString()
      });
      
      toast({
        title: 'Файл скачан',
        description: `${file.file_name} - действие зарегистрировано`,
        duration: 3000
      });
    } catch (error) {
      console.error('Failed to log organizer download:', error);
    }
  };

  const handleFileDownload = async (file: any) => {
    if (downloadingFiles.has(file.id)) return;

    setDownloadingFiles(prev => new Set(prev).add(file.id));

    try {
      // Проверяем доступность файла
      const response = await fetch(file.file_url, { method: 'HEAD' });
      
      if (!response.ok) {
        throw new Error('Файл недоступен для скачивания');
      }

      // Скачивание файла
      const link = document.createElement('a');
      link.href = file.file_url;
      link.download = file.file_name;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      // Добавляем временно в DOM и кликаем
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Логирование для организатора
      await logOrganizerDownload(file);
      
    } catch (error: any) {
      console.error('Download error:', error);
      toast({
        title: 'Ошибка скачивания',
        description: error.message || 'Не удалось скачать файл',
        variant: 'destructive'
      });
    } finally {
      setTimeout(() => {
        setDownloadingFiles(prev => {
          const newSet = new Set(prev);
          newSet.delete(file.id);
          return newSet;
        });
      }, 1000);
    }
  };

  const handleBulkDownload = async () => {
    if (filteredAndSortedFiles.length === 0) return;

    toast({
      title: 'Массовое скачивание',
      description: `Начинаем скачивание ${filteredAndSortedFiles.length} файлов...`
    });

    for (const file of filteredAndSortedFiles) {
      await handleFileDownload(file);
      // Небольшая задержка между скачиваниями
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  if (isLoading) {
    return (
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            {categoryTitle}
            {isViewOnly && (
              <Badge variant="outline" className="gap-1">
                <Eye className="w-3 h-3" />
                Просмотр
              </Badge>
            )}
            {files.length > 0 && (
              <span className="ml-2 text-sm text-green-600 font-normal">
                ({files.length} файл{files.length === 1 ? '' : files.length < 5 ? 'а' : 'ов'})
              </span>
            )}
          </CardTitle>

          {files.length > 0 && isViewOnly && (
            <Button
              onClick={handleBulkDownload}
              className="gap-2"
              variant="outline"
            >
              <Download className="w-4 h-4" />
              Скачать все ({filteredAndSortedFiles.length})
            </Button>
          )}
        </div>

        {files.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            {/* Поиск */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Поиск файлов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Сортировка */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <SortAsc className="w-4 h-4" />
                  Сортировка
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortBy('date')}>
                  По дате (новые первые)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('name')}>
                  По алфавиту
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('size')}>
                  По размеру
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('type')}>
                  По типу файла
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Режим просмотра */}
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent>
        {filteredAndSortedFiles.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
              : 'space-y-2'
          }>
            {filteredAndSortedFiles.map((file) => (
              <div key={file.id} className="relative group">
                <FileCard
                  file={file}
                  onSend={isViewOnly ? undefined : undefined}
                  onDelete={isViewOnly ? undefined : undefined}
                />
                
                {/* Кнопка скачивания для организаторов */}
                {isViewOnly && (
                  <div className="absolute top-2 right-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="opacity-0 group-hover:opacity-100 transition-opacity gap-1"
                      onClick={() => handleFileDownload(file)}
                      disabled={downloadingFiles.has(file.id)}
                    >
                      {downloadingFiles.has(file.id) ? (
                        <>
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          Скачано
                        </>
                      ) : (
                        <>
                          <Download className="w-3 h-3" />
                          Скачать
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : files.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Нет документов</h3>
            <p className="text-muted-foreground">
              {isViewOnly 
                ? 'В этой категории пока нет документов для просмотра'
                : 'Нажмите "Загрузить файлы" чтобы добавить файлы в эту категорию'
              }
            </p>
          </div>
        ) : (
          <div className="text-center py-8">
            <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Нет файлов, соответствующих запросу "{searchQuery}"
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
