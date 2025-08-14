
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TechnicalDocumentViewer } from './TechnicalDocumentViewer';
import { TechnicalDocumentUpload } from './TechnicalDocumentUpload';
import { TechnicalDocumentTable } from './TechnicalDocumentTable';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { FileText, Settings, BookOpen, Presentation, Target, Building2, Award, Search, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { TechnicalDocument } from '@/types/technical';

const categories = [
  { id: 'development_program', name: 'Программа развития', icon: Target, color: 'text-blue-600' },
  { id: 'product_overview', name: 'Обзор продукции', icon: BookOpen, color: 'text-green-600' },
  { id: 'product_specification', name: 'Спецификация продукции', icon: Settings, color: 'text-orange-600' },
  { id: 'activity_presentation', name: 'Презентация деятельности', icon: Presentation, color: 'text-purple-600' },
  { id: 'business_plans', name: 'Бизнес планы и проекты', icon: Target, color: 'text-red-600' },
  { id: 'company_catalog', name: 'Каталог компании', icon: Building2, color: 'text-indigo-600' },
  { id: 'product_certificates', name: 'Сертификаты на продукцию', icon: Award, color: 'text-yellow-600' }
];

export const TechnicalDashboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDocument, setSelectedDocument] = useState<TechnicalDocument | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('active');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const { data: documents, isLoading, refetch } = useQuery({
    queryKey: ['technical_documents', selectedCategory, searchQuery, filterStatus],
    queryFn: async () => {
      try {
        let query = supabase
          .from('technical_documents')
          .select('*')
          .eq('status', filterStatus)
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
        
        return (data || []) as TechnicalDocument[];
      } catch (error) {
        console.error('Query error:', error);
        return [];
      }
    }
  });

  // Загружаем избранные документы
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const { data } = await supabase
          .from('user_favorites')
          .select('document_id')
          .eq('user_id', (await supabase.auth.getUser()).data.user?.id);
        
        if (data) {
          setFavorites(new Set(data.map(f => f.document_id)));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };
    
    loadFavorites();
  }, []);

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
      const user = await supabase.auth.getUser();
      if (user.data.user) {
        await supabase.from('document_access_logs').insert({
          document_id: documentId,
          user_id: user.data.user.id,
          action,
          ip_address: 'client_ip',
          user_agent: navigator.userAgent
        });
      }
    } catch (error) {
      console.error('Error logging access:', error);
    }
  };

  const handleDocumentView = (document: TechnicalDocument) => {
    setSelectedDocument(document);
    logDocumentAccess(document.id, 'view');
  };

  const handleDocumentDownload = async (document: TechnicalDocument) => {
    try {
      // Increment download count
      await supabase
        .from('technical_documents')
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

  const toggleFavorite = async (documentId: string) => {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return;

      if (favorites.has(documentId)) {
        await supabase
          .from('user_favorites')
          .delete()
          .eq('user_id', user.data.user.id)
          .eq('document_id', documentId);
        
        setFavorites(prev => {
          const newSet = new Set(prev);
          newSet.delete(documentId);
          return newSet;
        });
      } else {
        await supabase
          .from('user_favorites')
          .insert({
            user_id: user.data.user.id,
            document_id: documentId
          });
        
        setFavorites(prev => new Set([...prev, documentId]));
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
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
              <BreadcrumbPage>Техническая дирекция</BreadcrumbPage>
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
                Продукция STUWA
              </h1>
              <p className="text-xl text-muted-foreground">
                Техническая документация и управление продукцией
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
                        <Icon className={`w-8 h-8 ${category.color}`} />
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
                          <Icon className={`w-4 h-4 mr-2 ${category.color}`} />
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
                  <CardContent className="space-y-2">
                    <Button 
                      className="w-full btn-primary"
                      onClick={() => setShowUpload(true)}
                    >
                      Загрузить документ
                    </Button>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Статус документов:</label>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background/50 text-sm"
                      >
                        <option value="active">Активные</option>
                        <option value="draft">Черновики</option>
                        <option value="archived">Архив</option>
                      </select>
                    </div>
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
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input
                            type="text"
                            placeholder="Поиск документов..."
                            className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <TechnicalDocumentTable
                      documents={documents || []}
                      isLoading={isLoading}
                      onView={handleDocumentView}
                      onDownload={handleDocumentDownload}
                      favorites={favorites}
                      onToggleFavorite={toggleFavorite}
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
        <TechnicalDocumentUpload
          category={selectedCategory}
          onClose={() => setShowUpload(false)}
          onSuccess={handleDocumentUpload}
        />
      )}

      {selectedDocument && (
        <TechnicalDocumentViewer
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}
    </div>
  );
};
