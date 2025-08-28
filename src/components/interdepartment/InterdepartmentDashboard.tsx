
import React from 'react';
import { FileTransferContainer } from './FileTransferContainer';
import { getCurrentDepartmentFromPath } from './utils/departmentUtils';

export const InterdepartmentDashboard: React.FC = () => {
  // Получаем отдел из текущего URL пути
  const currentDepartment = getCurrentDepartmentFromPath();

  console.log('🏢 InterdepartmentDashboard: Текущий отдел определен как:', currentDepartment);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Межотдельский обмен документами</h1>
        <p className="text-muted-foreground">
          Обмен файлами и документами между отделами компании - {currentDepartment}
        </p>
      </div>

      <FileTransferContainer department={currentDepartment} />
    </div>
  );
};
