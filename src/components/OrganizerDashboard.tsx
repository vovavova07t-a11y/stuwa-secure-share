import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { OrganizerFileSection } from '@/components/OrganizerFileSection';
import { OrganizerRealStats } from '@/components/OrganizerRealStats';
import { OrganizerViewBanner } from '@/components/OrganizerViewBanner';
import { OrganizerBreadcrumbs } from '@/components/OrganizerBreadcrumbs';
import { 
  FileText, 
  Building2, 
  Users, 
  TrendingUp, 
  Phone,
  Settings,
  ArrowLeft,
  Eye,
  Shield
} from 'lucide-react';

// РЕАЛЬНЫЕ категории для каждого отдела из базы данных
const departmentCategories = {
  financial: [
    { id: 'fin_debt_reports', title: 'Отчеты по задолженностям', description: 'Финансовые отчеты и анализ задолженности клиентов' },
    { id: 'fin_founding_docs', title: 'Учредительные документы', description: 'Уставные документы и регистрационные материалы' },
    { id: 'fin_monthly_reports', title: 'Месячные отчеты', description: 'Ежемесячная финансовая отчетность компании' },
    { id: 'fin_org_structure', title: 'Организационная структура', description: 'Штатное расписание и структура компании' },
    { id: 'fin_protocols', title: 'Протоколы НС', description: 'Протоколы наблюдательного совета' },
    { id: 'fin_quarterly_tax', title: 'Налоговые отчеты', description: 'Квартальные налоговые декларации и отчеты' },
    { id: 'fin_yearly_reports', title: 'Годовые отчеты', description: 'Годовая финансовая отчетность и анализ' }
  ],
  technical: [
    { id: 'tech_development_program', title: 'Программа развития', description: 'Программы развития и стратегические планы' },
    { id: 'tech_product_overview', title: 'Обзор продукции', description: 'Общий обзор и характеристики продукции' },
    { id: 'tech_product_specs', title: 'Спецификация продукции', description: 'Детальные технические спецификации продукции' },
    { id: 'tech_activity_presentation', title: 'Презентация деятельности', description: 'Презентационные материалы деятельности компании' },
    { id: 'tech_business_plans', title: 'Бизнес-планы и Проекты', description: 'Бизнес-планы и проектная документация' },
    { id: 'tech_company_catalog', title: 'Каталог Компании', description: 'Каталог продукции и услуг компании' },
    { id: 'tech_product_certificates', title: 'Сертификаты на продукцию', description: 'Сертификаты качества и соответствия продукции' }
  ],
  logistics: [
    { id: 'log_current_issues_germany', title: 'Текущие вопросы (Германия)', description: 'Текущие вопросы по работе с Германией' },
    { id: 'log_sales_report', title: 'Отчет по реализации', description: 'Отчеты по реализации продукции и услуг' },
    { id: 'log_contract_development', title: 'Отчет по освоению Договоров', description: 'Отчеты по освоению и выполнению договоров' },
    { id: 'log_procurement_announcements', title: 'Обзор объявлений о закупе', description: 'Обзор и анализ объявлений о закупках' },
    { id: 'log_sales_contracts', title: 'Договора на реализацию', description: 'Договоры на реализацию продукции' }
  ],
  commercial: [
    { id: 'com_client_requests', title: 'Отчет по запросам клиентов', description: 'Отчеты по запросам и требованиям клиентов' },
    { id: 'com_client_list', title: 'Список клиентов', description: 'База данных и список всех клиентов' },
    { id: 'com_product_promotion', title: 'Перечень продукции для продвижения продаж', description: 'Список продукции для активного продвижения' },
    { id: 'com_price_lists', title: 'Прайс-листы', description: 'Актуальные прайс-листы на продукцию и услуги' },
    { id: 'com_quotations', title: 'Актуальные КП', description: 'Актуальные коммерческие предложения' },
    { id: 'com_partnerships_mou', title: 'Меморандумы и Соглашения о сотрудничестве', description: 'Меморандумы и партнерские соглашения' }
  ],
  office: [
    { id: 'office_company_resume', title: 'Резюме Компании', description: 'Краткое резюме и презентационные материалы компании' },
    { id: 'office_incoming_correspondence', title: 'Входящая корреспонденция', description: 'Входящие письма и официальная корреспонденция' },
    { id: 'office_outgoing_correspondence', title: 'Исходящая корреспонденция', description: 'Исходящие письма и официальные ответы' },
    { id: 'office_supplier_contacts', title: 'Контакты поставщиков ТРУ', description: 'Контактная информация поставщиков товаров, работ и услуг' },
    { id: 'office_supplier_contracts', title: 'Договора с поставщиками', description: 'Договоры и соглашения с поставщиками' }
  ]
};

