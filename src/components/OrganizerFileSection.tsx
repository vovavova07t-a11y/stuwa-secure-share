
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileCard } from './FileCard';
import { useToast } from '@/hooks/use-toast';
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
  const [files, setFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Load mock files based on department and category
  React.useEffect(() => {
    loadMockFiles();
  }, [department, categoryId]);

  const loadMockFiles = async () => {
    try {
      setIsLoading(true);
      console.log(`🔄 Организатор загружает файлы для отдела: ${department}, категории: ${categoryId}`);
      
      // Create mock files based on department and category
      const mockFiles = generateMockFiles(department, categoryId);
      
      console.log(`📁 Организатор загрузил ${mockFiles.length} файлов из категории ${categoryId}`);
      console.log('📋 Файлы:', mockFiles.map((f: any) => f.file_name));
      
      setFiles(mockFiles);
    } catch (error) {
      console.error('Ошибка при загрузке файлов:', error);
      setFiles([]);
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить файлы',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockFiles = (dept: string, catId: string) => {
    // Generate different mock files based on department and category
    const baseFiles = [
      {
        id: `${dept}_${catId}_1`,
        file_name: `Документ_${catId}_1.pdf`,
        file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        file_size: 1024000,
        department: dept,
        category_id: catId,
        created_at: new Date().toISOString(),
        uploaded_at: new Date().toISOString()
      },
      {
        id: `${dept}_${catId}_2`,
        file_name: `Отчет_${catId}_2.docx`,
        file_url: 'https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-file.pdf',
        file_size: 2048000,
        department: dept,
        category_id: catId,
        created_at: new Date(Date.now() - 86400000).toISOString(),
        uploaded_at: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: `${dept}_${catId}_3`,
        file_name: `Данные_${catId}_3.xlsx`,
        file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        file_size: 512000,
        department: dept,
        category_id: catId,
        created_at: new Date(Date.now() - 172800000).toISOString(),
        uploaded_at: new Date(Date.now() - 172800000).toISOString()
      }
    ];

    return baseFiles;
  };

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
          return new Date(b.uploaded_at || b.created_at).getTime() - new Date(a.uploaded_at || a.created_at).getTime();
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

  // File download function for organizers
  const handleFileDownload = async (file: any) => {
    try {
      console.log('🔽 Организатор скачивает файл:', {
        fileName: file.file_name,
        fileUrl: file.file_url,
        department,
        category: categoryId
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
        
        console.log('✅ Файл успешно скачан организатором:', file.file_name);
        
        toast({
          title: 'Файл скачан',
          description: `${file.file_name} открыт для скачивания`
        });
      } else {
        throw new Error('URL файла не найден');
      }
      
    } catch (error) {
      console.error('❌ Ошибка при скачивании файла организатором:', error);
      toast({
        title: 'Ошибка скачивания',
        description: 'Не удалось скачать файл',
        variant: 'destructive'
      });
    }
  };

  // Function to download all files
  const handleDownloadAll = async () => {
    if (filteredAndSortedFiles.length === 0) {
      toast({
        title: 'Нет файлов',
        description: 'Нет файлов для скачивания',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Скачивание файлов',
      description: `Начинается скачивание ${filteredAndSortedFiles.length} файлов...`
    });

    for (const file of filteredAndSortedFiles) {
      try {
        await handleFileDownload(file);
        // Small delay between downloads
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`Ошибка скачивания файла ${file.file_name}:`, error);
      }
    }
  };

  if (isLoading) {
    return (
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
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
          
          {files.length > 0 && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadAll}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Скачать все
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
                placeholder="Поиск файлов..."
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
                
                {/* Download button for organizers */}
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
            <h3 className="text-lg font-semibold mb-2">Нет документов</h3>
            <p className="text-muted-foreground">
              В этой категории пока нет документов для просмотра
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
