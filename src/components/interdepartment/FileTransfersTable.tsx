
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  Download, 
  Eye, 
  Calendar,
  User,
  Building2,
  Search,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { useInterdepartmentTransfers } from '@/hooks/useInterdepartmentTransfers';
import { getCurrentDepartmentFromPath } from './utils/departmentUtils';
import { useToast } from '@/hooks/use-toast';
import { formatFileSize } from '@/utils/fileUtils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

export const FileTransfersTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<any>(null);
  const currentDepartment = getCurrentDepartmentFromPath();
  const { transfers, isLoading, updateTransferStatus } = useInterdepartmentTransfers(currentDepartment);
  const { toast } = useToast();

  // Фильтруем трансферы только для текущего отдела
  const departmentTransfers = transfers.filter(transfer => 
    transfer.sender_department === currentDepartment || 
    transfer.receiver_department === currentDepartment
  );

  // Применяем поиск
  const filteredTransfers = departmentTransfers.filter(transfer =>
    transfer.file_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transfer.sender_department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transfer.receiver_department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: any }> = {
      sent: { label: 'Отправлено', variant: 'secondary' },
      delivered: { label: 'Доставлено', variant: 'default' },
      viewed: { label: 'Просмотрено', variant: 'outline' },
      processed: { label: 'Обработано', variant: 'destructive' }
    };
    
    const config = statusConfig[status] || { label: status, variant: 'secondary' };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig: Record<string, { label: string; className: string }> = {
      low: { label: 'Низкий', className: 'bg-green-100 text-green-800' },
      normal: { label: 'Обычный', className: 'bg-blue-100 text-blue-800' },
      high: { label: 'Высокий', className: 'bg-orange-100 text-orange-800' },
      urgent: { label: 'Срочный', className: 'bg-red-100 text-red-800' }
    };
    
    const config = priorityConfig[priority] || { label: priority, className: 'bg-gray-100 text-gray-800' };
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  // ИСПРАВЛЕННАЯ ФУНКЦИЯ СКАЧИВАНИЯ
  const handleDownload = async (transfer: any) => {
    try {
      console.log('⬇️ Скачивание файла:', transfer.file_name);
      
      // Получаем файл с правильными заголовками для принудительного скачивания
      const response = await fetch(transfer.file_url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      });
      
      if (!response.ok) {
        throw new Error('Ошибка загрузки файла');
      }
      
      const blob = await response.blob();
      
      // Создаем URL для blob
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Создаем временную ссылку для скачивания
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = transfer.file_name; // Используем оригинальное имя файла
      link.style.display = 'none';
      
      // Добавляем в DOM, кликаем и удаляем
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Освобождаем память
      window.URL.revokeObjectURL(blobUrl);
      
      console.log('✅ Файл успешно скачан:', transfer.file_name);
      
      toast({
        title: 'Файл скачан',
        description: `Файл ${transfer.file_name} успешно скачан`
      });
    } catch (error) {
      console.error('❌ Ошибка при скачивании файла:', error);
      // Fallback - открываем файл в новой вкладке
      window.open(transfer.file_url, '_blank', 'noopener,noreferrer');
      
      toast({
        title: 'Внимание',
        description: 'Файл открыт в новой вкладке. Используйте правую кнопку мыши для сохранения.',
        variant: 'default'
      });
    }
  };

  const handleView = (transfer: any) => {
    setSelectedFile(transfer);
  };

  const handleDeleteClick = (transfer: any) => {
    setFileToDelete(transfer);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!fileToDelete) return;

    try {
      // Обновляем статус трансфера на "recalled" (отозвано)
      await updateTransferStatus(fileToDelete.id, 'recalled');
      
      setShowDeleteDialog(false);
      setFileToDelete(null);
      
      toast({
        title: 'Файл удален',
        description: `Файл ${fileToDelete.file_name} успешно удален`
      });
    } catch (error) {
      console.error('Ошибка при удалении файла:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить файл',
        variant: 'destructive'
      });
    }
  };

  const renderFileViewer = () => {
    if (!selectedFile) return null;

    const isPDF = selectedFile.file_type === 'application/pdf' || selectedFile.file_name.toLowerCase().endsWith('.pdf');
    const isImage = selectedFile.file_type?.startsWith('image/') || 
                   ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(selectedFile.file_name.split('.').pop()?.toLowerCase() || '');

    return (
      <Dialog open={!!selectedFile} onOpenChange={() => setSelectedFile(null)}>
        <DialogContent className="max-w-6xl w-[95vw] max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold truncate pr-4">
              {selectedFile.file_name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="w-full h-[70vh]">
            {isPDF ? (
              <iframe
                src={selectedFile.file_url}
                className="w-full h-full border-0"
                title={selectedFile.file_name}
              />
            ) : isImage ? (
              <div className="w-full h-full flex items-center justify-center">
                <img 
                  src={selectedFile.file_url} 
                  alt={selectedFile.file_name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50">
                <div className="text-center">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium mb-2">{selectedFile.file_name}</h3>
                  <p className="text-gray-600 mb-4">Предварительный просмотр недоступен</p>
                  <Button onClick={() => handleDownload(selectedFile)} className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Скачать файл
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => handleDownload(selectedFile)}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Скачать
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  if (isLoading) {
    return (
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-xl">
            Межотдельский обмен документами
            {filteredTransfers.length > 0 && (
              <span className="ml-2 text-sm text-green-600 font-normal">
                ({filteredTransfers.length} документ{filteredTransfers.length === 1 ? '' : filteredTransfers.length < 5 ? 'а' : 'ов'})
              </span>
            )}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Обмен файлами и документами между отделами компании
          </p>
          
          {departmentTransfers.length > 0 && (
            <div className="mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск по названию файла или отделу..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          )}
        </CardHeader>

        <CardContent>
          {filteredTransfers.length > 0 ? (
            <div className="space-y-3">
              {filteredTransfers.map((transfer) => (
                <div key={transfer.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <FileText className="w-8 h-8 text-blue-500" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{transfer.file_name}</h4>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                          <span>{formatFileSize(transfer.file_size)}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(transfer.created_at)}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Building2 className="w-3 h-3" />
                            {transfer.sender_department} → {transfer.receiver_department}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          {getStatusBadge(transfer.status)}
                          {getPriorityBadge(transfer.priority)}
                          {transfer.message && (
                            <Badge variant="outline" className="text-xs">
                              Есть сообщение
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleView(transfer)}
                        className="hover:bg-primary/10"
                        title="Открыть"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(transfer)}
                        className="hover:bg-success/10 text-success"
                        title="Скачать"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(transfer)}
                        className="hover:bg-destructive/10 text-destructive"
                        title="Удалить"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {transfer.message && (
                    <div className="mt-3 p-3 bg-muted/50 rounded border-l-4 border-primary">
                      <p className="text-sm">{transfer.message}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : departmentTransfers.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Нет документов</h3>
              <p className="text-muted-foreground">
                В этом отделе пока нет переданных документов
              </p>
            </div>
          ) : (
            <div className="text-center py-8">
              <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Нет документов, соответствующих запросу "{searchQuery}"
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Модальное окно просмотра файла */}
      {renderFileViewer()}

      {/* Диалог подтверждения удаления */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Подтверждение удаления
            </DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите удалить файл "{fileToDelete?.file_name}"? 
              Это действие нельзя будет отменить.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowDeleteDialog(false)}
            >
              Отмена
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteConfirm}
            >
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
