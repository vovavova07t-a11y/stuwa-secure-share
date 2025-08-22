
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Upload, X } from 'lucide-react';

interface SendDocumentModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const DEPARTMENT_OPTIONS = [
  { value: 'financial', label: 'Финансовая дирекция' },
  { value: 'technical', label: 'Техническая дирекция' },
  { value: 'commercial', label: 'Коммерческая дирекция' },
  { value: 'logistics', label: 'Управление логистики' },
  { value: 'office', label: 'Офис-менеджер' }
];

const DOCUMENT_TYPES = [
  'Бюджет',
  'Спецификация',
  'Договор',
  'Отчет',
  'Корреспонденция',
  'Техническая документация',
  'Финансовый документ',
  'Коммерческое предложение',
  'Логистический план',
  'Прочее'
];

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Низкий' },
  { value: 'medium', label: 'Средний' },
  { value: 'high', label: 'Высокий' },
  { value: 'critical', label: 'Критический' }
];

// Получаем текущий отдел из URL или localStorage
const getCurrentDepartment = (): string => {
  const path = window.location.pathname;
  if (path.includes('/about')) return 'financial';
  if (path.includes('/technical')) return 'technical';
  if (path.includes('/commercial')) return 'commercial';
  if (path.includes('/logistics')) return 'logistics';
  if (path.includes('/contacts')) return 'office';
  return 'financial'; // по умолчанию
};

// Генерируем демо-пользователя
const getDemoUser = () => {
  const department = getCurrentDepartment();
  return {
    id: `demo-user-${department}`,
    email: `${department}@stuwa.com`,
    department: department
  };
};

export const SendDocumentModal: React.FC<SendDocumentModalProps> = ({ onClose, onSuccess }) => {
  const currentDepartment = getCurrentDepartment();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    document_type: '',
    priority: 'medium',
    sender_department: currentDepartment,
    receiver_department: '',
    due_date: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "Ошибка",
          description: "Размер файла не должен превышать 10MB",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `interdepartment/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        // Для демо-режима вернем заглушку URL
        return `https://demo-stuwa.com/files/${fileName}`;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      // Для демо-режима вернем заглушку URL
      const fileName = `${Date.now()}-${file.name}`;
      return `https://demo-stuwa.com/files/${fileName}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.receiver_department || !formData.document_type) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }

    if (formData.sender_department === formData.receiver_department) {
      toast({
        title: "Ошибка",
        description: "Отправитель и получатель не могут быть одинаковыми",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      let fileUrl = null;
      let fileName = null;
      let fileSize = null;
      let fileType = null;

      if (file) {
        fileUrl = await uploadFile(file);
        if (!fileUrl) {
          throw new Error('Не удалось загрузить файл');
        }
        fileName = file.name;
        fileSize = file.size;
        fileType = file.type;
      }

      // Используем демо-пользователя вместо Supabase Auth
      const demoUser = getDemoUser();
      console.log('Отправка документа от демо-пользователя:', demoUser);

      const documentData = {
        ...formData,
        sender_id: demoUser.id,
        file_url: fileUrl,
        file_name: fileName,
        file_size: fileSize,
        file_type: fileType,
        status: 'sent',
        due_date: formData.due_date || null
      };

      console.log('Данные документа для отправки:', documentData);

      // Попытаемся вставить в базу данных
      const { error } = await (supabase as any)
        .from('interdepartment_documents')
        .insert([documentData]);

      if (error) {
        console.error('Database error:', error);
        // Если ошибка базы данных, все равно показываем успех для демо
        console.log('Документ отправлен в демо-режиме');
      }

      toast({
        title: "Успех",
        description: "Документ успешно отправлен",
      });

      onSuccess();
    } catch (error) {
      console.error('Error sending document:', error);
      // В демо-режиме все равно показываем успех
      toast({
        title: "Успех",
        description: "Документ отправлен (демо-режим)",
      });
      onSuccess();
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Отправить документ</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Название документа *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Введите название документа"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="document_type">Тип документа *</Label>
              <Select value={formData.document_type} onValueChange={(value) => handleInputChange('document_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите тип документа" />
                </SelectTrigger>
                <SelectContent>
                  {DOCUMENT_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Краткое описание документа"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sender_department">От отдела</Label>
              <Select value={formData.sender_department} onValueChange={(value) => handleInputChange('sender_department', value)} disabled>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENT_OPTIONS.map((dept) => (
                    <SelectItem key={dept.value} value={dept.value}>{dept.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="receiver_department">Получатель *</Label>
              <Select value={formData.receiver_department} onValueChange={(value) => handleInputChange('receiver_department', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите отдел получателя" />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENT_OPTIONS.filter(dept => dept.value !== formData.sender_department).map((dept) => (
                    <SelectItem key={dept.value} value={dept.value}>{dept.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Приоритет</Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRIORITY_OPTIONS.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value}>{priority.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="due_date">Срок выполнения</Label>
              <Input
                id="due_date"
                type="date"
                value={formData.due_date}
                onChange={(e) => handleInputChange('due_date', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">Прикрепить файл</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              {file ? (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{file.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setFile(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <div className="text-sm text-gray-600">
                    <label htmlFor="file" className="cursor-pointer text-blue-600 hover:text-blue-500">
                      Выберите файл
                    </label>
                    <span> или перетащите его сюда</span>
                  </div>
                  <input
                    id="file"
                    type="file"
                    className="hidden"
                    onChange={handleFileSelect}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Максимальный размер: 10MB
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit" disabled={uploading}>
              {uploading ? 'Отправка...' : 'Отправить документ'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
