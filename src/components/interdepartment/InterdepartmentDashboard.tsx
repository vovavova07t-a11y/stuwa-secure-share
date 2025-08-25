
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileTransfersTable } from './FileTransfersTable';
import { InterdepartmentSection } from './InterdepartmentSection';
import { NotificationCenter } from './NotificationCenter';
import { SendDocumentModal } from './SendDocumentModal';
import { getCurrentDepartmentFromPath, DEPARTMENT_NAMES } from './utils/departmentUtils';
import { 
  Send, 
  Inbox, 
  Bell, 
  Plus,
  ArrowLeftRight
} from 'lucide-react';

export const InterdepartmentDashboard: React.FC = () => {
  const [showSendModal, setShowSendModal] = useState(false);
  const currentDepartment = getCurrentDepartmentFromPath();
  const departmentName = DEPARTMENT_NAMES[currentDepartment as keyof typeof DEPARTMENT_NAMES];

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <ArrowLeftRight className="w-8 h-8 text-primary" />
            Межотдельский обмен
          </h1>
          <p className="text-muted-foreground mt-1">
            {departmentName} - Обмен документами и файлами между отделами
          </p>
        </div>
        
        <Button 
          onClick={() => setShowSendModal(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Отправить документ
        </Button>
      </div>

      {/* Основной контент */}
      <Tabs defaultValue="documents" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <Send className="w-4 h-4" />
            Документооборот
          </TabsTrigger>
          <TabsTrigger value="files" className="flex items-center gap-2">
            <Inbox className="w-4 h-4" />
            Файлы
            <Badge className="ml-1 bg-red-500 text-white">3</Badge>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Уведомления
            <Badge className="ml-1 bg-red-500 text-white">5</Badge>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            📊 Аналитика
          </TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="mt-6">
          <InterdepartmentSection currentDepartment={currentDepartment} />
        </TabsContent>

        <TabsContent value="files" className="mt-6">
          <FileTransfersTable department={currentDepartment} />
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <NotificationCenter department={currentDepartment} />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Статистика межотдельского обмена</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">24</div>
                  <div className="text-sm text-blue-600">Отправлено документов</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">18</div>
                  <div className="text-sm text-green-600">Получено документов</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">3</div>
                  <div className="text-sm text-orange-600">Ожидают обработки</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Модальное окно отправки */}
      {showSendModal && (
        <SendDocumentModal
          onClose={() => setShowSendModal(false)}
          onSuccess={() => {
            setShowSendModal(false);
          }}
          currentDepartment={currentDepartment}
        />
      )}
    </div>
  );
};
