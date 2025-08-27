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

  // КРИТИЧЕСКИ ИСПРАВЛЕННАЯ ФУНКЦИЯ ЗАГРУЗКИ ФАЙЛОВ
  const loadTransfers = async () => {
    if (!department) {
      console.log('❌ Отдел не указан, загрузка невозможна');
      return;
    }
    
    try {
      setIsLoading(true);
      console.log(`🔄 ИСПРАВЛЕННАЯ загрузка файлов для отдела: ${department}`);
      
      // КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: загружаем ВСЕ файлы где отдел является отправителем ИЛИ получателем
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
      
      // ДЕТАЛЬНАЯ ОТЛАДКА ЗАГРУЖЕННЫХ ФАЙЛОВ
      console.log('📋 ДЕТАЛИ загруженных файлов:');
      departmentTransfers.forEach((transfer, index) => {
        console.log(`${index + 1}. ${transfer.file_name}:`);
        console.log(`   От: ${transfer.sender_department} → К: ${transfer.receiver_department}`);
        console.log(`   Статус: ${transfer.status}, Дата: ${transfer.created_at}`);
      });
      
      // РАЗДЕЛЕНИЕ НА ВХОДЯЩИЕ И ИСХОДЯЩИЕ
      const incomingFiles = departmentTransfers.filter(t => t.receiver_department === department);
      const outgoingFiles = departmentTransfers.filter(t => t.sender_department === department);
      
      console.log(`📥 ВХОДЯЩИЕ файлы для ${department}:`, incomingFiles.length);
      incomingFiles.forEach(f => console.log(`   - ${f.file_name} от ${f.sender_department}`));
      
      console.log(`📤 ИСХОДЯЩИЕ файлы из ${department}:`, outgoingFiles.length);
      outgoingFiles.forEach(f => console.log(`   - ${f.file_name} в ${f.receiver_department}`));
      
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

  // ИСПРАВЛЕННАЯ ФУНКЦИЯ ПОЛУЧЕНИЯ ВХОДЯЩИХ ФАЙЛОВ
  const getIncomingTransfers = () => {
    const incoming = transfers.filter(transfer => {
      const isIncoming = transfer.receiver_department === department;
      console.log(`🔍 Файл ${transfer.file_name}: ${transfer.sender_department} → ${transfer.receiver_department}, входящий для ${department}? ${isIncoming}`);
      return isIncoming;
    });
    
    console.log(`📥 ИТОГО входящих файлов для ${department}:`, incoming.length);
    return incoming;
  };

  // ИСПРАВЛЕННАЯ ФУНКЦИЯ ПОЛУЧЕНИЯ ИСХОДЯЩИХ ФАЙЛОВ  
  const getOutgoingTransfers = () => {
    const outgoing = transfers.filter(transfer => {
      const isOutgoing = transfer.sender_department === department;
      console.log(`🔍 Файл ${transfer.file_name}: ${transfer.sender_department} → ${transfer.receiver_department}, исходящий из ${department}? ${isOutgoing}`);
      return isOutgoing;
    });
    
    console.log(`📤 ИТОГО исходящих файлов из ${department}:`, outgoing.length);
    return outgoing;
  };

  const createTransfer = async (transferData: Partial<InterdepartmentTransfer>): Promise<InterdepartmentTransfer> => {
    try {
      console.log('📤 СОЗДАНИЕ ПЕРЕДАЧИ файла:', {
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
        .from('interdepartment_file_transfers' as any)
        .insert([cleanTransferData])
        .select()
        .single();

      if (insertError) {
        console.error('❌ Ошибка создания передачи:', insertError);
        throw insertError;
      }

      console.log('✅ ПЕРЕДАЧА СОЗДАНА успешно:', insertData);
      
      // Добавляем новую передачу в локальное состояние
      const newTransfer = insertData as unknown as InterdepartmentTransfer;
      setTransfers(prevTransfers => {
        const updated = [newTransfer, ...prevTransfers];
        console.log('📋 Обновленный список передач:', updated.length);
        return updated;
      });
      
      // ПРИНУДИТЕЛЬНО ОБНОВЛЯЕМ ДАННЫЕ
      setTimeout(() => {
        console.log('🔄 Принудительное обновление после создания передачи');
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

  const updateTransferStatus = async (transferId: string, status: string) => {
    try {
      console.log(`🔄 Обновление статуса передачи ${transferId} на ${status}`);
      
      const updateData: any = { 
        status
      };

      // Добавляем соответствующую временную метку без updated_at
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
        console.error('❌ Ошибка обновления статуса:', error);
        throw error;
      }

      console.log('✅ Статус успешно обновлен');

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

      // Принудительно обновляем данные через секунду
      setTimeout(() => {
        loadTransfers();
      }, 1000);
      
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
    getIncomingTransfers,
    getOutgoingTransfers
  };
};
