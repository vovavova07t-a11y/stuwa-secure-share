
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DocumentViewer } from './DocumentViewer';
import { DocumentUpload } from './DocumentUpload';
import { DocumentTable } from './DocumentTable';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Building, FileText, Users, BarChart3, Calendar, Shield, Archive } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { FinancialDocument } from '@/types/financial';

const categories = [
  { id: 'debt_reports', name: 'Отчеты по задолженностям', icon: BarChart3 },
  { id: 'monthly_reports', name: 'Финансовый отчет за месяц', icon: Calendar },
  { id: 'quarterly_tax_reports', name: 'Налоговый отчет за квартал', icon: FileText },
  { id: 'annual_reports', name: 'Финансовая отчетность за год', icon: Archive },
  { id: 'corporate_documents', name: 'Учредительные документы', icon: Building },
  { id: 'org_structure', name: 'Оргструктура и штатное расписание', icon: Users },
  { id: 'board_protocols', name: 'Протоколы НС', icon: Shield }
];

export const FinancialDashboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDocument, setSelectedDocument] = useState<FinancialDocument | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const { data: documents, isLoading, refetch } = useQuery({
    queryKey: ['financial_documents', selectedCategory, searchQuery],
    queryFn: async () => {
      try {
        // Use direct table query with type assertion
        let query = (supabase as any)
          .from('financial_documents')
          .select('*')
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        if (selectedCategory) {
          query = query.eq('category', selectedCategory);
        }

        if (searchQuery) {
          query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
        }

        const { data, error } = await query;
        
        if (error) {
          console.error('Error fetching documents:', error);
          toast({
            title: 'Ошибка',
            description: 'Не удалось загрузить документы',
            variant: 'destructive'
          });
          return [];
        }
        
        return (data || []) as FinancialDocument[];
      } catch (error) {
        console.error('Query error:', error);
        toast({
          title: 'Ошибка',
          description: 'Не удалось загрузить документы',
          variant: 'destructive'
        });
        return [];
      }
    }
  });

  const handleDocumentUpload = () => {
    refetch();
    setShowUpload(false);
    toast({
      title: 'Успех',
      description: 'Документ успешно загружен'
    });
  };

  const logDocumentAccess = async (documentId: string, action: string) => {
    try {
      await (supabase as any).from('document_access_logs').insert({
        document_id: documentId,
        user_id: (await supabase.auth.getUser()).data.user?.id,
        action,
        ip_address: 'client_ip',
        user_agent: navigator.userAgent
      });
    } catch (error) {
      console.error('Error logging access:', error);
    }
  };

  const handleDocumentView = (document: FinancialDocument) => {
    setSelectedDocument(document);
    logDocumentAccess(document.id, 'view');
  };

  const handleDocumentDownload = async (document: FinancialDocument) => {
    try {
      // Increment download count
      await (supabase as any)
        .from('financial_documents')
        .update({ 
          download_count: document.download_count + 1,
          last_downloaded_at: new Date().toISOString()
        })
        .eq('id', document.id);

      logDocumentAccess(document.id, 'download');
      
      // Create download link
      const link = window.document.createElement('a');
      link.href = document.file_url;
      link.download = document.file_name;
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
      
      refetch();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось скачать файл',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Главная</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Финансовая дирекция</BreadcrumbPage>
            </BreadcrumbItem>
            {selectedCategory && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {categories.find(cat => cat.id === selectedCategory)?.name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="container mx-auto px-4 pb-20">
        {!selectedCategory ? (
          /* Category Selection View */
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Финансовая дирекция STUWA
              </h1>
              <p className="text-xl text-muted-foreground">
                Безопасное управление финансовыми документами и отчетами
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Card 
                    key={category.id}
                    className={`glass-card hover:scale-105 transition-all duration-300 cursor-pointer group animate-slide-up animate-stagger-${index + 1}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <CardHeader className="text-center">
                      <div className="feature-icon mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-8 h-8" />
                      </div>
                      <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {category.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <Button 
                          variant="ghost" 
                          className="w-full group-hover:bg-primary/10 transition-colors"
                        >
                          Перейти к документам
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : (
          /* Document Management View */
          <div className="animate-fade-in">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Sidebar Navigation */}
              <div className="w-full lg:w-80 space-y-4">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Разделы</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory('')}
                    >
                      ← Все разделы
                    </Button>
                    {categories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <Button
                          key={category.id}
                          variant={selectedCategory === category.id ? "default" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => setSelectedCategory(category.id)}
                        >
                          <Icon className="w-4 h-4 mr-2" />
                          {category.name}
                        </Button>
                      );
                    })}
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Действия</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full btn-primary"
                      onClick={() => setShowUpload(true)}
                    >
                      Загрузить документ
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="flex-1 space-y-6">
                <Card className="glass-card">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <CardTitle className="text-2xl">
                        {categories.find(cat => cat.id === selectedCategory)?.name}
                      </CardTitle>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Поиск документов..."
                          className="px-4 py-2 border border-border rounded-lg bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <DocumentTable
                      documents={documents || []}
                      isLoading={isLoading}
                      onView={handleDocumentView}
                      onDownload={handleDocumentDownload}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showUpload && (
        <DocumentUpload
          category={selectedCategory}
          onClose={() => setShowUpload(false)}
          onSuccess={handleDocumentUpload}
        />
      )}

      {selectedDocument && (
        <DocumentViewer
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}
    </div>
  );
};
