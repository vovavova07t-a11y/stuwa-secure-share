
import React from 'react';
import { FileTransfersTable } from './FileTransfersTable';

export const InterdepartmentDashboard: React.FC = () => {
  // В реальном приложении отдел должен определяться из контекста пользователя
  // Пока используем 'financial' как пример
  const currentDepartment = 'financial';

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Межотдельский обмен документами</h1>
        <p className="text-muted-foreground">
          Обмен файлами и документами между отделами компании
        </p>
      </div>

      <FileTransfersTable department={currentDepartment} />
    </div>
  );
};
