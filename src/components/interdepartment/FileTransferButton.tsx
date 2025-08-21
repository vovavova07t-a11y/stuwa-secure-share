
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { FileTransferModal } from './FileTransferModal';

interface FileTransferButtonProps {
  file: {
    id: string;
    name: string;
    url: string;
    size: number;
    type: string;
  };
  currentDepartment: string;
  onSuccess?: () => void;
}

export const FileTransferButton: React.FC<FileTransferButtonProps> = ({
  file,
  currentDepartment,
  onSuccess
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowModal(true)}
        className="hover:bg-primary/10"
        title="Отправить файл в другой отдел"
      >
        <Send className="w-4 h-4" />
      </Button>

      <FileTransferModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        file={file}
        currentDepartment={currentDepartment}
        onSuccess={() => {
          onSuccess?.();
          setShowModal(false);
        }}
      />
    </>
  );
};
