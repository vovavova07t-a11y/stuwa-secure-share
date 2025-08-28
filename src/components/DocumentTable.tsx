
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FileText, Download, Eye, Calendar } from 'lucide-react';
import type { FinancialDocument } from '@/types/financial';
import { FileTransferButton } from './interdepartment/FileTransferButton';
import { UniversalFileViewer } from './UniversalFileViewer';
import { downloadFile, canPreview } from '@/utils/fileDownload';

interface DocumentTableProps {
  documents: FinancialDocument[];
  isLoading: boolean;
  onView: (document: FinancialDocument) => void;
  onDownload: (document: FinancialDocument) => void;
}

export const DocumentTable: React.FC<DocumentTableProps> = ({
  documents,
  isLoading,
  onView,
  onDownload
}) => {
  const [viewerDocument, setViewerDocument] = useState<FinancialDocument | null>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFileIcon = (fileType: string) => {
    return <FileText className="w-4 h-4 text-primary" />;
  };

  const handlePreview = (doc: FinancialDocument) => {
    console.log('🔍 Предпросмотр документа:', doc.file_name);
    
    if (canPreview(doc.file_name)) {
      setViewerDocument(doc);
      onView(doc);
    } else {
      handleDownload(doc);
    }
  };

  const handleDownload = async (doc: FinancialDocument) => {
    console.log('⬇️ Скачивание документа:', doc.file_name);
    
    try {
      await downloadFile(doc.file_url, doc.file_name);
      onDownload(doc);
    } catch (error) {
      console.error('❌ Ошибка при скачивании документа:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!documents.length) {
    return (
      <div className="text-center py-12">
        <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">Документы не найдены</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8"></TableHead>
              <TableHead>Название</TableHead>
              <TableHead>Размер</TableHead>
              <TableHead>Версия</TableHead>
              <TableHead>Скачиваний</TableHead>
              <TableHead>Дата создания</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((document) => (
              <TableRow key={document.id} className="hover:bg-muted/50">
                <TableCell>
                  {getFileIcon(document.file_type)}
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{document.title}</p>
                    {document.description && (
                      <p className="text-sm text-muted-foreground">{document.description}</p>
                    )}
                    <p className="text-xs text-muted-foreground">{document.file_name}</p>
                  </div>
                </TableCell>
                <TableCell>{formatFileSize(document.file_size)}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                    v{document.version}
                  </span>
                </TableCell>
                <TableCell>{document.download_count}</TableCell>
                <TableCell>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(document.created_at)}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePreview(document)}
                      className="hover:bg-primary/10"
                      title={canPreview(document.file_name) ? 'Предпросмотр' : 'Скачать'}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(document)}
                      className="hover:bg-primary/10"
                      title="Скачать"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <FileTransferButton
                      file={{
                        id: document.id,
                        name: document.file_name || document.title,
                        url: document.file_url || '',
                        size: document.file_size,
                        type: document.file_type || ''
                      }}
                      currentDepartment="financial"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {viewerDocument && (
        <UniversalFileViewer
          isOpen={!!viewerDocument}
          onClose={() => setViewerDocument(null)}
          fileUrl={viewerDocument.file_url}
          fileName={viewerDocument.file_name}
          fileSize={viewerDocument.file_size}
        />
      )}
    </>
  );
};
