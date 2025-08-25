
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
}

interface TechnicalDocumentViewerProps {
  document: TechnicalDocument;
  onClose: () => void;
  onDelete?: () => void;
  onSendToOtherDepartment?: (document: TechnicalDocument) => void;
}

export const TechnicalDocumentViewer: React.FC<TechnicalDocumentViewerProps> = ({
  document,
  onClose,
  onDelete,
  onSendToOtherDepartment
}) => {
  const handleDownload = () => {
    window.open(document.file_url, '_blank');
  };

  const handleSend = () => {
    if (onSendToOtherDepartment) {
      onSendToOtherDepartment(document);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mt-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{document.title}</CardTitle>
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
              <span className="font-medium">Имя файла:</span> {document.file_name}
            </div>
            <div>
              <span className="font-medium">Тип:</span> {document.file_type}
            </div>
            <div>
              <span className="font-medium">Размер:</span> {Math.round(document.file_size / 1024)} KB
            </div>
            <div>
              <span className="font-medium">Категория:</span> {document.category}
            </div>
          </div>
        </div>

        {/* Встроенный просмотр документа */}
        <div className="border rounded-lg overflow-hidden" style={{ height: '500px' }}>
          {document.file_type === 'application/pdf' ? (
            <iframe
              src={document.file_url}
              className="w-full h-full"
              title={document.title}
            />
          ) : document.file_type.startsWith('image/') ? (
            <img
              src={document.file_url}
              alt={document.title}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-50">
              <div className="text-center">
                <div className="text-4xl mb-4">📄</div>
                <p className="text-gray-600">Предварительный просмотр недоступен</p>
                <p className="text-sm text-gray-500">Нажмите "Скачать" для открытия файла</p>
              </div>
            </div>
          )}
        </div>

        {/* Действия с документом */}
        <div className="flex gap-2 justify-end">
          <Button 
            variant="outline" 
            onClick={handleDownload}
            className="flex items-center gap-2"
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
