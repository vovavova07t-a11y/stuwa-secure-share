
import { v4 as uuidv4 } from 'uuid';

export const sanitizeFileName = (fileName: string): string => {
  // Сохраняем оригинальное расширение
  const lastDotIndex = fileName.lastIndexOf('.');
  const name = lastDotIndex > 0 ? fileName.substring(0, lastDotIndex) : fileName;
  const extension = lastDotIndex > 0 ? fileName.substring(lastDotIndex) : '';
  
  // Очищаем имя от проблемных символов для хранения
  const cleanName = name
    .replace(/[<>:"/\\|?*]/g, '_') // Заменяем недопустимые символы
    .replace(/\s+/g, '_') // Заменяем пробелы на подчеркивания
    .replace(/_{2,}/g, '_') // Убираем повторяющиеся подчеркивания
    .substring(0, 100); // Ограничиваем длину

  return cleanName + extension;
};

export const generateFileId = (): string => {
  return uuidv4();
};

export const createStoragePath = (categoryId: string, fileId: string, fileName: string): string => {
  const sanitizedFileName = sanitizeFileName(fileName);
  return `${categoryId}/${fileId}_${sanitizedFileName}`;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const validateFile = (file: File, maxSize: number, allowedTypes: string[]): { valid: boolean; error?: string } => {
  // Проверка размера
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `Файл слишком большой. Максимальный размер: ${formatFileSize(maxSize)}`
    };
  }

  // Проверка типа
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  if (!fileExtension || !allowedTypes.includes(fileExtension)) {
    return {
      valid: false,
      error: `Неподдерживаемый тип файла. Разрешены: ${allowedTypes.join(', ').toUpperCase()}`
    };
  }

  return { valid: true };
};
