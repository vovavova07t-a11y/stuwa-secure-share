
import React from 'react';
import { InterdepartmentSection } from './InterdepartmentSection';
import { FileTransfersTable } from './FileTransfersTable';
import { NotificationCenter } from './NotificationCenter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getCurrentDepartmentFromPath } from './utils/departmentUtils';

export const InterdepartmentDashboard: React.FC = () => {
  const currentDepartment = getCurrentDepartmentFromPath();

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Межотдельский обмен документами</h1>
        <p className="text-muted-foreground">
          Обмен файлами и документами между отделами компании
        </p>
      </div>

      <Tabs defaultValue="documents" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="documents">Документы</TabsTrigger>
          <TabsTrigger value="files">Файлообмен</TabsTrigger>
          <TabsTrigger value="notifications">Уведомления</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="mt-6">
          <InterdepartmentSection currentDepartment={currentDepartment} />
        </TabsContent>

        <TabsContent value="files" className="mt-6">
          <FileTransfersTable />
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <NotificationCenter department={currentDepartment} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