const sections = [
  { 
    id: 'about', 
    name: 'Финансы',
    description: 'Финансовая дирекция',
    icon: Building2,
    department: 'financial',
    color: 'bg-blue-500'
  },
  { 
    id: 'products', 
    name: 'Техническая дирекция',
    description: 'Техническая документация',
    icon: Settings,
    department: 'technical',
    color: 'bg-green-500'
  },
  { 
    id: 'clients', 
    name: 'Логистика',
    description: 'Управление логистики',
    icon: Users,
    department: 'logistics',
    color: 'bg-purple-500'
  },
  { 
    id: 'development', 
    name: 'Коммерция',
    description: 'Коммерческая дирекция',
    icon: TrendingUp,
    department: 'commercial',
    color: 'bg-orange-500'
  },
  { 
    id: 'contacts', 
    name: 'Офис-менеджер',
    description: 'Административные документы',
    icon: Phone,
    department: 'office',
    color: 'bg-pink-500'
  }
];

export const OrganizerDashboard: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const currentSection = sections.find(s => s.id === selectedSection);
  const currentDepartment = currentSection?.department;
  const availableCategories = currentDepartment ? departmentCategories[currentDepartment as keyof typeof departmentCategories] : [];

  const handleBackToOrganizers = () => {
    setSelectedSection('');
    setSelectedCategory('');
  };

  if (!selectedSection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Панель организатора</h1>
                  <p className="text-muted-foreground">Доступ ко всем документам компании STUWA</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Eye className="w-3 h-3 mr-1" />
                Режим просмотра
              </Badge>
            </div>
            
            {/* Real Statistics */}
            <OrganizerRealStats />
          </div>

          {/* Departments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Card 
                  key={section.id}
                  className="glass-card hover:scale-[1.02] transition-all duration-300 cursor-pointer group border border-border/50 hover:border-primary/30"
                  onClick={() => setSelectedSection(section.id)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-lg ${section.color} bg-opacity-10`}>
                        <Icon className={`w-6 h-6 text-${section.color.split('-')[1]}-600`} />
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ArrowLeft className="w-4 h-4 rotate-180" />
                      </Button>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {section.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-4">
                      {section.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Категорий: {departmentCategories[section.department as keyof typeof departmentCategories]?.length || 0}</span>
                      <Badge variant="outline" className="text-xs">
                        Активен
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (!selectedCategory) {
    const breadcrumbItems = [
      { label: 'Панель организатора', onClick: handleBackToOrganizers },
      { label: currentSection?.name || '', isActive: true }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-4 py-6">
          <OrganizerViewBanner 
            departmentTitle={currentSection?.name || ''}
            departmentSubtitle={`Документы отдела: ${currentSection?.description || ''}`}
            onBackToOrganizers={handleBackToOrganizers}
          />
          <OrganizerBreadcrumbs items={breadcrumbItems} />

          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">{currentSection?.name}</h1>
            <p className="text-muted-foreground">Выберите категорию для просмотра документов</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCategories.map((category, index) => (
              <Card 
                key={category.id}
                className="glass-card hover:scale-[1.02] transition-all duration-300 cursor-pointer group border border-border/50 hover:border-primary/30"
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </Button>
                  </div>
                  <CardTitle className="text-base group-hover:text-primary transition-colors line-clamp-2">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const selectedCategoryInfo = availableCategories.find(c => c.id === selectedCategory);

  const breadcrumbItems = [
    { label: 'Панель организатора', onClick: handleBackToOrganizers },
    { label: currentSection?.name || '', onClick: () => setSelectedCategory('') },
    { label: selectedCategoryInfo?.title || '', isActive: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-6">
        <OrganizerViewBanner 
          departmentTitle={currentSection?.name || ''}
          departmentSubtitle={`Категория: ${selectedCategoryInfo?.title || ''}`}
          onBackToOrganizers={handleBackToOrganizers}
        />
        <OrganizerBreadcrumbs items={breadcrumbItems} />

        <OrganizerFileSection
          categoryId={selectedCategory}
          categoryTitle={selectedCategoryInfo?.title || 'Неизвестная категория'}
          department={currentDepartment || 'unknown'}
          isViewOnly={true}
        />
      </div>
    </div>
  );
};
