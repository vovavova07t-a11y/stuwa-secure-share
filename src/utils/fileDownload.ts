
import { toast } from 'sonner';

export const downloadFile = async (fileUrl: string, fileName: string): Promise<void> => {
  try {
    console.log('⬇️ Начинаем скачивание файла:', fileName);
    
    // Показать индикатор загрузки
    toast.loading('Скачиваем файл...', { id: 'download' });
    
    // Получаем файл
    const response = await fetch(fileUrl, {
      method: 'GET',
      mode: 'cors',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Создаем blob из response
    const blob = await response.blob();
    
    // Создаем URL для blob
    const blobUrl = window.URL.createObjectURL(blob);
    
    // Создаем скрытую ссылку для скачивания
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    link.style.display = 'none';
    
    // Добавляем ссылку в DOM, кликаем и удаляем
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Освобождаем память
    window.URL.revokeObjectURL(blobUrl);
    
    console.log('✅ Файл успешно скачан:', fileName);
    toast.success('Файл успешно скачан!', { id: 'download' });
    
  } catch (error) {
    console.error('❌ Ошибка при скачивании:', error);
    toast.error('Ошибка при скачивании файла', { id: 'download' });
    
    // Fallback - открываем файл в новом окне
    window.open(fileUrl, '_blank', 'noopener,noreferrer');
  }
};

export const getFileTypeFromName = (fileName: string): string => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'pdf':
      return 'pdf';
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'webp':
    case 'svg':
      return 'image';
    case 'doc':
    case 'docx':
      return 'document';
    case 'xls':
    case 'xlsx':
      return 'spreadsheet';
    case 'ppt':
    case 'pptx':
      return 'presentation';
    default:
      return 'unknown';
  }
};

export const canPreview = (fileName: string): boolean => {
  const fileType = getFileTypeFromName(fileName);
  return ['pdf', 'image'].includes(fileType);
};
