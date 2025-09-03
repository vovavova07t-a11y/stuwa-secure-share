import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  Download, 
  Search, 
  Filter,
  Eye,
  Calendar,
  User,
  FileType,
  HardDrive
} from 'lucide-react';
import { useSupabaseFiles } from '@/hooks/useSupabaseFiles';
import { FilePreviewModal } from './FilePreviewModal';

interface OrganizerFileSectionProps {
  categoryId: string;
  categoryTitle: string;
  department: string;
  isViewOnly?: boolean;
}

export const OrganizerFileSection: React.FC<OrganizerFileSectionProps> = ({
  categoryId,
  categoryTitle,
  department,
  isViewOnly = false
}) => {
  console.log(`🔍 OrganizerFileSection: отдел=${department}, категория=${categoryId}`);
  
  const { files, isLoading } = useSupabaseFiles(department, categoryId);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);

  const filteredDocuments = files.filter(doc =>
    doc.file_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleFilePreview = (document: any) => {
    setSelectedFile(document);
    setShowPreview(true);
  };

  console.log(`📊 OrganizerFileSection: найдено ${files.length} документов, после фильтра: ${filteredDocuments.length}`);

  if (isLoading) {
    return (
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              {categoryTitle}
              {isViewOnly && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Eye className="w-3 h-3 mr-1" />
                  Просмотр
                </Badge>
              )}
            </CardTitle>
            <Badge variant="outline">
              {filteredDocuments.length} документов
            </Badge>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск документов..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Фильтр
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">Нет документов</p>
              <p className="text-sm">
                {searchTerm 
                  ? `Документы по запросу "${searchTerm}" не найдены`
                  : 'В этой категории пока нет документов'
                }
              </p>
              <p className="text-xs mt-2 text-muted-foreground">
                Отдел: {department}, Категория: {categoryId}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDocuments.map((document) => (
                <Card key={document.id} className="border hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                          <h3 className="font-semibold text-sm truncate">
                            {document.file_name}
                          </h3>
                          <Badge 
                            variant="outline" 
                            className="text-xs bg-primary/5 text-primary border-primary/20"
                          >
                            {document.file_type.toUpperCase()}
                          </Badge>
                        </div>
                        
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <HardDrive className="w-3 h-3" />
                            {formatFileSize(document.file_size)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(document.uploaded_at)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFilePreview(document)}
                          className="hover:bg-primary/10"
                          title="Просмотр"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(document.file_url, '_blank')}
                          className="hover:bg-primary/10"
                          title="Скачать"
                        >
                          <Download className="w-4 h-4" />
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

      {/* File Preview Modal */}
      {showPreview && selectedFile && (
        <FilePreviewModal
          isOpen={showPreview}
          onClose={() => {
            setShowPreview(false);
            setSelectedFile(null);
          }}
          fileUrl={selectedFile.file_url}
          fileName={selectedFile.file_name}
          fileSize={selectedFile.file_size}
        />
      )}
    </>
  );
};
