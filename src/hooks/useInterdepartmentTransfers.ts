
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

  // ИСПРАВЛЕННАЯ ФУНКЦИЯ ЗАГРУЗКИ ФАЙЛОВ
  const loadTransfers = async () => {
    if (!department) {
      console.log('❌ Отдел не указан, загрузка невозможна');
      return;
    }
    
    try {
      setIsLoading(true);
      console.log(`🔄 Загрузка файлов для отдела: ${department}`);
      
      // Загружаем ВСЕ файлы где отдел является отправителем ИЛИ получателем
      const { data, error } = await supabase
        .from('interdepartment_file_transfers' as any)
        .select('*')
        .or(`sender_department.eq.${department},receiver_department.eq.${department}`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Ошибка загрузки файлов:', error);
        throw error;
      }

      console.log(`📁 Загружено файлов для отдела ${department}:`, data?.length || 0);
      
      const departmentTransfers = (data as unknown as InterdepartmentTransfer[]) || [];
      setTransfers(departmentTransfers);
      
    } catch (error) {
      console.error('❌ Критическая ошибка загрузки:', error);
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

  // ФУНКЦИЯ ПОЛУЧЕНИЯ ВХОДЯЩИХ ФАЙЛОВ
  const getIncomingTransfers = () => {
    return transfers.filter(transfer => transfer.receiver_department === department);
  };

  // ФУНКЦИЯ ПОЛУЧЕНИЯ ИСХОДЯЩИХ ФАЙЛОВ  
  const getOutgoingTransfers = () => {
    return transfers.filter(transfer => transfer.sender_department === department);
  };

  const createTransfer = async (transferData: Partial<InterdepartmentTransfer>): Promise<InterdepartmentTransfer> => {
    try {
      console.log('📤 СОЗДАНИЕ ПЕРЕДАЧИ файла:', {
        file: transferData.file_name,
        from: transferData.sender_department,
        to: transferData.receiver_department
      });

      const { data: insertData, error: insertError } = await supabase
        .from('interdepartment_file_transfers' as any)
        .insert([transferData])
        .select()
        .single();

      if (insertError) {
        console.error('❌ Ошибка создания передачи:', insertError);
        throw insertError;
      }

      console.log('✅ ПЕРЕДАЧА СОЗДАНА успешно:', insertData);
      
      const newTransfer = insertData as unknown as InterdepartmentTransfer;
      
      // Перезагружаем данные для актуализации
      await loadTransfers();
      
      return newTransfer;
    } catch (error: any) {
      console.error('❌ Критическая ошибка создания передачи:', error);
      toast({
        title: 'Ошибка передачи',
        description: `Не удалось создать передачу: ${error.message}`,
        variant: 'destructive'
      });
      throw error;
    }
  };

  // ИСПРАВЛЕННАЯ ФУНКЦИЯ ОБНОВЛЕНИЯ СТАТУСА
  const updateTransferStatus = async (transferId: string, status: string) => {
    try {
      console.log(`🔄 Обновление статуса передачи ${transferId} на ${status}`);
      
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
        .from('interdepartment_file_transfers' as any)
        .update(updateData)
        .eq('id', transferId);

      if (error) {
        console.error('❌ Ошибка обновления статуса в БД:', error);
        throw error;
      }

      console.log('✅ Статус успешно обновлен в БД');

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
      console.error('❌ Ошибка обновления статуса передачи:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось обновить статус передачи',
        variant: 'destructive'
      });
      throw error;
    }
  };

  // ИСПРАВЛЕННАЯ ФУНКЦИЯ УДАЛЕНИЯ
  const deleteTransfer = async (transferId: string) => {
    try {
      console.log(`🗑️ Удаление передачи файла ${transferId} из БД`);
      
      const { error } = await supabase
        .from('interdepartment_file_transfers' as any)
        .delete()
        .eq('id', transferId);

      if (error) {
        console.error('❌ Ошибка удаления передачи из БД:', error);
        throw error;
      }

      console.log('✅ Передача успешно удалена из БД');

      // Обновляем локальное состояние
      setTransfers(prev => prev.filter(transfer => transfer.id !== transferId));
      
      toast({
        title: 'Документ удален',
        description: 'Передача файла успешно удалена из системы'
      });
      
    } catch (error: any) {
      console.error('❌ Ошибка удаления передачи:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить передачу файла',
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

  useEffect(() => {
    if (department) {
      console.log('🔄 useEffect: загрузка файлов для отдела:', department);
      loadTransfers();
    }
  }, [department]);

  return {
    transfers,
    isLoading,
    loadTransfers,
    createTransfer,
    updateTransferStatus,
    deleteTransfer,
    getIncomingTransfers,
    getOutgoingTransfers
  };
};
