
// Утилиты для работы с отделами
export const getCurrentDepartmentFromPath = (): string => {
  const path = window.location.pathname;
  
  console.log('🔍 Определение отдела по пути:', path);
  
  // ИСПРАВЛЕННАЯ ЛОГИКА ОПРЕДЕЛЕНИЯ ОТДЕЛОВ
  if (path.includes('/about') || path.includes('/financial')) {
    console.log('✅ Определен отдел: financial (О нас)');
    return 'financial';
  }
  
  if (path.includes('/technical') || path.includes('/product')) {
    console.log('✅ Определен отдел: technical (Продукция)');
    return 'technical';
  }
  
  if (path.includes('/logistics') || path.includes('/client')) {
    console.log('✅ Определен отдел: logistics (Клиенты)');
    return 'logistics';
  }
  
  if (path.includes('/commercial') || path.includes('/development')) {
    console.log('✅ Определен отдел: commercial (Развитие)');
    return 'commercial';
  }
  
  if (path.includes('/contacts') || path.includes('/contact')) {
    console.log('✅ Определен отдел: office (Контакты)');
    return 'office';
  }
  
  // ДОПОЛНИТЕЛЬНАЯ ПРОВЕРКА ДЛЯ МЕЖДЕПАРТАМЕНТСКОГО ОБМЕНА
  if (path.includes('/interdepartment')) {
    // Пытаемся определить отдел из предыдущего пути или локального хранилища
    const storedDepartment = localStorage.getItem('currentDepartment');
    if (storedDepartment) {
      console.log('✅ Отдел получен из localStorage:', storedDepartment);
      return storedDepartment;
    }
  }
  
  // Дефолтное значение
  console.log('⚠️ Не удалось определить отдел, используется дефолт: financial');
  return 'financial';
};

export const setCurrentDepartment = (department: string) => {
  localStorage.setItem('currentDepartment', department);
  console.log('💾 Отдел сохранен в localStorage:', department);
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
