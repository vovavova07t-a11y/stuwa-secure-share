
import React from 'react';
import { CategoryFilesGrid } from './CategoryFilesGrid';
import { OrganizerFileSection } from './OrganizerFileSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Folder } from 'lucide-react';

interface CategoryFileSectionProps {
  categoryId: string;
  categoryTitle: string;
  description?: string;
  department?: string;
  isOrganizerView?: boolean;
}

export const CategoryFileSection: React.FC<CategoryFileSectionProps> = ({
  categoryId,
  categoryTitle,
  description,
  department,
  isOrganizerView = false
}) => {
  // Если это просмотр организатора и указан отдел, используем OrganizerFileSection
  if (isOrganizerView && department) {
    return (
      <div className="space-y-6">
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

        <OrganizerFileSection
          categoryId={categoryId}
          categoryTitle={categoryTitle}
          department={department}
          isViewOnly={true}
        />
      </div>
    );
  }

  // Обычный режим для сотрудников отделов
  return (
    <div className="space-y-6">
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

      <CategoryFilesGrid
        categoryId={categoryId}
        categoryTitle={categoryTitle}
      />
    </div>
  );
};
