
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
import { FileTransfer } from '@/hooks/useFileTransfers';

interface DocumentDetailsModalProps {
  transfer: FileTransfer;
  onClose: () => void;
  onStatusUpdate?: (transferId: string, newStatus: string) => void;
  onSuccess?: () => void;
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
  deleted: { label: 'Удален', color: 'bg-red-100 text-red-800' }
};

export const DocumentDetailsModal: React.FC<DocumentDetailsModalProps> = ({
  transfer,
  onClose,
  onStatusUpdate,
  onSuccess
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Блокировка прокрутки фона при открытии модального окна
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Обработчик клавиши Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        console.log('🔒 Закрытие детального модального окна по Escape');
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const fetchComments = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('interdepartment_comments')
        .select('*')
        .eq('document_id', transfer.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setComments((data || []) as Comment[]);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    if (transfer?.id) {
      fetchComments();
    }
  }, [transfer?.id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Пользователь не аутентифицирован');

      const { error } = await (supabase as any)
        .from('interdepartment_comments')
        .insert([{
          document_id: transfer.id,
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
    if (onStatusUpdate) {
      await onStatusUpdate(transfer.id, newStatus);
      onSuccess?.();
    }
  };

  const downloadFile = () => {
    if (transfer.file_url) {
      window.open(transfer.file_url, '_blank');
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto z-[9998]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {transfer.file_name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Document Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-semibold">Статус</Label>
                <div className="mt-1">
                  <Badge className={STATUS_CONFIG[transfer.status as keyof typeof STATUS_CONFIG]?.color || 'bg-gray-100 text-gray-800'}>
                    {STATUS_CONFIG[transfer.status as keyof typeof STATUS_CONFIG]?.label || transfer.status}
                  </Badge>
                </div>
              </div>

              <div>
                <Label className="text-sm font-semibold">Размер файла</Label>
                <p className="mt-1 text-sm">
                  {Math.round(transfer.file_size / 1024)} КБ
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-semibold">Отправитель</Label>
                <p className="mt-1 text-sm">
                  {DEPARTMENT_NAMES[transfer.sender_department as keyof typeof DEPARTMENT_NAMES] || transfer.sender_department}
                </p>
              </div>

              <div>
                <Label className="text-sm font-semibold">Получатель</Label>
                <p className="mt-1 text-sm">
                  {DEPARTMENT_NAMES[transfer.recipient_department as keyof typeof DEPARTMENT_NAMES] || transfer.recipient_department}
                </p>
              </div>

              <div>
                <Label className="text-sm font-semibold">Дата отправки</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {new Date(transfer.sent_date).toLocaleString('ru-RU')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {transfer.comment && (
            <div>
              <Label className="text-sm font-semibold">Комментарий</Label>
              <p className="mt-1 text-sm text-muted-foreground">{transfer.comment}</p>
            </div>
          )}

          <div>
            <Label className="text-sm font-semibold">Прикрепленный файл</Label>
            <div className="mt-1">
              <Button variant="outline" onClick={downloadFile} className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                {transfer.file_name}
              </Button>
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
                        {DEPARTMENT_NAMES[comment.department as keyof typeof DEPARTMENT_NAMES] || comment.department}
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

        <div className="mt-4 p-2 bg-muted/20 rounded text-xs text-muted-foreground text-center">
          💡 Нажмите Escape для закрытия окна
        </div>
      </DialogContent>
    </Dialog>
  );
};
