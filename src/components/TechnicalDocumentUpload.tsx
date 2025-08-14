
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Upload, FileText, Check, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface TechnicalDocumentUploadProps {
  category: string;
  onClose: () => void;
  onSuccess: () => void;
}

const categories = {
  development_program: 'Программа развития',
  product_overview: 'Обзор продукции',
  product_specification: 'Спецификация продукции',
  activity_presentation: 'Презентация деятельности',
  business_plans: 'Бизнес планы и проекты',
  company_catalog: 'Каталог компании',
  product_certificates: 'Сертификаты на продукцию'
};

export const TechnicalDocumentUpload: React.FC<TechnicalDocumentUploadProps> = ({
  category,
  onClose,
  onSuccess
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [tags, setTags] = useState('');
  const [printReady, setPrintReady] = useState(false);
  const [technicalSpecs, setTechnicalSpecs] = useState('');
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (!title) {
        setTitle(selectedFile.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleUpload = async () => {
    if (!file || !title) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, выберите файл и введите название',
        variant: 'destructive'
      });
      return;
    }

    setIsUploading(true);

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Пользователь не авторизован');
      }

      // Upload file to storage
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `${category}/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      // Parse tags
      const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      // Parse technical specs
      let specsObject = {};
      if (technicalSpecs) {
        try {
          specsObject = JSON.parse(technicalSpecs);
        } catch {
          // If not valid JSON, treat as key-value pairs
          const pairs = technicalSpecs.split('\n').filter(line => line.includes(':'));
          specsObject = pairs.reduce((acc, pair) => {
            const [key, value] = pair.split(':').map(s => s.trim());
            if (key && value) {
              acc[key] = value;
            }
            return acc;
          }, {} as Record<string, string>);
        }
      }

      // Insert document record
      const { error: insertError } = await supabase
        .from('technical_documents')
        .insert({
          title,
          description: description || null,
          file_name: file.name,
          file_url: publicUrl,
          file_type: file.type,
          file_size: file.size,
          category,
          subcategory: subcategory || null,
          tags: tagsArray.length > 0 ? tagsArray : null,
          uploaded_by: user.id,
          print_ready: printReady,
          technical_specs: Object.keys(specsObject).length > 0 ? specsObject : null
        });

      if (insertError) {
        throw insertError;
      }

      toast({
        title: 'Успех',
        description: 'Документ успешно загружен'
      });

      onSuccess();
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: 'Ошибка загрузки',
        description: error.message || 'Не удалось загрузить документ',
        variant: 'destructive'
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <div>
            <CardTitle className="text-xl">Загрузить документ</CardTitle>
            <Badge variant="secondary" className="mt-2">
              {categories[category as keyof typeof categories]}
            </Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Файл *</label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              {file ? (
                <div className="space-y-2">
                  <FileText className="w-12 h-12 text-primary mx-auto" />
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setFile(null)}>
                    Выбрать другой файл
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                  <p className="text-muted-foreground">Перетащите файл сюда или нажмите для выбора</p>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    Выбрать файл
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Название *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Введите название документа"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Описание</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Краткое описание документа"
            />
          </div>

          {/* Subcategory */}
          <div>
            <label className="block text-sm font-medium mb-2">Подкатегория</label>
            <input
              type="text"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Например: Электроника, Машиностроение"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-2">Теги</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Теги через запятую: технические, новые, важные"
            />
          </div>

          {/* Technical Specs */}
          <div>
            <label className="block text-sm font-medium mb-2">Технические характеристики</label>
            <textarea
              value={technicalSpecs}
              onChange={(e) => setTechnicalSpecs(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder={`Можно ввести в формате JSON или как пары ключ:значение:
Мощность: 100 кВт
Вес: 250 кг
Материал: Сталь`}
            />
          </div>

          {/* Print Ready */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="print-ready"
              checked={printReady}
              onChange={(e) => setPrintReady(e.target.checked)}
              className="rounded border-border"
            />
            <label htmlFor="print-ready" className="text-sm font-medium">
              Готов к печати
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} disabled={isUploading}>
              Отмена
            </Button>
            <Button onClick={handleUpload} disabled={isUploading || !file || !title}>
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Загрузка...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Загрузить
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
