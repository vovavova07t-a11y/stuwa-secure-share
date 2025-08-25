
export interface LogisticsDocument {
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
  priority?: string;
}

export interface CommercialDocument {
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
  client_related?: boolean;
}

export interface LogisticsClient {
  id: string;
  company_name: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  industry?: string;
  client_type?: string;
  status?: string;
  annual_revenue?: number;
  notes?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface LogisticsContract {
  id: string;
  contract_number: string;
  title: string;
  description?: string;
  client_id?: string;
  contract_type?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
  total_value?: number;
  currency?: string;
  progress_percentage?: number;
  priority?: string;
  assigned_manager?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}
