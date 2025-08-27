
import React, { useEffect } from 'react';
import { InterdepartmentDashboard } from '@/components/interdepartment/InterdepartmentDashboard';
import { getCurrentDepartmentFromPath, setCurrentDepartment } from '@/components/interdepartment/utils/departmentUtils';

const InterdepartmentPage: React.FC = () => {
  useEffect(() => {
    // Сохраняем текущий отдел при заходе на страницу междепартаментского обмена
    const currentDepartment = getCurrentDepartmentFromPath();
    setCurrentDepartment(currentDepartment);
    console.log('🏢 InterdepartmentPage: Установлен текущий отдел:', currentDepartment);
  }, []);

  return <InterdepartmentDashboard />;
};

export default InterdepartmentPage;
