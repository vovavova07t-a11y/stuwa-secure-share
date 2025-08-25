
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface FileData {
  id: string;
  file: File; // Храним оригинальный File объект
  file_name: string;
  file_url: string; // Blob URL для локального доступа
  file_type: string;
  file_size: number;
  category_id: string;
  department: string; // Добавляем отдел
  uploaded_at: string;
  uploaded_by?: string;
}

interface FileContextType {
  files: Record<string, Record<string, FileData[]>>; // department -> category -> files
  addFiles: (department: string, categoryId: string, newFiles: FileData[]) => void;
  removeFile: (department: string, categoryId: string, fileId: string) => void;
  getFiles: (department: string, categoryId: string) => FileData[];
  clearDepartmentFiles: (department: string) => void;
  getTotalFilesCount: () => number;
  getCategoryFilesCount: (department: string, categoryId: string) => number;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [files, setFiles] = useState<Record<string, Record<string, FileData[]>>>({});

  const addFiles = useCallback((department: string, categoryId: string, newFiles: FileData[]) => {
    console.log(`📁 Добавление ${newFiles.length} файлов в отдел: ${department}, категорию: ${categoryId}`);
    console.log('📋 Новые файлы:', newFiles.map(f => f.file_name));
    
    setFiles(prev => {
      const updated = {
        ...prev,
        [department]: {
          ...prev[department],
          [categoryId]: [...(prev[department]?.[categoryId] || []), ...newFiles]
        }
      };
      console.log('🗂️ Обновленное состояние файлов:', updated);
      return updated;
    });
  }, []);

  const removeFile = useCallback((department: string, categoryId: string, fileId: string) => {
    console.log(`🗑️ Удаление файла ${fileId} из отдела: ${department}, категории: ${categoryId}`);
    
    setFiles(prev => {
      // Найдем файл для освобождения blob URL
      const fileToRemove = prev[department]?.[categoryId]?.find(f => f.id === fileId);
      if (fileToRemove && fileToRemove.file_url.startsWith('blob:')) {
        URL.revokeObjectURL(fileToRemove.file_url);
        console.log('🧹 Освобожден blob URL:', fileToRemove.file_url);
      }

      const updated = {
        ...prev,
        [department]: {
          ...prev[department],
          [categoryId]: (prev[department]?.[categoryId] || []).filter(file => file.id !== fileId)
        }
      };
      console.log('🗂️ Обновленное состояние после удаления:', updated);
      return updated;
    });
  }, []);

  const getFiles = useCallback((department: string, categoryId: string): FileData[] => {
    const departmentFiles = files[department]?.[categoryId] || [];
    console.log(`📊 Файлов в отделе ${department}, категории ${categoryId}: ${departmentFiles.length}`);
    console.log('📋 Список файлов:', departmentFiles.map(f => f.file_name));
    return departmentFiles;
  }, [files]);

  const clearDepartmentFiles = useCallback((department: string) => {
    console.log(`🧹 Очистка всех файлов отдела: ${department}`);
    
    // Освобождаем все blob URLs
    const departmentFiles = files[department];
    if (departmentFiles) {
      Object.values(departmentFiles).forEach(categoryFiles => {
        categoryFiles.forEach(file => {
          if (file.file_url.startsWith('blob:')) {
            URL.revokeObjectURL(file.file_url);
          }
        });
      });
    }
    
    setFiles(prev => {
      const updated = { ...prev };
      delete updated[department];
      return updated;
    });
  }, [files]);

  const getTotalFilesCount = useCallback(() => {
    const total = Object.values(files).reduce((sum, departmentFiles) => 
      sum + Object.values(departmentFiles).reduce((deptSum, categoryFiles) => 
        deptSum + categoryFiles.length, 0), 0);
    console.log(`📈 Общее количество файлов: ${total}`);
    return total;
  }, [files]);

  const getCategoryFilesCount = useCallback((department: string, categoryId: string) => {
    const count = (files[department]?.[categoryId] || []).length;
    return count;
  }, [files]);

  const contextValue: FileContextType = {
    files,
    addFiles,
    removeFile,
    getFiles,
    clearDepartmentFiles,
    getTotalFilesCount,
    getCategoryFilesCount
  };

  return (
    <FileContext.Provider value={contextValue}>
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
