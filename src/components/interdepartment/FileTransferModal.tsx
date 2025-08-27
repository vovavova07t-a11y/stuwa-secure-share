
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useInterdepartmentTransfers } from '@/hooks/useInterdepartmentTransfers';
import { 
  Send, 
  FileText, 
  Building2, 
  MessageSquare, 
  ArrowRight,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { formatFileSize } from '@/utils/fileUtils';

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

const DEPARTMENTS = {
  financial: 'Финансовая дирекция',
  technical: 'Техническая дирекция', 
  logistics: 'Управление логистики',
  commercial: 'Коммерческая дирекция',
  office: 'Офис-менеджер'
};

const PRIORITY_OPTIONS = {
  low: { label: 'Низкий', color: 'bg-gray-100 text-gray-800' },
  normal: { label: 'Обычный', color: 'bg-blue-100 text-blue-800' },
  high: { label: 'Высокий', color: 'bg-orange-100 text-orange-800' },
  urgent: { label: 'Срочно', color: 'bg-red-100 text-red-800' }
};

export const FileTransferModal: React.FC<FileTransferModalProps> = ({
  isOpen,
  onClose,
  file,
  currentDepartment,
  onSuccess
}) => {
  const [receiverDepartment, setReceiverDepartment] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState<'low' | 'normal' | 'high' | 'urgent'>('normal');
  const [deadline, setDeadline] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const { createTransfer } = useInterdepartmentTransfers(currentDepartment);

  // ИСПРАВЛЕННАЯ ФУНКЦИЯ ОТПРАВКИ ФАЙЛА
  const handleSubmit = async () => {
    if (!receiverDepartment) {
      toast({
        title: 'Ошибка',
        description: 'Выберите отдел получателя',
        variant: 'destructive'
      });
      return;
    }

    if (receiverDepartment === currentDepartment) {
      toast({
        title: 'Ошибка', 
        description: 'Нельзя отправить файл в тот же отдел',
        variant: 'destructive'
      });
      return;
    }

    try {
      setIsSubmitting(true);
      console.log('📤 Отправка файла между отделами:', {
        file: file.name,
        from: currentDepartment,
        to: receiverDepartment,
        priority,
        message
      });

      // СОЗДАЕМ ЗАПИСЬ О ПЕРЕДАЧЕ ФАЙЛА
      const transferData = {
        file_name: file.name,
        file_url: file.url,
        file_size: file.size,
        file_type: file.type,
        sender_department: currentDepartment,
        receiver_department: receiverDepartment,
        priority,
        status: 'sent',
        message: message.trim() || undefined,
        deadline: deadline ? new Date(deadline).toISOString() : undefined,
        is_group_send: false,
        transfer_chain: []
      };

      await createTransfer(transferData);

      console.log('✅ Файл успешно отправлен между отделами');
      
      toast({
        title: 'Файл отправлен',
        description: `Файл "${file.name}" отправлен в отдел "${DEPARTMENTS[receiverDepartment as keyof typeof DEPARTMENTS]}"`
      });

      onSuccess?.();
      onClose();
      
    } catch (error: any) {
      console.error('❌ Ошибка отправки файла:', error);
      toast({
        title: 'Ошибка отправки',
        description: `Не удалось отправить файл: ${error.message}`,
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableDepartments = Object.entries(DEPARTMENTS).filter(
    ([key]) => key !== currentDepartment
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            Отправить файл в другой отдел
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Информация о файле */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-500" />
              <div className="flex-1">
                <h4 className="font-medium">{file.name}</h4>
                <p className="text-sm text-gray-600">
                  Размер: {formatFileSize(file.size)} • Тип: {file.type}
                </p>
              </div>
            </div>
          </div>

          {/* Маршрут передачи */}
          <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-blue-800">
                {DEPARTMENTS[currentDepartment as keyof typeof DEPARTMENTS]}
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-blue-600" />
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-green-600" />
              <span className="font-medium text-green-800">
                {receiverDepartment ? DEPARTMENTS[receiverDepartment as keyof typeof DEPARTMENTS] : 'Выберите отдел'}
              </span>
            </div>
          </div>

          {/* Выбор получателя */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Отдел получатель *</label>
            <Select value={receiverDepartment} onValueChange={setReceiverDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите отдел для отправки файла" />
              </SelectTrigger>
              <SelectContent>
                {availableDepartments.map(([key, name]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      {name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Приоритет */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Приоритет</label>
            <Select value={priority} onValueChange={(value: any) => setPriority(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(PRIORITY_OPTIONS).map(([key, { label, color }]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center gap-2">
                      <Badge className={color}>{label}</Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Срок выполнения */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Срок выполнения (опционально)
            </label>
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full p-2 border rounded-md"
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>

          {/* Сообщение */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Сообщение (опционально)
            </label>
            <Textarea
              placeholder="Добавьте комментарий к передаче файла..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              maxLength={500}
            />
            <p className="text-xs text-gray-500">{message.length}/500 символов</p>
          </div>

          {/* Предупреждение */}
          <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-medium">Внимание!</p>
              <p>Файл будет отправлен в отдел "{DEPARTMENTS[receiverDepartment as keyof typeof DEPARTMENTS] || '...'}" и появится у них во входящих файлах.</p>
            </div>
          </div>

          {/* Кнопки */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Отмена
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!receiverDepartment || isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Отправляю...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Отправить файл
                </div>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
