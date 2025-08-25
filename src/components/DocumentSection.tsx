
import React, { useState } from 'react';
import { UniversalFileUpload } from './UniversalFileUpload';
import { UploadedFilesDisplay } from './UploadedFilesDisplay';
import { Button } from '@/components/ui/button';
import { Upload, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface DocumentSectionProps {
  categoryId: string;
  title: string;
  uploadTitle?: string;
  maxFileSize?: number;
  allowedTypes?: string[];
}

export const DocumentSection: React.FC<DocumentSectionProps> = ({
  categoryId,
  title,
  uploadTitle,
  maxFileSize,
  allowedTypes
}) => {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="space-y-6">
      {/* Отображение загруженных файлов */}
      <UploadedFilesDisplay 
        categoryId={categoryId}
        title={title}
      />
      
      {/* Кнопка для показа загрузки */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-center">
            <Button 
              onClick={() => setShowUpload(!showUpload)}
              className="flex items-center gap-2"
              variant={showUpload ? "outline" : "default"}
            >
              {showUpload ? (
                <>
                  <FileText className="w-4 h-4" />
                  Скрыть загрузку
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Загрузить документ
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Компонент загрузки */}
      {showUpload && (
        <UniversalFileUpload
          categoryId={categoryId}
          title={uploadTitle || `Загрузка - ${title}`}
          maxFileSize={maxFileSize}
          allowedTypes={allowedTypes}
          onFilesChange={() => {
            // При успешной загрузке скрываем форму загрузки
            setShowUpload(false);
          }}
        />
      )}
    </div>
  );
};
