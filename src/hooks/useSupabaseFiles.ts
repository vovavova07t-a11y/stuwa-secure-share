
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

const SUPABASE_URL = "https://cevdbplhmncqbyuzchhj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNldmRicGxobW5jcWJ5dXpjaGhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3NTMzNDEsImV4cCI6MjA1ODMyOTM0MX0.Vj7N9OOr4oDJtfgo1WsF32Hc46VkG1oh0bC7gz6d7Kw";

export const useSupabaseFiles = (department: string, categoryId: string) => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // ИСПРАВЛЕННАЯ ФУНКЦИЯ ЗАГРУЗКИ ФАЙЛОВ
  const loadFiles = async () => {
    try {
      setIsLoading(true);
      console.log(`🔄 Загрузка файлов для отдела: ${department}, категории: ${categoryId}`);
      
      // Use type assertion to handle the files table that exists in the database
      const { data, error } = await (supabase as any)
        .from('files')
        .select('*')
        .eq('department', department)
        .eq('category_id', categoryId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Ошибка загрузки файлов из Supabase:', error);
        throw error;
      }

      console.log(`📁 Загружено ${data?.length || 0} файлов из базы данных для категории ${categoryId}`);
      console.log('📋 Файлы:', data?.map((f: any) => f.file_name) || []);
      
      // Обеспечиваем, что все файлы имеют корректные URL и приводим к правильному типу
      const filesWithUrls: FileData[] = (data || []).map((file: any) => ({
        id: file.id,
        file_name: file.file_name,
        file_url: file.file_url || `${SUPABASE_URL}/storage/v1/object/public/files/${file.storage_path}`,
        file_type: file.file_type,
        file_size: file.file_size,
        category_id: file.category_id,
        department: file.department,
        uploaded_at: file.uploaded_at || file.created_at,
        uploaded_by: file.uploaded_by,
        storage_path: file.storage_path
      }));
      
      setFiles(filesWithUrls);
    } catch (error) {
      console.error('Ошибка при загрузке файлов:', error);
      setFiles([]);
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить файлы',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ИСПРАВЛЕННАЯ ФУНКЦИЯ СОХРАНЕНИЯ ФАЙЛА
  const saveFile = async (file: File, categoryId: string, department: string): Promise<FileData> => {
    try {
      const fileId = crypto.randomUUID();
      const fileName = `${department}/${categoryId}/${fileId}_${file.name}`;
      
      console.log('📤 Загружаем файл в Supabase Storage:', fileName);

      // Загружаем файл в Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('files')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Ошибка загрузки в Storage:', uploadError);
        throw uploadError;
      }

      console.log('✅ Файл загружен в Storage:', uploadData);

      // Получаем публичный URL
      const { data: urlData } = supabase.storage
        .from('files')
        .getPublicUrl(fileName);

      console.log('🔗 Публичный URL получен:', urlData.publicUrl);

      // Сохраняем информацию о файле в базу данных
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

      const { data: insertData, error: insertError } = await (supabase as any)
        .from('files')
        .insert(fileData)
        .select()
        .single();

      if (insertError) {
        console.error('Ошибка сохранения в базу данных:', insertError);
        // Удаляем файл из Storage в случае ошибки
        await supabase.storage.from('files').remove([fileName]);
        throw insertError;
      }

      console.log('✅ Файл успешно сохранен в базу данных:', insertData);
      
      // Приводим результат к правильному типу и добавляем в локальное состояние
      const newFile: FileData = {
        id: insertData.id,
        file_name: insertData.file_name,
        file_url: insertData.file_url,
        file_type: insertData.file_type,
        file_size: insertData.file_size,
        category_id: insertData.category_id,
        department: insertData.department,
        uploaded_at: insertData.uploaded_at || insertData.created_at,
        uploaded_by: insertData.uploaded_by,
        storage_path: insertData.storage_path
      };

      setFiles(prevFiles => [newFile, ...prevFiles]);
      
      return newFile;
    } catch (error: any) {
      console.error('Ошибка сохранения файла:', error);
      toast({
        title: 'Ошибка загрузки',
        description: `Не удалось загрузить файл: ${error.message}`,
        variant: 'destructive'
      });
      throw error;
    }
  };

  // ИСПРАВЛЕННАЯ ФУНКЦИЯ УДАЛЕНИЯ ФАЙЛА
  const deleteFile = async (fileId: string) => {
    try {
      const fileToDelete = files.find(f => f.id === fileId);
      
      if (!fileToDelete) {
        throw new Error('Файл не найден');
      }

      console.log('🗑️ Удаление файла:', fileToDelete.file_name);

      // Удаляем файл из Storage
      if (fileToDelete.storage_path) {
        const { error: storageError } = await supabase.storage
          .from('files')
          .remove([fileToDelete.storage_path]);

        if (storageError) {
          console.error('Ошибка удаления из Storage:', storageError);
        } else {
          console.log('✅ Файл удален из Storage');
        }
      }

      // Удаляем запись из базы данных
      const { error: deleteError } = await (supabase as any)
        .from('files')
        .delete()
        .eq('id', fileId);

      if (deleteError) {
        console.error('Ошибка удаления из базы данных:', deleteError);
        throw deleteError;
      }

      console.log('✅ Файл удален из базы данных');

      // Обновляем локальное состояние
      setFiles(prev => prev.filter(f => f.id !== fileId));
      
      toast({
        title: 'Файл удален',
        description: `Файл "${fileToDelete.file_name}" успешно удален`
      });
    } catch (error: any) {
      console.error('Ошибка удаления файла:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить файл',
        variant: 'destructive'
      });
      throw error;
    }
  };

  // Загружаем файлы при изменении department или categoryId
  useEffect(() => {
    if (department && categoryId) {
      loadFiles();
    }
  }, [department, categoryId]);

  return {
    files,
    isLoading,
    saveFile,
    deleteFile,
    loadFiles
  };
};
