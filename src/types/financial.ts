
export interface FinancialDocument {
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
  uploaded_by: string;
  created_at: string;
  updated_at: string;
  download_count: number;
  last_downloaded_at?: string;
}

export interface DocumentAccessLog {
  id: string;
  document_id: string;
  user_id: string;
  action: string;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: string;
  department: string;
  granted_by?: string;
  created_at: string;
}
