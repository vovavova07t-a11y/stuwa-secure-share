
export interface LogisticsClient {
  id: string;
  company_name: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country: string;
  client_type: 'corporate' | 'individual' | 'partner';
  status: 'active' | 'inactive' | 'potential';
  industry?: string;
  annual_revenue?: number;
  notes?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface LogisticsContract {
  id: string;
  client_id?: string;
  contract_number: string;
  title: string;
  description?: string;
  contract_type: 'sales' | 'procurement' | 'service';
  status: 'draft' | 'active' | 'completed' | 'cancelled' | 'expired';
  start_date?: string;
  end_date?: string;
  total_value?: number;
  currency: string;
  progress_percentage: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  assigned_manager?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface LogisticsSale {
  id: string;
  client_id?: string;
  contract_id?: string;
  sale_date: string;
  product_service: string;
  quantity?: number;
  unit_price?: number;
  total_amount: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  sales_manager?: string;
  region: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface LogisticsCommunication {
  id: string;
  client_id?: string;
  contract_id?: string;
  communication_type: 'email' | 'phone' | 'meeting' | 'document';
  subject?: string;
  content?: string;
  communication_date: string;
  follow_up_required: boolean;
  follow_up_date?: string;
  created_by?: string;
  created_at: string;
}

export interface ProcurementOpportunity {
  id: string;
  title: string;
  description?: string;
  client_company?: string;
  contact_info?: string;
  estimated_value?: number;
  currency: string;
  deadline?: string;
  status: 'open' | 'in_progress' | 'won' | 'lost' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  region: string;
  category?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}
