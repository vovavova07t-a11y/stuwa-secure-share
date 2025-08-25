
import React from 'react';
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
  return (
    <div className="space-y-6">
      {/* Заголовок категории */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Folder className="w-5 h-5 text-primary" />
            {categoryTitle}
          </CardTitle>
          {description && (
            <p className="text-muted-foreground text-sm">{description}</p>
          )}
        </CardHeader>
      </Card>

      {/* Компонент загрузки и отображения файлов */}
      <UniversalFileUpload
        title={categoryTitle}
        categoryId={categoryId}
        maxFileSize={50 * 1024 * 1024} // 50MB
        allowedTypes={['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'jpg', 'jpeg', 'png', 'gif', 'txt', 'zip', 'rar']}
        multiple={true}
        onFilesChange={(files) => {
          console.log(`Файлы обновлены в категории ${categoryId}:`, files.length);
        }}
      />
    </div>
  );
};
