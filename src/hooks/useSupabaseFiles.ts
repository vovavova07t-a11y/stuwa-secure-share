
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface FileData {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  category_id: string;
  department: string;
  uploaded_at: string;
  uploaded_by?: string;
  storage_path?: string;
}

export const useSupabaseFiles = (department: string, categoryId: string) => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Загрузка файлов из базы данных
  const loadFiles = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .rpc('get_files_by_department_and_category', {
          p_department: department,
          p_category_id: categoryId
        });

      if (error) {
        console.error('Ошибка загрузки файлов:', error);
        toast({
          title: 'Ошибка',
          description: 'Не удалось загрузить файлы',
          variant: 'destructive'
        });
        return;
      }

      console.log(`📁 Загружено ${data?.length || 0} файлов из базы данных`);
      setFiles(data || []);
    } catch (error) {
      console.error('Ошибка при загрузке файлов:', error);
      // Если функция не существует, попробуем прямой запрос
      try {
        const { data: directData, error: directError } = await supabase
          .from('files')
          .select('*')
          .eq('department', department)
          .eq('category_id', categoryId)
          .order('created_at', { ascending: false });

        if (directError) throw directError;
        
        console.log(`📁 Загружено ${directData?.length || 0} файлов напрямую из таблицы`);
        setFiles(directData as FileData[] || []);
      } catch (directFetchError) {
        console.error('Ошибка прямого запроса:', directFetchError);
        setFiles([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Сохранение файла в Supabase
  const saveFile = async (file: File, categoryId: string, department: string) => {
    try {
      const fileId = crypto.randomUUID();
      const fileName = `${department}/${categoryId}/${fileId}_${file.name}`;
      
      console.log('📤 Загружаем файл в Supabase Storage:', fileName);

      // Загружаем файл в Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('files')
        .upload(fileName, file);

      if (uploadError) {
        console.error('Ошибка загрузки в Storage:', uploadError);
        throw uploadError;
      }

      // Получаем публичный URL
      const { data: urlData } = supabase.storage
        .from('files')
        .getPublicUrl(fileName);

      // Сохраняем информацию о файле в базу данных через RPC или прямую вставку
      const fileData = {
        id: fileId,
        file_name: file.name,
        file_size: file.size,
        file_type: file.type,
        category_id: categoryId,
        department: department,
        file_url: urlData.publicUrl,
        storage_path: fileName,
        uploaded_by: (await supabase.auth.getUser()).data.user?.id
      };

      try {
        // Пробуем использовать RPC функцию
        const { data: rpcData, error: rpcError } = await supabase
          .rpc('insert_file', fileData);

        if (rpcError) throw rpcError;
        console.log('✅ Файл успешно сохранен через RPC');
      } catch (rpcError) {
        // Если RPC не работает, используем прямую вставку
        const { data: insertData, error: insertError } = await supabase
          .from('files')
          .insert(fileData)
          .select()
          .single();

        if (insertError) {
          console.error('Ошибка сохранения в базу данных:', insertError);
          // Удаляем файл из Storage если не удалось сохранить в БД
          await supabase.storage.from('files').remove([fileName]);
          throw insertError;
        }
        console.log('✅ Файл успешно сохранен через прямую вставку');
      }
      
      // Обновляем локальный список файлов
      await loadFiles();
      
      return fileData;
    } catch (error) {
      console.error('Ошибка сохранения файла:', error);
      toast({
        title: 'Ошибка сохранения',
        description: 'Не удалось сохранить файл в базу данных',
        variant: 'destructive'
      });
      throw error;
    }
  };

  // Удаление файла
  const deleteFile = async (fileId: string) => {
    try {
      // Получаем информацию о файле
      const fileToDelete = files.find(f => f.id === fileId);
      
      if (!fileToDelete) {
        throw new Error('Файл не найден');
      }

      // Удаляем файл из Storage
      if (fileToDelete.storage_path) {
        const { error: storageError } = await supabase.storage
          .from('files')
          .remove([fileToDelete.storage_path]);

        if (storageError) {
          console.error('Ошибка удаления из Storage:', storageError);
        }
      }

      // Удаляем запись из базы данных
      const { error: dbError } = await supabase
        .from('files')
        .delete()
        .eq('id', fileId);

      if (dbError) throw dbError;

      // Обновляем локальный список файлов
      await loadFiles();
      
      toast({
        title: 'Файл удален',
        description: 'Файл успешно удален из базы данных'
      });
    } catch (error) {
      console.error('Ошибка удаления файла:', error);
      toast({
        title: 'Ошибка удаления',
        description: 'Не удалось удалить файл',
        variant: 'destructive'
      });
    }
  };

  // Загружаем файлы при первом рендере
  useEffect(() => {
    loadFiles();
  }, [department, categoryId]);

  return {
    files,
    isLoading,
    saveFile,
    deleteFile,
    loadFiles
  };
};
