
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileTransfersTable } from './FileTransfersTable';
import { DocumentDetailsModal } from './DocumentDetailsModal';
import { useFileTransfers, FileTransfer } from '@/hooks/useFileTransfers';

interface FileTransferContainerProps {
  department: string;
}

export const FileTransferContainer: React.FC<FileTransferContainerProps> = ({
  department
}) => {
  const [selectedTransfer, setSelectedTransfer] = useState<FileTransfer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    isLoading,
    updateReadStatus,
    deleteTransfer,
    getIncomingTransfers,
    getOutgoingTransfers
  } = useFileTransfers(department);

  const handleView = (transfer: FileTransfer) => {
    setSelectedTransfer(transfer);
    setIsModalOpen(true);
  };

  const handleReadStatusChange = async (transferId: string, isRead: boolean) => {
    try {
      await updateReadStatus(transferId, isRead);
    } catch (error) {
      console.error('Ошибка обновления статуса прочтения:', error);
    }
  };

  const handleDelete = async (transferId: string) => {
    try {
      await deleteTransfer(transferId);
    } catch (error) {
      console.error('Ошибка удаления передачи:', error);
    }
  };

  const incomingTransfers = getIncomingTransfers();
  const outgoingTransfers = getOutgoingTransfers();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span>Загрузка файлов...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Tabs defaultValue="incoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="incoming" className="flex items-center gap-2">
            📥 Входящие файлы ({incomingTransfers.length})
          </TabsTrigger>
          <TabsTrigger value="outgoing" className="flex items-center gap-2">
            📤 Отправленные файлы ({outgoingTransfers.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="incoming" className="mt-6">
          <FileTransfersTable
            transfers={incomingTransfers}
            type="incoming"
            onDelete={handleDelete}
            onReadStatusChange={handleReadStatusChange}
            onView={handleView}
          />
        </TabsContent>

        <TabsContent value="outgoing" className="mt-6">
          <FileTransfersTable
            transfers={outgoingTransfers}
            type="outgoing"
            onDelete={handleDelete}
            onReadStatusChange={handleReadStatusChange}
            onView={handleView}
          />
        </TabsContent>
      </Tabs>

      {selectedTransfer && (
        <DocumentDetailsModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTransfer(null);
          }}
          transfer={selectedTransfer}
        />
      )}
    </>
  );
};
