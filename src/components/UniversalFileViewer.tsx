
import React, { useState } from 'react';
import { FilePreviewModal } from './FilePreviewModal';

interface UniversalFileViewerProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string;
  fileName: string;
  fileSize?: number;
}

export const UniversalFileViewer: React.FC<UniversalFileViewerProps> = (props) => {
  return <FilePreviewModal {...props} />;
};
