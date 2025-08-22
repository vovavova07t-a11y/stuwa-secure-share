
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Send, Clock, AlertTriangle, Zap } from 'lucide-react';

interface FileTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: {
    id: string;
    name: string;
    url: string;
    size: number;
    type: string;
  };
  currentDepartment: string;
  onSuccess?: () => void;
}

const DEPARTMENT_OPTIONS = [
  { value: 'financial', label: 'Финансовая дирекция (О нас)', icon: '💰' },
  { value: 'technical', label: 'Техническая дирекция (Продукция)', icon: '⚙️' },
  { value: 'logistics', label: 'Управление логистики (Клиенты)', icon: '🚚' },
  { value: 'commercial', label: 'Коммерческая дирекция (Развитие)', icon: '📈' },
  { value: 'office', label: 'Офис-менеджер (Контакты)', icon: '🏢' }
];

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Низкий', color: 'bg-gray-100 text-gray-800', icon: Clock },
  { value: 'normal', label: 'Обычный', color: 'bg-blue-100 text-blue-800', icon: Send },
  { value: 'high', label: 'Высокий', color: 'bg-orange-100 text-orange-800', icon: AlertTriangle },
  { value: 'urgent', label: 'Срочно', color: 'bg-red-100 text-red-800', icon: Zap }
];

// Генерируем стабильные UUID для демо-пользователей
const DEPARTMENT_UUIDS = {
  financial: '11111111-1111-1111-1111-111111111111',
  technical: '22222222-2222-2222-2222-222222222222',
  logistics: '33333333-3333-3333-3333-333333333333',
  commercial: '44444444-4444-4444-4444-444444444444',
  office: '55555555-5555-5555-5555-555555555555'
};

// Получаем демо-пользователя с правильным UUID
const getDemoUser = (department: string) => {
  return {
    id: DEPARTMENT_UUIDS[department as keyof typeof DEPARTMENT_UUIDS] || DEPARTMENT_UUIDS.office,
    email: `${department}@stuwa.com`,
    department: department
  };
};

export const FileTransferModal: React.FC<FileTransferModalProps> = ({
  isOpen,
  onClose,
  file,
  currentDepartment,
  onSuccess
}) => {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [priority, setPriority] = useState('normal');
  const [message, setMessage] = useState('');
  const [deadline, setDeadline] = useState('');
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const handleDepartmentToggle = (department: string) => {
    if (department === currentDepartment) return;
    
    setSelectedDepartments(prev => {
      if (prev.includes(department)) {
        return prev.filter(d => d !== department);
      } else {
        return [...prev, department];
      }
    });
  };

  const handleSend = async () => {
    if (selectedDepartments.length === 0) {
      toast({
        title: "Ошибка",
        description: "Выберите хотя бы один отдел для отправки",
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    try {
      // Используем демо-пользователя с правильным UUID
      const demoUser = getDemoUser(currentDepartment);
      console.log('Отправка файла от демо-пользователя:', demoUser);
      console.log('UUID отправителя:', demoUser.id, 'тип:', typeof demoUser.id);

      // Отправляем файл в каждый выбранный отдел
      for (const department of selectedDepartments) {
        const transferData = {
          file_name: file.name,
          file_url: file.url,
          file_size: file.size,
          file_type: file.type,
          sender_department: currentDepartment,
          receiver_department: department,
          sender_id: demoUser.id, // Теперь это правильный UUID
          priority,
          status: 'sent',
          message: message || null,
          deadline: deadline ? new Date(deadline).toISOString() : null,
          is_group_send: selectedDepartments.length > 1,
          transfer_chain: [
            {
              department: currentDepartment,
              action: 'sent',
              timestamp: new Date().toISOString(),
              user_id: demoUser.id
            }
          ]
        };

        console.log('Данные передачи файла:', transferData);

        const { data, error } = await supabase
          .from('interdepartment_file_transfers')
          .insert([transferData])
          .select();

        if (error) {
          console.error('Ошибка базы данных для отдела', department, ':', error);
          toast({
            title: "Ошибка базы данных",
            description: `Не удалось отправить файл в отдел ${department}: ${error.message}`,
            variant: "destructive",
          });
          continue;
        }

        console.log('Файл успешно отправлен в отдел', department, ':', data);
      }

      toast({
        title: "Успех",
        description: `Файл успешно отправлен в ${selectedDepartments.length} отдел(а)`,
      });

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Общая ошибка при отправке файла:', error);
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при отправке файла. Проверьте консоль для деталей.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const availableDepartments = DEPARTMENT_OPTIONS.filter(
    dept => dept.value !== currentDepartment
  );

  const selectedPriority = PRIORITY_OPTIONS.find(p => p.value === priority);
  const PriorityIcon = selectedPriority?.icon || Send;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            Отправить файл в другой отдел
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Информация о файле */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Отправляемый файл:</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                📄
              </div>
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          </div>

          {/* Выбор получателей */}
          <div className="space-y-3">
            <Label>Выберите отделы-получатели *</Label>
            <div className="grid grid-cols-1 gap-2">
              {availableDepartments.map((dept) => (
                <div
                  key={dept.value}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    selectedDepartments.includes(dept.value)
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleDepartmentToggle(dept.value)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{dept.icon}</span>
                    <span className="font-medium">{dept.label}</span>
                    {selectedDepartments.includes(dept.value) && (
                      <Badge variant="outline" className="ml-auto">
                        Выбран
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {selectedDepartments.length > 0 && (
              <p className="text-sm text-gray-600">
                Выбрано отделов: {selectedDepartments.length}
              </p>
            )}
          </div>

          {/* Приоритет */}
          <div className="space-y-2">
            <Label htmlFor="priority">Приоритет отправки</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PRIORITY_OPTIONS.map((option) => {
                  const Icon = option.icon;
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        <span>{option.label}</span>
                        <Badge className={option.color}>{option.label}</Badge>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Сообщение */}
          <div className="space-y-2">
            <Label htmlFor="message">Сообщение к файлу</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Добавьте комментарий или инструкции для получателя..."
              rows={3}
            />
          </div>

          {/* Срок ответа */}
          <div className="space-y-2">
            <Label htmlFor="deadline">Срок ответа (опционально)</Label>
            <Input
              id="deadline"
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>

          {/* Информация о групповой отправке */}
          {selectedDepartments.length > 1 && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Send className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-800">Групповая отправка</span>
              </div>
              <p className="text-sm text-blue-700">
                Файл будет отправлен в {selectedDepartments.length} отделов одновременно.
                Каждый отдел получит отдельную копию с возможностью независимой обработки.
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button 
            onClick={handleSend} 
            disabled={sending || selectedDepartments.length === 0}
            className="flex items-center gap-2"
          >
            {sending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Отправляем...
              </>
            ) : (
              <>
                <PriorityIcon className="w-4 h-4" />
                Отправить файл
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
