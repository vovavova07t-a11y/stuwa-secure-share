
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface OrganizerDocument {
  id: string;
  title: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  category: string;
  subcategory?: string;
  status: string;
  created_at: string;
  uploaded_by?: string;
  description?: string;
  download_count?: number;
}

const DEPARTMENT_TABLE_MAP = {
  financial: 'financial_documents',
  technical: 'technical_documents',
  logistics: 'logistics_documents',
  commercial: 'commercial_documents',
  office: 'office_documents'
};

export const useOrganizerDocuments = (department: string, categoryId: string) => {
  const [documents, setDocuments] = useState<OrganizerDocument[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const loadDocuments = async () => {
    if (!department || !categoryId) {
      setDocuments([]);
      return;
    }

    try {
      setIsLoading(true);
      const tableName = DEPARTMENT_TABLE_MAP[department as keyof typeof DEPARTMENT_TABLE_MAP];
      
      if (!tableName) {
        console.error(`Неизвестный отдел: ${department}`);
        setDocuments([]);
        return;
      }

      console.log(`🔄 Загрузка документов для отдела: ${department} (таблица: ${tableName}), категории: ${categoryId}`);
      
      const { data, error } = await (supabase as any)
        .from(tableName)
        .select('*')
        .eq('category', categoryId)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Ошибка загрузки документов из Supabase:', error);
        throw error;
      }

      console.log(`📁 Загружено ${data?.length || 0} документов из таблицы ${tableName} для категории ${categoryId}`);
      console.log('📋 Документы:', data?.map((d: any) => d.title || d.file_name) || []);
      
      const organizerDocs: OrganizerDocument[] = (data || []).map((doc: any) => ({
        id: doc.id,
        title: doc.title || doc.file_name,
        file_name: doc.file_name,
        file_url: doc.file_url,
        file_type: doc.file_type,
        file_size: doc.file_size,
        category: doc.category,
        subcategory: doc.subcategory,
        status: doc.status,
        created_at: doc.created_at,
        uploaded_by: doc.uploaded_by,
        description: doc.description,
        download_count: doc.download_count || 0
      }));
      
      setDocuments(organizerDocs);
    } catch (error) {
      console.error('Ошибка при загрузке документов:', error);
      setDocuments([]);
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить документы',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getTotalDocumentsCount = async (department: string): Promise<number> => {
    try {
      const tableName = DEPARTMENT_TABLE_MAP[department as keyof typeof DEPARTMENT_TABLE_MAP];
      
      if (!tableName) {
        return 0;
      }

      const { count, error } = await (supabase as any)
        .from(tableName)
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');

      if (error) {
        console.error(`Ошибка подсчета документов для ${department}:`, error);
        return 0;
      }

      return count || 0;
    } catch (error) {
      console.error('Ошибка при подсчете документов:', error);
      return 0;
    }
  };

  const getCategoryDocumentsCount = async (department: string, categoryId: string): Promise<number> => {
    try {
      const tableName = DEPARTMENT_TABLE_MAP[department as keyof typeof DEPARTMENT_TABLE_MAP];
      
      if (!tableName) {
        return 0;
      }

      const { count, error } = await (supabase as any)
        .from(tableName)
        .select('*', { count: 'exact', head: true })
        .eq('category', categoryId)
        .eq('status', 'active');

      if (error) {
        console.error(`Ошибка подсчета документов для категории ${categoryId}:`, error);
        return 0;
      }

      return count || 0;
    } catch (error) {
      console.error('Ошибка при подсчете документов категории:', error);
      return 0;
    }
  };

  useEffect(() => {
    if (department && categoryId) {
      loadDocuments();
    }
  }, [department, categoryId]);

  return {
    documents,
    isLoading,
    loadDocuments,
    getTotalDocumentsCount,
    getCategoryDocumentsCount
  };
};
