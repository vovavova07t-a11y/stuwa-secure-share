
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

// Сопоставление отделов с таблицами и обычной таблицей files
const DEPARTMENT_TABLE_MAP = {
  financial: 'financial_documents',
  technical: 'technical_documents',
  logistics: 'logistics_documents',
  commercial: 'commercial_documents',
  office: 'office_documents'
};

// Сопоставление категорий организатора с категориями в таблице files
const ORGANIZER_CATEGORY_MAP = {
  // Financial categories
  fin_debt_reports: 'about_debt_reports',
  fin_monthly_reports: 'monthly_reports',
  fin_quarterly_tax: 'quarterly_tax',
  fin_yearly_reports: 'yearly_reports',
  fin_founding_docs: 'founding_docs',
  fin_org_structure: 'org_structure',
  fin_protocols: 'protocols',
  
  // Technical categories  
  tech_development: 'technical_documentation',
  tech_product_overview: 'technical_specifications',
  tech_specifications: 'technical_specifications',
  tech_presentations: 'presentations',
  tech_business_plans: 'business_plans',
  tech_catalog: 'catalog',
  tech_certificates: 'certificates',
  
  // Logistics categories
  log_client_base: 'client_base',
  log_contracts: 'contracts',
  log_sales_reports: 'sales_reports',
  log_communications: 'communications',
  log_delivery: 'delivery',
  log_regions: 'regions',
  
  // Commercial categories
  com_partnerships: 'partnerships',
  com_price_lists: 'price_lists',
  com_quotations: 'quotations',
  com_analytics: 'analytics',
  com_strategies: 'strategies',
  com_investments: 'investments',
  
  // Office categories
  cont_contacts: 'contacts',
  cont_schedules: 'schedules',
  cont_events: 'events',
  cont_coordination: 'coordination',
  cont_visitors: 'visitors',
  cont_facilities: 'facilities'
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
      let documents: any[] = [];

      // Сначала пробуем загрузить из специализированной таблицы отдела
      const tableName = DEPARTMENT_TABLE_MAP[department as keyof typeof DEPARTMENT_TABLE_MAP];
      
      if (tableName) {
        console.log(`🔄 Загрузка документов из таблицы ${tableName} для категории: ${categoryId}`);
        
        const { data: specializedDocs, error: specializedError } = await (supabase as any)
          .from(tableName)
          .select('*')
          .eq('category', categoryId)
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        if (specializedError) {
          console.warn(`Ошибка загрузки из ${tableName}:`, specializedError);
        } else if (specializedDocs && specializedDocs.length > 0) {
          documents = specializedDocs;
          console.log(`📁 Найдено ${documents.length} документов в специализированной таблице ${tableName}`);
        }
      }

      // Если документов не найдено в специализированной таблице, пробуем общую таблицу files
      if (documents.length === 0) {
        const filesCategoryId = ORGANIZER_CATEGORY_MAP[categoryId as keyof typeof ORGANIZER_CATEGORY_MAP];
        
        if (filesCategoryId) {
          console.log(`🔄 Загрузка документов из таблицы files для отдела: ${department}, категории: ${filesCategoryId}`);
          
          const { data: filesData, error: filesError } = await supabase
            .from('files')
            .select('*')
            .eq('department', department)
            .eq('category_id', filesCategoryId)
            .order('created_at', { ascending: false });

          if (filesError) {
            console.error('Ошибка загрузки из files:', filesError);
          } else if (filesData && filesData.length > 0) {
            documents = filesData;
            console.log(`📁 Найдено ${documents.length} документов в таблице files`);
          }
        }
      }

      console.log(`📋 Всего загружено документов: ${documents.length}`);
      console.log('📋 Документы:', documents.map((d: any) => d.title || d.file_name) || []);
      
      const organizerDocs: OrganizerDocument[] = (documents || []).map((doc: any) => ({
        id: doc.id,
        title: doc.title || doc.file_name,
        file_name: doc.file_name,
        file_url: doc.file_url,
        file_type: doc.file_type,
        file_size: doc.file_size,
        category: doc.category || doc.category_id,
        subcategory: doc.subcategory,
        status: doc.status || 'active',
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
      let totalCount = 0;

      // Считаем документы в специализированной таблице
      const tableName = DEPARTMENT_TABLE_MAP[department as keyof typeof DEPARTMENT_TABLE_MAP];
      
      if (tableName) {
        const { count: specializedCount, error: specializedError } = await (supabase as any)
          .from(tableName)
          .select('*', { count: 'exact', head: true })
          .eq('status', 'active');

        if (!specializedError && specializedCount) {
          totalCount += specializedCount;
        }
      }

      // Считаем документы в общей таблице files
      const { count: filesCount, error: filesError } = await supabase
        .from('files')
        .select('*', { count: 'exact', head: true })
        .eq('department', department);

      if (!filesError && filesCount) {
        totalCount += filesCount;
      }

      return totalCount;
    } catch (error) {
      console.error('Ошибка при подсчете документов:', error);
      return 0;
    }
  };

  const getCategoryDocumentsCount = async (department: string, categoryId: string): Promise<number> => {
    try {
      let totalCount = 0;

      // Считаем в специализированной таблице
      const tableName = DEPARTMENT_TABLE_MAP[department as keyof typeof DEPARTMENT_TABLE_MAP];
      
      if (tableName) {
        const { count: specializedCount, error: specializedError } = await (supabase as any)
          .from(tableName)
          .select('*', { count: 'exact', head: true })
          .eq('category', categoryId)
          .eq('status', 'active');

        if (!specializedError && specializedCount) {
          totalCount += specializedCount;
        }
      }

      // Считаем в общей таблице files
      const filesCategoryId = ORGANIZER_CATEGORY_MAP[categoryId as keyof typeof ORGANIZER_CATEGORY_MAP];
      if (filesCategoryId) {
        const { count: filesCount, error: filesError } = await supabase
          .from('files')
          .select('*', { count: 'exact', head: true })
          .eq('department', department)
          .eq('category_id', filesCategoryId);

        if (!filesError && filesCount) {
          totalCount += filesCount;
        }
      }

      return totalCount;
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
