
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

// Use the constants directly from the client file
const SUPABASE_URL = "https://cevdbplhmncqbyuzchhj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNldmRicGxobW5jcWJ5dXpjaGhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3NTMzNDEsImV4cCI6MjA1ODMyOTM0MX0.Vj7N9OOr4oDJtfgo1WsF32Hc46VkG1oh0bC7gz6d7Kw";

export const useSupabaseFiles = (department: string, categoryId: string, refreshKey?: number) => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Загрузка файлов из базы данных с использованием прямого HTTP запроса
  const loadFiles = async () => {
    try {
      setIsLoading(true);
      console.log(`🔄 Загрузка файлов для отдела: ${department}, категории: ${categoryId}`);
      
      // Используем прямой HTTP запрос к Supabase REST API
      const response = await fetch(`${SUPABASE_URL}/rest/v1/files?department=eq.${department}&category_id=eq.${categoryId}&order=created_at.desc`, {
        headers: {
          'apikey': SUPABASE_PUBLISHABLE_KEY,
          'Authorization': `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: FileData[] = await response.json();
      console.log(`📁 Загружено ${data?.length || 0} файлов из базы данных для категории ${categoryId}`);
      console.log('📋 Файлы:', data?.map(f => f.file_name) || []);
      setFiles(data || []);
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

      // Сохраняем информацию о файле в базу данных через прямой HTTP запрос
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

      const response = await fetch(`${SUPABASE_URL}/rest/v1/files`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_PUBLISHABLE_KEY,
          'Authorization': `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(fileData)
      });

      if (!response.ok) {
        console.error('Ошибка сохранения в базу данных');
        // Удаляем файл из Storage если не удалось сохранить в БД
        await supabase.storage.from('files').remove([fileName]);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('✅ Файл успешно сохранен в базу данных');
      
      // Автоматически обновляем локальный список файлов
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

      // Удаляем запись из базы данных через HTTP запрос
      const response = await fetch(`${SUPABASE_URL}/rest/v1/files?id=eq.${fileId}`, {
        method: 'DELETE',
        headers: {
          'apikey': SUPABASE_PUBLISHABLE_KEY,
          'Authorization': `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Автоматически обновляем локальный список файлов
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

  // Загружаем файлы при первом рендере и при изменении refreshKey
  useEffect(() => {
    loadFiles();
  }, [department, categoryId, refreshKey]);

  return {
    files,
    isLoading,
    saveFile,
    deleteFile,
    loadFiles
  };
};
