
import React from 'react';
import { FinancialDashboard as FinancialDashboardComponent } from '@/components/FinancialDashboard';

const FinancialDashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <FinancialDashboardComponent />
    </div>
  );
};

export default FinancialDashboard;
