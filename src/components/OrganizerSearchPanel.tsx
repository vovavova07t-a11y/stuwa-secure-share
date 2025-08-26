
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Search, 
  Filter, 
  Download, 
  FileText,
  Calendar,
  SortAsc,
  X
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';

interface SearchFilters {
  departments: string[];
  fileTypes: string[];
  dateRange: string;
  sortBy: string;
}

export const OrganizerSearchPanel: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    departments: [],
    fileTypes: [],
    dateRange: '',
    sortBy: 'date'
  });
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());

  const departments = [
    { id: 'financial', name: 'Финансовая дирекция' },
    { id: 'technical', name: 'Техническая дирекция' },
    { id: 'logistics', name: 'Управление логистики' },
    { id: 'commercial', name: 'Коммерческая дирекция' },
    { id: 'contacts', name: 'Офис менеджер' }
  ];

  const fileTypes = [
    { id: 'pdf', name: 'PDF документы' },
    { id: 'doc', name: 'Word документы' },
    { id: 'xls', name: 'Excel таблицы' },
    { id: 'ppt', name: 'PowerPoint' },
    { id: 'img', name: 'Изображения' }
  ];

  const toggleDepartment = (deptId: string) => {
    setFilters(prev => ({
      ...prev,
      departments: prev.departments.includes(deptId)
        ? prev.departments.filter(id => id !== deptId)
        : [...prev.departments, deptId]
    }));
  };

  const toggleFileType = (typeId: string) => {
    setFilters(prev => ({
      ...prev,
      fileTypes: prev.fileTypes.includes(typeId)
        ? prev.fileTypes.filter(id => id !== typeId)
        : [...prev.fileTypes, typeId]
    }));
  };

  const clearFilters = () => {
    setFilters({
      departments: [],
      fileTypes: [],
      dateRange: '',
      sortBy: 'date'
    });
    setSearchQuery('');
  };

  const handleMassDownload = () => {
    console.log('Массовое скачивание:', selectedFiles);
    // Здесь будет логика массового скачивания
  };

  const exportToExcel = () => {
    console.log('Экспорт в Excel');
    // Здесь будет логика экспорта
  };

  return (
    <div className="space-y-4">
      {/* Основная панель поиска */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Поиск по всем файлам
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className="gap-2"
            >
              <Filter className="w-4 h-4" />
              Фильтры
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Строка поиска */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Поиск файлов по названию, описанию или содержимому..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Активные фильтры */}
          {(filters.departments.length > 0 || filters.fileTypes.length > 0 || searchQuery) && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-muted-foreground">Активные фильтры:</span>
              
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Поиск: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}

              {filters.departments.map(deptId => {
                const dept = departments.find(d => d.id === deptId);
                return (
                  <Badge key={deptId} variant="secondary" className="gap-1">
                    {dept?.name}
                    <button onClick={() => toggleDepartment(deptId)}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                );
              })}

              {filters.fileTypes.map(typeId => {
                const type = fileTypes.find(t => t.id === typeId);
                return (
                  <Badge key={typeId} variant="secondary" className="gap-1">
                    {type?.name}
                    <button onClick={() => toggleFileType(typeId)}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                );
              })}

              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Очистить все
              </Button>
            </div>
          )}

          {/* Расширенные фильтры */}
          {isAdvancedOpen && (
            <div className="border rounded-lg p-4 bg-muted/20 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Фильтр по отделам */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Отделы</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {departments.map(dept => (
                      <div key={dept.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={dept.id}
                          checked={filters.departments.includes(dept.id)}
                          onCheckedChange={() => toggleDepartment(dept.id)}
                        />
                        <label htmlFor={dept.id} className="text-sm">
                          {dept.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Фильтр по типам файлов */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Типы файлов</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {fileTypes.map(type => (
                      <div key={type.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={type.id}
                          checked={filters.fileTypes.includes(type.id)}
                          onCheckedChange={() => toggleFileType(type.id)}
                        />
                        <label htmlFor={type.id} className="text-sm">
                          {type.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Сортировка */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Сортировка</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        <SortAsc className="w-4 h-4" />
                        {filters.sortBy === 'date' && 'По дате'}
                        {filters.sortBy === 'name' && 'По названию'}
                        {filters.sortBy === 'size' && 'По размеру'}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setFilters(prev => ({ ...prev, sortBy: 'date' }))}>
                        По дате (новые сначала)
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilters(prev => ({ ...prev, sortBy: 'name' }))}>
                        По названию (А-Я)
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilters(prev => ({ ...prev, sortBy: 'size' }))}>
                        По размеру (большие сначала)
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          )}

          {/* Массовые операции */}
          {selectedFiles.size > 0 && (
            <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
              <span className="text-sm font-medium">
                Выбрано файлов: {selectedFiles.size}
              </span>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleMassDownload} className="gap-2">
                  <Download className="w-4 h-4" />
                  Скачать ZIP
                </Button>
                <Button variant="outline" size="sm" onClick={exportToExcel} className="gap-2">
                  <FileText className="w-4 h-4" />
                  Экспорт в Excel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
