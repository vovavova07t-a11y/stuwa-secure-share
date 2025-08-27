
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface InterdepartmentTransfer {
  id: string;
  file_name: string;
  file_url: string;
  file_size: number;
  file_type: string;
  sender_department: string;
  receiver_department: string;
  sender_id?: string;
  receiver_id?: string;
  priority: string;
  status: string;
  message?: string;
  deadline?: string;
  is_group_send: boolean;
  transfer_chain: any[];
  created_at: string;
  delivered_at?: string;
  viewed_at?: string;
  processed_at?: string;
  recalled_at?: string;
}

export const useInterdepartmentTransfers = (department: string) => {
  const [transfers, setTransfers] = useState<InterdepartmentTransfer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // ИСПРАВЛЕННАЯ ФУНКЦИЯ ЗАГРУЗКИ - ТОЛЬКО ФАЙЛЫ ДАННОГО ОТДЕЛА
  const loadTransfers = async () => {
    if (!department) return;
    
    try {
      setIsLoading(true);
      console.log(`🔄 Загрузка файлов ТОЛЬКО для отдела: ${department}`);
      
      // КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: каждый отдел видит ТОЛЬКО свои файлы
      const { data, error } = await supabase
        .from('interdepartment_file_transfers')
        .select('*')
        .or(`sender_department.eq.${department},receiver_department.eq.${department}`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Ошибка загрузки переданных файлов:', error);
        throw error;
      }

      console.log(`📁 Для отдела ${department} загружено ${data?.length || 0} файлов`);
      
      // Фильтруем файлы по типу для правильного отображения
      const departmentTransfers = (data as unknown as InterdepartmentTransfer[]) || [];
      
      // ЛОГИРОВАНИЕ ДЛЯ ОТЛАДКИ ИЗОЛЯЦИИ ОТДЕЛОВ
      const incomingFiles = departmentTransfers.filter(t => t.receiver_department === department);
      const outgoingFiles = departmentTransfers.filter(t => t.sender_department === department);
      
      console.log(`📥 Входящие файлы для ${department}:`, incomingFiles.length);
      console.log(`📤 Отправленные файлы из ${department}:`, outgoingFiles.length);
      
      setTransfers(departmentTransfers);
    } catch (error) {
      console.error('Ошибка при загрузке переданных файлов:', error);
      setTransfers([]);
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить переданные файлы',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ИСПРАВЛЕННАЯ ФУНКЦИЯ ПОЛУЧЕНИЯ ВХОДЯЩИХ ФАЙЛОВ - ТОЛЬКО ДЛЯ ДАННОГО ОТДЕЛА
  const getIncomingTransfers = () => {
    return transfers.filter(transfer => transfer.receiver_department === department);
  };

  // ИСПРАВЛЕННАЯ ФУНКЦИЯ ПОЛУЧЕНИЯ ОТПРАВЛЕННЫХ ФАЙЛОВ - ТОЛЬКО ИЗ ДАННОГО ОТДЕЛА  
  const getOutgoingTransfers = () => {
    return transfers.filter(transfer => transfer.sender_department === department);
  };

  const createTransfer = async (transferData: Partial<InterdepartmentTransfer>): Promise<InterdepartmentTransfer> => {
    try {
      console.log('📤 Создание передачи файла:', {
        file: transferData.file_name,
        from: transferData.sender_department,
        to: transferData.receiver_department
      });

      // Убираем sender_id если он равен "demo-user" или не является валидным UUID
      const cleanTransferData = { ...transferData };
      if (cleanTransferData.sender_id === 'demo-user' || !isValidUUID(cleanTransferData.sender_id)) {
        delete cleanTransferData.sender_id;
      }

      const { data: insertData, error: insertError } = await supabase
        .from('interdepartment_file_transfers')
        .insert([cleanTransferData])
        .select()
        .single();

      if (insertError) {
        console.error('Ошибка создания передачи:', insertError);
        throw insertError;
      }

      console.log('✅ Передача файла создана успешно');
      
      // Добавляем новую передачу в локальное состояние
      const newTransfer = insertData as unknown as InterdepartmentTransfer;
      setTransfers(prevTransfers => [newTransfer, ...prevTransfers]);
      
      return newTransfer;
    } catch (error: any) {
      console.error('Ошибка создания передачи файла:', error);
      toast({
        title: 'Ошибка передачи',
        description: `Не удалось создать передачу: ${error.message}`,
        variant: 'destructive'
      });
      throw error;
    }
  };

  const updateTransferStatus = async (transferId: string, status: string) => {
    try {
      const updateData: any = { 
        status
      };

      // Добавляем соответствующую временную метку
      if (status === 'viewed') {
        updateData.viewed_at = new Date().toISOString();
      } else if (status === 'processed') {
        updateData.processed_at = new Date().toISOString();
      } else if (status === 'delivered') {
        updateData.delivered_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('interdepartment_file_transfers')
        .update(updateData)
        .eq('id', transferId);

      if (error) {
        console.error('Ошибка обновления статуса:', error);
        throw error;
      }

      // Обновляем локальное состояние
      setTransfers(prev => prev.map(transfer => 
        transfer.id === transferId 
          ? { ...transfer, ...updateData }
          : transfer
      ));
      
      toast({
        title: 'Статус обновлен',
        description: `Статус файла изменен на "${getStatusLabel(status)}"`
      });
    } catch (error: any) {
      console.error('Ошибка обновления статуса передачи:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось обновить статус передачи',
        variant: 'destructive'
      });
      throw error;
    }
  };

  const getStatusLabel = (status: string): string => {
    const statusLabels: Record<string, string> = {
      sent: 'Отправлено',
      delivered: 'Доставлено', 
      viewed: 'Просмотрено',
      processed: 'Обработано',
      recalled: 'Отозвано'
    };
    return statusLabels[status] || status;
  };

  // Функция для проверки валидности UUID
  const isValidUUID = (uuid?: string): boolean => {
    if (!uuid) return false;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  };

  useEffect(() => {
    if (department) {
      loadTransfers();
    }
  }, [department]);

  return {
    transfers,
    isLoading,
    loadTransfers,
    createTransfer,
    updateTransferStatus,
    getIncomingTransfers,
    getOutgoingTransfers
  };
};
