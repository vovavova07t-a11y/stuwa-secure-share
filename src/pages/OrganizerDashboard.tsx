
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Eye, 
  Calendar,
  FileText,
  Users,
  BarChart3,
  Exchange,
  Building2,
  Cog,
  Truck,
  TrendingUp,
  Phone,
  Download,
  Search,
  Filter
} from 'lucide-react';
import { CategoryFileSection } from '@/components/CategoryFileSection';
import { useToast } from '@/hooks/use-toast';

type OrganizerSection = 'organizers' | 'financial' | 'technical' | 'logistics' | 'commercial' | 'contacts';

const OrganizerDashboard = () => {
  const [activeSection, setActiveSection] = useState<OrganizerSection>('organizers');
  const [organizerName, setOrganizerName] = useState('STUWA Organizer');
  const { toast } = useToast();

  const organizerCategories = [
    { id: 'event-plans', title: 'Планы мероприятий', icon: Calendar },
    { id: 'documentation', title: 'Документооборот', icon: FileText },
    { id: 'coordination', title: 'Координация отделов', icon: Users },
    { id: 'reports', title: 'Отчеты по организации', icon: BarChart3 },
    { id: 'interdepartment', title: 'Межотдельский обмен', icon: Exchange }
  ];

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
      // В реальном приложении здесь будет вызов API для логирования
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

  const renderOrganizerSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizerCategories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Card key={category.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CategoryFileSection
                  categoryId={category.id}
                  categoryTitle={category.title}
                />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderDepartmentSection = () => {
    const currentDept = departmentSections.find(d => d.id === activeSection);
    if (!currentDept) return null;

    // Категории для каждого отдела (упрощенный список)
    const departmentCategories = {
      financial: [
        { id: 'reports', title: 'Финансовые отчеты' },
        { id: 'budgets', title: 'Бюджеты' },
        { id: 'contracts', title: 'Договоры' },
        { id: 'invoices', title: 'Счета' }
      ],
      technical: [
        { id: 'specifications', title: 'Спецификации продукции' },
        { id: 'certificates', title: 'Сертификаты' },
        { id: 'presentations', title: 'Презентации' },
        { id: 'catalogs', title: 'Каталоги' }
      ],
      logistics: [
        { id: 'client-base', title: 'База клиентов' },
        { id: 'contracts', title: 'Договоры' },
        { id: 'reports', title: 'Отчеты' },
        { id: 'communications', title: 'Коммуникации' }
      ],
      commercial: [
        { id: 'partnerships', title: 'Партнерства' },
        { id: 'price-lists', title: 'Прайс-листы' },
        { id: 'quotations', title: 'Коммерческие предложения' },
        { id: 'analytics', title: 'Аналитика' }
      ],
      contacts: [
        { id: 'contacts', title: 'Контакты' },
        { id: 'schedules', title: 'Расписания' },
        { id: 'events', title: 'Мероприятия' },
        { id: 'coordination', title: 'Координация' }
      ]
    };

    const categories = departmentCategories[activeSection as keyof typeof departmentCategories] || [];

    return (
      <div className="space-y-6">
        {/* Индикатор режима просмотра */}
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-amber-600" />
              <div>
                <p className="font-semibold text-amber-800">Режим просмотра</p>
                <p className="text-sm text-amber-700">
                  Вы просматриваете файлы отдела "{currentDept.title}". Доступны только просмотр и скачивание.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Категории отдела */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    {category.title}
                  </span>
                  <Badge variant="outline" className="gap-1">
                    <Eye className="w-3 h-3" />
                    Просмотр
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CategoryFileSection
                  categoryId={category.id}
                  categoryTitle={category.title}
                />
              </CardContent>
            </Card>
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
                    {organizerName} • Полный доступ к просмотру
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
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="flex gap-6">
          {/* Боковое меню */}
          <div className="w-80 space-y-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Разделы</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {/* Собственный раздел организаторов */}
                <Button
                  variant={activeSection === 'organizers' ? 'default' : 'ghost'}
                  className="w-full justify-start gap-3"
                  onClick={() => setActiveSection('organizers')}
                >
                  <Shield className="w-4 h-4" />
                  Организаторы
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

            {/* Статистика активности */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Сегодняшняя активность</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Просмотров</span>
                  <Badge variant="outline">12</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Скачиваний</span>
                  <Badge variant="outline">7</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Разделов посещено</span>
                  <Badge variant="outline">4</Badge>
                </div>
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
