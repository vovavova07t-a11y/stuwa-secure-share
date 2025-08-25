
import React, { useState } from 'react';
import { useFileContext } from '@/contexts/FileContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Download, Trash2, Send, FileText } from 'lucide-react';
import { DocumentViewer } from './DocumentViewer';
import { TechnicalDocumentViewer } from './TechnicalDocumentViewer';
import { FileTransferButton } from './interdepartment/FileTransferButton';
import { getCurrentDepartmentFromPath } from './interdepartment/utils/departmentUtils';

interface PersistentFileDisplayProps {
  categoryId: string;
  categoryTitle?: string;
  title?: string;
  showUploadSection?: boolean;
  onSendToOtherDepartment?: (file: any) => void;
}

export const PersistentFileDisplay: React.FC<PersistentFileDisplayProps> = ({
  categoryId,
  categoryTitle,
  title,
  showUploadSection = false,
  onSendToOtherDepartment
}) => {
  const { getFiles, removeFile } = useFileContext();
  const files = getFiles(categoryId);
  const [viewingDocument, setViewingDocument] = useState<any>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const currentDepartment = getCurrentDepartmentFromPath();

  const handleViewDocument = (file: any) => {
    setViewingDocument(file);
  };

  const handleCloseViewer = () => {
    setViewingDocument(null);
  };

  const handleDeleteDocument = (fileId: string) => {
    setShowDeleteConfirm(fileId);
  };

  const confirmDelete = (fileId: string) => {
    removeFile(categoryId, fileId);
    setShowDeleteConfirm(null);
    console.log(`🗑️ Файл ${fileId} удален из категории ${categoryId}`);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('image')) return '🖼️';
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('word')) return '📝';
    if (fileType.includes('excel') || fileType.includes('sheet')) return '📊';
    return '📎';
  };

  const handleDownload = (file: any) => {
    const link = document.createElement('a');
    link.href = file.file_url;
    link.download = file.file_name;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (viewingDocument) {
    // Определяем какой компонент использовать в зависимости от отдела
    const isFinancial = currentDepartment === 'financial';
    const ViewerComponent = isFinancial ? DocumentViewer : TechnicalDocumentViewer;
    
    return (
      <ViewerComponent
        document={viewingDocument}
        onClose={handleCloseViewer}
        onDelete={() => handleDeleteDocument(viewingDocument.id)}
      />
    );
  }

  const displayTitle = categoryTitle || title;

  return (
    <div className="space-y-4">
      {displayTitle && (
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FileText className="w-5 h-5" />
          {displayTitle}
          {files.length > 0 && (
            <Badge variant="secondary">
              {files.length} файл{files.length === 1 ? '' : files.length < 5 ? 'а' : 'ов'}
            </Badge>
          )}
        </h3>
      )}

      {files.length === 0 ? (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-gray-500 text-center">
              {showUploadSection ? 'Файлы появятся здесь после загрузки' : 'Нет загруженных файлов'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {files.map((file) => (
            <Card key={file.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {getFileIcon(file.file_type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{file.file_name}</h4>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.file_size)} • {new Date(file.uploaded_at).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDocument(file)}
                      className="hover:bg-primary/10"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(file)}
                      className="hover:bg-primary/10"
                    >
                      <Download className="w-4 h-4" />
                    </Button>

                    <FileTransferButton
                      file={{
                        id: file.id,
                        name: file.file_name,
                        url: file.file_url,
                        size: file.file_size,
                        type: file.file_type
                      }}
                      currentDepartment={currentDepartment}
                      onSuccess={() => {
                        onSendToOtherDepartment?.(file);
                      }}
                    />

                    {showDeleteConfirm === file.id ? (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => confirmDelete(file.id)}
                        >
                          Да
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={cancelDelete}
                        >
                          Нет
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteDocument(file.id)}
                        className="hover:bg-red-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
