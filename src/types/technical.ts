
export interface TechnicalDocument {
  id: string;
  title: string;
  description?: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  category: string;
  subcategory?: string;
  version: number;
  status: string;
  tags?: string[];
  metadata?: Record<string, any>;
  uploaded_by: string;
  created_at: string;
  updated_at: string;
  download_count: number;
  last_downloaded_at?: string;
  print_ready: boolean;
  technical_specs?: Record<string, any>;
}

export interface DocumentVersion {
  id: string;
  document_id: string;
  version_number: number;
  file_url: string;
  file_name: string;
  changelog?: string;
  created_by: string;
  created_at: string;
}

export interface DocumentComment {
  id: string;
  document_id: string;
  user_id: string;
  comment: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface UserFavorite {
  id: string;
  user_id: string;
  document_id: string;
  created_at: string;
}
