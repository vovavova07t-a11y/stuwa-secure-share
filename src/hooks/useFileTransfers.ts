
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface FileTransfer {
  id: string;
  file_id?: string;
  file_name: string;
  file_url: string;
  file_size: number;
  sender_department: string;
  recipient_department: string;
  sent_date: string;
  comment?: string;
  status: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export const useFileTransfers = (currentDepartment: string) => {
  const [transfers, setTransfers] = useState<FileTransfer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Загрузка всех передач для текущего отдела
  const loadTransfers = async () => {
    if (!currentDepartment) {
      console.log('❌ Отдел не указан, загрузка невозможна');
      return;
    }
    
    try {
      setIsLoading(true);
      console.log(`🔄 Загрузка файлов для отдела: ${currentDepartment}`);
      
      // Загружаем ВСЕ файлы где отдел является отправителем ИЛИ получателем
      const { data, error } = await supabase
        .from('file_transfers')
        .select('*')
        .or(`sender_department.eq.${currentDepartment},recipient_department.eq.${currentDepartment}`)
        .neq('status', 'deleted')
        .order('sent_date', { ascending: false });

      if (error) {
        console.error('❌ Ошибка загрузки файлов:', error);
        throw error;
      }

      console.log(`📁 Загружено файлов для отдела ${currentDepartment}:`, data?.length || 0);
      setTransfers(data || []);
      
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

  // Получение входящих файлов
  const getIncomingTransfers = () => {
    return transfers.filter(transfer => 
      transfer.recipient_department === currentDepartment && 
      transfer.status !== 'deleted'
    );
  };

  // Получение отправленных файлов (только свои)
  const getOutgoingTransfers = () => {
    return transfers.filter(transfer => 
      transfer.sender_department === currentDepartment && 
      transfer.status !== 'deleted'
    );
  };

  // Создание новой передачи файла
  const createTransfer = async (transferData: Partial<FileTransfer>): Promise<FileTransfer> => {
    try {
      console.log('📤 СОЗДАНИЕ ПЕРЕДАЧИ файла:', {
        file: transferData.file_name,
        from: transferData.sender_department,
        to: transferData.recipient_department
      });

      const { data: insertData, error: insertError } = await supabase
        .from('file_transfers')
        .insert([{
          ...transferData,
          status: 'sent',
          is_read: false
        }])
        .select()
        .single();

      if (insertError) {
        console.error('❌ Ошибка создания передачи:', insertError);
        throw insertError;
      }

      console.log('✅ ПЕРЕДАЧА СОЗДАНА успешно:', insertData);
      
      // Перезагружаем данные для актуализации
      await loadTransfers();
      
      return insertData;
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

  // Обновление статуса прочтения файла
  const updateReadStatus = async (transferId: string, isRead: boolean) => {
    try {
      console.log(`🔄 Обновление статуса прочтения ${transferId} на ${isRead}`);
      
      const { error } = await supabase
        .from('file_transfers')
        .update({ 
          is_read: isRead,
          updated_at: new Date().toISOString()
        })
        .eq('id', transferId);

      if (error) {
        console.error('❌ Ошибка обновления статуса в БД:', error);
        throw error;
      }

      console.log('✅ Статус успешно обновлен в БД');

      // Обновляем локальное состояние
      setTransfers(prev => prev.map(transfer => 
        transfer.id === transferId 
          ? { ...transfer, is_read: isRead, updated_at: new Date().toISOString() }
          : transfer
      ));
      
      toast({
        title: 'Статус обновлен',
        description: isRead ? 'Файл отмечен как прочитанный' : 'Отметка о прочтении снята'
      });
      
    } catch (error: any) {
      console.error('❌ Ошибка обновления статуса:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось обновить статус файла',
        variant: 'destructive'
      });
      throw error;
    }
  };

  // Удаление передачи (изменение статуса на deleted)
  const deleteTransfer = async (transferId: string) => {
    try {
      console.log(`🗑️ Удаление передачи файла ${transferId}`);
      
      const { error } = await supabase
        .from('file_transfers')
        .update({ 
          status: 'deleted',
          updated_at: new Date().toISOString()
        })
        .eq('id', transferId);

      if (error) {
        console.error('❌ Ошибка удаления передачи из БД:', error);
        throw error;
      }

      console.log('✅ Передача успешно удалена из БД');

      // Убираем из локального состояния
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

  useEffect(() => {
    if (currentDepartment) {
      console.log('🔄 useEffect: загрузка файлов для отдела:', currentDepartment);
      loadTransfers();
    }
  }, [currentDepartment]);

  return {
    transfers,
    isLoading,
    loadTransfers,
    createTransfer,
    updateReadStatus,
    deleteTransfer,
    getIncomingTransfers,
    getOutgoingTransfers
  };
};
