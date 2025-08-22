
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { 
  Send, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Plus, 
  Eye,
  Download,
  MessageSquare
} from 'lucide-react';
import { SendDocumentModal } from './SendDocumentModal';
import { FileTransferModal } from './FileTransferModal';
import { getCurrentDepartmentFromPath, DEPARTMENT_NAMES } from './utils/departmentUtils';

interface InterdepartmentSectionProps {
  currentDepartment?: string;
}

interface Document {
  id: string;
  title: string;
  document_type: string;
  priority: string;
  status: string;
  sender_department: string;
  receiver_department: string;
  created_at: string;
  due_date?: string;
  file_name?: string;
  file_url?: string;
  description?: string;
}

const STATUS_CONFIG = {
  sent: { label: 'Отправлен', color: 'bg-blue-100 text-blue-800', icon: Send },
  received: { label: 'Получен', color: 'bg-yellow-100 text-yellow-800', icon: Eye },
  in_progress: { label: 'В работе', color: 'bg-orange-100 text-orange-800', icon: Clock },
  completed: { label: 'Завершен', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  rejected: { label: 'Отклонен', color: 'bg-red-100 text-red-800', icon: AlertCircle }
};

const PRIORITY_CONFIG = {
  low: { label: 'Низкий', color: 'bg-gray-100 text-gray-800' },
  medium: { label: 'Средний', color: 'bg-blue-100 text-blue-800' },
  high: { label: 'Высокий', color: 'bg-orange-100 text-orange-800' },
  critical: { label: 'Критический', color: 'bg-red-100 text-red-800' }
};

export const InterdepartmentSection: React.FC<InterdepartmentSectionProps> = ({ 
  currentDepartment 
}) => {
  const department = currentDepartment || getCurrentDepartmentFromPath();
  const [incomingDocuments, setIncomingDocuments] = useState<Document[]>([]);
  const [outgoingDocuments, setOutgoingDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const { toast } = useToast();

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      console.log(`Загрузка документов для отдела: ${department}`);
      
      // Входящие документы - где текущий отдел является получателем
      const { data: incoming, error: incomingError } = await (supabase as any)
        .from('interdepartment_documents')
        .select('*')
        .eq('receiver_department', department)
        .order('created_at', { ascending: false });

      if (incomingError) {
        console.error('Ошибка загрузки входящих документов:', incomingError);
      } else {
        console.log(`Найдено входящих документов: ${incoming?.length || 0}`);
        console.log('Входящие документы:', incoming);
      }

      // Исходящие документы - где текущий отдел является отправителем
      const { data: outgoing, error: outgoingError } = await (supabase as any)
        .from('interdepartment_documents')
        .select('*')
        .eq('sender_department', department)
        .order('created_at', { ascending: false });

      if (outgoingError) {
        console.error('Ошибка загрузки исходящих документов:', outgoingError);
      } else {
        console.log(`Найдено исходящих документов: ${outgoing?.length || 0}`);
        console.log('Исходящие документы:', outgoing);
      }

      setIncomingDocuments(incoming || []);
      setOutgoingDocuments(outgoing || []);

    } catch (error) {
      console.error('Общая ошибка при загрузке документов:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить документы",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [department]);

  const handleSendFile = (document: Document) => {
    if (document.file_url) {
      setSelectedFile({
        id: document.id,
        name: document.file_name || document.title,
        url: document.file_url,
        size: 0,
        type: 'document'
      });
      setShowFileModal(true);
    }
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

  const DocumentRow: React.FC<{ document: Document; type: 'incoming' | 'outgoing' }> = ({ 
    document, 
    type 
  }) => {
    const StatusIcon = STATUS_CONFIG[document.status as keyof typeof STATUS_CONFIG]?.icon || FileText;
    const isOverdue = document.due_date && new Date(document.due_date) < new Date() && document.status !== 'completed';
    
    return (
      <TableRow className={`hover:bg-muted/50 ${isOverdue ? 'bg-red-50' : ''}`}>
        <TableCell>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            <div>
              <p className="font-medium">{document.title}</p>
              <p className="text-sm text-muted-foreground">{document.document_type}</p>
            </div>
          </div>
        </TableCell>
        
        <TableCell>
          <span className="text-sm">
            {type === 'incoming' 
              ? DEPARTMENT_NAMES[document.sender_department as keyof typeof DEPARTMENT_NAMES]
              : DEPARTMENT_NAMES[document.receiver_department as keyof typeof DEPARTMENT_NAMES]
            }
          </span>
        </TableCell>
        
        <TableCell>
          <span className="text-sm">{formatDate(document.created_at)}</span>
        </TableCell>
        
        <TableCell>
          <Badge className={PRIORITY_CONFIG[document.priority as keyof typeof PRIORITY_CONFIG]?.color}>
            {PRIORITY_CONFIG[document.priority as keyof typeof PRIORITY_CONFIG]?.label}
          </Badge>
        </TableCell>
        
        <TableCell>
          <div className="flex items-center gap-2">
            <StatusIcon className="w-4 h-4" />
            <Badge className={STATUS_CONFIG[document.status as keyof typeof STATUS_CONFIG]?.color}>
              {STATUS_CONFIG[document.status as keyof typeof STATUS_CONFIG]?.label}
            </Badge>
          </div>
        </TableCell>
        
        <TableCell>
          {document.description && (
            <p className="text-sm text-muted-foreground max-w-xs truncate">
              {document.description}
            </p>
          )}
        </TableCell>
        
        <TableCell>
          <div className="flex items-center gap-1">
            {document.file_url && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(document.file_url, '_blank')}
                className="hover:bg-primary/10"
                title="Скачать файл"
              >
                <Download className="w-4 h-4" />
              </Button>
            )}
            
            {type === 'incoming' && document.file_url && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSendFile(document)}
                className="hover:bg-primary/10"
                title="Переслать файл"
              >
                <Send className="w-4 h-4" />
              </Button>
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
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Межотдельское взаимодействие - {DEPARTMENT_NAMES[department as keyof typeof DEPARTMENT_NAMES]}
            </CardTitle>
            <Button onClick={() => setShowSendModal(true)} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Отправить документ
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="incoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="incoming" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Входящие ({incomingDocuments.length})
              </TabsTrigger>
              <TabsTrigger value="outgoing" className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Исходящие ({outgoingDocuments.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="incoming" className="mt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Документ</TableHead>
                      <TableHead>От отдела</TableHead>
                      <TableHead>Дата получения</TableHead>
                      <TableHead>Приоритет</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Описание</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {incomingDocuments.map((document) => (
                      <DocumentRow key={document.id} document={document} type="incoming" />
                    ))}
                  </TableBody>
                </Table>
                
                {incomingDocuments.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Нет входящих документов</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="outgoing" className="mt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Документ</TableHead>
                      <TableHead>В отдел</TableHead>
                      <TableHead>Дата отправки</TableHead>
                      <TableHead>Приоритет</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Описание</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {outgoingDocuments.map((document) => (
                      <DocumentRow key={document.id} document={document} type="outgoing" />
                    ))}
                  </TableBody>
                </Table>
                
                {outgoingDocuments.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Send className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Нет исходящих документов</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Send Document Modal */}
      {showSendModal && (
        <SendDocumentModal
          onClose={() => setShowSendModal(false)}
          onSuccess={() => {
            setShowSendModal(false);
            fetchDocuments();
          }}
          currentDepartment={department}
        />
      )}

      {/* File Transfer Modal */}
      {showFileModal && selectedFile && (
        <FileTransferModal
          isOpen={showFileModal}
          onClose={() => {
            setShowFileModal(false);
            setSelectedFile(null);
          }}
          file={selectedFile}
          currentDepartment={department}
          onSuccess={() => {
            setShowFileModal(false);
            setSelectedFile(null);
            fetchDocuments();
          }}
        />
      )}
    </>
  );
};
