
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, X, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DocumentUploadProps {
  category: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  category,
  onClose,
  onSuccess
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setSelectedFile(files[0]);
      if (!title) {
        setTitle(files[0].name.split('.')[0]);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setSelectedFile(files[0]);
      if (!title) {
        setTitle(files[0].name.split('.')[0]);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !title) {
      toast({
        title: 'Ошибка',
        description: 'Выберите файл и укажите название',
        variant: 'destructive'
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Upload file to Supabase Storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `financial/${category}/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, selectedFile, {
          onUploadProgress: (progress) => {
            setUploadProgress((progress.loaded / progress.total) * 100);
          }
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      // Save document metadata to database
      const { error: dbError } = await supabase
        .from('financial_documents')
        .insert({
          title,
          description,
          file_name: selectedFile.name,
          file_url: publicUrl,
          file_type: selectedFile.type || 'application/octet-stream',
          file_size: selectedFile.size,
          category,
          uploaded_by: (await supabase.auth.getUser()).data.user?.id
        });

      if (dbError) throw dbError;

      // Log upload action
      await supabase.from('document_access_logs').insert({
        document_id: uploadData.path,
        user_id: (await supabase.auth.getUser()).data.user?.id,
        action: 'upload',
        ip_address: 'client_ip',
        user_agent: navigator.userAgent
      });

      toast({
        title: 'Успех',
        description: 'Документ успешно загружен'
      });

      onSuccess();
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: 'Ошибка загрузки',
        description: error.message || 'Не удалось загрузить файл',
        variant: 'destructive'
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="glass-card w-full max-w-2xl animate-scale-in">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Загрузка документа</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* File Upload Area */}
          <div
            className={`upload-zone p-8 rounded-2xl text-center transition-all duration-300 ${
              dragActive ? 'dragover' : ''
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              id="fileUpload"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
            />
            
            <div className="space-y-4">
              <div className="feature-icon mx-auto">
                <Upload className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {selectedFile ? (
                    <div className="flex items-center justify-center space-x-2 text-success">
                      <CheckCircle className="w-5 h-5" />
                      <span>{selectedFile.name}</span>
                    </div>
                  ) : (
                    <>
                      Перетащите файл сюда или 
                      <label htmlFor="fileUpload" className="text-primary cursor-pointer hover:text-primary-hover ml-1">
                        выберите файл
                      </label>
                    </>
                  )}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Поддерживаются: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG
                </p>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Название документа *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Введите название документа"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Описание</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Введите описание документа"
                rows={3}
              />
            </div>
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Загрузка...</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose} disabled={uploading}>
              Отмена
            </Button>
            <Button 
              onClick={handleUpload} 
              disabled={!selectedFile || !title || uploading}
              className="btn-primary"
            >
              {uploading ? 'Загрузка...' : 'Загрузить'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
