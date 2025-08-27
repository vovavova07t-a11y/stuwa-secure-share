
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Eye, 
  Building2,
  Cog,
  Truck,
  TrendingUp,
  Phone
} from 'lucide-react';
import { CategoryFileSection } from '@/components/CategoryFileSection';
import { OrganizerRealStats } from '@/components/OrganizerRealStats';
import { OrganizerViewBanner } from '@/components/OrganizerViewBanner';
import { OrganizerSearchPanel } from '@/components/OrganizerSearchPanel';
import { OrganizerBreadcrumbs } from '@/components/OrganizerBreadcrumbs';
import { useToast } from '@/hooks/use-toast';

type OrganizerSection = 'organizers' | 'financial' | 'technical' | 'logistics' | 'commercial' | 'contacts';

const OrganizerDashboard = () => {
  const [activeSection, setActiveSection] = useState<OrganizerSection>('organizers');
  const [organizerName, setOrganizerName] = useState('STUWA Organizer');
  const { toast } = useToast();

  const departmentSections = [
    { 
      id: 'financial' as OrganizerSection, 
      title: 'О нас', 
      subtitle: 'Финансовая дирекция',
      icon: Building2,
      color: 'text-blue-600 bg-blue-50'
    },
    { 
      id: 'technical' as OrganizerSection, 
      title: 'Продукция', 
      subtitle: 'Техническая дирекция',
      icon: Cog,
      color: 'text-green-600 bg-green-50'
    },
    { 
      id: 'logistics' as OrganizerSection, 
      title: 'Клиенты', 
      subtitle: 'Управление логистики',
      icon: Truck,
      color: 'text-orange-600 bg-orange-50'
    },
    { 
      id: 'commercial' as OrganizerSection, 
      title: 'Развитие', 
      subtitle: 'Коммерческая дирекция',
      icon: TrendingUp,
      color: 'text-purple-600 bg-purple-50'
    },
    { 
      id: 'contacts' as OrganizerSection, 
      title: 'Контакты', 
      subtitle: 'Офис-менеджер',
      icon: Phone,
      color: 'text-red-600 bg-red-50'
    }
  ];

  const isViewOnlySection = activeSection !== 'organizers';

  const logOrganizerActivity = async (actionType: string, department: string, category?: string, fileName?: string) => {
    try {
      console.log('Organizer activity:', { actionType, department, category, fileName });
    } catch (error) {
      console.error('Failed to log organizer activity:', error);
    }
  };

  useEffect(() => {
    if (isViewOnlySection) {
      logOrganizerActivity('view', activeSection);
    }
  }, [activeSection, isViewOnlySection]);

  const getBreadcrumbs = () => {
    const items = [
      {
        label: 'Организаторы',
        onClick: activeSection !== 'organizers' ? () => setActiveSection('organizers') : undefined,
        isActive: activeSection === 'organizers'
      }
    ];

    if (isViewOnlySection) {
      const currentDept = departmentSections.find(d => d.id === activeSection);
      if (currentDept) {
        items.push({
          label: currentDept.title,
          onClick: undefined,
          isActive: true
        });
      }
    }

    return items;
  };

  const renderOrganizerSection = () => (
    <div className="space-y-6">
      {/* Статистика и дашборд */}
      <OrganizerRealStats />

      {/* Панель поиска */}
      <OrganizerSearchPanel />
    </div>
  );

  const renderDepartmentSection = () => {
    const currentDept = departmentSections.find(d => d.id === activeSection);
    if (!currentDept) return null;

    // ИСПРАВЛЕНО: Реальные категории для каждого отдела из базы данных
    const departmentCategories = {
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
      contacts: [
        { id: 'cont_contacts', title: 'Контактная информация' },
        { id: 'cont_schedules', title: 'Расписания и графики' },
        { id: 'cont_events', title: 'Мероприятия и встречи' },
        { id: 'cont_coordination', title: 'Координация работы' },
        { id: 'cont_visitors', title: 'Регистрация посетителей' },
        { id: 'cont_facilities', title: 'Управление офисом' }
      ]
    };

    const categories = departmentCategories[activeSection as keyof typeof departmentCategories] || [];

    console.log(`📋 OrganizerDashboard: Показ файлов для отдела ${activeSection}, категории:`, categories.map(c => c.id));

    return (
      <div className="space-y-6">
        {/* Баннер режима просмотра */}
        <OrganizerViewBanner
          departmentTitle={currentDept.title}
          departmentSubtitle={currentDept.subtitle}
          onBackToOrganizers={() => setActiveSection('organizers')}
        />

        {/* Категории отдела */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <CategoryFileSection
              key={category.id}
              categoryId={category.id}
              categoryTitle={category.title}
              department={activeSection}
              isOrganizerView={true}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Заголовок */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Панель организатора</h1>
                  <p className="text-sm text-muted-foreground">
                    {organizerName} • Полный доступ к просмотру всех разделов
                  </p>
                </div>
              </div>
            </div>
            
            {isViewOnlySection && (
              <Badge variant="secondary" className="gap-2">
                <Eye className="w-4 h-4" />
                Режим просмотра
              </Badge>
            )}
          </div>
          
          {/* Хлебные крошки */}
          <div className="mt-4">
            <OrganizerBreadcrumbs items={getBreadcrumbs()} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="flex gap-6">
          {/* Боковое меню */}
          <div className="w-80 space-y-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Разделы компании</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {/* Собственный раздел организаторов */}
                <Button
                  variant={activeSection === 'organizers' ? 'default' : 'ghost'}
                  className="w-full justify-start gap-3"
                  onClick={() => setActiveSection('organizers')}
                >
                  <Shield className="w-4 h-4" />
                  Панель организаторов
                </Button>

                <div className="my-3 border-t" />

                {/* Разделы других отделов */}
                {departmentSections.map((section) => {
                  const IconComponent = section.icon;
                  return (
                    <Button
                      key={section.id}
                      variant={activeSection === section.id ? 'default' : 'ghost'}
                      className="w-full justify-start gap-3"
                      onClick={() => setActiveSection(section.id)}
                    >
                      <Eye className="w-4 h-4" />
                      <div className="flex-1 text-left">
                        <div className="font-medium">{section.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {section.subtitle}
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Основной контент */}
          <div className="flex-1">
            {activeSection === 'organizers' ? renderOrganizerSection() : renderDepartmentSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
