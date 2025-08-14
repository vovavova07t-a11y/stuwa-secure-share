
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { 
  Send, 
  Inbox, 
  Clock, 
  Users, 
  FileText, 
  AlertCircle,
  CheckCircle,
  XCircle,
  RotateCcw
} from 'lucide-react';
import { SendDocumentModal } from './SendDocumentModal';
import { DocumentDetailsModal } from './DocumentDetailsModal';
import { useToast } from '@/components/ui/use-toast';

interface InterdepartmentDocument {
  id: string;
  title: string;
  description?: string;
  document_type: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'sent' | 'received' | 'in_progress' | 'approved' | 'needs_revision' | 'rejected';
  sender_department: string;
  receiver_department: string;
  sender_id?: string;
  assigned_to?: string;
  file_url?: string;
  file_name?: string;
  created_at: string;
  updated_at: string;
  due_date?: string;
}

const DEPARTMENT_NAMES = {
  financial: 'Финансовая дирекция',
  technical: 'Техническая дирекция', 
  commercial: 'Коммерческая дирекция',
  logistics: 'Управление логистики',
  office: 'Офис-менеджер'
};

const DEPARTMENT_COLORS = {
  financial: 'bg-blue-100 text-blue-800',
  technical: 'bg-green-100 text-green-800',
  commercial: 'bg-orange-100 text-orange-800',
  logistics: 'bg-purple-100 text-purple-800',
  office: 'bg-gray-100 text-gray-800'
};

const STATUS_CONFIG = {
  sent: { label: 'Отправлен', color: 'bg-blue-100 text-blue-800', icon: Send },
  received: { label: 'Получен', color: 'bg-yellow-100 text-yellow-800', icon: Inbox },
  in_progress: { label: 'В обработке', color: 'bg-orange-100 text-orange-800', icon: Clock },
  approved: { label: 'Утвержден', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  needs_revision: { label: 'Нужна доработка', color: 'bg-red-100 text-red-800', icon: RotateCcw },
  rejected: { label: 'Отклонен', color: 'bg-red-100 text-red-800', icon: XCircle }
};

const PRIORITY_CONFIG = {
  low: { label: 'Низкий', color: 'bg-gray-100 text-gray-800' },
  medium: { label: 'Средний', color: 'bg-blue-100 text-blue-800' },
  high: { label: 'Высокий', color: 'bg-orange-100 text-orange-800' },
  critical: { label: 'Критический', color: 'bg-red-100 text-red-800' }
};

export const InterdepartmentDashboard: React.FC = () => {
  const [documents, setDocuments] = useState<InterdepartmentDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('incoming');
  const [showSendModal, setShowSendModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<InterdepartmentDocument | null>(null);
  const { toast } = useToast();

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('interdepartment_documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
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
  }, []);

  const getFilteredDocuments = (type: string) => {
    switch (type) {
      case 'incoming':
        return documents.filter(doc => doc.status === 'received' || doc.status === 'in_progress');
      case 'outgoing':
        return documents.filter(doc => doc.status === 'sent');
      case 'pending':
        return documents.filter(doc => doc.status === 'needs_revision');
      case 'collaborative':
        return documents.filter(doc => doc.status === 'in_progress');
      default:
        return documents;
    }
  };

  const updateDocumentStatus = async (documentId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('interdepartment_documents')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', documentId);

      if (error) throw error;
      
      await fetchDocuments();
      toast({
        title: "Успех",
        description: "Статус документа обновлен",
      });
    } catch (error) {
      console.error('Error updating document status:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить статус документа",
        variant: "destructive",
      });
    }
  };

  const DocumentCard: React.FC<{ document: InterdepartmentDocument }> = ({ document }) => {
    const StatusIcon = STATUS_CONFIG[document.status].icon;
    
    return (
      <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedDocument(document)}>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold">{document.title}</CardTitle>
            <Badge className={PRIORITY_CONFIG[document.priority].color}>
              {PRIORITY_CONFIG[document.priority].label}
            </Badge>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline" className={DEPARTMENT_COLORS[document.sender_department as keyof typeof DEPARTMENT_COLORS]}>
              От: {DEPARTMENT_NAMES[document.sender_department as keyof typeof DEPARTMENT_NAMES]}
            </Badge>
            <Badge variant="outline" className={DEPARTMENT_COLORS[document.receiver_department as keyof typeof DEPARTMENT_COLORS]}>
              Кому: {DEPARTMENT_NAMES[document.receiver_department as keyof typeof DEPARTMENT_NAMES]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <StatusIcon className="w-4 h-4" />
              <Badge className={STATUS_CONFIG[document.status].color}>
                {STATUS_CONFIG[document.status].label}
              </Badge>
            </div>
            <span className="text-sm text-muted-foreground">
              {new Date(document.created_at).toLocaleDateString('ru-RU')}
            </span>
          </div>
          {document.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {document.description}
            </p>
          )}
          {document.file_name && (
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <FileText className="w-4 h-4" />
              {document.file_name}
            </div>
          )}
          {document.due_date && (
            <div className="flex items-center gap-2 text-sm text-orange-600 mt-2">
              <Clock className="w-4 h-4" />
              Срок: {new Date(document.due_date).toLocaleDateString('ru-RU')}
            </div>
          )}
        </CardContent>
      </Card>
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
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Межотдельское взаимодействие</h1>
        <Button onClick={() => setShowSendModal(true)} className="flex items-center gap-2">
          <Send className="w-4 h-4" />
          Отправить документ
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="incoming" className="flex items-center gap-2">
            <Inbox className="w-4 h-4" />
            Входящие ({getFilteredDocuments('incoming').length})
          </TabsTrigger>
          <TabsTrigger value="outgoing" className="flex items-center gap-2">
            <Send className="w-4 h-4" />
            Исходящие ({getFilteredDocuments('outgoing').length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            На согласовании ({getFilteredDocuments('pending').length})
          </TabsTrigger>
          <TabsTrigger value="collaborative" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Совместные ({getFilteredDocuments('collaborative').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="incoming">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredDocuments('incoming').map((document) => (
              <DocumentCard key={document.id} document={document} />
            ))}
            {getFilteredDocuments('incoming').length === 0 && (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                <Inbox className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Нет входящих документов</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="outgoing">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredDocuments('outgoing').map((document) => (
              <DocumentCard key={document.id} document={document} />
            ))}
            {getFilteredDocuments('outgoing').length === 0 && (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                <Send className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Нет исходящих документов</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="pending">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredDocuments('pending').map((document) => (
              <DocumentCard key={document.id} document={document} />
            ))}
            {getFilteredDocuments('pending').length === 0 && (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Нет документов на согласовании</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="collaborative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredDocuments('collaborative').map((document) => (
              <DocumentCard key={document.id} document={document} />
            ))}
            {getFilteredDocuments('collaborative').length === 0 && (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Нет совместных проектов</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {showSendModal && (
        <SendDocumentModal 
          onClose={() => setShowSendModal(false)}
          onSuccess={() => {
            setShowSendModal(false);
            fetchDocuments();
          }}
        />
      )}

      {selectedDocument && (
        <DocumentDetailsModal
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
          onStatusUpdate={updateDocumentStatus}
          onSuccess={fetchDocuments}
        />
      )}
    </div>
  );
};
