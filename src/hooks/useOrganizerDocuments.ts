
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

// Используем универсальную таблицу files для всех документов
const FILES_TABLE = 'files';

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
      
      console.log(`🔄 Загрузка документов для отдела: ${department}, категория: ${categoryId}, таблица: ${FILES_TABLE}`);
      
      // Загружаем документы из универсальной таблицы files
      const { data, error } = await (supabase as any)
        .from(FILES_TABLE)
        .select('*')
        .eq('department', department)
        .eq('category_id', categoryId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error(`❌ Ошибка загрузки из ${FILES_TABLE}:`, error);
        setDocuments([]);
        toast({
          title: 'Ошибка',
          description: `Не удалось загрузить документы из ${FILES_TABLE}`,
          variant: 'destructive'
        });
        return;
      }
      
      console.log(`📋 Загружено документов из ${FILES_TABLE}: ${data?.length || 0}`);
      console.log('📋 Документы:', data?.map((d: any) => d.file_name) || []);
      
      // Проверяем первый документ для отладки
      if (data && data.length > 0) {
        console.log('📋 Первый документ из результатов:', data[0]);
        console.log('📋 Все категории в результатах:', data.map((d: any) => d.category_id));
      }
      
      // Преобразуем в формат OrganizerDocument
      const organizerDocs: OrganizerDocument[] = (data || []).map((doc: any) => ({
        id: doc.id,
        title: doc.file_name, // В таблице files нет поля title, используем file_name
        file_name: doc.file_name,
        file_url: doc.file_url,
        file_type: doc.file_type,
        file_size: doc.file_size,
        category: doc.category_id, // В таблице files это поле называется category_id
        subcategory: doc.subcategory,
        status: 'active', // В таблице files нет поля status
        created_at: doc.created_at,
        uploaded_by: doc.uploaded_by,
        description: doc.description,
        download_count: 0 // В таблице files нет поля download_count
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
      console.log(`🔢 Подсчет документов в таблице: ${FILES_TABLE} для отдела: ${department}`);
      
      const { count, error } = await (supabase as any)
        .from(FILES_TABLE)
        .select('*', { count: 'exact', head: true })
        .eq('department', department);

      if (error) {
        console.error(`❌ Ошибка подсчета в ${FILES_TABLE}:`, error);
        return 0;
      }

      console.log(`📊 Всего документов в отделе ${department}: ${count || 0}`);
      return count || 0;
    } catch (error) {
      console.error('❌ Ошибка при подсчете документов:', error);
      return 0;
    }
  };

  const getCategoryDocumentsCount = async (department: string, categoryId: string): Promise<number> => {
    try {
      console.log(`🔢 Подсчет документов в категории ${categoryId}, отдел: ${department}, таблица: ${FILES_TABLE}`);
      
      const { count, error } = await (supabase as any)
        .from(FILES_TABLE)
        .select('*', { count: 'exact', head: true })
        .eq('department', department)
        .eq('category_id', categoryId);

      if (error) {
        console.error(`❌ Ошибка подсчета документов категории:`, error);
        return 0;
      }

      console.log(`📊 Документов в категории ${categoryId} отдела ${department}: ${count || 0}`);
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
