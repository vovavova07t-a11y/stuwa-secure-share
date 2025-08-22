
import React from 'react';
import { CommercialDashboard as CommercialDashboardComponent } from '@/components/CommercialDashboard';
import { InterdepartmentSection } from '@/components/interdepartment/InterdepartmentSection';
import { Separator } from '@/components/ui/separator';

const CommercialDashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <CommercialDashboardComponent />
      <Separator />
      <InterdepartmentSection currentDepartment="commercial" />
    </div>
  );
};

export default CommercialDashboard;
