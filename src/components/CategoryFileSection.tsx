
import React from 'react';
import { CategoryFilesGrid } from './CategoryFilesGrid';
import { UniversalFileUpload } from './UniversalFileUpload';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Folder } from 'lucide-react';

interface CategoryFileSectionProps {
  categoryId: string;
  categoryTitle: string;
  description?: string;
}

export const CategoryFileSection: React.FC<CategoryFileSectionProps> = ({
  categoryId,
  categoryTitle,
  description
}) => {
  const [showUpload, setShowUpload] = React.useState(false);
  const [refreshTrigger, setRefreshTrigger] = React.useState(0);

  // Функция для обновления списка файлов после загрузки
  const handleFilesUploaded = () => {
    setRefreshTrigger(prev => prev + 1);
    // Скрываем область загрузки через 2 секунды после успешной загрузки
    setTimeout(() => setShowUpload(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Description Card */}
      {description && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Folder className="w-5 h-5 text-primary" />
              О категории: {categoryTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{description}</p>
          </CardContent>
        </Card>
      )}

      {/* Files Grid - Always visible with refresh trigger */}
      <CategoryFilesGrid
        key={refreshTrigger} // Принудительно обновляем компонент при изменении refreshTrigger
        categoryId={categoryId}
        categoryTitle={categoryTitle}
        onUploadClick={() => setShowUpload(!showUpload)}
      />

      {/* Upload Component - Only when needed */}
      {showUpload && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Загрузка новых документов</CardTitle>
          </CardHeader>
          <CardContent>
            <UniversalFileUpload
              title={`Загрузка документов - ${categoryTitle}`}
              categoryId={categoryId}
              maxFileSize={50 * 1024 * 1024} // 50MB
              allowedTypes={['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'jpg', 'jpeg', 'png', 'gif', 'txt', 'zip', 'rar']}
              multiple={true}
              onFilesChange={(files) => {
                console.log(`Файлы обновлены в категории ${categoryId}:`, files.length);
                // Обновляем список файлов после успешной загрузки
                if (files.some(f => f.status === 'success')) {
                  handleFilesUploaded();
                }
              }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};
