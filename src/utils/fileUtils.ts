
import { v4 as uuidv4 } from 'uuid';

export const sanitizeFileName = (fileName: string): string => {
  // Сохраняем оригинальное расширение
  const lastDotIndex = fileName.lastIndexOf('.');
  const name = lastDotIndex > 0 ? fileName.substring(0, lastDotIndex) : fileName;
  const extension = lastDotIndex > 0 ? fileName.substring(lastDotIndex) : '';
  
  // Очищаем имя от проблемных символов для хранения
  const cleanName = name
    .replace(/[<>:"/\\|?*\s]/g, '_') // Заменяем недопустимые символы и пробелы
    .replace(/[а-яё]/gi, (match) => {
      // Транслитерация кириллицы
      const cyrillic = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
      const latin = 'abvgdeejzijklmnoprstufhcchshshhyeyuya';
      const index = cyrillic.indexOf(match.toLowerCase());
      return index !== -1 ? latin[index] : match;
    })
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

  // Проверка типа файла
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  if (!fileExtension) {
    return {
      valid: false,
      error: 'Файл должен иметь расширение'
    };
  }

  // Если разрешены все типы или конкретный тип найден
  if (allowedTypes.includes('*') || allowedTypes.includes(fileExtension)) {
    return { valid: true };
  }

  return {
    valid: false,
    error: `Неподдерживаемый тип файла. Разрешены: ${allowedTypes.join(', ').toUpperCase()}`
  };
};

export const isImageFile = (fileName: string): boolean => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension || '');
};

export const isPdfFile = (fileName: string): boolean => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  return extension === 'pdf';
};

export const isDocumentFile = (fileName: string): boolean => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  return ['doc', 'docx', 'txt', 'rtf'].includes(extension || '');
};

export const isSpreadsheetFile = (fileName: string): boolean => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  return ['xls', 'xlsx', 'csv'].includes(extension || '');
};
