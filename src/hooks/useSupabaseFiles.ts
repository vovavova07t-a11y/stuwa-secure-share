
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { sanitizeFileName, generateFileId } from '@/utils/fileUtils';
import { uploadFile as uploadStorageFile, removeFile as removeStorageFile, getPublicUrl } from '@/lib/storage';

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

const FILES_BUCKET = 'files';

export const useSupabaseFiles = (department: string, categoryId: string) => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const loadFiles = async () => {
    try {
      setIsLoading(true);
      console.log(`🔄 Загрузка файлов для отдела: ${department}, категории: ${categoryId}`);
      
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
      
      const filesWithUrls: FileData[] = (data || []).map((file: any) => ({
        id: file.id,
        file_name: file.file_name,
        file_url: file.file_url || getPublicUrl(FILES_BUCKET, file.storage_path),
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

  const saveFile = async (file: File, categoryId: string, department: string): Promise<FileData> => {
    try {
      const fileId = generateFileId();
      const sanitizedFileName = sanitizeFileName(file.name);
      const fileName = `${department}/${categoryId}/${fileId}_${sanitizedFileName}`;
      
      console.log('📤 Загружаем файл в хранилище:', fileName);
      console.log('📋 Оригинальное имя:', file.name);
      console.log('📋 Очищенное имя:', sanitizedFileName);

      // Загружаем файл в хранилище (сервер или бакет — по VITE_STORAGE_MODE)
      const { path: storedPath, publicUrl } = await uploadStorageFile(FILES_BUCKET, fileName, file);

      console.log('🔗 Публичный URL получен:', publicUrl);

      // Сохраняем информацию о файле в базу данных
      const fileData = {
        id: fileId,
        file_name: file.name, // Сохраняем оригинальное имя для отображения
        file_size: file.size,
        file_type: file.type,
        category_id: categoryId,
        department: department,
        file_url: publicUrl,
        storage_path: storedPath,
        uploaded_by: (await supabase.auth.getUser()).data.user?.id
      };

      const { data: insertData, error: insertError } = await (supabase as any)
        .from('files')
        .insert(fileData)
        .select()
        .single();

      if (insertError) {
        console.error('Ошибка сохранения в базу данных:', insertError);
        // Удаляем файл из хранилища в случае ошибки
        await removeStorageFile(FILES_BUCKET, storedPath).catch(() => undefined);
        throw insertError;
      }


      console.log('✅ Файл успешно сохранен в базу данных:', insertData);
      
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

  const deleteFile = async (fileId: string) => {
    try {
      const fileToDelete = files.find(f => f.id === fileId);
      
      if (!fileToDelete) {
        throw new Error('Файл не найден');
      }

      console.log('🗑️ Удаление файла:', fileToDelete.file_name);

      if (fileToDelete.storage_path) {
        try {
          await removeStorageFile(FILES_BUCKET, fileToDelete.storage_path);
          console.log('✅ Файл удален из хранилища');
        } catch (storageError) {
          console.error('Ошибка удаления из хранилища:', storageError);
        }
      }


      const { error: deleteError } = await (supabase as any)
        .from('files')
        .delete()
        .eq('id', fileId);

      if (deleteError) {
        console.error('Ошибка удаления из базы данных:', deleteError);
        throw deleteError;
      }

      console.log('✅ Файл удален из базы данных');

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
