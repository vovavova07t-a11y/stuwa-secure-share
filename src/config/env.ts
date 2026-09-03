// Централизованная конфигурация окружения.
// Все внешние адреса задаются через переменные окружения (.env),
// чтобы проект можно было подключить к собственному бэкенду на stuwa.kz.

const env = import.meta.env as Record<string, string | undefined>;

/** Базовый URL API/БД (Supabase-совместимый бэкенд или self-hosted инстанс). */
export const API_URL: string =
  env.VITE_SUPABASE_URL || env.VITE_API_URL || env.VITE_DB_URL || '';

/** Публичный (anon) ключ API. Пустая строка допустима для собственного бэкенда без JWT-ключа. */
export const API_KEY: string =
  env.VITE_SUPABASE_PUBLISHABLE_KEY || env.VITE_API_KEY || '';

/**
 * Режим хранения файлов:
 *  - 'server'  — файлы лежат на нашем сервере (относительные пути /uploads),
 *  - 'supabase' — стандартные бакеты Supabase Storage.
 */
export const STORAGE_MODE: 'server' | 'supabase' =
  (env.VITE_STORAGE_MODE as 'server' | 'supabase') || 'supabase';

/** Публичный базовый путь для чтения файлов, например /uploads или /storage. */
export const STORAGE_PUBLIC_URL: string = env.VITE_STORAGE_PUBLIC_URL || '/uploads';

/** Эндпоинт нашего сервера для загрузки/удаления файлов. */
export const STORAGE_UPLOAD_URL: string = env.VITE_STORAGE_UPLOAD_URL || '/api/uploads';
