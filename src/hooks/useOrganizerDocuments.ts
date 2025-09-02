
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { loadDocumentsFromTable, countDocumentsInTable, type DocumentData } from '@/utils/documentLoader';

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

// ОБНОВЛЕННОЕ сопоставление отделов с таблицами - включены ВСЕ отделы
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
      console.log('❌ Отсутствует отдел или категория');
      setDocuments([]);
      return;
    }

    try {
      setIsLoading(true);
      
      // Получаем название таблицы для отдела
      const tableName = DEPARTMENT_TABLE_MAP[department as keyof typeof DEPARTMENT_TABLE_MAP];
      
      if (!tableName) {
        console.warn(`❌ Таблица для отдела ${department} не найдена в DEPARTMENT_TABLE_MAP`);
        setDocuments([]);
        return;
      }

      console.log(`🔄 Загрузка документов для отдела: ${department}, категория: ${categoryId}, таблица: ${tableName}`);
      
      // Загружаем документы из специализированной таблицы
      const documentsData = await loadDocumentsFromTable(tableName, categoryId);
      
      console.log(`📋 Загружено документов из ${tableName}: ${documentsData.length}`);
      console.log('📋 Документы:', documentsData.map(d => d.title || d.file_name));
      
      // Преобразуем в формат OrganizerDocument
      const organizerDocs: OrganizerDocument[] = documentsData.map((doc: DocumentData) => ({
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
      const tableName = DEPARTMENT_TABLE_MAP[department as keyof typeof DEPARTMENT_TABLE_MAP];
      
      if (!tableName) {
        console.warn(`❌ Таблица для отдела ${department} не найдена при подсчете`);
        return 0;
      }

      console.log(`🔢 Подсчет документов в таблице: ${tableName}`);
      const count = await countDocumentsInTable(tableName);
      console.log(`📊 Всего документов в ${tableName}: ${count}`);
      return count;
    } catch (error) {
      console.error('❌ Ошибка при подсчете документов:', error);
      return 0;
    }
  };

  const getCategoryDocumentsCount = async (department: string, categoryId: string): Promise<number> => {
    try {
      const tableName = DEPARTMENT_TABLE_MAP[department as keyof typeof DEPARTMENT_TABLE_MAP];
      
      if (!tableName) {
        console.warn(`❌ Таблица для отдела ${department} не найдена при подсчете категории`);
        return 0;
      }

      console.log(`🔢 Подсчет документов в категории ${categoryId}, таблица: ${tableName}`);
      const count = await countDocumentsInTable(tableName, categoryId);
      console.log(`📊 Документов в категории ${categoryId}: ${count}`);
      return count;
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
