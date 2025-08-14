
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { 
  Download, 
  MessageSquare, 
  Clock, 
  User, 
  Calendar,
  FileText,
  Send,
  CheckCircle,
  XCircle,
  RotateCcw
} from 'lucide-react';

interface DocumentDetailsModalProps {
  document: any;
  onClose: () => void;
  onStatusUpdate: (documentId: string, newStatus: string) => void;
  onSuccess: () => void;
}

interface Comment {
  id: string;
  comment_text: string;
  comment_type: string;
  department: string;
  created_at: string;
  user_id: string;
}

const DEPARTMENT_NAMES = {
  financial: 'Финансовая дирекция',
  technical: 'Техническая дирекция', 
  commercial: 'Коммерческая дирекция',
  logistics: 'Управление логистики',
  office: 'Офис-менеджер'
};

const STATUS_CONFIG = {
  sent: { label: 'Отправлен', color: 'bg-blue-100 text-blue-800' },
  received: { label: 'Получен', color: 'bg-yellow-100 text-yellow-800' },
  in_progress: { label: 'В обработке', color: 'bg-orange-100 text-orange-800' },
  approved: { label: 'Утвержден', color: 'bg-green-100 text-green-800' },
  needs_revision: { label: 'Нужна доработка', color: 'bg-red-100 text-red-800' },
  rejected: { label: 'Отклонен', color: 'bg-red-100 text-red-800' }
};

export const DocumentDetailsModal: React.FC<DocumentDetailsModalProps> = ({
  document,
  onClose,
  onStatusUpdate,
  onSuccess
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchComments = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('interdepartment_comments')
        .select('*')
        .eq('document_id', document.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setComments((data || []) as Comment[]);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [document.id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Пользователь не аутентифицирован');

      const { error } = await (supabase as any)
        .from('interdepartment_comments')
        .insert([{
          document_id: document.id,
          user_id: user.id,
          department: 'office', // This should be determined based on user's department
          comment_text: newComment,
          comment_type: 'general'
        }]);

      if (error) throw error;

      setNewComment('');
      await fetchComments();
      toast({
        title: "Успех",
        description: "Комментарий добавлен",
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось добавить комментарий",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    await onStatusUpdate(document.id, newStatus);
    onSuccess();
  };

  const downloadFile = () => {
    if (document.file_url) {
      window.open(document.file_url, '_blank');
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {document.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Document Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-semibold">Статус</Label>
                <div className="mt-1">
                  <Badge className={STATUS_CONFIG[document.status as keyof typeof STATUS_CONFIG].color}>
                    {STATUS_CONFIG[document.status as keyof typeof STATUS_CONFIG].label}
                  </Badge>
                </div>
              </div>

              <div>
                <Label className="text-sm font-semibold">Приоритет</Label>
                <div className="mt-1">
                  <Badge variant="outline">
                    {document.priority === 'low' && 'Низкий'}
                    {document.priority === 'medium' && 'Средний'}
                    {document.priority === 'high' && 'Высокий'}
                    {document.priority === 'critical' && 'Критический'}
                  </Badge>
                </div>
              </div>

              <div>
                <Label className="text-sm font-semibold">Тип документа</Label>
                <p className="mt-1 text-sm">{document.document_type}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-semibold">Отправитель</Label>
                <p className="mt-1 text-sm">
                  {DEPARTMENT_NAMES[document.sender_department as keyof typeof DEPARTMENT_NAMES]}
                </p>
              </div>

              <div>
                <Label className="text-sm font-semibold">Получатель</Label>
                <p className="mt-1 text-sm">
                  {DEPARTMENT_NAMES[document.receiver_department as keyof typeof DEPARTMENT_NAMES]}
                </p>
              </div>

              <div>
                <Label className="text-sm font-semibold">Дата создания</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {new Date(document.created_at).toLocaleString('ru-RU')}
                  </span>
                </div>
              </div>

              {document.due_date && (
                <div>
                  <Label className="text-sm font-semibold">Срок выполнения</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">
                      {new Date(document.due_date).toLocaleString('ru-RU')}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {document.description && (
            <div>
              <Label className="text-sm font-semibold">Описание</Label>
              <p className="mt-1 text-sm text-muted-foreground">{document.description}</p>
            </div>
          )}

          {document.file_name && (
            <div>
              <Label className="text-sm font-semibold">Прикрепленный файл</Label>
              <div className="mt-1">
                <Button variant="outline" onClick={downloadFile} className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  {document.file_name}
                </Button>
              </div>
            </div>
          )}

          <Separator />

          {/* Status Actions */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">Действия</Label>
            <div className="flex gap-2 flex-wrap">
              {document.status === 'sent' && (
                <Button onClick={() => handleStatusChange('received')} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Принять к рассмотрению
                </Button>
              )}
              {document.status === 'received' && (
                <Button onClick={() => handleStatusChange('in_progress')} className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Начать обработку
                </Button>
              )}
              {document.status === 'in_progress' && (
                <>
                  <Button onClick={() => handleStatusChange('approved')} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Утвердить
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleStatusChange('needs_revision')} 
                    className="flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Вернуть на доработку
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={() => handleStatusChange('rejected')} 
                    className="flex items-center gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    Отклонить
                  </Button>
                </>
              )}
            </div>
          </div>

          <Separator />

          {/* Comments Section */}
          <div>
            <Label className="text-sm font-semibold mb-3 block flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Комментарии ({comments.length})
            </Label>
            
            <div className="space-y-3 mb-4">
              {comments.map((comment) => (
                <div key={comment.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {DEPARTMENT_NAMES[comment.department as keyof typeof DEPARTMENT_NAMES]}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(comment.created_at).toLocaleString('ru-RU')}
                    </span>
                  </div>
                  <p className="text-sm">{comment.comment_text}</p>
                </div>
              ))}
              {comments.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Комментариев пока нет
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Textarea
                placeholder="Добавить комментарий..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
              />
              <Button 
                onClick={handleAddComment} 
                disabled={!newComment.trim() || loading}
                className="flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                {loading ? 'Отправка...' : 'Добавить комментарий'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
