
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

export const getDemoUserForDepartment = (department: string) => {
  return {
    id: `demo-user-${department}`,
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
