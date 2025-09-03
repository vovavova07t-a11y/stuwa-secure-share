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
    { id: 'about_debt_reports', title: 'Отчеты по задолженностям (О)', description: 'Дополнительные отчеты по задолженности' },
    { id: 'fin_debt_reports', title: 'Отчеты по задолженностям', description: 'Финансовые отчеты и анализ задолженности клиентов' },
    { id: 'fin_founding_docs', title: 'Учредительные документы', description: 'Уставные документы и регистрационные материалы' },
    { id: 'fin_monthly_reports', title: 'Месячные отчеты', description: 'Ежемесячная финансовая отчетность компании' },
    { id: 'fin_org_structure', title: 'Организационная структура', description: 'Штатное расписание и структура компании' },
    { id: 'fin_protocols', title: 'Протоколы НС', description: 'Протоколы наблюдательного совета' },
    { id: 'fin_quarterly_tax', title: 'Налоговые отчеты', description: 'Квартальные налоговые декларации и отчеты' },
    { id: 'fin_yearly_reports', title: 'Годовые отчеты', description: 'Годовая финансовая отчетность и анализ' }
  ],
  technical: [
    { id: 'technical_specifications', title: 'Технические спецификации', description: 'Технические спецификации и документация' }
  ],
  logistics: [
    { id: 'logistics_transportation', title: 'Транспортировка', description: 'Документы по транспортировке и логистике' },
    { id: 'log_client_base', title: 'Клиентская база', description: 'База данных клиентов логистики' },
    { id: 'log_communications', title: 'Коммуникации', description: 'Коммуникационные документы отдела логистики' },
    { id: 'log_contracts', title: 'Договоры', description: 'Договоры и контракты по логистике' },
    { id: 'log_delivery', title: 'Доставка', description: 'Документы по доставке и распределению' },
    { id: 'log_regions', title: 'Регионы', description: 'Региональная документация по логистике' }
  ],
  commercial: [
    { id: 'com_analytics', title: 'Аналитика', description: 'Коммерческая аналитика и отчеты' },
    { id: 'com_investments', title: 'Инвестиции', description: 'Инвестиционные проекты и предложения' },
    { id: 'com_strategies', title: 'Стратегии', description: 'Коммерческие стратегии и планы' },
    { id: 'commercial_partnerships', title: 'Партнерства', description: 'Партнерские соглашения и меморандумы' }
  ],
  office: [
    { id: 'cont_company_resume', title: 'Резюме Компании', description: 'Краткое резюме и презентационные материалы компании' },
    { id: 'cont_contacts', title: 'Контакты', description: 'Контактная информация и справочники' },
    { id: 'cont_coordination', title: 'Координация', description: 'Документы по координации деятельности' },
    { id: 'cont_events', title: 'Мероприятия', description: 'Планы и отчеты по мероприятиям' },
    { id: 'cont_facilities', title: 'Помещения', description: 'Документы по управлению помещениями' },
    { id: 'cont_outgoing_correspondence', title: 'Исходящая корреспонденция', description: 'Исходящие письма и официальные ответы' },
    { id: 'cont_schedules', title: 'Расписания', description: 'Расписания и планы работы' },
    { id: 'cont_visitors', title: 'Посетители', description: 'Регистрация и учет посетителей' },
    { id: 'office_contacts', title: 'Офисные контакты', description: 'Внутренние офисные контакты' },
    { id: 'office_correspondence', title: 'Офисная корреспонденция', description: 'Внутренняя офисная переписка' }
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
