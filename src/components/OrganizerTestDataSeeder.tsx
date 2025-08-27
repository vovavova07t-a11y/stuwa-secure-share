
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Database, Upload } from 'lucide-react';

export const OrganizerTestDataSeeder: React.FC = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const { toast } = useToast();

  // Тестовые файлы для каждого отдела и категории
  const testFiles = [
    // Финансовая дирекция
    { department: 'financial', categoryId: 'fin_debt_reports', fileName: 'Отчет_по_задолженностям_январь_2024.pdf', fileType: 'application/pdf' },
    { department: 'financial', categoryId: 'fin_debt_reports', fileName: 'Анализ_дебиторской_задолженности_Q1_2024.xlsx', fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
    { department: 'financial', categoryId: 'fin_monthly_reports', fileName: 'Финансовый_отчет_январь_2024.pdf', fileType: 'application/pdf' },
    { department: 'financial', categoryId: 'fin_monthly_reports', fileName: 'Финансовый_отчет_февраль_2024.pdf', fileType: 'application/pdf' },
    { department: 'financial', categoryId: 'fin_quarterly_tax', fileName: 'Налоговый_отчет_Q4_2023.pdf', fileType: 'application/pdf' },
    { department: 'financial', categoryId: 'fin_yearly_reports', fileName: 'Годовой_финансовый_отчет_2023.pdf', fileType: 'application/pdf' },
    { department: 'financial', categoryId: 'fin_founding_docs', fileName: 'Устав_компании_STUWA.pdf', fileType: 'application/pdf' },
    { department: 'financial', categoryId: 'fin_org_structure', fileName: 'Штатное_расписание_2024.xlsx', fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
    
    // Техническая дирекция
    { department: 'technical', categoryId: 'tech_development', fileName: 'Программа_развития_продуктов_2024.pptx', fileType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' },
    { department: 'technical', categoryId: 'tech_product_overview', fileName: 'Обзор_продуктовой_линейки.pdf', fileType: 'application/pdf' },
    { department: 'technical', categoryId: 'tech_specifications', fileName: 'Спецификация_продукт_A123.pdf', fileType: 'application/pdf' },
    { department: 'technical', categoryId: 'tech_presentations', fileName: 'Презентация_деятельности_компании.pptx', fileType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' },
    { department: 'technical', categoryId: 'tech_business_plans', fileName: 'Бизнес_план_проект_2024.docx', fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
    { department: 'technical', categoryId: 'tech_catalog', fileName: 'Каталог_продукции_STUWA_2024.pdf', fileType: 'application/pdf' },
    { department: 'technical', categoryId: 'tech_certificates', fileName: 'Сертификат_качества_ISO_9001.pdf', fileType: 'application/pdf' },
    
    // Управление логистики
    { department: 'logistics', categoryId: 'log_client_base', fileName: 'База_клиентов_актуальная.xlsx', fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
    { department: 'logistics', categoryId: 'log_contracts', fileName: 'Договор_с_клиентом_ABC_Corp.pdf', fileType: 'application/pdf' },
    { department: 'logistics', categoryId: 'log_sales_reports', fileName: 'Отчет_по_продажам_январь_2024.xlsx', fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
    { department: 'logistics', categoryId: 'log_communications', fileName: 'Переписка_с_ключевыми_клиентами.pdf', fileType: 'application/pdf' },
    { department: 'logistics', categoryId: 'log_delivery', fileName: 'График_поставок_февраль_2024.xlsx', fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
    
    // Коммерческая дирекция
    { department: 'commercial', categoryId: 'com_partnerships', fileName: 'Соглашение_о_партнерстве_XYZ.pdf', fileType: 'application/pdf' },
    { department: 'commercial', categoryId: 'com_price_lists', fileName: 'Прайс_лист_актуальный_2024.xlsx', fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
    { department: 'commercial', categoryId: 'com_quotations', fileName: 'КП_для_крупного_клиента.pdf', fileType: 'application/pdf' },
    { department: 'commercial', categoryId: 'com_analytics', fileName: 'Анализ_рынка_Q1_2024.pptx', fileType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' },
    
    // Офис-менеджер
    { department: 'office', categoryId: 'cont_contacts', fileName: 'Контактная_информация_сотрудников.xlsx', fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
    { department: 'office', categoryId: 'cont_schedules', fileName: 'Расписание_совещаний_февраль.pdf', fileType: 'application/pdf' },
    { department: 'office', categoryId: 'cont_events', fileName: 'План_корпоративных_мероприятий_2024.docx', fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
  ];

  const createTestFile = (fileName: string, fileType: string): File => {
    const content = `Тестовый файл: ${fileName}\n\nЭто тестовый файл для демонстрации функциональности портала STUWA.\n\nДата создания: ${new Date().toLocaleString('ru-RU')}\n\nФайл создан для тестирования возможности просмотра и скачивания документов организаторами.`;
    const blob = new Blob([content], { type: 'text/plain' });
    return new File([blob], fileName, { type: fileType });
  };

  const seedTestData = async () => {
    setIsSeeding(true);
    let successCount = 0;
    let errorCount = 0;

    toast({
      title: 'Создание тестовых файлов',
      description: 'Начинается создание тестовых файлов для всех разделов...'
    });

    for (const testFileData of testFiles) {
      try {
        // Создаем тестовый файл
        const file = createTestFile(testFileData.fileName, testFileData.fileType);
        const fileId = crypto.randomUUID();
        const fileName = `${testFileData.department}/${testFileData.categoryId}/${fileId}_${testFileData.fileName}`;
        
        // Загружаем в Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('files')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error('Ошибка загрузки в Storage:', uploadError);
          errorCount++;
          continue;
        }

        // Получаем публичный URL
        const { data: urlData } = supabase.storage
          .from('files')
          .getPublicUrl(fileName);

        // Сохраняем в базу данных
        const fileData = {
          id: fileId,
          file_name: testFileData.fileName,
          file_size: file.size,
          file_type: testFileData.fileType,
          category_id: testFileData.categoryId,
          department: testFileData.department,
          file_url: urlData.publicUrl,
          storage_path: fileName,
          uploaded_by: null // Тестовые файлы без привязки к пользователю
        };

        const { error: insertError } = await supabase
          .from('files')
          .insert(fileData);

        if (insertError) {
          console.error('Ошибка сохранения в БД:', insertError);
          // Удаляем файл из Storage в случае ошибки
          await supabase.storage.from('files').remove([fileName]);
          errorCount++;
          continue;
        }

        successCount++;
        console.log(`✅ Создан тестовый файл: ${testFileData.fileName}`);

      } catch (error) {
        console.error(`Ошибка создания файла ${testFileData.fileName}:`, error);
        errorCount++;
      }
    }

    setIsSeeding(false);

    if (successCount > 0) {
      toast({
        title: 'Тестовые файлы созданы',
        description: `Успешно создано ${successCount} тестовых файлов`
      });
    }

    if (errorCount > 0) {
      toast({
        title: 'Ошибки при создании',
        description: `Не удалось создать ${errorCount} файлов`,
        variant: 'destructive'
      });
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          Тестовые данные для организаторов
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Создать тестовые файлы во всех категориях всех отделов для демонстрации функциональности организаторам.
        </p>
        
        <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800">
            <strong>Внимание:</strong> Эта функция создаст тестовые файлы в базе данных. 
            Рекомендуется использовать только в демонстрационных целях.
          </p>
        </div>

        <Button 
          onClick={seedTestData}
          disabled={isSeeding}
          className="w-full"
        >
          {isSeeding ? (
            <>
              <Upload className="w-4 h-4 mr-2 animate-spin" />
              Создание файлов... ({testFiles.length} файлов)
            </>
          ) : (
            <>
              <Database className="w-4 h-4 mr-2" />
              Создать тестовые файлы ({testFiles.length} файлов)
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
