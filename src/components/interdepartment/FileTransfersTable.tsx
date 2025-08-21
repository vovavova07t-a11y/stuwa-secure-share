
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { 
  Download, 
  Reply, 
  Forward, 
  Eye, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Send,
  Inbox,
  FileText
} from 'lucide-react';
import { FileTransferModal } from './FileTransferModal';

interface FileTransfer {
  id: string;
  file_name: string;
  file_url: string;
  file_size: number;
  file_type: string;
  sender_department: string;
  receiver_department: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  status: 'sent' | 'delivered' | 'viewed' | 'processed' | 'recalled';
  message?: string;
  created_at: string;
  delivered_at?: string;
  viewed_at?: string;
  processed_at?: string;
  deadline?: string;
  is_group_send: boolean;
  transfer_chain: any[];
}

interface FileTransfersTableProps {
  department: string;
}

const DEPARTMENT_NAMES = {
  financial: 'Финансовая дирекция',
  technical: 'Техническая дирекция', 
  logistics: 'Управление логистики',
  commercial: 'Коммерческая дирекция',
  office: 'Офис-менеджер'
};

const STATUS_CONFIG = {
  sent: { label: 'Отправлен', color: 'bg-blue-100 text-blue-800', icon: Send },
  delivered: { label: 'Доставлен', color: 'bg-yellow-100 text-yellow-800', icon: Inbox },
  viewed: { label: 'Просмотрен', color: 'bg-green-100 text-green-800', icon: Eye },
  processed: { label: 'Обработан', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  recalled: { label: 'Отозван', color: 'bg-gray-100 text-gray-800', icon: AlertCircle }
};

const PRIORITY_CONFIG = {
  low: { label: 'Низкий', color: 'bg-gray-100 text-gray-800' },
  normal: { label: 'Обычный', color: 'bg-blue-100 text-blue-800' },
  high: { label: 'Высокий', color: 'bg-orange-100 text-orange-800' },
  urgent: { label: 'Срочно', color: 'bg-red-100 text-red-800' }
};

export const FileTransfersTable: React.FC<FileTransfersTableProps> = ({ department }) => {
  const [incomingTransfers, setIncomingTransfers] = useState<FileTransfer[]>([]);
  const [outgoingTransfers, setOutgoingTransfers] = useState<FileTransfer[]>([]);
  const [pendingTransfers, setPendingTransfers] = useState<FileTransfer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTransfer, setSelectedTransfer] = useState<FileTransfer | null>(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const { toast } = useToast();

  const fetchTransfers = async () => {
    try {
      setLoading(true);
      
      // Входящие файлы
      const { data: incoming, error: incomingError } = await (supabase as any)
        .from('interdepartment_file_transfers')
        .select('*')
        .eq('receiver_department', department)
        .order('created_at', { ascending: false });

      if (incomingError) throw incomingError;

      // Исходящие файлы
      const { data: outgoing, error: outgoingError } = await (supabase as any)
        .from('interdepartment_file_transfers')
        .select('*')
        .eq('sender_department', department)
        .order('created_at', { ascending: false });

      if (outgoingError) throw outgoingError;

      setIncomingTransfers(incoming || []);
      setOutgoingTransfers(outgoing || []);
      setPendingTransfers((outgoing || []).filter(t => t.status === 'sent' || t.status === 'delivered'));

    } catch (error) {
      console.error('Error fetching transfers:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить файлы",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransfers();
  }, [department]);

  const handleStatusUpdate = async (transferId: string, newStatus: string) => {
    try {
      const { error } = await (supabase as any)
        .from('interdepartment_file_transfers')
        .update({ 
          status: newStatus,
          ...(newStatus === 'viewed' ? { viewed_at: new Date().toISOString() } : {}),
          ...(newStatus === 'processed' ? { processed_at: new Date().toISOString() } : {})
        })
        .eq('id', transferId);

      if (error) throw error;
      
      await fetchTransfers();
      toast({
        title: "Успех",
        description: "Статус файла обновлен",
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить статус",
        variant: "destructive",
      });
    }
  };

  const handleDownload = async (transfer: FileTransfer) => {
    try {
      // Отмечаем как просмотренный при скачивании
      if (transfer.status === 'delivered') {
        await handleStatusUpdate(transfer.id, 'viewed');
      }
      
      // Открываем файл в новом окне
      window.open(transfer.file_url, '_blank');
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleReply = (transfer: FileTransfer) => {
    setSelectedTransfer(transfer);
    setShowReplyModal(true);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const TransferRow: React.FC<{ transfer: FileTransfer; type: 'incoming' | 'outgoing' }> = ({ transfer, type }) => {
    const StatusIcon = STATUS_CONFIG[transfer.status].icon;
    const isOverdue = transfer.deadline && new Date(transfer.deadline) < new Date() && transfer.status !== 'processed';
    
    return (
      <TableRow className={`hover:bg-muted/50 ${isOverdue ? 'bg-red-50' : ''}`}>
        <TableCell>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            <div>
              <p className="font-medium">{transfer.file_name}</p>
              <p className="text-sm text-muted-foreground">{formatFileSize(transfer.file_size)}</p>
            </div>
          </div>
        </TableCell>
        
        <TableCell>
          <span className="text-sm">
            {type === 'incoming' 
              ? DEPARTMENT_NAMES[transfer.sender_department as keyof typeof DEPARTMENT_NAMES]
              : DEPARTMENT_NAMES[transfer.receiver_department as keyof typeof DEPARTMENT_NAMES]
            }
          </span>
        </TableCell>
        
        <TableCell>
          <span className="text-sm">{formatDate(transfer.created_at)}</span>
        </TableCell>
        
        <TableCell>
          <Badge className={PRIORITY_CONFIG[transfer.priority].color}>
            {PRIORITY_CONFIG[transfer.priority].label}
          </Badge>
        </TableCell>
        
        <TableCell>
          <div className="flex items-center gap-2">
            <StatusIcon className="w-4 h-4" />
            <Badge className={STATUS_CONFIG[transfer.status].color}>
              {STATUS_CONFIG[transfer.status].label}
            </Badge>
          </div>
        </TableCell>
        
        <TableCell>
          {transfer.message && (
            <p className="text-sm text-muted-foreground max-w-xs truncate">
              {transfer.message}
            </p>
          )}
        </TableCell>
        
        <TableCell>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDownload(transfer)}
              className="hover:bg-primary/10"
            >
              <Download className="w-4 h-4" />
            </Button>
            
            {type === 'incoming' && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleReply(transfer)}
                  className="hover:bg-primary/10"
                >
                  <Reply className="w-4 h-4" />
                </Button>
                
                {transfer.status === 'delivered' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleStatusUpdate(transfer.id, 'processed')}
                    className="hover:bg-green-100"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </Button>
                )}
              </>
            )}
          </div>
        </TableCell>
      </TableRow>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Межотдельский обмен файлами
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="incoming" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="incoming" className="flex items-center gap-2">
                <Inbox className="w-4 h-4" />
                Входящие ({incomingTransfers.length})
              </TabsTrigger>
              <TabsTrigger value="outgoing" className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Исходящие ({outgoingTransfers.length})
              </TabsTrigger>
              <TabsTrigger value="pending" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Ожидают ({pendingTransfers.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="incoming" className="mt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Файл</TableHead>
                      <TableHead>От отдела</TableHead>
                      <TableHead>Дата получения</TableHead>
                      <TableHead>Приоритет</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Сообщение</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {incomingTransfers.map((transfer) => (
                      <TransferRow key={transfer.id} transfer={transfer} type="incoming" />
                    ))}
                  </TableBody>
                </Table>
                
                {incomingTransfers.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Inbox className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Нет входящих файлов</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="outgoing" className="mt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Файл</TableHead>
                      <TableHead>В отдел</TableHead>
                      <TableHead>Дата отправки</TableHead>
                      <TableHead>Приоритет</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Сообщение</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {outgoingTransfers.map((transfer) => (
                      <TransferRow key={transfer.id} transfer={transfer} type="outgoing" />
                    ))}
                  </TableBody>
                </Table>
                
                {outgoingTransfers.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Send className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Нет исходящих файлов</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="pending" className="mt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Файл</TableHead>
                      <TableHead>В отдел</TableHead>
                      <TableHead>Дата отправки</TableHead>
                      <TableHead>Приоритет</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Сообщение</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingTransfers.map((transfer) => (
                      <TransferRow key={transfer.id} transfer={transfer} type="outgoing" />
                    ))}
                  </TableBody>
                </Table>
                
                {pendingTransfers.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Нет файлов, ожидающих подтверждения</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Reply Modal */}
      {showReplyModal && selectedTransfer && (
        <FileTransferModal
          isOpen={showReplyModal}
          onClose={() => {
            setShowReplyModal(false);
            setSelectedTransfer(null);
          }}
          file={{
            id: selectedTransfer.id,
            name: selectedTransfer.file_name,
            url: selectedTransfer.file_url,
            size: selectedTransfer.file_size,
            type: selectedTransfer.file_type
          }}
          currentDepartment={department}
          onSuccess={() => {
            fetchTransfers();
            setShowReplyModal(false);
            setSelectedTransfer(null);
          }}
        />
      )}
    </>
  );
};
