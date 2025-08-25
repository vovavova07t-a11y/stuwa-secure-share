
import React from 'react';
import { X, Download, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TechnicalDocument {
  id: string;
  title: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  category: string;
  file?: File;
}

interface TechnicalDocumentViewerProps {
  document: TechnicalDocument;
  onClose: () => void;
  onDelete?: () => void;
  onSendToOtherDepartment?: (document: TechnicalDocument) => void;
}

export const TechnicalDocumentViewer: React.FC<TechnicalDocumentViewerProps> = ({
  document: doc,
  onClose,
  onDelete,
  onSendToOtherDepartment
}) => {
  // ПОЛНОСТЬЮ ИСПРАВЛЕННАЯ ФУНКЦИЯ СКАЧИВАНИЯ
  const handleDownload = async () => {
    try {
      console.log('⬇️ TechnicalDocumentViewer: Принудительное скачивание файла:', doc.file_name);
      
      if (doc.file instanceof File) {
        // Если есть оригинальный File объект - создаем blob URL
        const url = URL.createObjectURL(doc.file);
        const link = document.createElement('a');
        link.href = url;
        link.download = doc.file_name;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        console.log('✅ Файл скачан через File объект');
        return;
      }

      // Для файлов из внешних источников - принудительное скачивание через fetch
      const response = await fetch(doc.file_url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Получаем blob данные
      const blob = await response.blob();
      
      // Создаем URL для blob
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Создаем временную ссылку для принудительного скачивания
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = doc.file_name; // Сохраняем оригинальное имя файла
      link.style.display = 'none';
      
      // Добавляем в DOM, кликаем и сразу удаляем
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Освобождаем память
      window.URL.revokeObjectURL(blobUrl);
      console.log('✅ Файл успешно скачан через fetch:', doc.file_name);
      
    } catch (error) {
      console.error('❌ Ошибка при скачивании:', error);
      
      // Если fetch не сработал, пытаемся через прямую ссылку с download атрибутом
      try {
        const link = document.createElement('a');
        link.href = doc.file_url;
        link.download = doc.file_name;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log('✅ Файл скачан через прямую ссылку');
      } catch (fallbackError) {
        console.error('❌ Fallback тоже не сработал:', fallbackError);
        // В крайнем случае открываем в новой вкладке
        window.open(doc.file_url, '_blank', 'noopener,noreferrer');
      }
    }
  };

  const handleSend = () => {
    if (onSendToOtherDepartment) {
      onSendToOtherDepartment(doc);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mt-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{doc.title}</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Информация о файле */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Имя файла:</span> {doc.file_name}
            </div>
            <div>
              <span className="font-medium">Тип:</span> {doc.file_type}
            </div>
            <div>
              <span className="font-medium">Размер:</span> {Math.round(doc.file_size / 1024)} KB
            </div>
            <div>
              <span className="font-medium">Категория:</span> {doc.category}
            </div>
            <div className="col-span-2">
              <span className="font-medium">Статус:</span> 
              <span className="ml-2 text-green-600">
                {doc.file instanceof File ? '💾 Локальный файл' : '🔗 Внешний файл'}
              </span>
            </div>
          </div>
        </div>

        {/* Встроенный просмотр документа */}
        <div className="border rounded-lg overflow-hidden" style={{ height: '500px' }}>
          {doc.file_type === 'application/pdf' ? (
            <iframe
              src={doc.file_url}
              className="w-full h-full"
              title={doc.title}
            />
          ) : doc.file_type.startsWith('image/') ? (
            <img
              src={doc.file_url}
              alt={doc.title}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-50">
              <div className="text-center">
                <div className="text-4xl mb-4">📄</div>
                <p className="text-gray-600">Предварительный просмотр недоступен</p>
                <p className="text-sm text-gray-500">Нажмите "Скачать" для сохранения файла</p>
                <Button 
                  className="mt-4"
                  onClick={handleDownload}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Скачать файл
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Действия с документом */}
        <div className="flex gap-2 justify-end">
          <Button 
            variant="outline" 
            onClick={handleDownload}
            className="flex items-center gap-2 hover:bg-green-50 hover:text-green-700"
          >
            <Download className="w-4 h-4" />
            Скачать
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleSend}
            className="flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Отправить в другой отдел
          </Button>
          
          {onDelete && (
            <Button 
              variant="destructive" 
              onClick={onDelete}
              size="sm"
            >
              Удалить
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
