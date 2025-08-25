
import React from 'react';
import { X, Download, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FinancialDocument {
  id: string;
  title: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  category: string;
}

interface DocumentViewerProps {
  document: FinancialDocument;
  onClose: () => void;
  onDelete?: () => void;
  onSendToOtherDepartment?: (document: FinancialDocument) => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  document: doc,
  onClose,
  onDelete,
  onSendToOtherDepartment
}) => {
  const handleDownload = () => {
    const link = window.document.createElement('a');
    link.href = doc.file_url;
    link.download = doc.file_name;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
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
