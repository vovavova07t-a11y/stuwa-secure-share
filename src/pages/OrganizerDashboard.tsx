
import React from 'react';
import { OrganizerDashboard as OrganizerDashboardComponent } from '@/components/OrganizerDashboard';

const OrganizerDashboard: React.FC = () => {
  console.log('🔍 Загрузка панели организатора с РЕАЛЬНЫМИ файлами...');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <OrganizerDashboardComponent />
    </div>
  );
};

export default OrganizerDashboard;
