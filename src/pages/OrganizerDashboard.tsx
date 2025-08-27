
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
  BarChart3
} from 'lucide-react';

// ИСПРАВЛЕННЫЕ категории для каждого отдела
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
  office: [
    { id: 'cont_contacts', title: 'Контактная информация' },
    { id: 'cont_schedules', title: 'Расписания и графики' },
    { id: 'cont_events', title: 'Мероприятия и встречи' },
    { id: 'cont_coordination', title: 'Координация работы' },
    { id: 'cont_visitors', title: 'Регистрация посетителей' },
    { id: 'cont_facilities', title: 'Управление офисом' }
  ]
};

const sections = [
  { 
    id: 'about', 
    name: 'О нас',
    description: 'Финансовая дирекция',
    icon: Building2,
    department: 'financial'
  },
  { 
    id: 'products', 
    name: 'Продукция',
    description: 'Техническая дирекция',
    icon: Settings,
    department: 'technical'
  },
  { 
    id: 'clients', 
    name: 'Клиенты',
    description: 'Управление логистики',
    icon: Users,
    department: 'logistics'
  },
  { 
    id: 'development', 
    name: 'Развитие',
    description: 'Коммерческая дирекция',
    icon: TrendingUp,
    department: 'commercial'
  },
  { 
    id: 'contacts', 
    name: 'Контакты',
    description: 'Офис-менеджер',
    icon: Phone,
    department: 'office'
  }
];

const OrganizerDashboard: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const currentSection = sections.find(s => s.id === selectedSection);
  const currentDepartment = currentSection?.department;
  const availableCategories = currentDepartment ? departmentCategories[currentDepartment as keyof typeof departmentCategories] : [];

  console.log('📋 OrganizerDashboard: Показ файлов для отдела', currentDepartment, ', категории:', availableCategories.map(c => c.id));

  const logOrganizerActivity = (actionType: string, department?: string, category?: string, fileName?: string) => {
    console.log('Organizer activity:', {
      actionType,
      department,
      category,
      fileName
    });
  };

  React.useEffect(() => {
    if (currentDepartment) {
      logOrganizerActivity('view', currentDepartment);
    }
  }, [currentDepartment]);

  const handleBackToOrganizers = () => {
    setSelectedSection('');
    setSelectedCategory('');
  };

  if (!selectedSection) {
    return (
      <div className="container mx-auto px-4 py-6">
        <OrganizerViewBanner 
          departmentTitle="Панель организатора"
          departmentSubtitle="Доступ ко всем отделам"
          onBackToOrganizers={handleBackToOrganizers}
        />
        
        <div className="mb-8">
          <OrganizerRealStats />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Разделы компании</h1>
          <p className="text-muted-foreground">Выберите раздел для просмотра документов</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card 
                key={section.id}
                className={`glass-card hover:scale-105 transition-all duration-300 cursor-pointer group animate-slide-up animate-stagger-${index + 1}`}
                onClick={() => setSelectedSection(section.id)}
              >
                <CardHeader className="text-center">
                  <div className="feature-icon mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {section.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 text-center">
                    {section.description}
                  </p>
                  <div className="text-center">
                    <Button 
                      variant="ghost" 
                      className="w-full group-hover:bg-primary/10 transition-colors"
                    >
                      Просмотр документов
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
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
      <div className="container mx-auto px-4 py-6">
        <OrganizerViewBanner 
          departmentTitle={currentSection?.name || ''}
          departmentSubtitle={currentSection?.description || ''}
          onBackToOrganizers={handleBackToOrganizers}
        />
        <OrganizerBreadcrumbs items={breadcrumbItems} />

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{currentSection?.name}</h1>
          <p className="text-muted-foreground">{currentSection?.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableCategories.map((category, index) => (
            <Card 
              key={category.id}
              className={`glass-card hover:scale-105 transition-all duration-300 cursor-pointer group animate-slide-up animate-stagger-${index + 1}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <CardHeader className="text-center">
                <div className="feature-icon mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="w-8 h-8" />
                </div>
                <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <Button 
                    variant="ghost" 
                    className="w-full group-hover:bg-primary/10 transition-colors"
                  >
                    Просмотр файлов
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
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
    <div className="container mx-auto px-4 py-6">
      <OrganizerViewBanner 
        departmentTitle={currentSection?.name || ''}
        departmentSubtitle={selectedCategoryInfo?.title || ''}
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
  );
};

export default OrganizerDashboard;
