
import React from 'react';
import { TechnicalDashboard as TechnicalDashboardComponent } from '@/components/TechnicalDashboard';
import { InterdepartmentSection } from '@/components/interdepartment/InterdepartmentSection';
import { Separator } from '@/components/ui/separator';

const TechnicalDashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <TechnicalDashboardComponent />
      <Separator />
      <InterdepartmentSection currentDepartment="technical" />
    </div>
  );
};

export default TechnicalDashboard;
