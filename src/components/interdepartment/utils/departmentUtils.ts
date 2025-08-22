
// Утилиты для работы с отделами
export const getCurrentDepartmentFromPath = (): string => {
  const path = window.location.pathname;
  
  if (path.includes('/about') || path.includes('/financial')) return 'financial';
  if (path.includes('/technical')) return 'technical';
  if (path.includes('/logistics')) return 'logistics';
  if (path.includes('/commercial')) return 'commercial';
  if (path.includes('/contacts')) return 'office';
  
  // Дефолтное значение
  return 'financial';
};

// Генерируем стабильные UUID для каждого отдела
const DEPARTMENT_UUIDS = {
  financial: '11111111-1111-1111-1111-111111111111',
  technical: '22222222-2222-2222-2222-222222222222',
  logistics: '33333333-3333-3333-3333-333333333333',
  commercial: '44444444-4444-4444-4444-444444444444',
  office: '55555555-5555-5555-5555-555555555555'
};

export const getDemoUserForDepartment = (department: string) => {
  return {
    id: DEPARTMENT_UUIDS[department as keyof typeof DEPARTMENT_UUIDS] || DEPARTMENT_UUIDS.office,
    email: `${department}@stuwa.com`,
    department: department
  };
};

export const DEPARTMENT_OPTIONS = [
  { value: 'financial', label: 'Финансовая дирекция (О нас)', icon: '💰' },
  { value: 'technical', label: 'Техническая дирекция (Продукция)', icon: '⚙️' },
  { value: 'logistics', label: 'Управление логистики (Клиенты)', icon: '🚚' },
  { value: 'commercial', label: 'Коммерческая дирекция (Развитие)', icon: '📈' },
  { value: 'office', label: 'Офис-менеджер (Контакты)', icon: '🏢' }
];

export const DEPARTMENT_NAMES = {
  financial: 'Финансовая дирекция',
  technical: 'Техническая дирекция', 
  logistics: 'Управление логистики',
  commercial: 'Коммерческая дирекция',
  office: 'Офис-менеджер'
};
