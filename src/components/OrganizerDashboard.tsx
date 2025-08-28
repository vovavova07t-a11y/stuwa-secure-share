
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { OrganizerFileSection } from '@/components/OrganizerFileSection';
import { OrganizerStats } from '@/components/OrganizerStats';
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
    { id: 'fin_monthly_reports', title: 'Месячные отчеты', description: 'Ежемесячная финансовая отчетность компании' },
    { id: 'fin_quarterly_tax', title: 'Налоговые отчеты', description: 'Квартальные налоговые декларации и отчеты' },
    { id: 'fin_yearly_reports', title: 'Годовые отчеты', description: 'Годовая финансовая отчетность и анализ' },
    { id: 'fin_founding_docs', title: 'Учредительные документы', description: 'Уставные документы и регистрационные материалы' },
    { id: 'fin_org_structure', title: 'Организационная структура', description: 'Штатное расписание и структура компании' },
    { id: 'fin_protocols', title: 'Протоколы НС', description: 'Протоколы наблюдательного совета' }
  ],
  technical: [
    { id: 'tech_development', title: 'Программы развития', description: 'Стратегические планы технического развития' },
    { id: 'tech_product_overview', title: 'Обзор продукции', description: 'Техническое описание продуктов и услуг' },
    { id: 'tech_specifications', title: 'Спецификации', description: 'Технические спецификации и требования' },
    { id: 'tech_presentations', title: 'Презентации', description: 'Презентационные материалы о деятельности' },
    { id: 'tech_business_plans', title: 'Бизнес планы', description: 'Бизнес планы и проектная документация' },
    { id: 'tech_catalog', title: 'Каталог продукции', description: 'Каталог товаров и услуг компании' },
    { id: 'tech_certificates', title: 'Сертификаты', description: 'Сертификаты качества и compliance документы' }
  ],
  logistics: [
    { id: 'log_client_base', title: 'База клиентов', description: 'Реестр клиентов и контрагентов' },
    { id: 'log_contracts', title: 'Договоры', description: 'Договоры с клиентами и поставщиками' },
    { id: 'log_sales_reports', title: 'Отчеты по продажам', description: 'Аналитика продаж и КПД' },
    { id: 'log_communications', title: 'Коммуникации', description: 'Корреспонденция с клиентами' },
    { id: 'log_delivery', title: 'Логистика', description: 'Документы по доставке и логистике' },
    { id: 'log_regions', title: 'Региональные представительства', description: 'Документы региональных офисов' }
  ],
  commercial: [
    { id: 'com_partnerships', title: 'Партнерства', description: 'Соглашения о партнерстве и альянсах' },
    { id: 'com_price_lists', title: 'Прайс-листы', description: 'Актуальные прайс-листы и тарифы' },
    { id: 'com_quotations', title: 'Коммерческие предложения', description: 'КП и тендерная документация' },
    { id: 'com_analytics', title: 'Аналитика', description: 'Маркетинговые исследования и аналитика' },
    { id: 'com_strategies', title: 'Стратегии развития', description: 'Стратегические планы развития бизнеса' },
    { id: 'com_investments', title: 'Инвестиционные проекты', description: 'Инвестиционные предложения и проекты' }
  ],
  office: [
    { id: 'cont_contacts', title: 'Контакты', description: 'Контактная информация сотрудников и партнеров' },
    { id: 'cont_schedules', title: 'Расписания', description: 'Графики работы и календарь мероприятий' },
    { id: 'cont_events', title: 'Мероприятия', description: 'Планы мероприятий и встреч' },
    { id: 'cont_coordination', title: 'Координация', description: 'Координационные документы' },
    { id: 'cont_visitors', title: 'Посетители', description: 'Журнал регистрации посетителей' },
    { id: 'cont_facilities', title: 'Управление офисом', description: 'Документы по управлению офисными помещениями' }
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
            
            {/* Statistics */}
            <OrganizerStats />
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
