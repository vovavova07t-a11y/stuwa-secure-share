
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileCard } from './FileCard';
import { FileTransferModal } from './interdepartment/FileTransferModal';
import { useSupabaseFiles } from '@/hooks/useSupabaseFiles';
import { getCurrentDepartmentFromPath } from './interdepartment/utils/departmentUtils';
import { useToast } from '@/hooks/use-toast';
import { 
  Search,
  Filter,
  SortAsc,
  FileText,
  Upload,
  Grid3X3,
  List
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';

interface CategoryFilesGridProps {
  categoryId: string;
  categoryTitle: string;
  onUploadClick: () => void;
  showUploadButton?: boolean;
}

type SortOption = 'name' | 'date' | 'size' | 'type';
type ViewMode = 'grid' | 'list';

export const CategoryFilesGrid: React.FC<CategoryFilesGridProps> = ({
  categoryId,
  categoryTitle,
  onUploadClick,
  showUploadButton = true
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const { toast } = useToast();

  const currentDepartment = getCurrentDepartmentFromPath();
  const { files, isLoading, deleteFile } = useSupabaseFiles(currentDepartment, categoryId);

  // Filter and sort files
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

  const handleSendFile = (file: any) => {
    setSelectedFile({
      id: file.id,
      name: file.file_name,
      url: file.file_url,
      size: file.file_size,
      type: file.file_type || 'document'
    });
    setShowTransferModal(true);
  };

  const handleDeleteFile = async (file: any) => {
    if (window.confirm(`Удалить файл "${file.file_name}"?`)) {
      try {
        await deleteFile(file.id);
        toast({
          title: 'Файл удален',
          description: `Файл "${file.file_name}" успешно удален`
        });
      } catch (error) {
        toast({
          title: 'Ошибка',
          description: 'Не удалось удалить файл',
          variant: 'destructive'
        });
      }
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
    <>
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{categoryTitle}</CardTitle>
            {showUploadButton && (
              <Button onClick={onUploadClick} className="btn-primary">
                <Upload className="w-4 h-4 mr-2" />
                Загрузить документ
              </Button>
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

              {/* View Mode */}
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
                <FileCard
                  key={file.id}
                  file={file}
                  onSend={handleSendFile}
                  onDelete={handleDeleteFile}
                />
              ))}
            </div>
          ) : files.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Нет загруженных документов</h3>
              <p className="text-muted-foreground mb-4">
                Нажмите "Загрузить документ" чтобы добавить файлы в эту категорию
              </p>
              {showUploadButton && (
                <Button onClick={onUploadClick} className="btn-primary">
                  <Upload className="w-4 h-4 mr-2" />
                  Загрузить первый документ
                </Button>
              )}
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

      {/* Transfer Modal */}
      {showTransferModal && selectedFile && (
        <FileTransferModal
          isOpen={showTransferModal}
          onClose={() => {
            setShowTransferModal(false);
            setSelectedFile(null);
          }}
          file={selectedFile}
          currentDepartment={currentDepartment}
          onSuccess={() => {
            setShowTransferModal(false);
            setSelectedFile(null);
            toast({
              title: 'Файл отправлен',
              description: 'Файл успешно отправлен в другой отдел'
            });
          }}
        />
      )}
    </>
  );
};
