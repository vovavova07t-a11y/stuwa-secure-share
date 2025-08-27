
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileCard } from './FileCard';
import { useToast } from '@/hooks/use-toast';
import { useSupabaseFiles } from '@/hooks/useSupabaseFiles';
import { 
  Search,
  SortAsc,
  FileText,
  Download,
  Eye,
  Grid3X3,
  List,
  Loader2
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
  const { toast } = useToast();

  // Загружаем РЕАЛЬНЫЕ файлы из базы данных
  const { files, isLoading } = useSupabaseFiles(department, categoryId);

  console.log(`📋 OrganizerFileSection: Загружено ${files.length} РЕАЛЬНЫХ файлов для ${department}/${categoryId}`);
  console.log('📁 Файлы:', files.map(f => f.file_name));

  // Фильтрация и сортировка РЕАЛЬНЫХ файлов
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

  // Функция скачивания РЕАЛЬНЫХ файлов для организаторов
  const handleFileDownload = async (file: any) => {
    try {
      console.log('🔽 Организатор скачивает РЕАЛЬНЫЙ файл:', {
        fileName: file.file_name,
        fileUrl: file.file_url,
        department,
        category: categoryId,
        fileSize: file.file_size
      });

      if (file.file_url) {
        const link = document.createElement('a');
        link.href = file.file_url;
        link.download = file.file_name;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('✅ РЕАЛЬНЫЙ файл успешно скачан организатором:', file.file_name);
        
        toast({
          title: 'Файл скачан',
          description: `${file.file_name} открыт для скачивания`
        });
      } else {
        throw new Error('URL файла не найден');
      }
      
    } catch (error) {
      console.error('❌ Ошибка при скачивании РЕАЛЬНОГО файла организатором:', error);
      toast({
        title: 'Ошибка скачивания',
        description: 'Не удалось скачать файл',
        variant: 'destructive'
      });
    }
  };

  // Функция скачивания всех РЕАЛЬНЫХ файлов
  const handleDownloadAll = async () => {
    if (filteredAndSortedFiles.length === 0) {
      toast({
        title: 'Нет файлов',
        description: 'Нет РЕАЛЬНЫХ файлов для скачивания',
        variant: 'destructive'
      });
      return;
    }

    console.log(`🔽 Организатор скачивает ВСЕ ${filteredAndSortedFiles.length} РЕАЛЬНЫХ файлов из ${department}/${categoryId}`);

    toast({
      title: 'Скачивание файлов',
      description: `Начинается скачивание ${filteredAndSortedFiles.length} РЕАЛЬНЫХ файлов...`
    });

    for (const file of filteredAndSortedFiles) {
      try {
        await handleFileDownload(file);
        // Небольшая задержка между скачиваниями
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`Ошибка скачивания РЕАЛЬНОГО файла ${file.file_name}:`, error);
      }
    }
  };

  if (isLoading) {
    return (
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2">Загрузка РЕАЛЬНЫХ файлов...</span>
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
                ({files.length} РЕАЛЬН{files.length === 1 ? 'ЫЙ' : files.length < 5 ? 'ЫХ' : 'ЫХ'} файл{files.length === 1 ? '' : files.length < 5 ? 'а' : 'ов'})
              </span>
            )}
          </CardTitle>
          
          {files.length > 0 && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadAll}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Скачать все РЕАЛЬНЫЕ
              </Button>
            </div>
          )}
        </div>

        {files.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Поиск РЕАЛЬНЫХ файлов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Sort */}
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

            {/* View mode */}
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
                  onSend={undefined}
                  onDelete={undefined}
                />
                
                {/* Кнопка скачивания РЕАЛЬНЫХ файлов для организаторов */}
                <div className="absolute top-2 right-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="opacity-0 group-hover:opacity-100 transition-opacity gap-1"
                    onClick={() => handleFileDownload(file)}
                  >
                    <Download className="w-3 h-3" />
                    Скачать
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : files.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Нет РЕАЛЬНЫХ документов</h3>
            <p className="text-muted-foreground">
              В этой категории пока нет РЕАЛЬНЫХ документов для просмотра
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Отдел: {department} | Категория: {categoryId}
            </p>
          </div>
        ) : (
          <div className="text-center py-8">
            <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Нет РЕАЛЬНЫХ файлов, соответствующих запросу "{searchQuery}"
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
