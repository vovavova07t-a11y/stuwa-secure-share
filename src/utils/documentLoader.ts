
import { supabase } from '@/integrations/supabase/client';

export interface DocumentData {
  id: string;
  title?: string;
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

export const loadDocumentsFromTable = async (
  tableName: string, 
  categoryId: string
): Promise<DocumentData[]> => {
  try {
    console.log(`🔄 Загрузка из таблицы: ${tableName}, категория: ${categoryId}`);
    
    // Проверяем что таблица существует
    const { data: tableExists, error: tableCheckError } = await (supabase as any)
      .from(tableName)
      .select('count', { count: 'exact', head: true })
      .limit(1);

    if (tableCheckError) {
      console.error(`❌ Таблица ${tableName} не существует или недоступна:`, tableCheckError);
      return [];
    }

    console.log(`✅ Таблица ${tableName} существует`);
    
    const { data, error } = await (supabase as any)
      .from(tableName)
      .select('*')
      .eq('category', categoryId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(`❌ Ошибка загрузки из ${tableName}:`, error);
      return [];
    }

    console.log(`✅ Загружено ${data?.length || 0} документов из ${tableName} для категории ${categoryId}`);
    
    if (data && data.length > 0) {
      console.log('📋 Первый документ:', data[0]);
    }
    
    return data || [];
  } catch (error) {
    console.error(`💥 Критическая ошибка при загрузке из ${tableName}:`, error);
    return [];
  }
};

export const countDocumentsInTable = async (
  tableName: string, 
  categoryId?: string
): Promise<number> => {
  try {
    console.log(`🔢 Подсчет документов в ${tableName}${categoryId ? ` для категории ${categoryId}` : ''}`);
    
    let query = (supabase as any)
      .from(tableName)
      .select('*', { count: 'exact', head: true });

    if (categoryId) {
      query = query.eq('category', categoryId);
    }

    const { count, error } = await query;

    if (error) {
      console.error(`❌ Ошибка подсчета в ${tableName}:`, error);
      return 0;
    }

    console.log(`📊 Подсчитано в ${tableName}: ${count || 0} документов`);
    return count || 0;
  } catch (error) {
    console.error(`💥 Критическая ошибка при подсчете в ${tableName}:`, error);
    return 0;
  }
};
