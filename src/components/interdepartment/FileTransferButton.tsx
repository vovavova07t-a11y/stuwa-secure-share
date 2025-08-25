
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { FileTransferModal } from './FileTransferModal';

interface FileTransferButtonProps {
  file?: {
    id: string;
    name: string;
    url: string;
    size: number;
    type: string;
  };
  currentDepartment?: string;
  onSuccess?: () => void;
}

export const FileTransferButton: React.FC<FileTransferButtonProps> = ({
  file,
  currentDepartment = '',
  onSuccess
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    if (file) {
      console.log('Нажата кнопка отправки файла:', file.name);
    }
    setShowModal(true);
  };

  const handleClose = () => {
    console.log('Закрытие модального окна отправки');
    setShowModal(false);
  };

  const handleSuccess = () => {
    if (file) {
      console.log('Файл успешно отправлен:', file.name);
    }
    onSuccess?.();
    setShowModal(false);
  };

  // Если файл не передан, показываем простую кнопку
  if (!file) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={handleClick}
        className="hover:bg-primary/10 text-primary"
        title="Отправить файл в другой отдел"
      >
        <Send className="w-4 h-4" />
        Отправить файл
      </Button>
    );
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleClick}
        className="hover:bg-primary/10 text-primary"
        title="Отправить файл в другой отдел"
      >
        <Send className="w-4 h-4" />
      </Button>

      {showModal && (
        <FileTransferModal
          isOpen={showModal}
          onClose={handleClose}
          file={file}
          currentDepartment={currentDepartment}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
};
