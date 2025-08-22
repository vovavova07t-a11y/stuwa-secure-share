
import React from 'react';
import { LogisticsDashboard as LogisticsDashboardComponent } from '@/components/LogisticsDashboard';
import { InterdepartmentSection } from '@/components/interdepartment/InterdepartmentSection';
import { Separator } from '@/components/ui/separator';

const LogisticsDashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <LogisticsDashboardComponent />
      <Separator />
      <InterdepartmentSection currentDepartment="logistics" />
    </div>
  );
};

export default LogisticsDashboard;
