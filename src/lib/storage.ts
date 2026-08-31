// Абстракция файлового хранилища.
// В режиме 'server' работа идет с локальными путями нашего сервера (/uploads),
// в режиме 'supabase' — со стандартными бакетами Supabase Storage.

import { supabase } from '@/integrations/supabase/client';
import { STORAGE_MODE, STORAGE_PUBLIC_URL, STORAGE_UPLOAD_URL } from '@/config/env';

const joinUrl = (base: string, path: string) =>
  `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;

export const getPublicUrl = (bucket: string, path: string): string => {
  if (STORAGE_MODE === 'server') {
    return joinUrl(STORAGE_PUBLIC_URL, `${bucket}/${path}`);
  }
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
};

export const uploadFile = async (
  bucket: string,
  path: string,
  file: File
): Promise<{ path: string; publicUrl: string }> => {
  if (STORAGE_MODE === 'server') {
    const form = new FormData();
    form.append('file', file);
    form.append('bucket', bucket);
    form.append('path', path);

    const res = await fetch(STORAGE_UPLOAD_URL, { method: 'POST', body: form });
    if (!res.ok) {
      throw new Error(`Ошибка загрузки файла на сервер (${res.status})`);
    }
    const data = await res.json().catch(() => ({}));
    const storedPath = data.path || path;
    return { path: storedPath, publicUrl: data.url || getPublicUrl(bucket, storedPath) };
  }

  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { cacheControl: '3600', upsert: false });
  if (error) throw error;

  return { path, publicUrl: getPublicUrl(bucket, path) };
};

export const removeFile = async (bucket: string, path: string): Promise<void> => {
  if (STORAGE_MODE === 'server') {
    const res = await fetch(
      `${STORAGE_UPLOAD_URL}?bucket=${encodeURIComponent(bucket)}&path=${encodeURIComponent(path)}`,
      { method: 'DELETE' }
    );
    if (!res.ok) throw new Error(`Ошибка удаления файла (${res.status})`);
    return;
  }

  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) throw error;
};
