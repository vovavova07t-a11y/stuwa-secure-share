
import { toast } from 'sonner';

export const downloadFile = async (fileUrl: string, fileName: string): Promise<void> => {
  try {
    console.log('⬇️ Начинаем скачивание файла:', fileName);
    
    toast.loading('Подготавливаем файл к скачиванию...', { id: 'download' });
    
    // Проверяем, является ли URL корректным
    if (!fileUrl || !fileUrl.startsWith('http')) {
      throw new Error('Некорректный URL файла');
    }
    
    const response = await fetch(fileUrl, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': '*/*',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
    }
    
    const blob = await response.blob();
    
    if (blob.size === 0) {
      throw new Error('Файл пустой или недоступен');
    }
    
    // Создаем временный URL для blob
    const blobUrl = window.URL.createObjectURL(blob);
    
    // Создаем временную ссылку для скачивания
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
    toast.success(`Файл "${fileName}" успешно скачан!`, { id: 'download' });
    
  } catch (error) {
    console.error('❌ Ошибка при скачивании:', error);
    toast.error(`Ошибка скачивания: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`, { id: 'download' });
    
    // Fallback: пытаемся открыть файл в новой вкладке
    try {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.click();
      toast.info('Файл открыт в новой вкладке для ручного скачивания');
    } catch (fallbackError) {
      console.error('❌ Fallback тоже не сработал:', fallbackError);
      throw error;
    }
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
    case 'bmp':
    case 'tiff':
    case 'ico':
      return 'image';
    case 'doc':
    case 'docx':
      return 'document';
    case 'xls':
    case 'xlsx':
    case 'csv':
      return 'spreadsheet';
    case 'ppt':
    case 'pptx':
      return 'presentation';
    case 'txt':
    case 'rtf':
    case 'md':
      return 'text';
    case 'zip':
    case 'rar':
    case '7z':
    case 'tar':
    case 'gz':
      return 'archive';
    case 'mp4':
    case 'avi':
    case 'mov':
    case 'wmv':
    case 'flv':
    case 'webm':
      return 'video';
    case 'mp3':
    case 'wav':
    case 'flac':
    case 'aac':
    case 'ogg':
      return 'audio';
    case 'html':
    case 'htm':
    case 'xml':
      return 'web';
    case 'json':
    case 'js':
    case 'ts':
    case 'css':
    case 'scss':
    case 'less':
      return 'code';
    default:
      return 'unknown';
  }
};

export const canPreview = (fileName: string): boolean => {
  const fileType = getFileTypeFromName(fileName);
  return ['pdf', 'image'].includes(fileType);
};

export const getFileIcon = (fileName: string): string => {
  const fileType = getFileTypeFromName(fileName);
  
  switch (fileType) {
    case 'pdf':
      return '📄';
    case 'image':
      return '🖼️';
    case 'document':
      return '📝';
    case 'spreadsheet':
      return '📊';
    case 'presentation':
      return '📋';
    case 'text':
      return '📃';
    case 'archive':
      return '📦';
    case 'video':
      return '🎬';
    case 'audio':
      return '🎵';
    case 'web':
      return '🌐';
    case 'code':
      return '💻';
    default:
      return '📁';
  }
};

export const isPreviewable = (fileName: string): boolean => {
  return canPreview(fileName);
};
