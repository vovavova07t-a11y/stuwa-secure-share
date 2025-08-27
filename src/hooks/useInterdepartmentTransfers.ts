
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

  const loadTransfers = async () => {
    if (!department) {
      console.log('❌ Отдел не указан, загрузка невозможна');
      return;
    }
    
    try {
      setIsLoading(true);
      console.log(`🔄 Загрузка файлов для отдела: ${department}`);
      
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

  const getIncomingTransfers = () => {
    return transfers.filter(transfer => transfer.receiver_department === department);
  };

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

      const cleanTransferData = { ...transferData };
      if (cleanTransferData.sender_id === 'demo-user' || !isValidUUID(cleanTransferData.sender_id)) {
        delete cleanTransferData.sender_id;
      }

      const { data: insertData, error: insertError } = await supabase
        .from('interdepartment_file_transfers' as any)
        .insert([cleanTransferData])
        .select()
        .single();

      if (insertError) {
        console.error('❌ Ошибка создания передачи:', insertError);
        throw insertError;
      }

      console.log('✅ ПЕРЕДАЧА СОЗДАНА успешно:', insertData);
      
      const newTransfer = insertData as unknown as InterdepartmentTransfer;
      setTransfers(prevTransfers => [newTransfer, ...prevTransfers]);
      
      setTimeout(() => {
        loadTransfers();
      }, 1000);
      
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
  const updateTransferStatus = async (transferId: string, newStatus: string) => {
    try {
      console.log(`🔄 Обновление статуса передачи ${transferId} на ${newStatus}`);
      
      // Простое обновление только статуса без дополнительных полей
      const { error } = await supabase
        .from('interdepartment_file_transfers' as any)
        .update({ status: newStatus })
        .eq('id', transferId);

      if (error) {
        console.error('❌ Ошибка обновления статуса:', error);
        throw error;
      }

      console.log('✅ Статус успешно обновлен');

      // Обновляем локальное состояние
      setTransfers(prev => prev.map(transfer => 
        transfer.id === transferId 
          ? { ...transfer, status: newStatus }
          : transfer
      ));
      
      toast({
        title: 'Статус обновлен',
        description: `Статус файла изменен на "${getStatusLabel(newStatus)}"`
      });

      // Перезагружаем данные
      setTimeout(() => {
        loadTransfers();
      }, 500);
      
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
      console.log(`🗑️ Удаление передачи файла ${transferId}`);
      
      const { error } = await supabase
        .from('interdepartment_file_transfers' as any)
        .delete()
        .eq('id', transferId);

      if (error) {
        console.error('❌ Ошибка удаления передачи:', error);
        throw error;
      }

      console.log('✅ Передача успешно удалена из БД');

      // Немедленно обновляем локальное состояние
      setTransfers(prev => {
        const filtered = prev.filter(transfer => transfer.id !== transferId);
        console.log(`📋 Обновлен локальный список: было ${prev.length}, стало ${filtered.length}`);
        return filtered;
      });
      
      toast({
        title: 'Документ удален',
        description: 'Передача файла успешно удалена'
      });

      // Перезагружаем данные для синхронизации
      setTimeout(() => {
        loadTransfers();
      }, 1000);
      
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

  const isValidUUID = (uuid?: string): boolean => {
    if (!uuid) return false;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
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
