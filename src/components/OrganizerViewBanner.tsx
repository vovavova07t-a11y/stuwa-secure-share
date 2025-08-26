
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, ArrowLeft, Shield } from 'lucide-react';

interface OrganizerViewBannerProps {
  departmentTitle: string;
  departmentSubtitle: string;
  onBackToOrganizers: () => void;
}

export const OrganizerViewBanner: React.FC<OrganizerViewBannerProps> = ({
  departmentTitle,
  departmentSubtitle,
  onBackToOrganizers
}) => {
  return (
    <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-amber-600" />
              <span className="font-semibold text-amber-800">Режим просмотра</span>
            </div>
            <div className="text-lg font-semibold text-gray-800">
              {departmentTitle}
            </div>
            <Badge variant="outline" className="text-amber-700 border-amber-300">
              {departmentSubtitle}
            </Badge>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-sm text-amber-700">
              Доступны: просмотр и скачивание файлов
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onBackToOrganizers}
              className="gap-2 border-amber-300 text-amber-700 hover:bg-amber-100"
            >
              <ArrowLeft className="w-4 h-4" />
              <Shield className="w-4 h-4" />
              Организаторы
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
