
import React from 'react';
import { FinancialDashboard as FinancialDashboardComponent } from '@/components/FinancialDashboard';
import { InterdepartmentSection } from '@/components/interdepartment/InterdepartmentSection';
import { Separator } from '@/components/ui/separator';

const FinancialDashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <FinancialDashboardComponent />
      <Separator />
      <InterdepartmentSection currentDepartment="financial" />
    </div>
  );
};

export default FinancialDashboard;
