
import React from 'react';
import { CategoryFilesGrid } from './CategoryFilesGrid';
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

      {/* Files Grid with integrated upload */}
      <CategoryFilesGrid
        categoryId={categoryId}
        categoryTitle={categoryTitle}
      />
    </div>
  );
};
