
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload, X, FileText, Loader2 } from 'lucide-react';

interface TechnicalDocumentUploadProps {
  category: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const TechnicalDocumentUpload: React.FC<TechnicalDocumentUploadProps> = ({
  category,
  onClose,
  onSuccess
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subcategory: '',
    tags: '',
    print_ready: false,
    technical_specs: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, выберите файл для загрузки',
        variant: 'destructive'
      });
      return;
    }

    setIsUploading(true);

    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        throw new Error('Пользователь не авторизован');
      }

      // Upload file to Supabase Storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `technical/${category}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      // Parse technical specs if provided
      let technicalSpecs = {};
      if (formData.technical_specs) {
        try {
          technicalSpecs = JSON.parse(formData.technical_specs);
        } catch {
          technicalSpecs = { notes: formData.technical_specs };
        }
      }

      // Insert document record
      const { error: insertError } = await supabase
        .from('technical_documents' as any)
        .insert({
          title: formData.title,
          description: formData.description,
          file_name: selectedFile.name,
          file_url: publicUrl,
          file_type: selectedFile.type,
          file_size: selectedFile.size,
          category,
          subcategory: formData.subcategory || null,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
          technical_specs: technicalSpecs,
          print_ready: formData.print_ready,
          uploaded_by: user.data.user.id
        });

      if (insertError) throw insertError;

      toast({
        title: 'Успех',
        description: 'Документ успешно загружен'
      });

      onSuccess();
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить документ',
        variant: 'destructive'
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Загрузить документ
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Название документа *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Введите название документа"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Краткое описание документа"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subcategory">Подкатегория</Label>
              <Input
                id="subcategory"
                value={formData.subcategory}
                onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                placeholder="Например: Версия 2.0, Обновление"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Теги</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="Разделите теги запятыми"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="technical_specs">Технические характеристики (JSON)</Label>
              <Textarea
                id="technical_specs"
                value={formData.technical_specs}
                onChange={(e) => setFormData({ ...formData, technical_specs: e.target.value })}
                placeholder='{"размер": "A4", "страниц": 50, "язык": "русский"}'
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="print_ready"
                checked={formData.print_ready}
                onChange={(e) => setFormData({ ...formData, print_ready: e.target.checked })}
                className="rounded border-gray-300"
              />
              <Label htmlFor="print_ready">Готов к печати</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Файл документа *</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <input
                  type="file"
                  id="file"
                  onChange={handleFileSelect}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                />
                <label
                  htmlFor="file"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  <FileText className="w-12 h-12 text-gray-400" />
                  <div className="text-center">
                    <p className="text-sm font-medium">
                      {selectedFile ? selectedFile.name : 'Нажмите для выбора файла'}
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF, DOC, XLS, PPT (макс. 10MB)
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={isUploading}
                className="flex-1"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Загрузка...
                  </>
                ) : (
                  'Загрузить документ'
                )}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Отмена
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
