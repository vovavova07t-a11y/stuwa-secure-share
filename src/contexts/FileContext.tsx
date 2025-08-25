
import React, { createContext, useContext, useState, useCallback } from 'react';

interface FileData {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  category_id: string;
  uploaded_at: string;
  uploaded_by?: string;
}

interface FileContextType {
  files: Record<string, FileData[]>;
  addFiles: (categoryId: string, newFiles: FileData[]) => void;
  removeFile: (categoryId: string, fileId: string) => void;
  getFiles: (categoryId: string) => FileData[];
  clearUnknownFiles: () => void;
  getTotalFilesCount: () => number;
  getCategoryFilesCount: (categoryId: string) => number;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [files, setFiles] = useState<Record<string, FileData[]>>({});

  const addFiles = useCallback((categoryId: string, newFiles: FileData[]) => {
    console.log(`📁 Добавление ${newFiles.length} файлов в категорию: ${categoryId}`);
    setFiles(prev => ({
      ...prev,
      [categoryId]: [...(prev[categoryId] || []), ...newFiles]
    }));
  }, []);

  const removeFile = useCallback((categoryId: string, fileId: string) => {
    console.log(`🗑️ Удаление файла ${fileId} из категории: ${categoryId}`);
    setFiles(prev => ({
      ...prev,
      [categoryId]: (prev[categoryId] || []).filter(file => file.id !== fileId)
    }));
  }, []);

  const getFiles = useCallback((categoryId: string): FileData[] => {
    const categoryFiles = files[categoryId] || [];
    console.log(`📊 Файлов в категории ${categoryId}: ${categoryFiles.length}`);
    return categoryFiles;
  }, [files]);

  const clearUnknownFiles = useCallback(() => {
    console.log('🧹 Очистка всех неизвестных файлов из всех категорий');
    setFiles({});
  }, []);

  const getTotalFilesCount = useCallback(() => {
    const total = Object.values(files).reduce((sum, categoryFiles) => sum + categoryFiles.length, 0);
    console.log(`📈 Общее количество файлов: ${total}`);
    return total;
  }, [files]);

  const getCategoryFilesCount = useCallback((categoryId: string) => {
    const count = (files[categoryId] || []).length;
    return count;
  }, [files]);

  return (
    <FileContext.Provider value={{
      files,
      addFiles,
      removeFile,
      getFiles,
      clearUnknownFiles,
      getTotalFilesCount,
      getCategoryFilesCount
    }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error('useFileContext должен использоваться внутри FileProvider');
  }
  return context;
};
