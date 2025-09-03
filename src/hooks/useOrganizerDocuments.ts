
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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

// ПОЛНОЕ сопоставление отделов с таблицами - все реальные таблицы из Supabase
const DEPARTMENT_TABLE_MAP = {
  financial: 'financial_documents',
  technical: 'technical_documents', 
  logistics: 'logistics_documents',
  commercial: 'commercial_documents',
  office: 'office_documents'
} as const;

type DepartmentKey = keyof typeof DEPARTMENT_TABLE_MAP;
type TableName = typeof DEPARTMENT_TABLE_MAP[DepartmentKey];

export const useOrganizerDocuments = (department: string, categoryId: string) => {
  const [documents, setDocuments] = useState<OrganizerDocument[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const loadDocuments = async () => {
    if (!department || !categoryId) {
      console.log('❌ Отсутствует отдел или категория');
      setDocuments([]);
      return;
    }

    try {
      setIsLoading(true);
      
      // Получаем название таблицы для отдела
      const tableName = DEPARTMENT_TABLE_MAP[department as DepartmentKey];
      
      if (!tableName) {
        console.warn(`❌ Таблица для отдела ${department} не найдена в DEPARTMENT_TABLE_MAP`);
        setDocuments([]);
        return;
      }

      console.log(`🔄 Загрузка документов для отдела: ${department}, категория: ${categoryId}, таблица: ${tableName}`);
      
      // Загружаем документы напрямую из Supabase с правильной таблицей
      const { data, error } = await (supabase as any)
        .from(tableName)
        .select('*')
        .eq('category', categoryId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error(`❌ Ошибка загрузки из ${tableName}:`, error);
        setDocuments([]);
        toast({
          title: 'Ошибка',
          description: `Не удалось загрузить документы из ${tableName}`,
          variant: 'destructive'
        });
        return;
      }
      
      console.log(`📋 Загружено документов из ${tableName}: ${data?.length || 0}`);
      console.log('📋 Документы:', data?.map((d: any) => d.title || d.file_name) || []);
      
      // Проверяем первый документ для отладки
      if (data && data.length > 0) {
        console.log('📋 Первый документ из результатов:', data[0]);
        console.log('📋 Все категории в результатах:', data.map((d: any) => d.category));
      }
      
      // Преобразуем в формат OrganizerDocument
      const organizerDocs: OrganizerDocument[] = (data || []).map((doc: any) => ({
        id: doc.id,
        title: doc.title || doc.file_name,
        file_name: doc.file_name,
        file_url: doc.file_url,
        file_type: doc.file_type,
        file_size: doc.file_size,
        category: doc.category,
        subcategory: doc.subcategory,
        status: doc.status || 'active',
        created_at: doc.created_at,
        uploaded_by: doc.uploaded_by,
        description: doc.description,
        download_count: doc.download_count || 0
      }));
      
      setDocuments(organizerDocs);
      
      if (organizerDocs.length === 0) {
        console.log(`ℹ️ В категории ${categoryId} отдела ${department} нет документов`);
      }
    } catch (error) {
      console.error('❌ Ошибка при загрузке документов:', error);
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
      const tableName = DEPARTMENT_TABLE_MAP[department as DepartmentKey];
      
      if (!tableName) {
        console.warn(`❌ Таблица для отдела ${department} не найдена при подсчете`);
        return 0;
      }

      console.log(`🔢 Подсчет документов в таблице: ${tableName}`);
      
      const { count, error } = await (supabase as any)
        .from(tableName)
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error(`❌ Ошибка подсчета в ${tableName}:`, error);
        return 0;
      }

      console.log(`📊 Всего документов в ${tableName}: ${count || 0}`);
      return count || 0;
    } catch (error) {
      console.error('❌ Ошибка при подсчете документов:', error);
      return 0;
    }
  };

  const getCategoryDocumentsCount = async (department: string, categoryId: string): Promise<number> => {
    try {
      const tableName = DEPARTMENT_TABLE_MAP[department as DepartmentKey];
      
      if (!tableName) {
        console.warn(`❌ Таблица для отдела ${department} не найдена при подсчете категории`);
        return 0;
      }

      console.log(`🔢 Подсчет документов в категории ${categoryId}, таблица: ${tableName}`);
      
      const { count, error } = await (supabase as any)
        .from(tableName)
        .select('*', { count: 'exact', head: true })
        .eq('category', categoryId);

      if (error) {
        console.error(`❌ Ошибка подсчета документов категории:`, error);
        return 0;
      }

      console.log(`📊 Документов в категории ${categoryId}: ${count || 0}`);
      return count || 0;
    } catch (error) {
      console.error('❌ Ошибка при подсчете документов категории:', error);
      return 0;
    }
  };

  useEffect(() => {
    if (department && categoryId) {
      console.log(`🚀 useEffect: загрузка документов для ${department}/${categoryId}`);
      loadDocuments();
    } else {
      console.log('⚠️ useEffect: отсутствует отдел или категория, очищаем документы');
      setDocuments([]);
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
