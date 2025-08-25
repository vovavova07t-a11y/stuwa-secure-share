
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
  updated_at: string;
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
    if (!department) return;
    
    try {
      setIsLoading(true);
      console.log(`🔄 Загрузка переданных файлов для отдела: ${department}`);
      
      const { data, error } = await (supabase as any)
        .from('interdepartment_file_transfers')
        .select('*')
        .or(`sender_department.eq.${department},receiver_department.eq.${department}`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Ошибка загрузки переданных файлов:', error);
        throw error;
      }

      console.log(`📁 Загружено ${data?.length || 0} переданных файлов`);
      setTransfers(data || []);
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

  const createTransfer = async (transferData: Partial<InterdepartmentTransfer>): Promise<InterdepartmentTransfer> => {
    try {
      console.log('📤 Создание передачи файла:', transferData.file_name);

      const { data: insertData, error: insertError } = await (supabase as any)
        .from('interdepartment_file_transfers')
        .insert([transferData])
        .select()
        .single();

      if (insertError) {
        console.error('Ошибка создания передачи:', insertError);
        throw insertError;
      }

      console.log('✅ Передача файла создана:', insertData);
      
      // Добавляем новую передачу в локальное состояние
      setTransfers(prevTransfers => [insertData, ...prevTransfers]);
      
      return insertData;
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
      const { error } = await (supabase as any)
        .from('interdepartment_file_transfers')
        .update({ 
          status,
          [`${status}_at`]: new Date().toISOString()
        })
        .eq('id', transferId);

      if (error) {
        console.error('Ошибка обновления статуса:', error);
        throw error;
      }

      // Обновляем локальное состояние
      setTransfers(prev => prev.map(transfer => 
        transfer.id === transferId 
          ? { ...transfer, status, [`${status}_at`]: new Date().toISOString() }
          : transfer
      ));
      
      toast({
        title: 'Статус обновлен',
        description: `Статус файла изменен на "${status}"`
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
    updateTransferStatus
  };
};
