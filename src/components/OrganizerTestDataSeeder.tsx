
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Database, 
  Plus, 
  FileText,
  Loader2,
  CheckCircle
} from 'lucide-react';

interface OrganizerTestDataSeederProps {
  onDataSeeded?: () => void;
}

export const OrganizerTestDataSeeder: React.FC<OrganizerTestDataSeederProps> = ({ onDataSeeded }) => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedingProgress, setSeedingProgress] = useState('');
  const { toast } = useToast();

  // Real category mappings for each department - these match the actual categories used in the app
  const testFileCategories = {
    financial: [
      { id: 'fin_debt_reports', title: 'Отчеты по задолженностям' },
      { id: 'fin_monthly_reports', title: 'Финансовый отчет за месяц' },
      { id: 'fin_quarterly_tax', title: 'Налоговый отчет за квартал' },
      { id: 'fin_yearly_reports', title: 'Финансовая отчетность за год' },
      { id: 'fin_founding_docs', title: 'Учредительные документы' },
      { id: 'fin_org_structure', title: 'Оргструктура и штатное расписание' },
      { id: 'fin_protocols', title: 'Протоколы НС' }
    ],
    technical: [
      { id: 'tech_development', title: 'Программа развития' },
      { id: 'tech_product_overview', title: 'Обзор продукции' },
      { id: 'tech_specifications', title: 'Спецификация продукции' },
      { id: 'tech_presentations', title: 'Презентация деятельности' },
      { id: 'tech_business_plans', title: 'Бизнес планы и проекты' },
      { id: 'tech_catalog', title: 'Каталог компании' },
      { id: 'tech_certificates', title: 'Сертификаты на продукцию' }
    ],
    logistics: [
      { id: 'log_client_base', title: 'База клиентов' },
      { id: 'log_contracts', title: 'Договоры с клиентами' },
      { id: 'log_sales_reports', title: 'Отчеты по продажам' },
      { id: 'log_communications', title: 'Коммуникации с клиентами' },
      { id: 'log_delivery', title: 'Логистика и доставка' },
      { id: 'log_regions', title: 'Региональные представительства' }
    ],
    commercial: [
      { id: 'com_partnerships', title: 'Партнерства и альянсы' },
      { id: 'com_price_lists', title: 'Прайс-листы и тарифы' },
      { id: 'com_quotations', title: 'Коммерческие предложения' },
      { id: 'com_analytics', title: 'Аналитика и маркетинг' },
      { id: 'com_strategies', title: 'Стратегии развития' },
      { id: 'com_investments', title: 'Инвестиционные проекты' }
    ],
    office: [
      { id: 'cont_contacts', title: 'Контактная информация' },
      { id: 'cont_schedules', title: 'Расписания и графики' },
      { id: 'cont_events', title: 'Мероприятия и встречи' },
      { id: 'cont_coordination', title: 'Координация работы' },
      { id: 'cont_visitors', title: 'Регистрация посетителей' },
      { id: 'cont_facilities', title: 'Управление офисом' }
    ]
  };

  const seedRealTestData = async () => {
    try {
      setIsSeeding(true);
      setSeedingProgress('Создание реальных тестовых файлов...');

      console.log('🌱 Начинаем создание реальных тестовых файлов для организаторов');

      let totalFilesCreated = 0;

      // Create real test files for each department and category
      for (const [department, categories] of Object.entries(testFileCategories)) {
        setSeedingProgress(`Создание файлов для отдела: ${department}`);
        
        for (const category of categories) {
          // Create 2-3 real test files for each category
          for (let i = 1; i <= 2; i++) {
            const testFile = {
              id: crypto.randomUUID(),
              file_name: `${category.title}_${i}_${new Date().toISOString().split('T')[0]}.pdf`,
              file_type: 'application/pdf',
              file_size: Math.floor(Math.random() * 1000000) + 100000, // 100KB - 1MB
              category_id: category.id,
              department: department,
              file_url: `https://example.com/test-files/${department}/${category.id}/${i}.pdf`,
              storage_path: `test/${department}/${category.id}/${i}.pdf`,
              uploaded_by: null,
              created_at: new Date().toISOString(),
              uploaded_at: new Date().toISOString()
            };

            // Insert into the files table (this is the real table used by the app)
            const { error } = await (supabase as any)
              .from('files')
              .insert(testFile);

            if (error) {
              console.error(`Ошибка создания файла ${testFile.file_name}:`, error);
            } else {
              totalFilesCreated++;
              console.log(`✅ Создан реальный тестовый файл: ${testFile.file_name} в ${department}/${category.id}`);
            }
          }
        }
      }

      setSeedingProgress('Завершение...');
      
      console.log(`🎉 Создано ${totalFilesCreated} реальных тестовых файлов для организаторов`);
      
      toast({
        title: 'Реальные тестовые данные созданы',
        description: `Создано ${totalFilesCreated} файлов во всех отделах`
      });

      // Update statistics
      if (onDataSeeded) {
        onDataSeeded();
      }

    } catch (error) {
      console.error('Ошибка создания реальных тестовых данных:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось создать реальные тестовые данные',
        variant: 'destructive'
      });
    } finally {
      setIsSeeding(false);
      setSeedingProgress('');
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          Реальные тестовые данные
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          Создайте реальные тестовые файлы во всех отделах для демонстрации возможностей организаторов
        </div>
        
        {seedingProgress && (
          <div className="flex items-center gap-2 text-sm">
            <Loader2 className="w-4 h-4 animate-spin" />
            {seedingProgress}
          </div>
        )}

        <div className="flex gap-2">
          <Button 
            onClick={seedRealTestData}
            disabled={isSeeding}
            className="gap-2"
            size="sm"
          >
            {isSeeding ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            Создать реальные тестовые файлы
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          Будет создано по 2 реальных файла в каждой категории каждого отдела
        </div>
      </CardContent>
    </Card>
  );
};
