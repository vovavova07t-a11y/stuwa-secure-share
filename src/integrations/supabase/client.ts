// Клиент базы данных/авторизации.
// Адрес и ключ берутся из переменных окружения (VITE_API_URL / VITE_DB_URL),
// поэтому проект можно подключить к собственному серверу на stuwa.kz.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { brokeredPreviewStorage } from './previewAuthStorage';
import { API_URL, API_KEY } from '@/config/env';

if (!API_URL) {
  console.error('Не задан VITE_API_URL (или VITE_DB_URL) — подключение к базе данных невозможно.');
}

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(API_URL, API_KEY, {
  auth: {
    storage: brokeredPreviewStorage(),
    persistSession: true,
    autoRefreshToken: true,
  }
});
