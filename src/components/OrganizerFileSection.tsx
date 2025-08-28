
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FilePreviewModal } from './FilePreviewModal';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  FileText, 
  Download, 
  Eye, 
  Search,
  Calendar,
  User,
  Building2,
  Filter,
  Loader2
} from 'lucide-react';

interface OrganizerFileSectionProps {
  categoryId: string;
  categoryTitle: string;
  department: string;
  isViewOnly?: boolean;
}

interface RealDocument {
  id: string;
  title?: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  created_at: string;
  uploaded_at?: string;
  uploaded_by?: string;
  department?: string;
  category?: string;
  category_id?: string;
  description?: string;
  version?: number;
  download_count?: number;
}

export const OrganizerFileSection: React.FC<OrganizerFileSectionProps> = ({
  categoryId,
  categoryTitle,
  department,
  isViewOnly = false
}) => {
  const [documents, setDocuments] = useState<RealDocument[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<RealDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<RealDocument | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadRealDocuments();
  }, [department, categoryId]);

  useEffect(() => {
    filterDocuments();
  }, [documents, searchQuery]);

  const loadRealDocuments = async () => {
    try {
      setIsLoading(true);
      console.log(`🔍 Organizer loading REAL documents for department: ${department}, category: ${categoryId}`);
      
      // Load from multiple sources to get ALL real documents
      const promises = [];
      
      // 1. Load from files table (uploaded by employees from all departments)
      promises.push(
        (supabase as any)
          .from('files')
          .select('*')
          .eq('department', department)
          .eq('category_id', categoryId)
          .order('created_at', { ascending: false })
      );

      // 2. Load from financial_documents if it's financial department
      if (department === 'financial') {
        promises.push(
          (supabase as any)
            .from('financial_documents')
            .select('*')
            .eq('category', categoryId)
            .order('created_at', { ascending: false })
        );
      }

      // 3. Load from interdepartment_file_transfers (files sent to this department)
      promises.push(
        (supabase as any)
          .from('interdepartment_file_transfers')
          .select('*')
          .eq('receiver_department', department)
          .order('created_at', { ascending: false })
      );

      // 4. Load from documents table (legacy documents)
      promises.push(
        (supabase as any)
          .from('documents')
          .select('*')
          .eq('category', categoryId)
          .order('created_at', { ascending: false })
      );

      const results = await Promise.allSettled(promises);
      
      let allDocuments: RealDocument[] = [];
      
      // Process files table results
      if (results[0].status === 'fulfilled' && results[0].value.data) {
        const filesData = results[0].value.data.map((file: any) => ({
          id: file.id,
          title: file.file_name,
          file_name: file.file_name,
          file_url: file.file_url,
          file_type: file.file_type || 'document',
          file_size: file.file_size || 0,
          created_at: file.created_at || file.uploaded_at,
          uploaded_at: file.uploaded_at,
          uploaded_by: file.uploaded_by,
          department: file.department,
          category_id: file.category_id,
          description: `Загружен из отдела: ${file.department}`
        }));
        allDocuments = [...allDocuments, ...filesData];
      }

      // Process financial_documents results
      if (results[1] && results[1].status === 'fulfilled' && results[1].value.data) {
        const financialData = results[1].value.data.map((doc: any) => ({
          id: doc.id,
          title: doc.title,
          file_name: doc.file_name,
          file_url: doc.file_url,
          file_type: doc.file_type || 'document',
          file_size: doc.file_size || 0,
          created_at: doc.created_at,
          uploaded_by: doc.uploaded_by,
          department: 'financial',
          category: doc.category,
          description: doc.description,
          version: doc.version,
          download_count: doc.download_count
        }));
        allDocuments = [...allDocuments, ...financialData];
      }

      // Process interdepartment transfers
      if (results[2].status === 'fulfilled' && results[2].value.data) {
        const transferData = results[2].value.data.map((transfer: any) => ({
          id: transfer.id,
          title: transfer.file_name,
          file_name: transfer.file_name,
          file_url: transfer.file_url,
          file_type: transfer.file_type || 'document',
          file_size: transfer.file_size || 0,
          created_at: transfer.created_at,
          department: transfer.sender_department,
          description: `Передан из отдела: ${transfer.sender_department}`
        }));
        allDocuments = [...allDocuments, ...transferData];
      }

      // Process documents table
      if (results[3].status === 'fulfilled' && results[3].value.data) {
        const documentsData = results[3].value.data.map((doc: any) => ({
          id: doc.id,
          title: doc.title,
          file_name: doc.file_name || doc.title,
          file_url: doc.file_url || '',
          file_type: doc.file_type || 'document',
          file_size: doc.file_size || 0,
          created_at: doc.created_at,
          uploaded_by: doc.created_by,
          department: department,
          category: doc.category,
          description: doc.description
        }));
        allDocuments = [...allDocuments, ...documentsData];
      }

      // Remove duplicates and sort by date
      const uniqueDocuments = allDocuments
        .filter((doc) => doc.file_url && doc.file_url.trim() !== '')
        .filter((doc, index, self) => 
          index === self.findIndex(d => d.file_url === doc.file_url)
        )
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      console.log(`📁 Organizer loaded ${uniqueDocuments.length} REAL documents for ${department}/${categoryId}`);
      console.log('📋 Document names:', uniqueDocuments.map(d => d.file_name));
      
      setDocuments(uniqueDocuments);
      
    } catch (error) {
      console.error('❌ Error loading real documents for organizer:', error);
      toast({
        title: 'Ошибка загрузки',
        description: 'Не удалось загрузить документы',
        variant: 'destructive'
      });
      setDocuments([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filterDocuments = () => {
    if (!searchQuery.trim()) {
      setFilteredDocuments(documents);
      return;
    }

    const filtered = documents.filter(doc => 
      doc.file_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredDocuments(filtered);
  };

  const handlePreview = (document: RealDocument) => {
    console.log('🔍 Organizer previewing document:', document.file_name);
    setSelectedDocument(document);
    setShowPreview(true);
  };

  const handleDownload = async (document: RealDocument) => {
    try {
      console.log('⬇️ Organizer downloading document:', document.file_name);
      
      if (!document.file_url || document.file_url.trim() === '') {
        throw new Error('URL файла недоступен');
      }

      const response = await fetch(document.file_url, {
        method: 'GET',
        mode: 'cors',
      });
      
      if (!response.ok) {
        throw new Error(`Ошибка сети: ${response.status}`);
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = window.document.createElement('a');
      a.href = url;
      a.download = document.file_name;
      window.document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      window.document.body.removeChild(a);
      
      toast({
        title: 'Документ скачан',
        description: `Файл "${document.file_name}" успешно скачан`
      });
      
    } catch (error) {
      console.error('❌ Download error:', error);
      toast({
        title: 'Ошибка скачивания',
        description: 'Не удалось скачать файл',
        variant: 'destructive'
      });
      
      // Fallback: try to open in new tab
      try {
        window.open(document.file_url, '_blank', 'noopener,noreferrer');
      } catch (fallbackError) {
        console.error('❌ Fallback failed:', fallbackError);
      }
    }
  };

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

  if (isLoading) {
    return (
      <Card className="glass-card">
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            <span>Загрузка реальных документов...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              {categoryTitle}
              <span className="text-sm font-normal text-green-600">
                ({documents.length} реальных документов)
              </span>
            </div>
          </CardTitle>
          
          {documents.length > 0 && (
            <div className="flex items-center gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск документов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Фильтры
              </Button>
            </div>
          )}
        </CardHeader>

        <CardContent>
          {filteredDocuments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocuments.map((document) => (
                <Card key={document.id} className="hover:shadow-md transition-shadow border border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <h4 className="font-medium text-sm truncate" title={document.title || document.file_name}>
                            {document.title || document.file_name}
                          </h4>
                          {document.description && (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {document.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(document.created_at)}
                      </div>
                      <div className="flex items-center justify-between">
                        <span>{formatFileSize(document.file_size)}</span>
                        {document.version && (
                          <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                            v{document.version}
                          </span>
                        )}
                      </div>
                      {document.department && (
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {document.department}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePreview(document)}
                        className="flex-1 hover:bg-primary/10"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Просмотр
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(document)}
                        className="flex-1 hover:bg-primary/10"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Скачать
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : documents.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Нет документов</h3>
              <p className="text-muted-foreground">
                В этой категории пока нет загруженных документов
              </p>
            </div>
          ) : (
            <div className="text-center py-8">
              <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Нет документов, соответствующих запросу "{searchQuery}"
              </p>
              <Button 
                variant="ghost" 
                onClick={() => setSearchQuery('')}
                className="mt-2"
              >
                Очистить поиск
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* File Preview Modal */}
      {showPreview && selectedDocument && (
        <FilePreviewModal
          isOpen={showPreview}
          onClose={() => {
            setShowPreview(false);
            setSelectedDocument(null);
          }}
          fileUrl={selectedDocument.file_url}
          fileName={selectedDocument.file_name}
          fileSize={selectedDocument.file_size}
        />
      )}
    </>
  );
};
