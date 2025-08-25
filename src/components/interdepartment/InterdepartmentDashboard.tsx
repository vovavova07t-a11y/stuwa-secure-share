
import React from 'react';
import { InterdepartmentSection } from './InterdepartmentSection';

export const InterdepartmentDashboard: React.FC = () => {
  // В реальном приложении отдел должен определяться из контекста пользователя
  // Пока используем 'technical' как пример для технической дирекции
  const currentDepartment = 'technical';

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Межотдельский обмен документами</h1>
        <p className="text-muted-foreground">
          Обмен файлами и документами между отделами компании
        </p>
      </div>

      <InterdepartmentSection currentDepartment={currentDepartment} />
    </div>
  );
};
