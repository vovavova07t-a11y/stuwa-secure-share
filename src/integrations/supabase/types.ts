export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      ab_test_results: {
        Row: {
          conversion_value: number | null
          converted: boolean | null
          created_at: string | null
          id: string
          session_id: string
          test_id: string | null
          variant: string
        }
        Insert: {
          conversion_value?: number | null
          converted?: boolean | null
          created_at?: string | null
          id?: string
          session_id: string
          test_id?: string | null
          variant: string
        }
        Update: {
          conversion_value?: number | null
          converted?: boolean | null
          created_at?: string | null
          id?: string
          session_id?: string
          test_id?: string | null
          variant?: string
        }
        Relationships: [
          {
            foreignKeyName: "ab_test_results_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "ab_tests"
            referencedColumns: ["id"]
          },
        ]
      }
      ab_tests: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          test_name: string
          variant_a: string
          variant_b: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          test_name: string
          variant_a: string
          variant_b: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          test_name?: string
          variant_a?: string
          variant_b?: string
        }
        Relationships: []
      }
      accountant_chats: {
        Row: {
          created_at: string
          id: string
          last_message_at: string | null
          status: string
          unread_count: number | null
          updated_at: string
          user_email: string | null
          user_id: string | null
          user_name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          last_message_at?: string | null
          status?: string
          unread_count?: number | null
          updated_at?: string
          user_email?: string | null
          user_id?: string | null
          user_name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          last_message_at?: string | null
          status?: string
          unread_count?: number | null
          updated_at?: string
          user_email?: string | null
          user_id?: string | null
          user_name?: string | null
        }
        Relationships: []
      }
      accountant_clients: {
        Row: {
          accountant_id: string
          actual_address: string | null
          assigned_name: string | null
          assigned_to: string | null
          bank_name: string | null
          bik: string | null
          bin: string | null
          chief_accountant_name: string | null
          client_id: string | null
          client_name: string | null
          client_phone: string | null
          created_at: string
          director_name: string | null
          email: string | null
          full_name: string | null
          id: string
          iik: string | null
          iin: string | null
          kbe: string | null
          legal_address: string | null
          oked: string | null
          org_form: string | null
          profile_completed_at: string | null
          profile_extra: Json | null
          signature_url: string | null
          stamp_url: string | null
          status: string
          tax_regime: string | null
          ugd_code: string | null
          updated_at: string
          vat_payer: boolean | null
        }
        Insert: {
          accountant_id: string
          actual_address?: string | null
          assigned_name?: string | null
          assigned_to?: string | null
          bank_name?: string | null
          bik?: string | null
          bin?: string | null
          chief_accountant_name?: string | null
          client_id?: string | null
          client_name?: string | null
          client_phone?: string | null
          created_at?: string
          director_name?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          iik?: string | null
          iin?: string | null
          kbe?: string | null
          legal_address?: string | null
          oked?: string | null
          org_form?: string | null
          profile_completed_at?: string | null
          profile_extra?: Json | null
          signature_url?: string | null
          stamp_url?: string | null
          status?: string
          tax_regime?: string | null
          ugd_code?: string | null
          updated_at?: string
          vat_payer?: boolean | null
        }
        Update: {
          accountant_id?: string
          actual_address?: string | null
          assigned_name?: string | null
          assigned_to?: string | null
          bank_name?: string | null
          bik?: string | null
          bin?: string | null
          chief_accountant_name?: string | null
          client_id?: string | null
          client_name?: string | null
          client_phone?: string | null
          created_at?: string
          director_name?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          iik?: string | null
          iin?: string | null
          kbe?: string | null
          legal_address?: string | null
          oked?: string | null
          org_form?: string | null
          profile_completed_at?: string | null
          profile_extra?: Json | null
          signature_url?: string | null
          stamp_url?: string | null
          status?: string
          tax_regime?: string | null
          ugd_code?: string | null
          updated_at?: string
          vat_payer?: boolean | null
        }
        Relationships: []
      }
      accountant_firm_settings: {
        Row: {
          address: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          default_monthly_fee: number | null
          firm_name: string | null
          legal_name: string | null
          logo_data_url: string | null
          owner_id: string
          primary_color: string | null
          requisites: Json | null
          secondary_color: string | null
          tagline: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          default_monthly_fee?: number | null
          firm_name?: string | null
          legal_name?: string | null
          logo_data_url?: string | null
          owner_id: string
          primary_color?: string | null
          requisites?: Json | null
          secondary_color?: string | null
          tagline?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          default_monthly_fee?: number | null
          firm_name?: string | null
          legal_name?: string | null
          logo_data_url?: string | null
          owner_id?: string
          primary_color?: string | null
          requisites?: Json | null
          secondary_color?: string | null
          tagline?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      accountant_messages: {
        Row: {
          chat_id: string
          content: string
          created_at: string
          id: string
          image_url: string | null
          is_read: boolean | null
          sender_id: string | null
          sender_type: string
          updated_at: string | null
        }
        Insert: {
          chat_id: string
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          is_read?: boolean | null
          sender_id?: string | null
          sender_type: string
          updated_at?: string | null
        }
        Update: {
          chat_id?: string
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          is_read?: boolean | null
          sender_id?: string | null
          sender_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accountant_messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "accountant_chats"
            referencedColumns: ["id"]
          },
        ]
      }
      accountant_policy_versions: {
        Row: {
          accountant_user_id: string
          client_id: string
          content: string
          created_at: string
          created_by: string | null
          doc_type: string
          effective_from: string
          id: string
          reason: string | null
          settings_snapshot: Json
          updated_at: string
          version: number
        }
        Insert: {
          accountant_user_id: string
          client_id: string
          content?: string
          created_at?: string
          created_by?: string | null
          doc_type: string
          effective_from?: string
          id?: string
          reason?: string | null
          settings_snapshot?: Json
          updated_at?: string
          version?: number
        }
        Update: {
          accountant_user_id?: string
          client_id?: string
          content?: string
          created_at?: string
          created_by?: string | null
          doc_type?: string
          effective_from?: string
          id?: string
          reason?: string | null
          settings_snapshot?: Json
          updated_at?: string
          version?: number
        }
        Relationships: []
      }
      accountant_sessions: {
        Row: {
          accountant_id: string
          created_at: string
          expires_at: string
          token: string
        }
        Insert: {
          accountant_id: string
          created_at?: string
          expires_at: string
          token?: string
        }
        Update: {
          accountant_id?: string
          created_at?: string
          expires_at?: string
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "accountant_sessions_accountant_id_fkey"
            columns: ["accountant_id"]
            isOneToOne: false
            referencedRelation: "accountant_users"
            referencedColumns: ["id"]
          },
        ]
      }
      accountant_tasks: {
        Row: {
          accountant_id: string
          assigned_name: string | null
          assigned_to: string | null
          client_id: string | null
          completed_at: string | null
          created_at: string
          description: string | null
          due_date: string | null
          end_time: string | null
          form_type: string | null
          id: string
          parent_task_id: string | null
          priority: string
          start_time: string | null
          status: string
          task_type: string
          title: string
          updated_at: string
        }
        Insert: {
          accountant_id: string
          assigned_name?: string | null
          assigned_to?: string | null
          client_id?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          end_time?: string | null
          form_type?: string | null
          id?: string
          parent_task_id?: string | null
          priority?: string
          start_time?: string | null
          status?: string
          task_type?: string
          title: string
          updated_at?: string
        }
        Update: {
          accountant_id?: string
          assigned_name?: string | null
          assigned_to?: string | null
          client_id?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          end_time?: string | null
          form_type?: string | null
          id?: string
          parent_task_id?: string | null
          priority?: string
          start_time?: string | null
          status?: string
          task_type?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "accountant_tasks_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "accountant_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accountant_tasks_parent_task_id_fkey"
            columns: ["parent_task_id"]
            isOneToOne: false
            referencedRelation: "accountant_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      accountant_users: {
        Row: {
          created_at: string
          id: string
          login: string
          name: string
          password_hash: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          login: string
          name: string
          password_hash: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          login?: string
          name?: string
          password_hash?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      accounting_policies: {
        Row: {
          client_id: string
          created_at: string
          created_by: string | null
          depreciation_method: string
          effective_from: string
          id: string
          inventory_method: string
          meta: Json
          reporting_currency: string
          standard: string
          tax_regime: string
          updated_at: string
          vat_regime: string
        }
        Insert: {
          client_id: string
          created_at?: string
          created_by?: string | null
          depreciation_method?: string
          effective_from?: string
          id?: string
          inventory_method?: string
          meta?: Json
          reporting_currency?: string
          standard?: string
          tax_regime?: string
          updated_at?: string
          vat_regime?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          created_by?: string | null
          depreciation_method?: string
          effective_from?: string
          id?: string
          inventory_method?: string
          meta?: Json
          reporting_currency?: string
          standard?: string
          tax_regime?: string
          updated_at?: string
          vat_regime?: string
        }
        Relationships: [
          {
            foreignKeyName: "accounting_policies_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "accountant_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      admins: {
        Row: {
          created_at: string | null
          email: string
          id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
        }
        Relationships: []
      }
      advertising_requests: {
        Row: {
          budget: string | null
          company_name: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          message: string | null
          notes: string | null
          phone: string
          position: string | null
          preferred_contact: string | null
          selected_package: string | null
          selected_services: string[] | null
          status: string
          updated_at: string
          website: string | null
        }
        Insert: {
          budget?: string | null
          company_name?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          message?: string | null
          notes?: string | null
          phone: string
          position?: string | null
          preferred_contact?: string | null
          selected_package?: string | null
          selected_services?: string[] | null
          status?: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          budget?: string | null
          company_name?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          message?: string | null
          notes?: string | null
          phone?: string
          position?: string | null
          preferred_contact?: string | null
          selected_package?: string | null
          selected_services?: string[] | null
          status?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      ai_agent_config: {
        Row: {
          address: string | null
          agent_name: string | null
          agent_role: string | null
          auto_transfer_keywords: string[] | null
          company_description: string | null
          created_at: string | null
          faq_text: string | null
          greeting: string | null
          id: string
          is_active: boolean | null
          language: string | null
          max_messages_per_conv: number | null
          prices_text: string | null
          services_text: string | null
          simulate_typing: boolean | null
          tone: string | null
          updated_at: string | null
          user_id: string | null
          wa_access_token: string | null
          wa_business_account_id: string | null
          wa_phone_display: string | null
          wa_phone_number_id: string | null
          wa_verify_token: string | null
          website: string | null
          working_hours: string | null
          working_hours_only: boolean | null
        }
        Insert: {
          address?: string | null
          agent_name?: string | null
          agent_role?: string | null
          auto_transfer_keywords?: string[] | null
          company_description?: string | null
          created_at?: string | null
          faq_text?: string | null
          greeting?: string | null
          id?: string
          is_active?: boolean | null
          language?: string | null
          max_messages_per_conv?: number | null
          prices_text?: string | null
          services_text?: string | null
          simulate_typing?: boolean | null
          tone?: string | null
          updated_at?: string | null
          user_id?: string | null
          wa_access_token?: string | null
          wa_business_account_id?: string | null
          wa_phone_display?: string | null
          wa_phone_number_id?: string | null
          wa_verify_token?: string | null
          website?: string | null
          working_hours?: string | null
          working_hours_only?: boolean | null
        }
        Update: {
          address?: string | null
          agent_name?: string | null
          agent_role?: string | null
          auto_transfer_keywords?: string[] | null
          company_description?: string | null
          created_at?: string | null
          faq_text?: string | null
          greeting?: string | null
          id?: string
          is_active?: boolean | null
          language?: string | null
          max_messages_per_conv?: number | null
          prices_text?: string | null
          services_text?: string | null
          simulate_typing?: boolean | null
          tone?: string | null
          updated_at?: string | null
          user_id?: string | null
          wa_access_token?: string | null
          wa_business_account_id?: string | null
          wa_phone_display?: string | null
          wa_phone_number_id?: string | null
          wa_verify_token?: string | null
          website?: string | null
          working_hours?: string | null
          working_hours_only?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_agent_config_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_agent_conversations: {
        Row: {
          ai_messages: number | null
          channel: string | null
          client_name: string | null
          client_phone: string
          client_wa_id: string | null
          conversion_goal: string | null
          converted: boolean | null
          human_messages: number | null
          id: string
          last_message_at: string | null
          resolved_at: string | null
          started_at: string | null
          status: string | null
          total_messages: number | null
          user_id: string | null
        }
        Insert: {
          ai_messages?: number | null
          channel?: string | null
          client_name?: string | null
          client_phone: string
          client_wa_id?: string | null
          conversion_goal?: string | null
          converted?: boolean | null
          human_messages?: number | null
          id?: string
          last_message_at?: string | null
          resolved_at?: string | null
          started_at?: string | null
          status?: string | null
          total_messages?: number | null
          user_id?: string | null
        }
        Update: {
          ai_messages?: number | null
          channel?: string | null
          client_name?: string | null
          client_phone?: string
          client_wa_id?: string | null
          conversion_goal?: string | null
          converted?: boolean | null
          human_messages?: number | null
          id?: string
          last_message_at?: string | null
          resolved_at?: string | null
          started_at?: string | null
          status?: string | null
          total_messages?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_agent_conversations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_agent_knowledge: {
        Row: {
          answer: string
          created_at: string | null
          id: string
          question: string
          times_used: number | null
          user_id: string | null
        }
        Insert: {
          answer: string
          created_at?: string | null
          id?: string
          question: string
          times_used?: number | null
          user_id?: string | null
        }
        Update: {
          answer?: string
          created_at?: string | null
          id?: string
          question?: string
          times_used?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_agent_knowledge_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_agent_knowledge_chunks: {
        Row: {
          agent_id: string
          char_count: number | null
          content: string
          created_at: string
          id: string
          is_active: boolean
          sort_order: number
          source_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          agent_id: string
          char_count?: number | null
          content: string
          created_at?: string
          id?: string
          is_active?: boolean
          sort_order?: number
          source_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          agent_id?: string
          char_count?: number | null
          content?: string
          created_at?: string
          id?: string
          is_active?: boolean
          sort_order?: number
          source_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_agent_knowledge_chunks_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "ai_agents"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_agent_knowledge_vectors: {
        Row: {
          agent_id: string
          char_count: number | null
          chunk_index: number | null
          content: string
          created_at: string
          embedding: string | null
          id: string
          source_chunk_id: string | null
          source_url: string | null
          title: string
        }
        Insert: {
          agent_id: string
          char_count?: number | null
          chunk_index?: number | null
          content: string
          created_at?: string
          embedding?: string | null
          id?: string
          source_chunk_id?: string | null
          source_url?: string | null
          title: string
        }
        Update: {
          agent_id?: string
          char_count?: number | null
          chunk_index?: number | null
          content?: string
          created_at?: string
          embedding?: string | null
          id?: string
          source_chunk_id?: string | null
          source_url?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_agent_knowledge_vectors_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "ai_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_agent_knowledge_vectors_source_chunk_id_fkey"
            columns: ["source_chunk_id"]
            isOneToOne: false
            referencedRelation: "ai_agent_knowledge_chunks"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_agent_messages: {
        Row: {
          content: string
          conversation_id: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          role: string
          sent_by: string | null
          tokens_used: number | null
          wa_message_id: string | null
        }
        Insert: {
          content: string
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          role: string
          sent_by?: string | null
          tokens_used?: number | null
          wa_message_id?: string | null
        }
        Update: {
          content?: string
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          role?: string
          sent_by?: string | null
          tokens_used?: number | null
          wa_message_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_agent_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "ai_agent_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_agents: {
        Row: {
          color: string
          created_at: string
          description: string | null
          example_questions: string[] | null
          icon: string
          id: string
          is_active: boolean
          model: string
          name: string
          role_title: string
          slug: string
          sort_order: number
          system_prompt: string
          updated_at: string
        }
        Insert: {
          color?: string
          created_at?: string
          description?: string | null
          example_questions?: string[] | null
          icon?: string
          id?: string
          is_active?: boolean
          model?: string
          name: string
          role_title: string
          slug: string
          sort_order?: number
          system_prompt: string
          updated_at?: string
        }
        Update: {
          color?: string
          created_at?: string
          description?: string | null
          example_questions?: string[] | null
          icon?: string
          id?: string
          is_active?: boolean
          model?: string
          name?: string
          role_title?: string
          slug?: string
          sort_order?: number
          system_prompt?: string
          updated_at?: string
        }
        Relationships: []
      }
      ai_chat_conversations: {
        Row: {
          created_at: string
          id: string
          title: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      ai_chat_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          role: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "ai_chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_insights: {
        Row: {
          confidence_score: number | null
          created_at: string | null
          data: Json | null
          description: string
          id: string
          insight_type: string
          is_read: boolean | null
          priority: string | null
          title: string
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string | null
          data?: Json | null
          description: string
          id?: string
          insight_type: string
          is_read?: boolean | null
          priority?: string | null
          title: string
        }
        Update: {
          confidence_score?: number | null
          created_at?: string | null
          data?: Json | null
          description?: string
          id?: string
          insight_type?: string
          is_read?: boolean | null
          priority?: string | null
          title?: string
        }
        Relationships: []
      }
      analytics_summary: {
        Row: {
          avg_session_duration: number | null
          bounce_rate: number | null
          created_at: string | null
          date: string
          device_breakdown: Json | null
          id: string
          top_countries: Json | null
          top_pages: Json | null
          total_page_views: number | null
          total_sessions: number | null
          unique_visitors: number | null
          updated_at: string | null
        }
        Insert: {
          avg_session_duration?: number | null
          bounce_rate?: number | null
          created_at?: string | null
          date: string
          device_breakdown?: Json | null
          id?: string
          top_countries?: Json | null
          top_pages?: Json | null
          total_page_views?: number | null
          total_sessions?: number | null
          unique_visitors?: number | null
          updated_at?: string | null
        }
        Update: {
          avg_session_duration?: number | null
          bounce_rate?: number | null
          created_at?: string | null
          date?: string
          device_breakdown?: Json | null
          id?: string
          top_countries?: Json | null
          top_pages?: Json | null
          total_page_views?: number | null
          total_sessions?: number | null
          unique_visitors?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      article_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          parent_id: string | null
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          parent_id?: string | null
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "article_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "article_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      article_comments: {
        Row: {
          article_id: string
          content: string
          created_at: string | null
          id: string
          is_hidden: boolean | null
          parent_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          article_id: string
          content: string
          created_at?: string | null
          id?: string
          is_hidden?: boolean | null
          parent_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          article_id?: string
          content?: string
          created_at?: string | null
          id?: string
          is_hidden?: boolean | null
          parent_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "article_comments_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "article_comments"
            referencedColumns: ["id"]
          },
        ]
      }
      article_reactions: {
        Row: {
          article_id: string
          created_at: string
          emoji: string
          id: string
          session_id: string
        }
        Insert: {
          article_id: string
          created_at?: string
          emoji: string
          id?: string
          session_id: string
        }
        Update: {
          article_id?: string
          created_at?: string
          emoji?: string
          id?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "article_reactions_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      article_reads: {
        Row: {
          article_id: string
          completed_reading: boolean | null
          created_at: string | null
          id: string
          read_percentage: number | null
          session_id: string
          time_spent_seconds: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          article_id: string
          completed_reading?: boolean | null
          created_at?: string | null
          id?: string
          read_percentage?: number | null
          session_id: string
          time_spent_seconds?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          article_id?: string
          completed_reading?: boolean | null
          created_at?: string | null
          id?: string
          read_percentage?: number | null
          session_id?: string
          time_spent_seconds?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      articles: {
        Row: {
          author_id: string | null
          author_name: string | null
          category: string
          content: string | null
          cover_image_caption: string | null
          cover_image_url: string | null
          created_at: string
          embed_content: Json | null
          excerpt: string | null
          gallery: Json | null
          id: string
          og_image_url: string | null
          published_at: string | null
          scheduled_at: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: string
          subcategory: string | null
          subtitle: string | null
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          author_name?: string | null
          category: string
          content?: string | null
          cover_image_caption?: string | null
          cover_image_url?: string | null
          created_at?: string
          embed_content?: Json | null
          excerpt?: string | null
          gallery?: Json | null
          id?: string
          og_image_url?: string | null
          published_at?: string | null
          scheduled_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: string
          subcategory?: string | null
          subtitle?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          author_name?: string | null
          category?: string
          content?: string | null
          cover_image_caption?: string | null
          cover_image_url?: string | null
          created_at?: string
          embed_content?: Json | null
          excerpt?: string | null
          gallery?: Json | null
          id?: string
          og_image_url?: string | null
          published_at?: string | null
          scheduled_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: string
          subcategory?: string | null
          subtitle?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      audit_trail: {
        Row: {
          action_label: string
          action_type: string
          created_at: string
          entity_id: string | null
          entity_type: string | null
          id: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          action_label: string
          action_type: string
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          action_label?: string
          action_type?: string
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      bank_imports: {
        Row: {
          account_number: string | null
          bank_name: string | null
          categorized_count: number | null
          created_at: string | null
          duplicate_count: number | null
          file_name: string | null
          file_type: string | null
          file_url: string | null
          id: string
          matched_records: number | null
          needs_review_count: number | null
          new_records: number | null
          period_id: string | null
          processed_at: string | null
          processed_records: number | null
          processing_errors: Json | null
          processing_status: string | null
          profile_id: string
          statement_end: string | null
          statement_start: string | null
          total_expense: number | null
          total_income: number | null
          total_records: number | null
        }
        Insert: {
          account_number?: string | null
          bank_name?: string | null
          categorized_count?: number | null
          created_at?: string | null
          duplicate_count?: number | null
          file_name?: string | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          matched_records?: number | null
          needs_review_count?: number | null
          new_records?: number | null
          period_id?: string | null
          processed_at?: string | null
          processed_records?: number | null
          processing_errors?: Json | null
          processing_status?: string | null
          profile_id: string
          statement_end?: string | null
          statement_start?: string | null
          total_expense?: number | null
          total_income?: number | null
          total_records?: number | null
        }
        Update: {
          account_number?: string | null
          bank_name?: string | null
          categorized_count?: number | null
          created_at?: string | null
          duplicate_count?: number | null
          file_name?: string | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          matched_records?: number | null
          needs_review_count?: number | null
          new_records?: number | null
          period_id?: string | null
          processed_at?: string | null
          processed_records?: number | null
          processing_errors?: Json | null
          processing_status?: string | null
          profile_id?: string
          statement_end?: string | null
          statement_start?: string | null
          total_expense?: number | null
          total_income?: number | null
          total_records?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bank_imports_period_id_fkey"
            columns: ["period_id"]
            isOneToOne: false
            referencedRelation: "tax_periods"
            referencedColumns: ["id"]
          },
        ]
      }
      bookmarks: {
        Row: {
          article_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          article_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          article_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      bot_bookings: {
        Row: {
          bot_id: string
          cancellation_reason: string | null
          cancelled_at: string | null
          client_comment: string | null
          client_id: string | null
          client_name: string | null
          client_phone: string | null
          client_telegram: string | null
          completed_at: string | null
          created_at: string
          duration_minutes: number
          id: string
          metadata: Json | null
          owner_comment: string | null
          service_name: string
          service_price: number | null
          source: string
          starts_at: string
          status: string
          telegram_chat_id: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          bot_id: string
          cancellation_reason?: string | null
          cancelled_at?: string | null
          client_comment?: string | null
          client_id?: string | null
          client_name?: string | null
          client_phone?: string | null
          client_telegram?: string | null
          completed_at?: string | null
          created_at?: string
          duration_minutes?: number
          id?: string
          metadata?: Json | null
          owner_comment?: string | null
          service_name: string
          service_price?: number | null
          source?: string
          starts_at: string
          status?: string
          telegram_chat_id?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          bot_id?: string
          cancellation_reason?: string | null
          cancelled_at?: string | null
          client_comment?: string | null
          client_id?: string | null
          client_name?: string | null
          client_phone?: string | null
          client_telegram?: string | null
          completed_at?: string | null
          created_at?: string
          duration_minutes?: number
          id?: string
          metadata?: Json | null
          owner_comment?: string | null
          service_name?: string
          service_price?: number | null
          source?: string
          starts_at?: string
          status?: string
          telegram_chat_id?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bot_bookings_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "my_telegram_bots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bot_bookings_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "bot_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      bot_broadcast_recipients: {
        Row: {
          bot_id: string
          broadcast_id: string
          chat_id: number
          client_id: string | null
          created_at: string
          error: string | null
          id: string
          sent_at: string | null
          status: string
        }
        Insert: {
          bot_id: string
          broadcast_id: string
          chat_id: number
          client_id?: string | null
          created_at?: string
          error?: string | null
          id?: string
          sent_at?: string | null
          status?: string
        }
        Update: {
          bot_id?: string
          broadcast_id?: string
          chat_id?: number
          client_id?: string | null
          created_at?: string
          error?: string | null
          id?: string
          sent_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "bot_broadcast_recipients_broadcast_id_fkey"
            columns: ["broadcast_id"]
            isOneToOne: false
            referencedRelation: "bot_broadcasts"
            referencedColumns: ["id"]
          },
        ]
      }
      bot_broadcasts: {
        Row: {
          audience: string
          bot_id: string
          created_at: string
          failed_count: number
          id: string
          message: string
          scheduled_at: string | null
          sent_at: string | null
          sent_count: number
          status: string
          title: string
          total_recipients: number
          updated_at: string
          user_id: string
        }
        Insert: {
          audience?: string
          bot_id: string
          created_at?: string
          failed_count?: number
          id?: string
          message: string
          scheduled_at?: string | null
          sent_at?: string | null
          sent_count?: number
          status?: string
          title: string
          total_recipients?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          audience?: string
          bot_id?: string
          created_at?: string
          failed_count?: number
          id?: string
          message?: string
          scheduled_at?: string | null
          sent_at?: string | null
          sent_count?: number
          status?: string
          title?: string
          total_recipients?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bot_broadcasts_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "my_telegram_bots"
            referencedColumns: ["id"]
          },
        ]
      }
      bot_clients: {
        Row: {
          bot_id: string
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          last_interaction_at: string | null
          metadata: Json | null
          notes: string | null
          phone: string | null
          status: string
          tags: string[] | null
          telegram_chat_id: number | null
          telegram_username: string | null
          total_bookings: number
          total_revenue: number
          updated_at: string
          user_id: string
        }
        Insert: {
          bot_id: string
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          last_interaction_at?: string | null
          metadata?: Json | null
          notes?: string | null
          phone?: string | null
          status?: string
          tags?: string[] | null
          telegram_chat_id?: number | null
          telegram_username?: string | null
          total_bookings?: number
          total_revenue?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          bot_id?: string
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          last_interaction_at?: string | null
          metadata?: Json | null
          notes?: string | null
          phone?: string | null
          status?: string
          tags?: string[] | null
          telegram_chat_id?: number | null
          telegram_username?: string | null
          total_bookings?: number
          total_revenue?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bot_clients_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "my_telegram_bots"
            referencedColumns: ["id"]
          },
        ]
      }
      bot_coach_rules: {
        Row: {
          bot_id: string
          created_at: string
          id: string
          is_active: boolean
          priority: number
          rule: string
          updated_at: string
          user_id: string
        }
        Insert: {
          bot_id: string
          created_at?: string
          id?: string
          is_active?: boolean
          priority?: number
          rule: string
          updated_at?: string
          user_id: string
        }
        Update: {
          bot_id?: string
          created_at?: string
          id?: string
          is_active?: boolean
          priority?: number
          rule?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bot_coach_rules_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "my_telegram_bots"
            referencedColumns: ["id"]
          },
        ]
      }
      bot_nightly_analytics: {
        Row: {
          ai_insights: string | null
          ai_summary: string | null
          avg_response_time_ms: number | null
          bot_id: string
          conversion_funnel: Json
          created_at: string
          escalation_count: number
          id: string
          period_date: string
          quality_score: number | null
          recommendations: Json
          top_issues: Json
          total_conversations: number
          total_messages: number
          unique_users: number
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_insights?: string | null
          ai_summary?: string | null
          avg_response_time_ms?: number | null
          bot_id: string
          conversion_funnel?: Json
          created_at?: string
          escalation_count?: number
          id?: string
          period_date: string
          quality_score?: number | null
          recommendations?: Json
          top_issues?: Json
          total_conversations?: number
          total_messages?: number
          unique_users?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_insights?: string | null
          ai_summary?: string | null
          avg_response_time_ms?: number | null
          bot_id?: string
          conversion_funnel?: Json
          created_at?: string
          escalation_count?: number
          id?: string
          period_date?: string
          quality_score?: number | null
          recommendations?: Json
          top_issues?: Json
          total_conversations?: number
          total_messages?: number
          unique_users?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bot_nightly_analytics_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "my_telegram_bots"
            referencedColumns: ["id"]
          },
        ]
      }
      bot_schedule: {
        Row: {
          advance_booking_days: number
          bot_id: string
          buffer_minutes: number
          created_at: string
          id: string
          is_enabled: boolean
          lunch_break: Json | null
          min_notice_minutes: number
          services: Json | null
          slot_minutes: number
          timezone: string
          updated_at: string
          user_id: string
          working_hours: Json
        }
        Insert: {
          advance_booking_days?: number
          bot_id: string
          buffer_minutes?: number
          created_at?: string
          id?: string
          is_enabled?: boolean
          lunch_break?: Json | null
          min_notice_minutes?: number
          services?: Json | null
          slot_minutes?: number
          timezone?: string
          updated_at?: string
          user_id: string
          working_hours?: Json
        }
        Update: {
          advance_booking_days?: number
          bot_id?: string
          buffer_minutes?: number
          created_at?: string
          id?: string
          is_enabled?: boolean
          lunch_break?: Json | null
          min_notice_minutes?: number
          services?: Json | null
          slot_minutes?: number
          timezone?: string
          updated_at?: string
          user_id?: string
          working_hours?: Json
        }
        Relationships: [
          {
            foreignKeyName: "bot_schedule_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: true
            referencedRelation: "my_telegram_bots"
            referencedColumns: ["id"]
          },
        ]
      }
      categorization_rules: {
        Row: {
          category: string
          created_at: string | null
          id: string
          keyword: string
          transaction_type: string
          user_id: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          keyword: string
          transaction_type: string
          user_id?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          keyword?: string
          transaction_type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      chart_of_accounts: {
        Row: {
          account_type: string
          client_id: string | null
          code: string
          created_at: string
          id: string
          is_active: boolean
          is_system: boolean
          meta: Json
          name: string
          parent_code: string | null
          updated_at: string
        }
        Insert: {
          account_type: string
          client_id?: string | null
          code: string
          created_at?: string
          id?: string
          is_active?: boolean
          is_system?: boolean
          meta?: Json
          name: string
          parent_code?: string | null
          updated_at?: string
        }
        Update: {
          account_type?: string
          client_id?: string | null
          code?: string
          created_at?: string
          id?: string
          is_active?: boolean
          is_system?: boolean
          meta?: Json
          name?: string
          parent_code?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chart_of_accounts_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "accountant_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_feedback: {
        Row: {
          answer_text: string | null
          chat_id: string | null
          chat_type: string
          comment: string | null
          created_at: string
          id: string
          is_helpful: boolean
          message_id: string | null
          question_text: string | null
          reason: string | null
          user_id: string | null
        }
        Insert: {
          answer_text?: string | null
          chat_id?: string | null
          chat_type: string
          comment?: string | null
          created_at?: string
          id?: string
          is_helpful: boolean
          message_id?: string | null
          question_text?: string | null
          reason?: string | null
          user_id?: string | null
        }
        Update: {
          answer_text?: string | null
          chat_id?: string | null
          chat_type?: string
          comment?: string | null
          created_at?: string
          id?: string
          is_helpful?: boolean
          message_id?: string | null
          question_text?: string | null
          reason?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      client_activity_log: {
        Row: {
          accountant_id: string | null
          action_type: string
          client_id: string
          created_at: string | null
          description: string
          id: string
          metadata: Json | null
        }
        Insert: {
          accountant_id?: string | null
          action_type: string
          client_id: string
          created_at?: string | null
          description: string
          id?: string
          metadata?: Json | null
        }
        Update: {
          accountant_id?: string | null
          action_type?: string
          client_id?: string
          created_at?: string | null
          description?: string
          id?: string
          metadata?: Json | null
        }
        Relationships: []
      }
      client_portals: {
        Row: {
          accent_color: string | null
          acceptance_comment: string | null
          acceptance_rating: number | null
          accepted_at: string | null
          accepted_by_name: string | null
          brand_bg_color: string | null
          brand_font: string | null
          brand_footer_text: string | null
          brand_header_style: string | null
          brand_logo_url: string | null
          brand_name: string | null
          brand_secondary_color: string | null
          brand_text_color: string | null
          client_email: string | null
          client_name: string | null
          client_phone: string | null
          cover_emoji: string | null
          created_at: string
          features_enabled: Json
          id: string
          kaspi_phone: string | null
          kaspi_qr_url: string | null
          last_viewed_at: string | null
          owner_id: string
          owner_telegram_chat_id: string | null
          pin_code: string | null
          project_type: string | null
          public_token: string
          status: string
          task_brief: string | null
          title: string
          updated_at: string
          view_count: number
          welcome_message: string | null
        }
        Insert: {
          accent_color?: string | null
          acceptance_comment?: string | null
          acceptance_rating?: number | null
          accepted_at?: string | null
          accepted_by_name?: string | null
          brand_bg_color?: string | null
          brand_font?: string | null
          brand_footer_text?: string | null
          brand_header_style?: string | null
          brand_logo_url?: string | null
          brand_name?: string | null
          brand_secondary_color?: string | null
          brand_text_color?: string | null
          client_email?: string | null
          client_name?: string | null
          client_phone?: string | null
          cover_emoji?: string | null
          created_at?: string
          features_enabled?: Json
          id?: string
          kaspi_phone?: string | null
          kaspi_qr_url?: string | null
          last_viewed_at?: string | null
          owner_id: string
          owner_telegram_chat_id?: string | null
          pin_code?: string | null
          project_type?: string | null
          public_token?: string
          status?: string
          task_brief?: string | null
          title: string
          updated_at?: string
          view_count?: number
          welcome_message?: string | null
        }
        Update: {
          accent_color?: string | null
          acceptance_comment?: string | null
          acceptance_rating?: number | null
          accepted_at?: string | null
          accepted_by_name?: string | null
          brand_bg_color?: string | null
          brand_font?: string | null
          brand_footer_text?: string | null
          brand_header_style?: string | null
          brand_logo_url?: string | null
          brand_name?: string | null
          brand_secondary_color?: string | null
          brand_text_color?: string | null
          client_email?: string | null
          client_name?: string | null
          client_phone?: string | null
          cover_emoji?: string | null
          created_at?: string
          features_enabled?: Json
          id?: string
          kaspi_phone?: string | null
          kaspi_qr_url?: string | null
          last_viewed_at?: string | null
          owner_id?: string
          owner_telegram_chat_id?: string | null
          pin_code?: string | null
          project_type?: string | null
          public_token?: string
          status?: string
          task_brief?: string | null
          title?: string
          updated_at?: string
          view_count?: number
          welcome_message?: string | null
        }
        Relationships: []
      }
      commercial_documents: {
        Row: {
          category: string
          created_at: string
          description: string | null
          download_count: number | null
          file_name: string
          file_size: number
          file_type: string
          file_url: string
          id: string
          last_downloaded_at: string | null
          status: string
          subcategory: string | null
          tags: string[] | null
          title: string
          updated_at: string
          uploaded_by: string
          version: number
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          download_count?: number | null
          file_name: string
          file_size: number
          file_type: string
          file_url: string
          id?: string
          last_downloaded_at?: string | null
          status?: string
          subcategory?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
          uploaded_by: string
          version?: number
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          download_count?: number | null
          file_name?: string
          file_size?: number
          file_type?: string
          file_url?: string
          id?: string
          last_downloaded_at?: string | null
          status?: string
          subcategory?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          uploaded_by?: string
          version?: number
        }
        Relationships: []
      }
      community_chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          topic_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          topic_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          topic_id?: string
          user_id?: string
        }
        Relationships: []
      }
      community_experts: {
        Row: {
          category: string
          certificates: string[] | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
          subcategory: string | null
          updated_at: string
          whatsapp_url: string | null
        }
        Insert: {
          category: string
          certificates?: string[] | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          subcategory?: string | null
          updated_at?: string
          whatsapp_url?: string | null
        }
        Update: {
          category?: string
          certificates?: string[] | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          subcategory?: string | null
          updated_at?: string
          whatsapp_url?: string | null
        }
        Relationships: []
      }
      community_posts: {
        Row: {
          category: string
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          image_url: string | null
          title: string
        }
        Insert: {
          category: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          title: string
        }
        Update: {
          category?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          title?: string
        }
        Relationships: []
      }
      compliance_issues: {
        Row: {
          action_type: string | null
          action_url: string | null
          auto_resolved: boolean | null
          created_at: string | null
          description: string | null
          how_to_fix: string | null
          id: string
          is_auto_detected: boolean | null
          issue_category: string | null
          issue_type: string
          legal_reference: string | null
          period_id: string | null
          potential_fine_max: number | null
          potential_fine_min: number | null
          profile_id: string
          related_amount: number | null
          related_counterparty: string | null
          related_date: string | null
          related_document_id: string | null
          related_record_id: string | null
          resolution_note: string | null
          resolved_at: string | null
          risk_level: string
          status: string | null
          title: string
        }
        Insert: {
          action_type?: string | null
          action_url?: string | null
          auto_resolved?: boolean | null
          created_at?: string | null
          description?: string | null
          how_to_fix?: string | null
          id?: string
          is_auto_detected?: boolean | null
          issue_category?: string | null
          issue_type: string
          legal_reference?: string | null
          period_id?: string | null
          potential_fine_max?: number | null
          potential_fine_min?: number | null
          profile_id: string
          related_amount?: number | null
          related_counterparty?: string | null
          related_date?: string | null
          related_document_id?: string | null
          related_record_id?: string | null
          resolution_note?: string | null
          resolved_at?: string | null
          risk_level: string
          status?: string | null
          title: string
        }
        Update: {
          action_type?: string | null
          action_url?: string | null
          auto_resolved?: boolean | null
          created_at?: string | null
          description?: string | null
          how_to_fix?: string | null
          id?: string
          is_auto_detected?: boolean | null
          issue_category?: string | null
          issue_type?: string
          legal_reference?: string | null
          period_id?: string | null
          potential_fine_max?: number | null
          potential_fine_min?: number | null
          profile_id?: string
          related_amount?: number | null
          related_counterparty?: string | null
          related_date?: string | null
          related_document_id?: string | null
          related_record_id?: string | null
          resolution_note?: string | null
          resolved_at?: string | null
          risk_level?: string
          status?: string | null
          title?: string
        }
        Relationships: []
      }
      content_interactions: {
        Row: {
          content_id: string
          content_type: string
          created_at: string
          duration_seconds: number | null
          id: string
          interaction_type: string
          scroll_percentage: number | null
          session_id: string
          user_id: string | null
        }
        Insert: {
          content_id: string
          content_type: string
          created_at?: string
          duration_seconds?: number | null
          id?: string
          interaction_type: string
          scroll_percentage?: number | null
          session_id: string
          user_id?: string | null
        }
        Update: {
          content_id?: string
          content_type?: string
          created_at?: string
          duration_seconds?: number | null
          id?: string
          interaction_type?: string
          scroll_percentage?: number | null
          session_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      conversions: {
        Row: {
          conversion_type: string
          conversion_value: number | null
          created_at: string
          id: string
          session_id: string
          source_page: string | null
          user_id: string | null
        }
        Insert: {
          conversion_type: string
          conversion_value?: number | null
          created_at?: string
          id?: string
          session_id: string
          source_page?: string | null
          user_id?: string | null
        }
        Update: {
          conversion_type?: string
          conversion_value?: number | null
          created_at?: string
          id?: string
          session_id?: string
          source_page?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      cookie_consents: {
        Row: {
          analytics_consent: boolean
          consent_given: boolean
          consent_version: string | null
          created_at: string
          functional_consent: boolean
          id: string
          ip_hash: string | null
          marketing_consent: boolean
          revoked_at: string | null
          session_id: string
          updated_at: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          analytics_consent?: boolean
          consent_given?: boolean
          consent_version?: string | null
          created_at?: string
          functional_consent?: boolean
          id?: string
          ip_hash?: string | null
          marketing_consent?: boolean
          revoked_at?: string | null
          session_id: string
          updated_at?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          analytics_consent?: boolean
          consent_given?: boolean
          consent_version?: string | null
          created_at?: string
          functional_consent?: boolean
          id?: string
          ip_hash?: string | null
          marketing_consent?: boolean
          revoked_at?: string | null
          session_id?: string
          updated_at?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      counterparties: {
        Row: {
          bin_iin: string | null
          created_at: string | null
          id: string
          name: string
          onec_uid: string | null
          type: string | null
          user_id: string
        }
        Insert: {
          bin_iin?: string | null
          created_at?: string | null
          id?: string
          name: string
          onec_uid?: string | null
          type?: string | null
          user_id?: string
        }
        Update: {
          bin_iin?: string | null
          created_at?: string | null
          id?: string
          name?: string
          onec_uid?: string | null
          type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      counterparty_checks: {
        Row: {
          bin: string
          checked_at: string
          company_name: string | null
          created_at: string
          id: string
          is_inactive: boolean | null
          is_pseudo: boolean | null
          result: Json | null
          risk_level: string
          tax_debt: number | null
        }
        Insert: {
          bin: string
          checked_at?: string
          company_name?: string | null
          created_at?: string
          id?: string
          is_inactive?: boolean | null
          is_pseudo?: boolean | null
          result?: Json | null
          risk_level?: string
          tax_debt?: number | null
        }
        Update: {
          bin?: string
          checked_at?: string
          company_name?: string | null
          created_at?: string
          id?: string
          is_inactive?: boolean | null
          is_pseudo?: boolean | null
          result?: Json | null
          risk_level?: string
          tax_debt?: number | null
        }
        Relationships: []
      }
      course_lesson_chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          lesson_slug: string
          sender_name: string
          sender_type: string
          sender_user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          lesson_slug: string
          sender_name: string
          sender_type: string
          sender_user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          lesson_slug?: string
          sender_name?: string
          sender_type?: string
          sender_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_lesson_chat_messages_sender_user_id_fkey"
            columns: ["sender_user_id"]
            isOneToOne: false
            referencedRelation: "course_users"
            referencedColumns: ["id"]
          },
        ]
      }
      course_sessions: {
        Row: {
          created_at: string
          expires_at: string
          token: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at: string
          token: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          token?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "course_users"
            referencedColumns: ["id"]
          },
        ]
      }
      course_streams: {
        Row: {
          recording_url: string | null
          slug: string
          stream_status: string
          stream_url: string | null
          updated_at: string
        }
        Insert: {
          recording_url?: string | null
          slug: string
          stream_status?: string
          stream_url?: string | null
          updated_at?: string
        }
        Update: {
          recording_url?: string | null
          slug?: string
          stream_status?: string
          stream_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      course_users: {
        Row: {
          created_at: string
          has_access: boolean
          id: string
          login: string
          name: string
          password_hash: string
          status: string
          subscription_until: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          has_access?: boolean
          id?: string
          login: string
          name: string
          password_hash: string
          status?: string
          subscription_until?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          has_access?: boolean
          id?: string
          login?: string
          name?: string
          password_hash?: string
          status?: string
          subscription_until?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          category: string
          created_at: string | null
          created_by: string | null
          description: string | null
          duration: string | null
          id: string
          image: string | null
          lessons: number | null
          level: string | null
          title: string
        }
        Insert: {
          category: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          image?: string | null
          lessons?: number | null
          level?: string | null
          title: string
        }
        Update: {
          category?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          image?: string | null
          lessons?: number | null
          level?: string | null
          title?: string
        }
        Relationships: []
      }
      dashboard_transactions: {
        Row: {
          amount: number
          category: string
          created_at: string
          description: string | null
          id: string
          is_personal: boolean
          onec_uid: string | null
          source: string | null
          transaction_date: string
          type: string
          user_id: string
        }
        Insert: {
          amount: number
          category: string
          created_at?: string
          description?: string | null
          id?: string
          is_personal?: boolean
          onec_uid?: string | null
          source?: string | null
          transaction_date?: string
          type: string
          user_id: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          is_personal?: boolean
          onec_uid?: string | null
          source?: string | null
          transaction_date?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      document_access_logs: {
        Row: {
          action: string
          created_at: string
          document_id: string
          id: string
          ip_address: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          document_id: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          document_id?: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_access_logs_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "financial_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      document_comments: {
        Row: {
          comment: string
          created_at: string
          document_id: string
          id: string
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          comment: string
          created_at?: string
          document_id: string
          id?: string
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          comment?: string
          created_at?: string
          document_id?: string
          id?: string
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_comments_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "technical_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      document_operation_links: {
        Row: {
          confidence_score: number | null
          confirmed_at: string | null
          created_at: string | null
          document_id: string
          id: string
          is_confirmed: boolean | null
          link_type: string | null
          matched_fields: Json | null
          operation_id: string
        }
        Insert: {
          confidence_score?: number | null
          confirmed_at?: string | null
          created_at?: string | null
          document_id: string
          id?: string
          is_confirmed?: boolean | null
          link_type?: string | null
          matched_fields?: Json | null
          operation_id: string
        }
        Update: {
          confidence_score?: number | null
          confirmed_at?: string | null
          created_at?: string | null
          document_id?: string
          id?: string
          is_confirmed?: boolean | null
          link_type?: string | null
          matched_fields?: Json | null
          operation_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_operation_links_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "tax_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_operation_links_operation_id_fkey"
            columns: ["operation_id"]
            isOneToOne: false
            referencedRelation: "income_expense_records"
            referencedColumns: ["id"]
          },
        ]
      }
      document_requests: {
        Row: {
          accountant_id: string | null
          client_id: string
          created_at: string
          document_id: string | null
          fulfilled_at: string | null
          id: string
          message: string
          request_items: Json | null
          share_token: string | null
          status: string
        }
        Insert: {
          accountant_id?: string | null
          client_id: string
          created_at?: string
          document_id?: string | null
          fulfilled_at?: string | null
          id?: string
          message: string
          request_items?: Json | null
          share_token?: string | null
          status?: string
        }
        Update: {
          accountant_id?: string | null
          client_id?: string
          created_at?: string
          document_id?: string | null
          fulfilled_at?: string | null
          id?: string
          message?: string
          request_items?: Json | null
          share_token?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_requests_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "user_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      document_versions: {
        Row: {
          changelog: string | null
          created_at: string
          created_by: string
          document_id: string
          file_name: string
          file_url: string
          id: string
          version_number: number
        }
        Insert: {
          changelog?: string | null
          created_at?: string
          created_by: string
          document_id: string
          file_name: string
          file_url: string
          id?: string
          version_number: number
        }
        Update: {
          changelog?: string | null
          created_at?: string
          created_by?: string
          document_id?: string
          file_name?: string
          file_url?: string
          id?: string
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "document_versions_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "technical_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          category: string
          created_at: string | null
          created_by: string | null
          description: string | null
          file_name: string | null
          file_size: number | null
          file_type: string | null
          file_url: string | null
          id: string
          title: string
        }
        Insert: {
          category: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          file_name?: string | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          title: string
        }
        Update: {
          category?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          file_name?: string | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      documents_signatures: {
        Row: {
          certificate_issuer: string | null
          certificate_valid_until: string | null
          created_at: string | null
          document_data: Json | null
          document_hash: string | null
          document_id: string | null
          document_type: string | null
          ecp_signature: string | null
          ecp_signed_at: string | null
          expires_at: string | null
          id: string
          message: string | null
          otp_code: string | null
          otp_phone: string | null
          otp_sent_at: string | null
          otp_verified_at: string | null
          recipient_company: string | null
          recipient_contact: string | null
          recipient_face_photo_url: string | null
          recipient_name: string | null
          recipient_signature_url: string | null
          rejection_reason: string | null
          sender_ip: string | null
          sender_user_agent: string | null
          signature_type: string | null
          signed_at: string | null
          signed_pdf_url: string | null
          signer_device_info: Json | null
          signer_iin: string | null
          signer_ip: string | null
          signer_name_from_cert: string | null
          signer_user_agent: string | null
          status: string | null
          token: string
          user_id: string
          viewed_at: string | null
        }
        Insert: {
          certificate_issuer?: string | null
          certificate_valid_until?: string | null
          created_at?: string | null
          document_data?: Json | null
          document_hash?: string | null
          document_id?: string | null
          document_type?: string | null
          ecp_signature?: string | null
          ecp_signed_at?: string | null
          expires_at?: string | null
          id?: string
          message?: string | null
          otp_code?: string | null
          otp_phone?: string | null
          otp_sent_at?: string | null
          otp_verified_at?: string | null
          recipient_company?: string | null
          recipient_contact?: string | null
          recipient_face_photo_url?: string | null
          recipient_name?: string | null
          recipient_signature_url?: string | null
          rejection_reason?: string | null
          sender_ip?: string | null
          sender_user_agent?: string | null
          signature_type?: string | null
          signed_at?: string | null
          signed_pdf_url?: string | null
          signer_device_info?: Json | null
          signer_iin?: string | null
          signer_ip?: string | null
          signer_name_from_cert?: string | null
          signer_user_agent?: string | null
          status?: string | null
          token: string
          user_id?: string
          viewed_at?: string | null
        }
        Update: {
          certificate_issuer?: string | null
          certificate_valid_until?: string | null
          created_at?: string | null
          document_data?: Json | null
          document_hash?: string | null
          document_id?: string | null
          document_type?: string | null
          ecp_signature?: string | null
          ecp_signed_at?: string | null
          expires_at?: string | null
          id?: string
          message?: string | null
          otp_code?: string | null
          otp_phone?: string | null
          otp_sent_at?: string | null
          otp_verified_at?: string | null
          recipient_company?: string | null
          recipient_contact?: string | null
          recipient_face_photo_url?: string | null
          recipient_name?: string | null
          recipient_signature_url?: string | null
          rejection_reason?: string | null
          sender_ip?: string | null
          sender_user_agent?: string | null
          signature_type?: string | null
          signed_at?: string | null
          signed_pdf_url?: string | null
          signer_device_info?: Json | null
          signer_iin?: string | null
          signer_ip?: string | null
          signer_name_from_cert?: string | null
          signer_user_agent?: string | null
          status?: string | null
          token?: string
          user_id?: string
          viewed_at?: string | null
        }
        Relationships: []
      }
      ecp_signatures: {
        Row: {
          certificate_issuer: string | null
          certificate_valid_until: string | null
          cms_signature: string
          document_hash: string | null
          document_id: string | null
          document_title: string | null
          document_type: string
          id: string
          signed_at: string
          signer_iin: string | null
          signer_ip: string | null
          signer_name: string | null
          user_id: string
        }
        Insert: {
          certificate_issuer?: string | null
          certificate_valid_until?: string | null
          cms_signature: string
          document_hash?: string | null
          document_id?: string | null
          document_title?: string | null
          document_type: string
          id?: string
          signed_at?: string
          signer_iin?: string | null
          signer_ip?: string | null
          signer_name?: string | null
          user_id: string
        }
        Update: {
          certificate_issuer?: string | null
          certificate_valid_until?: string | null
          cms_signature?: string
          document_hash?: string | null
          document_id?: string | null
          document_title?: string | null
          document_type?: string
          id?: string
          signed_at?: string
          signer_iin?: string | null
          signer_ip?: string | null
          signer_name?: string | null
          user_id?: string
        }
        Relationships: []
      }
      employees: {
        Row: {
          created_at: string
          full_name: string
          hire_date: string | null
          id: string
          iin: string | null
          is_active: boolean
          onec_uid: string | null
          position: string | null
          salary_gross: number
          user_id: string
        }
        Insert: {
          created_at?: string
          full_name: string
          hire_date?: string | null
          id?: string
          iin?: string | null
          is_active?: boolean
          onec_uid?: string | null
          position?: string | null
          salary_gross?: number
          user_id?: string
        }
        Update: {
          created_at?: string
          full_name?: string
          hire_date?: string | null
          id?: string
          iin?: string | null
          is_active?: boolean
          onec_uid?: string | null
          position?: string | null
          salary_gross?: number
          user_id?: string
        }
        Relationships: []
      }
      esf_registry: {
        Row: {
          amount_total: number
          amount_without_vat: number
          client_id: string
          counterparty_bin: string | null
          counterparty_name: string | null
          created_at: string
          direction: string
          esf_date: string
          esf_number: string | null
          id: string
          linked_ledger_entry: string | null
          meta: Json
          period: string
          source_document_id: string | null
          status: string
          updated_at: string
          vat_amount: number
        }
        Insert: {
          amount_total?: number
          amount_without_vat?: number
          client_id: string
          counterparty_bin?: string | null
          counterparty_name?: string | null
          created_at?: string
          direction: string
          esf_date: string
          esf_number?: string | null
          id?: string
          linked_ledger_entry?: string | null
          meta?: Json
          period: string
          source_document_id?: string | null
          status?: string
          updated_at?: string
          vat_amount?: number
        }
        Update: {
          amount_total?: number
          amount_without_vat?: number
          client_id?: string
          counterparty_bin?: string | null
          counterparty_name?: string | null
          created_at?: string
          direction?: string
          esf_date?: string
          esf_number?: string | null
          id?: string
          linked_ledger_entry?: string | null
          meta?: Json
          period?: string
          source_document_id?: string | null
          status?: string
          updated_at?: string
          vat_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "esf_registry_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "accountant_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      experts: {
        Row: {
          certificates: string[] | null
          created_at: string | null
          created_by: string | null
          description: string | null
          experience: number | null
          id: string
          image_url: string | null
          main_category: string | null
          name: string
          specialization: string | null
          subcategory: string | null
          updated_at: string | null
          whatsapp_url: string | null
        }
        Insert: {
          certificates?: string[] | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          experience?: number | null
          id?: string
          image_url?: string | null
          main_category?: string | null
          name: string
          specialization?: string | null
          subcategory?: string | null
          updated_at?: string | null
          whatsapp_url?: string | null
        }
        Update: {
          certificates?: string[] | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          experience?: number | null
          id?: string
          image_url?: string | null
          main_category?: string | null
          name?: string
          specialization?: string | null
          subcategory?: string | null
          updated_at?: string | null
          whatsapp_url?: string | null
        }
        Relationships: []
      }
      featured_items: {
        Row: {
          created_at: string
          created_by: string | null
          featured: boolean
          id: string
          item_id: string
          item_type: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          featured?: boolean
          id?: string
          item_id: string
          item_type: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          featured?: boolean
          id?: string
          item_id?: string
          item_type?: string
        }
        Relationships: []
      }
      file_transfer_comments: {
        Row: {
          comment_text: string
          comment_type: string
          created_at: string
          id: string
          transfer_id: string
          user_id: string
        }
        Insert: {
          comment_text: string
          comment_type?: string
          created_at?: string
          id?: string
          transfer_id: string
          user_id: string
        }
        Update: {
          comment_text?: string
          comment_type?: string
          created_at?: string
          id?: string
          transfer_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "file_transfer_comments_transfer_id_fkey"
            columns: ["transfer_id"]
            isOneToOne: false
            referencedRelation: "interdepartment_file_transfers"
            referencedColumns: ["id"]
          },
        ]
      }
      file_transfer_notifications: {
        Row: {
          created_at: string
          id: string
          is_email_sent: boolean | null
          is_read: boolean | null
          message: string
          notification_type: string
          read_at: string | null
          recipient_id: string
          title: string
          transfer_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_email_sent?: boolean | null
          is_read?: boolean | null
          message: string
          notification_type: string
          read_at?: string | null
          recipient_id: string
          title: string
          transfer_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_email_sent?: boolean | null
          is_read?: boolean | null
          message?: string
          notification_type?: string
          read_at?: string | null
          recipient_id?: string
          title?: string
          transfer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "file_transfer_notifications_transfer_id_fkey"
            columns: ["transfer_id"]
            isOneToOne: false
            referencedRelation: "interdepartment_file_transfers"
            referencedColumns: ["id"]
          },
        ]
      }
      file_transfers: {
        Row: {
          comment: string | null
          created_at: string
          file_id: string | null
          file_name: string
          file_size: number
          file_url: string
          id: string
          is_read: boolean
          recipient_department: string
          sender_department: string
          sent_date: string
          status: string
          updated_at: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          file_id?: string | null
          file_name: string
          file_size: number
          file_url: string
          id?: string
          is_read?: boolean
          recipient_department: string
          sender_department: string
          sent_date?: string
          status?: string
          updated_at?: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          file_id?: string | null
          file_name?: string
          file_size?: number
          file_url?: string
          id?: string
          is_read?: boolean
          recipient_department?: string
          sender_department?: string
          sent_date?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      files: {
        Row: {
          category_id: string
          created_at: string | null
          department: string
          file_name: string
          file_size: number
          file_type: string
          file_url: string | null
          id: string
          storage_path: string | null
          updated_at: string | null
          uploaded_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          category_id: string
          created_at?: string | null
          department: string
          file_name: string
          file_size: number
          file_type: string
          file_url?: string | null
          id?: string
          storage_path?: string | null
          updated_at?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          category_id?: string
          created_at?: string | null
          department?: string
          file_name?: string
          file_size?: number
          file_type?: string
          file_url?: string | null
          id?: string
          storage_path?: string | null
          updated_at?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Relationships: []
      }
      financial_documents: {
        Row: {
          category: string
          created_at: string
          description: string | null
          download_count: number | null
          file_name: string
          file_size: number
          file_type: string
          file_url: string
          id: string
          last_downloaded_at: string | null
          status: string
          subcategory: string | null
          tags: string[] | null
          title: string
          updated_at: string
          uploaded_by: string
          version: number
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          download_count?: number | null
          file_name: string
          file_size: number
          file_type: string
          file_url: string
          id?: string
          last_downloaded_at?: string | null
          status?: string
          subcategory?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
          uploaded_by: string
          version?: number
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          download_count?: number | null
          file_name?: string
          file_size?: number
          file_type?: string
          file_url?: string
          id?: string
          last_downloaded_at?: string | null
          status?: string
          subcategory?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          uploaded_by?: string
          version?: number
        }
        Relationships: []
      }
      firm_ledger_entries: {
        Row: {
          amount: number
          client_id: string | null
          created_at: string
          currency: string
          description: string | null
          entry_date: string
          id: string
          is_expense: boolean
          is_income: boolean
          meta: Json
          owner_id: string
          period: string
          reversed_at: string | null
          source_id: string | null
          source_type: string
          updated_at: string
        }
        Insert: {
          amount: number
          client_id?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          entry_date: string
          id?: string
          is_expense?: boolean
          is_income?: boolean
          meta?: Json
          owner_id: string
          period: string
          reversed_at?: string | null
          source_id?: string | null
          source_type: string
          updated_at?: string
        }
        Update: {
          amount?: number
          client_id?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          entry_date?: string
          id?: string
          is_expense?: boolean
          is_income?: boolean
          meta?: Json
          owner_id?: string
          period?: string
          reversed_at?: string | null
          source_id?: string | null
          source_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "firm_ledger_entries_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "accountant_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      firm_service_invoices: {
        Row: {
          amount: number
          client_id: string | null
          client_name: string
          created_at: string
          currency: string
          due_date: string | null
          id: string
          invoice_number: string
          issue_date: string
          line_items: Json | null
          notes: string | null
          owner_id: string
          paid_at: string | null
          period_label: string | null
          status: string
          updated_at: string
        }
        Insert: {
          amount?: number
          client_id?: string | null
          client_name: string
          created_at?: string
          currency?: string
          due_date?: string | null
          id?: string
          invoice_number: string
          issue_date?: string
          line_items?: Json | null
          notes?: string | null
          owner_id: string
          paid_at?: string | null
          period_label?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          client_id?: string | null
          client_name?: string
          created_at?: string
          currency?: string
          due_date?: string | null
          id?: string
          invoice_number?: string
          issue_date?: string
          line_items?: Json | null
          notes?: string | null
          owner_id?: string
          paid_at?: string | null
          period_label?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      forum_registrations: {
        Row: {
          city: string
          comment: string | null
          created_at: string
          email: string
          email_confirmation: boolean | null
          full_name: string
          id: string
          phone: string | null
          position: string | null
          source: string | null
          telegram_chat_id: number | null
          telegram_username: string | null
        }
        Insert: {
          city: string
          comment?: string | null
          created_at?: string
          email: string
          email_confirmation?: boolean | null
          full_name: string
          id?: string
          phone?: string | null
          position?: string | null
          source?: string | null
          telegram_chat_id?: number | null
          telegram_username?: string | null
        }
        Update: {
          city?: string
          comment?: string | null
          created_at?: string
          email?: string
          email_confirmation?: boolean | null
          full_name?: string
          id?: string
          phone?: string | null
          position?: string | null
          source?: string | null
          telegram_chat_id?: number | null
          telegram_username?: string | null
        }
        Relationships: []
      }
      fresh_community_experts: {
        Row: {
          category: string
          certificates: string[] | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
          subcategory: string | null
          updated_at: string
          whatsapp_url: string | null
        }
        Insert: {
          category?: string
          certificates?: string[] | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          subcategory?: string | null
          updated_at?: string
          whatsapp_url?: string | null
        }
        Update: {
          category?: string
          certificates?: string[] | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          subcategory?: string | null
          updated_at?: string
          whatsapp_url?: string | null
        }
        Relationships: []
      }
      fresh_community_posts: {
        Row: {
          category: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          image_url: string | null
          members: number | null
          title: string
        }
        Insert: {
          category: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          members?: number | null
          title: string
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          members?: number | null
          title?: string
        }
        Relationships: []
      }
      generated_documents: {
        Row: {
          client_name: string
          created_at: string
          doc_data: Json
          doc_number: string
          doc_type: string
          id: string
          total_amount: number
          user_id: string
        }
        Insert: {
          client_name?: string
          created_at?: string
          doc_data?: Json
          doc_number: string
          doc_type: string
          id?: string
          total_amount?: number
          user_id?: string
        }
        Update: {
          client_name?: string
          created_at?: string
          doc_data?: Json
          doc_number?: string
          doc_type?: string
          id?: string
          total_amount?: number
          user_id?: string
        }
        Relationships: []
      }
      generated_posts: {
        Row: {
          color_scheme: string
          created_at: string
          created_by: string
          id: string
          logo_position: string
          original_text: string
          slides_data: Json
          text_size: string
          title: string
          updated_at: string
        }
        Insert: {
          color_scheme?: string
          created_at?: string
          created_by: string
          id?: string
          logo_position?: string
          original_text: string
          slides_data?: Json
          text_size?: string
          title: string
          updated_at?: string
        }
        Update: {
          color_scheme?: string
          created_at?: string
          created_by?: string
          id?: string
          logo_position?: string
          original_text?: string
          slides_data?: Json
          text_size?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      ig_brand_profiles: {
        Row: {
          accent_color: string | null
          audience: string | null
          brand_name: string | null
          created_at: string | null
          description: string | null
          font_style: string | null
          hashtags: string[] | null
          id: string
          industry: string | null
          primary_color: string | null
          secondary_color: string | null
          tone: string | null
          updated_at: string | null
          user_id: string
          visual_style: string | null
        }
        Insert: {
          accent_color?: string | null
          audience?: string | null
          brand_name?: string | null
          created_at?: string | null
          description?: string | null
          font_style?: string | null
          hashtags?: string[] | null
          id?: string
          industry?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          tone?: string | null
          updated_at?: string | null
          user_id: string
          visual_style?: string | null
        }
        Update: {
          accent_color?: string | null
          audience?: string | null
          brand_name?: string | null
          created_at?: string | null
          description?: string | null
          font_style?: string | null
          hashtags?: string[] | null
          id?: string
          industry?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          tone?: string | null
          updated_at?: string | null
          user_id?: string
          visual_style?: string | null
        }
        Relationships: []
      }
      ig_posts: {
        Row: {
          caption: string | null
          created_at: string | null
          hashtags: string[] | null
          id: string
          slides: Json | null
          status: string | null
          template: string | null
          topic: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          hashtags?: string[] | null
          id?: string
          slides?: Json | null
          status?: string | null
          template?: string | null
          topic: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          hashtags?: string[] | null
          id?: string
          slides?: Json | null
          status?: string | null
          template?: string | null
          topic?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      imported_documents: {
        Row: {
          column_mapping: Json | null
          created_at: string
          document_type: string
          error_message: string | null
          extracted_data: Json | null
          file_name: string
          file_type: string
          file_url: string | null
          id: string
          records_count: number | null
          status: string
          total_amount: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          column_mapping?: Json | null
          created_at?: string
          document_type?: string
          error_message?: string | null
          extracted_data?: Json | null
          file_name: string
          file_type: string
          file_url?: string | null
          id?: string
          records_count?: number | null
          status?: string
          total_amount?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          column_mapping?: Json | null
          created_at?: string
          document_type?: string
          error_message?: string | null
          extracted_data?: Json | null
          file_name?: string
          file_type?: string
          file_url?: string | null
          id?: string
          records_count?: number | null
          status?: string
          total_amount?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      income_expense_records: {
        Row: {
          ai_category_suggestion: string | null
          ai_confidence: number | null
          ai_flags: string[] | null
          amount: number
          category: string | null
          counterparty_bin: string | null
          counterparty_name: string | null
          counterparty_type: string | null
          created_at: string | null
          currency: string | null
          description: string | null
          has_invoice: boolean | null
          has_payment_document: boolean | null
          has_primary_document: boolean | null
          id: string
          is_recurring: boolean | null
          linked_document_ids: string[] | null
          notes: string | null
          operation_date: string
          original_data: Json | null
          period_id: string | null
          profile_id: string
          purpose_of_payment: string | null
          record_type: string
          source_document_id: string | null
          source_type: string | null
          subcategory: string | null
          tags: string[] | null
          tax_relevant: boolean | null
          updated_at: string | null
          vat_amount: number | null
          vat_included: boolean | null
          verification_issues: string[] | null
          verification_status: string | null
        }
        Insert: {
          ai_category_suggestion?: string | null
          ai_confidence?: number | null
          ai_flags?: string[] | null
          amount: number
          category?: string | null
          counterparty_bin?: string | null
          counterparty_name?: string | null
          counterparty_type?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          has_invoice?: boolean | null
          has_payment_document?: boolean | null
          has_primary_document?: boolean | null
          id?: string
          is_recurring?: boolean | null
          linked_document_ids?: string[] | null
          notes?: string | null
          operation_date: string
          original_data?: Json | null
          period_id?: string | null
          profile_id: string
          purpose_of_payment?: string | null
          record_type: string
          source_document_id?: string | null
          source_type?: string | null
          subcategory?: string | null
          tags?: string[] | null
          tax_relevant?: boolean | null
          updated_at?: string | null
          vat_amount?: number | null
          vat_included?: boolean | null
          verification_issues?: string[] | null
          verification_status?: string | null
        }
        Update: {
          ai_category_suggestion?: string | null
          ai_confidence?: number | null
          ai_flags?: string[] | null
          amount?: number
          category?: string | null
          counterparty_bin?: string | null
          counterparty_name?: string | null
          counterparty_type?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          has_invoice?: boolean | null
          has_payment_document?: boolean | null
          has_primary_document?: boolean | null
          id?: string
          is_recurring?: boolean | null
          linked_document_ids?: string[] | null
          notes?: string | null
          operation_date?: string
          original_data?: Json | null
          period_id?: string | null
          profile_id?: string
          purpose_of_payment?: string | null
          record_type?: string
          source_document_id?: string | null
          source_type?: string | null
          subcategory?: string | null
          tags?: string[] | null
          tax_relevant?: boolean | null
          updated_at?: string | null
          vat_amount?: number | null
          vat_included?: boolean | null
          verification_issues?: string[] | null
          verification_status?: string | null
        }
        Relationships: []
      }
      interdepartment_comments: {
        Row: {
          comment_text: string
          comment_type: string | null
          created_at: string | null
          department: string
          document_id: string
          id: string
          is_read: boolean | null
          mentioned_users: string[] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          comment_text: string
          comment_type?: string | null
          created_at?: string | null
          department: string
          document_id: string
          id?: string
          is_read?: boolean | null
          mentioned_users?: string[] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          comment_text?: string
          comment_type?: string | null
          created_at?: string | null
          department?: string
          document_id?: string
          id?: string
          is_read?: boolean | null
          mentioned_users?: string[] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "interdepartment_comments_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "interdepartment_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      interdepartment_documents: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          created_at: string | null
          description: string | null
          document_type: string
          due_date: string | null
          file_name: string | null
          file_size: number | null
          file_type: string | null
          file_url: string | null
          id: string
          is_collaborative: boolean | null
          parent_document_id: string | null
          priority: string
          receiver_department: string
          sender_department: string
          sender_id: string | null
          status: string
          title: string
          updated_at: string | null
          version: number | null
          workflow_stage: string | null
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          document_type: string
          due_date?: string | null
          file_name?: string | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          is_collaborative?: boolean | null
          parent_document_id?: string | null
          priority?: string
          receiver_department: string
          sender_department: string
          sender_id?: string | null
          status?: string
          title: string
          updated_at?: string | null
          version?: number | null
          workflow_stage?: string | null
        }
        Update: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          document_type?: string
          due_date?: string | null
          file_name?: string | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          is_collaborative?: boolean | null
          parent_document_id?: string | null
          priority?: string
          receiver_department?: string
          sender_department?: string
          sender_id?: string | null
          status?: string
          title?: string
          updated_at?: string | null
          version?: number | null
          workflow_stage?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interdepartment_documents_parent_document_id_fkey"
            columns: ["parent_document_id"]
            isOneToOne: false
            referencedRelation: "interdepartment_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      interdepartment_file_transfers: {
        Row: {
          created_at: string
          deadline: string | null
          delivered_at: string | null
          file_name: string
          file_size: number
          file_type: string
          file_url: string
          id: string
          is_group_send: boolean | null
          message: string | null
          parent_transfer_id: string | null
          priority: string
          processed_at: string | null
          recalled_at: string | null
          receiver_department: string
          receiver_id: string | null
          sender_department: string
          sender_id: string | null
          status: string
          transfer_chain: Json | null
          viewed_at: string | null
        }
        Insert: {
          created_at?: string
          deadline?: string | null
          delivered_at?: string | null
          file_name: string
          file_size: number
          file_type: string
          file_url: string
          id?: string
          is_group_send?: boolean | null
          message?: string | null
          parent_transfer_id?: string | null
          priority?: string
          processed_at?: string | null
          recalled_at?: string | null
          receiver_department: string
          receiver_id?: string | null
          sender_department: string
          sender_id?: string | null
          status?: string
          transfer_chain?: Json | null
          viewed_at?: string | null
        }
        Update: {
          created_at?: string
          deadline?: string | null
          delivered_at?: string | null
          file_name?: string
          file_size?: number
          file_type?: string
          file_url?: string
          id?: string
          is_group_send?: boolean | null
          message?: string | null
          parent_transfer_id?: string | null
          priority?: string
          processed_at?: string | null
          recalled_at?: string | null
          receiver_department?: string
          receiver_id?: string | null
          sender_department?: string
          sender_id?: string | null
          status?: string
          transfer_chain?: Json | null
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interdepartment_file_transfers_parent_transfer_id_fkey"
            columns: ["parent_transfer_id"]
            isOneToOne: false
            referencedRelation: "interdepartment_file_transfers"
            referencedColumns: ["id"]
          },
        ]
      }
      interdepartment_notifications: {
        Row: {
          created_at: string | null
          document_id: string | null
          id: string
          is_email_sent: boolean | null
          is_read: boolean | null
          message: string
          notification_type: string
          priority: string | null
          read_at: string | null
          recipient_id: string
          sender_id: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          document_id?: string | null
          id?: string
          is_email_sent?: boolean | null
          is_read?: boolean | null
          message: string
          notification_type: string
          priority?: string | null
          read_at?: string | null
          recipient_id: string
          sender_id?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          document_id?: string | null
          id?: string
          is_email_sent?: boolean | null
          is_read?: boolean | null
          message?: string
          notification_type?: string
          priority?: string | null
          read_at?: string | null
          recipient_id?: string
          sender_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "interdepartment_notifications_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "interdepartment_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      interdepartment_routing_rules: {
        Row: {
          auto_assign_to: string | null
          auto_route_to: string[]
          created_at: string | null
          created_by: string | null
          document_type: string
          due_date_days: number | null
          id: string
          is_active: boolean | null
          priority_override: string | null
          rule_name: string
          sender_department: string
        }
        Insert: {
          auto_assign_to?: string | null
          auto_route_to: string[]
          created_at?: string | null
          created_by?: string | null
          document_type: string
          due_date_days?: number | null
          id?: string
          is_active?: boolean | null
          priority_override?: string | null
          rule_name: string
          sender_department: string
        }
        Update: {
          auto_assign_to?: string | null
          auto_route_to?: string[]
          created_at?: string | null
          created_by?: string | null
          document_type?: string
          due_date_days?: number | null
          id?: string
          is_active?: boolean | null
          priority_override?: string | null
          rule_name?: string
          sender_department?: string
        }
        Relationships: []
      }
      interdepartment_status_history: {
        Row: {
          change_reason: string | null
          created_at: string | null
          department: string
          document_id: string
          id: string
          new_status: string
          previous_status: string | null
          user_id: string
        }
        Insert: {
          change_reason?: string | null
          created_at?: string | null
          department: string
          document_id: string
          id?: string
          new_status: string
          previous_status?: string | null
          user_id: string
        }
        Update: {
          change_reason?: string | null
          created_at?: string | null
          department?: string
          document_id?: string
          id?: string
          new_status?: string
          previous_status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "interdepartment_status_history_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "interdepartment_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_items: {
        Row: {
          category: string | null
          created_at: string | null
          id: string
          min_quantity: number | null
          name: string
          price: number | null
          quantity: number | null
          unit: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          id?: string
          min_quantity?: number | null
          name: string
          price?: number | null
          quantity?: number | null
          unit?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          id?: string
          min_quantity?: number | null
          name?: string
          price?: number | null
          quantity?: number | null
          unit?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      inventory_ledger: {
        Row: {
          client_id: string
          counterparty: string | null
          created_at: string
          id: string
          linked_ledger_entry: string | null
          meta: Json
          name: string
          operation_date: string
          operation_type: string
          period: string
          quantity: number
          sku: string | null
          source_document_id: string | null
          total_cost: number
          unit: string
          unit_cost: number
          updated_at: string
          warehouse: string | null
        }
        Insert: {
          client_id: string
          counterparty?: string | null
          created_at?: string
          id?: string
          linked_ledger_entry?: string | null
          meta?: Json
          name: string
          operation_date: string
          operation_type: string
          period: string
          quantity: number
          sku?: string | null
          source_document_id?: string | null
          total_cost?: number
          unit?: string
          unit_cost?: number
          updated_at?: string
          warehouse?: string | null
        }
        Update: {
          client_id?: string
          counterparty?: string | null
          created_at?: string
          id?: string
          linked_ledger_entry?: string | null
          meta?: Json
          name?: string
          operation_date?: string
          operation_type?: string
          period?: string
          quantity?: number
          sku?: string | null
          source_document_id?: string | null
          total_cost?: number
          unit?: string
          unit_cost?: number
          updated_at?: string
          warehouse?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_ledger_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "accountant_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_movements: {
        Row: {
          counterparty: string | null
          created_at: string | null
          document_ref: string | null
          id: string
          item_id: string | null
          movement_date: string | null
          note: string | null
          quantity: number
          type: string
          user_id: string
        }
        Insert: {
          counterparty?: string | null
          created_at?: string | null
          document_ref?: string | null
          id?: string
          item_id?: string | null
          movement_date?: string | null
          note?: string | null
          quantity: number
          type: string
          user_id: string
        }
        Update: {
          counterparty?: string | null
          created_at?: string | null
          document_ref?: string | null
          id?: string
          item_id?: string | null
          movement_date?: string | null
          note?: string | null
          quantity?: number
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_movements_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "inventory_items"
            referencedColumns: ["id"]
          },
        ]
      }
      ledger_entries: {
        Row: {
          amount: number
          approved_at: string | null
          approved_by: string | null
          client_id: string
          counterparty: string | null
          counterparty_bin: string | null
          created_at: string
          created_by: string | null
          credit_account: string | null
          currency: string
          debit_account: string | null
          description: string | null
          entry_date: string
          id: string
          is_expense: boolean
          is_income: boolean
          meta: Json
          period: string
          proposed_by: string | null
          reversal_of: string | null
          reversal_reason: string | null
          reversed_at: string | null
          source_id: string | null
          source_table: string | null
          source_type: Database["public"]["Enums"]["ledger_source_type"]
          status: string
          subconto1_kind: string | null
          subconto1_value: string | null
          subconto2_kind: string | null
          subconto2_value: string | null
          subconto3_kind: string | null
          subconto3_value: string | null
          updated_at: string
          vat_amount: number
          vat_rate: number
        }
        Insert: {
          amount?: number
          approved_at?: string | null
          approved_by?: string | null
          client_id: string
          counterparty?: string | null
          counterparty_bin?: string | null
          created_at?: string
          created_by?: string | null
          credit_account?: string | null
          currency?: string
          debit_account?: string | null
          description?: string | null
          entry_date: string
          id?: string
          is_expense?: boolean
          is_income?: boolean
          meta?: Json
          period: string
          proposed_by?: string | null
          reversal_of?: string | null
          reversal_reason?: string | null
          reversed_at?: string | null
          source_id?: string | null
          source_table?: string | null
          source_type?: Database["public"]["Enums"]["ledger_source_type"]
          status?: string
          subconto1_kind?: string | null
          subconto1_value?: string | null
          subconto2_kind?: string | null
          subconto2_value?: string | null
          subconto3_kind?: string | null
          subconto3_value?: string | null
          updated_at?: string
          vat_amount?: number
          vat_rate?: number
        }
        Update: {
          amount?: number
          approved_at?: string | null
          approved_by?: string | null
          client_id?: string
          counterparty?: string | null
          counterparty_bin?: string | null
          created_at?: string
          created_by?: string | null
          credit_account?: string | null
          currency?: string
          debit_account?: string | null
          description?: string | null
          entry_date?: string
          id?: string
          is_expense?: boolean
          is_income?: boolean
          meta?: Json
          period?: string
          proposed_by?: string | null
          reversal_of?: string | null
          reversal_reason?: string | null
          reversed_at?: string | null
          source_id?: string | null
          source_table?: string | null
          source_type?: Database["public"]["Enums"]["ledger_source_type"]
          status?: string
          subconto1_kind?: string | null
          subconto1_value?: string | null
          subconto2_kind?: string | null
          subconto2_value?: string | null
          subconto3_kind?: string | null
          subconto3_value?: string | null
          updated_at?: string
          vat_amount?: number
          vat_rate?: number
        }
        Relationships: [
          {
            foreignKeyName: "ledger_entries_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "accountant_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ledger_entries_reversal_of_fkey"
            columns: ["reversal_of"]
            isOneToOne: false
            referencedRelation: "ledger_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      link_clicks: {
        Row: {
          click_position: Json | null
          created_at: string
          id: string
          link_text: string | null
          link_url: string
          page_path: string
          session_id: string
          user_id: string | null
        }
        Insert: {
          click_position?: Json | null
          created_at?: string
          id?: string
          link_text?: string | null
          link_url: string
          page_path: string
          session_id: string
          user_id?: string | null
        }
        Update: {
          click_position?: Json | null
          created_at?: string
          id?: string
          link_text?: string | null
          link_url?: string
          page_path?: string
          session_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      logistics_clients: {
        Row: {
          address: string | null
          annual_revenue: number | null
          city: string | null
          client_type: string | null
          company_name: string
          contact_person: string | null
          country: string | null
          created_at: string
          created_by: string | null
          email: string | null
          id: string
          industry: string | null
          notes: string | null
          phone: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          annual_revenue?: number | null
          city?: string | null
          client_type?: string | null
          company_name: string
          contact_person?: string | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          id?: string
          industry?: string | null
          notes?: string | null
          phone?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          annual_revenue?: number | null
          city?: string | null
          client_type?: string | null
          company_name?: string
          contact_person?: string | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          id?: string
          industry?: string | null
          notes?: string | null
          phone?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      logistics_communications: {
        Row: {
          client_id: string | null
          communication_date: string
          communication_type: string | null
          content: string | null
          contract_id: string | null
          created_at: string
          created_by: string | null
          follow_up_date: string | null
          follow_up_required: boolean | null
          id: string
          subject: string | null
        }
        Insert: {
          client_id?: string | null
          communication_date?: string
          communication_type?: string | null
          content?: string | null
          contract_id?: string | null
          created_at?: string
          created_by?: string | null
          follow_up_date?: string | null
          follow_up_required?: boolean | null
          id?: string
          subject?: string | null
        }
        Update: {
          client_id?: string | null
          communication_date?: string
          communication_type?: string | null
          content?: string | null
          contract_id?: string | null
          created_at?: string
          created_by?: string | null
          follow_up_date?: string | null
          follow_up_required?: boolean | null
          id?: string
          subject?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "logistics_communications_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "logistics_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "logistics_communications_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "logistics_contracts"
            referencedColumns: ["id"]
          },
        ]
      }
      logistics_contracts: {
        Row: {
          assigned_manager: string | null
          client_id: string | null
          contract_number: string
          contract_type: string | null
          created_at: string
          created_by: string | null
          currency: string | null
          description: string | null
          end_date: string | null
          id: string
          priority: string | null
          progress_percentage: number | null
          start_date: string | null
          status: string | null
          title: string
          total_value: number | null
          updated_at: string
        }
        Insert: {
          assigned_manager?: string | null
          client_id?: string | null
          contract_number: string
          contract_type?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          priority?: string | null
          progress_percentage?: number | null
          start_date?: string | null
          status?: string | null
          title: string
          total_value?: number | null
          updated_at?: string
        }
        Update: {
          assigned_manager?: string | null
          client_id?: string | null
          contract_number?: string
          contract_type?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          priority?: string | null
          progress_percentage?: number | null
          start_date?: string | null
          status?: string | null
          title?: string
          total_value?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "logistics_contracts_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "logistics_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      logistics_documents: {
        Row: {
          category: string
          created_at: string
          description: string | null
          download_count: number | null
          file_name: string
          file_size: number
          file_type: string
          file_url: string
          id: string
          last_downloaded_at: string | null
          status: string
          subcategory: string | null
          tags: string[] | null
          title: string
          updated_at: string
          uploaded_by: string
          version: number
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          download_count?: number | null
          file_name: string
          file_size: number
          file_type: string
          file_url: string
          id?: string
          last_downloaded_at?: string | null
          status?: string
          subcategory?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
          uploaded_by: string
          version?: number
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          download_count?: number | null
          file_name?: string
          file_size?: number
          file_type?: string
          file_url?: string
          id?: string
          last_downloaded_at?: string | null
          status?: string
          subcategory?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          uploaded_by?: string
          version?: number
        }
        Relationships: []
      }
      logistics_procurement_opportunities: {
        Row: {
          category: string | null
          client_company: string | null
          contact_info: string | null
          created_at: string
          created_by: string | null
          currency: string | null
          deadline: string | null
          description: string | null
          estimated_value: number | null
          id: string
          priority: string | null
          region: string | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          client_company?: string | null
          contact_info?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string | null
          deadline?: string | null
          description?: string | null
          estimated_value?: number | null
          id?: string
          priority?: string | null
          region?: string | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          client_company?: string | null
          contact_info?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string | null
          deadline?: string | null
          description?: string | null
          estimated_value?: number | null
          id?: string
          priority?: string | null
          region?: string | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      logistics_sales: {
        Row: {
          client_id: string | null
          contract_id: string | null
          created_at: string
          created_by: string | null
          currency: string | null
          id: string
          product_service: string
          quantity: number | null
          region: string | null
          sale_date: string
          sales_manager: string | null
          status: string | null
          total_amount: number
          unit_price: number | null
          updated_at: string
        }
        Insert: {
          client_id?: string | null
          contract_id?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string | null
          id?: string
          product_service: string
          quantity?: number | null
          region?: string | null
          sale_date: string
          sales_manager?: string | null
          status?: string | null
          total_amount: number
          unit_price?: number | null
          updated_at?: string
        }
        Update: {
          client_id?: string | null
          contract_id?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string | null
          id?: string
          product_service?: string
          quantity?: number | null
          region?: string | null
          sale_date?: string
          sales_manager?: string | null
          status?: string | null
          total_amount?: number
          unit_price?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "logistics_sales_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "logistics_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "logistics_sales_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "logistics_contracts"
            referencedColumns: ["id"]
          },
        ]
      }
      messenger_bot_settings: {
        Row: {
          auto_reply: boolean | null
          bot_name: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          knowledge_base: Json | null
          platform: string
          system_prompt: string | null
          twilio_phone: string | null
          updated_at: string | null
          user_id: string
          website_url: string | null
        }
        Insert: {
          auto_reply?: boolean | null
          bot_name?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          knowledge_base?: Json | null
          platform?: string
          system_prompt?: string | null
          twilio_phone?: string | null
          updated_at?: string | null
          user_id: string
          website_url?: string | null
        }
        Update: {
          auto_reply?: boolean | null
          bot_name?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          knowledge_base?: Json | null
          platform?: string
          system_prompt?: string | null
          twilio_phone?: string | null
          updated_at?: string | null
          user_id?: string
          website_url?: string | null
        }
        Relationships: []
      }
      messenger_conversations: {
        Row: {
          contact_name: string | null
          created_at: string | null
          external_phone: string | null
          external_username: string | null
          id: string
          last_message: string | null
          last_message_at: string | null
          platform: string
          status: string | null
          unread_count: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          contact_name?: string | null
          created_at?: string | null
          external_phone?: string | null
          external_username?: string | null
          id?: string
          last_message?: string | null
          last_message_at?: string | null
          platform: string
          status?: string | null
          unread_count?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          contact_name?: string | null
          created_at?: string | null
          external_phone?: string | null
          external_username?: string | null
          id?: string
          last_message?: string | null
          last_message_at?: string | null
          platform?: string
          status?: string | null
          unread_count?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      messenger_messages: {
        Row: {
          ai_generated: boolean | null
          content: string
          conversation_id: string
          created_at: string | null
          direction: string
          external_message_id: string | null
          id: string
          media_type: string | null
          media_url: string | null
          status: string | null
        }
        Insert: {
          ai_generated?: boolean | null
          content: string
          conversation_id: string
          created_at?: string | null
          direction: string
          external_message_id?: string | null
          id?: string
          media_type?: string | null
          media_url?: string | null
          status?: string | null
        }
        Update: {
          ai_generated?: boolean | null
          content?: string
          conversation_id?: string
          created_at?: string | null
          direction?: string
          external_message_id?: string | null
          id?: string
          media_type?: string | null
          media_url?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messenger_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "messenger_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      modern_community_experts: {
        Row: {
          category: string
          certificates: string[] | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
          subcategory: string | null
          updated_at: string
          whatsapp_url: string | null
        }
        Insert: {
          category?: string
          certificates?: string[] | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          subcategory?: string | null
          updated_at?: string
          whatsapp_url?: string | null
        }
        Update: {
          category?: string
          certificates?: string[] | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          subcategory?: string | null
          updated_at?: string
          whatsapp_url?: string | null
        }
        Relationships: []
      }
      modern_community_posts: {
        Row: {
          category: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          image_url: string | null
          members: number | null
          title: string
        }
        Insert: {
          category: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          members?: number | null
          title: string
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          members?: number | null
          title?: string
        }
        Relationships: []
      }
      monthly_checkins: {
        Row: {
          bank_statement_uploaded: boolean | null
          checkin_month: number
          checkin_year: number
          closed_at: string | null
          created_at: string
          fired_employees: number | null
          had_unusual_operations: boolean | null
          hired_employees: number | null
          id: string
          income_source: string | null
          is_closed: boolean | null
          notes: string | null
          paid_salaries: boolean | null
          paid_social: boolean | null
          paid_taxes: boolean | null
          period_id: string | null
          profile_id: string
          salary_amount: number | null
          social_amount: number | null
          tax_amount: number | null
          total_expenses: number
          total_income: number
          unusual_operations_note: string | null
          updated_at: string
        }
        Insert: {
          bank_statement_uploaded?: boolean | null
          checkin_month: number
          checkin_year: number
          closed_at?: string | null
          created_at?: string
          fired_employees?: number | null
          had_unusual_operations?: boolean | null
          hired_employees?: number | null
          id?: string
          income_source?: string | null
          is_closed?: boolean | null
          notes?: string | null
          paid_salaries?: boolean | null
          paid_social?: boolean | null
          paid_taxes?: boolean | null
          period_id?: string | null
          profile_id: string
          salary_amount?: number | null
          social_amount?: number | null
          tax_amount?: number | null
          total_expenses?: number
          total_income?: number
          unusual_operations_note?: string | null
          updated_at?: string
        }
        Update: {
          bank_statement_uploaded?: boolean | null
          checkin_month?: number
          checkin_year?: number
          closed_at?: string | null
          created_at?: string
          fired_employees?: number | null
          had_unusual_operations?: boolean | null
          hired_employees?: number | null
          id?: string
          income_source?: string | null
          is_closed?: boolean | null
          notes?: string | null
          paid_salaries?: boolean | null
          paid_social?: boolean | null
          paid_taxes?: boolean | null
          period_id?: string | null
          profile_id?: string
          salary_amount?: number | null
          social_amount?: number | null
          tax_amount?: number | null
          total_expenses?: number
          total_income?: number
          unusual_operations_note?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "monthly_checkins_period_id_fkey"
            columns: ["period_id"]
            isOneToOne: false
            referencedRelation: "tax_periods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "monthly_checkins_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "tax_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      my_telegram_bot_files: {
        Row: {
          bot_id: string
          created_at: string
          extracted_text: string | null
          file_name: string
          file_size: number
          file_type: string | null
          id: string
          is_indexed: boolean
          storage_path: string
          user_id: string
        }
        Insert: {
          bot_id: string
          created_at?: string
          extracted_text?: string | null
          file_name: string
          file_size?: number
          file_type?: string | null
          id?: string
          is_indexed?: boolean
          storage_path: string
          user_id: string
        }
        Update: {
          bot_id?: string
          created_at?: string
          extracted_text?: string | null
          file_name?: string
          file_size?: number
          file_type?: string | null
          id?: string
          is_indexed?: boolean
          storage_path?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "my_telegram_bot_files_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "my_telegram_bots"
            referencedColumns: ["id"]
          },
        ]
      }
      my_telegram_bot_logs: {
        Row: {
          bot_id: string
          chat_id: string | null
          created_at: string
          direction: string
          error_message: string | null
          grounding_flags: Json | null
          grounding_score: number | null
          id: string
          latency_ms: number | null
          message_text: string | null
          metadata: Json | null
          response_text: string | null
          status: string
          user_id: string
        }
        Insert: {
          bot_id: string
          chat_id?: string | null
          created_at?: string
          direction: string
          error_message?: string | null
          grounding_flags?: Json | null
          grounding_score?: number | null
          id?: string
          latency_ms?: number | null
          message_text?: string | null
          metadata?: Json | null
          response_text?: string | null
          status?: string
          user_id: string
        }
        Update: {
          bot_id?: string
          chat_id?: string | null
          created_at?: string
          direction?: string
          error_message?: string | null
          grounding_flags?: Json | null
          grounding_score?: number | null
          id?: string
          latency_ms?: number | null
          message_text?: string | null
          metadata?: Json | null
          response_text?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "my_telegram_bot_logs_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "my_telegram_bots"
            referencedColumns: ["id"]
          },
        ]
      }
      my_telegram_bot_notifications: {
        Row: {
          bot_id: string
          created_at: string
          delivery_chat_id: string | null
          delivery_target: string
          enabled: boolean
          id: string
          notify_booking_cancel: boolean
          notify_daily_summary: boolean
          notify_help_needed: boolean
          notify_negative_feedback: boolean
          notify_new_booking: boolean
          notify_new_lead: boolean
          notify_new_message: boolean
          notify_payment_due: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          bot_id: string
          created_at?: string
          delivery_chat_id?: string | null
          delivery_target?: string
          enabled?: boolean
          id?: string
          notify_booking_cancel?: boolean
          notify_daily_summary?: boolean
          notify_help_needed?: boolean
          notify_negative_feedback?: boolean
          notify_new_booking?: boolean
          notify_new_lead?: boolean
          notify_new_message?: boolean
          notify_payment_due?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          bot_id?: string
          created_at?: string
          delivery_chat_id?: string | null
          delivery_target?: string
          enabled?: boolean
          id?: string
          notify_booking_cancel?: boolean
          notify_daily_summary?: boolean
          notify_help_needed?: boolean
          notify_negative_feedback?: boolean
          notify_new_booking?: boolean
          notify_new_lead?: boolean
          notify_new_message?: boolean
          notify_payment_due?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "my_telegram_bot_notifications_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: true
            referencedRelation: "my_telegram_bots"
            referencedColumns: ["id"]
          },
        ]
      }
      my_telegram_bot_tasks: {
        Row: {
          bot_id: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          response: string | null
          sort_order: number
          trigger: string
          user_id: string
        }
        Insert: {
          bot_id: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          response?: string | null
          sort_order?: number
          trigger: string
          user_id: string
        }
        Update: {
          bot_id?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          response?: string | null
          sort_order?: number
          trigger?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "my_telegram_bot_tasks_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "my_telegram_bots"
            referencedColumns: ["id"]
          },
        ]
      }
      my_telegram_bot_webhook_status: {
        Row: {
          bot_id: string
          created_at: string
          is_set: boolean
          last_error_date: string | null
          last_error_message: string | null
          last_synced_at: string
          pending_update_count: number
          raw_response: Json | null
          updated_at: string
          user_id: string
          webhook_url: string | null
        }
        Insert: {
          bot_id: string
          created_at?: string
          is_set?: boolean
          last_error_date?: string | null
          last_error_message?: string | null
          last_synced_at?: string
          pending_update_count?: number
          raw_response?: Json | null
          updated_at?: string
          user_id: string
          webhook_url?: string | null
        }
        Update: {
          bot_id?: string
          created_at?: string
          is_set?: boolean
          last_error_date?: string | null
          last_error_message?: string | null
          last_synced_at?: string
          pending_update_count?: number
          raw_response?: Json | null
          updated_at?: string
          user_id?: string
          webhook_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "my_telegram_bot_webhook_status_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: true
            referencedRelation: "my_telegram_bots"
            referencedColumns: ["id"]
          },
        ]
      }
      my_telegram_bots: {
        Row: {
          ai_model: string
          avatar_emoji: string | null
          bot_token: string | null
          connection_status: string
          created_at: string
          description: string | null
          greeting: string | null
          id: string
          instructions: string | null
          is_active: boolean
          language: string
          last_error: string | null
          last_polled_at: string | null
          name: string
          total_messages: number
          total_users: number
          update_offset: number
          updated_at: string
          user_id: string
          username: string | null
        }
        Insert: {
          ai_model?: string
          avatar_emoji?: string | null
          bot_token?: string | null
          connection_status?: string
          created_at?: string
          description?: string | null
          greeting?: string | null
          id?: string
          instructions?: string | null
          is_active?: boolean
          language?: string
          last_error?: string | null
          last_polled_at?: string | null
          name: string
          total_messages?: number
          total_users?: number
          update_offset?: number
          updated_at?: string
          user_id: string
          username?: string | null
        }
        Update: {
          ai_model?: string
          avatar_emoji?: string | null
          bot_token?: string | null
          connection_status?: string
          created_at?: string
          description?: string | null
          greeting?: string | null
          id?: string
          instructions?: string | null
          is_active?: boolean
          language?: string
          last_error?: string | null
          last_polled_at?: string | null
          name?: string
          total_messages?: number
          total_users?: number
          update_offset?: number
          updated_at?: string
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      new_community_experts: {
        Row: {
          category: string
          certificates: string[] | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
          subcategory: string | null
          updated_at: string
          whatsapp_url: string | null
        }
        Insert: {
          category?: string
          certificates?: string[] | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          subcategory?: string | null
          updated_at?: string
          whatsapp_url?: string | null
        }
        Update: {
          category?: string
          certificates?: string[] | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          subcategory?: string | null
          updated_at?: string
          whatsapp_url?: string | null
        }
        Relationships: []
      }
      new_community_posts: {
        Row: {
          category: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          image_url: string | null
          members: number | null
          title: string
        }
        Insert: {
          category: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          members?: number | null
          title: string
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          members?: number | null
          title?: string
        }
        Relationships: []
      }
      news: {
        Row: {
          category: string
          content: string | null
          created_at: string | null
          created_by: string | null
          excerpt: string
          id: string
          image_url: string | null
          title: string
        }
        Insert: {
          category: string
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          excerpt: string
          id?: string
          image_url?: string | null
          title: string
        }
        Update: {
          category?: string
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          excerpt?: string
          id?: string
          image_url?: string | null
          title?: string
        }
        Relationships: []
      }
      news_drafts: {
        Row: {
          created_at: string
          error: string | null
          generated_article_id: string | null
          id: string
          original_summary: string | null
          original_title: string
          published_at: string | null
          source: string
          source_url: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          error?: string | null
          generated_article_id?: string | null
          id?: string
          original_summary?: string | null
          original_title: string
          published_at?: string | null
          source: string
          source_url: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          error?: string | null
          generated_article_id?: string | null
          id?: string
          original_summary?: string | null
          original_title?: string
          published_at?: string | null
          source?: string
          source_url?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "news_drafts_generated_article_id_fkey"
            columns: ["generated_article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      office_documents: {
        Row: {
          category: string
          created_at: string
          description: string | null
          download_count: number | null
          file_name: string
          file_size: number
          file_type: string
          file_url: string
          id: string
          last_downloaded_at: string | null
          status: string
          subcategory: string | null
          tags: string[] | null
          title: string
          updated_at: string
          uploaded_by: string
          version: number
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          download_count?: number | null
          file_name: string
          file_size: number
          file_type: string
          file_url: string
          id?: string
          last_downloaded_at?: string | null
          status?: string
          subcategory?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
          uploaded_by: string
          version?: number
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          download_count?: number | null
          file_name?: string
          file_size?: number
          file_type?: string
          file_url?: string
          id?: string
          last_downloaded_at?: string | null
          status?: string
          subcategory?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          uploaded_by?: string
          version?: number
        }
        Relationships: []
      }
      onec_import_history: {
        Row: {
          created_at: string
          detected_config: string
          filename: string
          id: string
          period_from: string | null
          period_to: string | null
          size_bytes: number
          source_company_bin: string | null
          source_company_name: string | null
          summary: Json
          user_id: string
          warnings: Json
        }
        Insert: {
          created_at?: string
          detected_config?: string
          filename: string
          id?: string
          period_from?: string | null
          period_to?: string | null
          size_bytes?: number
          source_company_bin?: string | null
          source_company_name?: string | null
          summary?: Json
          user_id: string
          warnings?: Json
        }
        Update: {
          created_at?: string
          detected_config?: string
          filename?: string
          id?: string
          period_from?: string | null
          period_to?: string | null
          size_bytes?: number
          source_company_bin?: string | null
          source_company_name?: string | null
          summary?: Json
          user_id?: string
          warnings?: Json
        }
        Relationships: []
      }
      organizer_activity_logs: {
        Row: {
          action_type: string
          created_at: string
          file_id: string | null
          file_name: string | null
          id: string
          ip_address: string | null
          organizer_id: string
          target_category: string | null
          target_department: string
          user_agent: string | null
        }
        Insert: {
          action_type: string
          created_at?: string
          file_id?: string | null
          file_name?: string | null
          id?: string
          ip_address?: string | null
          organizer_id: string
          target_category?: string | null
          target_department: string
          user_agent?: string | null
        }
        Update: {
          action_type?: string
          created_at?: string
          file_id?: string | null
          file_name?: string | null
          id?: string
          ip_address?: string | null
          organizer_id?: string
          target_category?: string | null
          target_department?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organizer_activity_logs_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "organizers"
            referencedColumns: ["id"]
          },
        ]
      }
      organizers: {
        Row: {
          created_at: string
          email: string | null
          full_name: string
          id: string
          is_active: boolean
          password_hash: string
          updated_at: string
          username: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          is_active?: boolean
          password_hash: string
          updated_at?: string
          username: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          is_active?: boolean
          password_hash?: string
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      page_views: {
        Row: {
          browser: string | null
          city: string | null
          country: string | null
          created_at: string
          device_type: string | null
          duration_seconds: number | null
          id: string
          ip_address: string | null
          is_bounce: boolean | null
          os: string | null
          page_path: string
          page_title: string | null
          referrer: string | null
          session_id: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          browser?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          device_type?: string | null
          duration_seconds?: number | null
          id?: string
          ip_address?: string | null
          is_bounce?: boolean | null
          os?: string | null
          page_path: string
          page_title?: string | null
          referrer?: string | null
          session_id: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          browser?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          device_type?: string | null
          duration_seconds?: number | null
          id?: string
          ip_address?: string | null
          is_bounce?: boolean | null
          os?: string | null
          page_path?: string
          page_title?: string | null
          referrer?: string | null
          session_id?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      payment_tracking: {
        Row: {
          amount: number | null
          created_at: string
          deadline_id: string
          due_date: string
          id: string
          is_paid: boolean
          notes: string | null
          paid_at: string | null
          payment_document_id: string | null
          payment_document_url: string | null
          period_id: string | null
          profile_id: string
          title: string
          updated_at: string
        }
        Insert: {
          amount?: number | null
          created_at?: string
          deadline_id: string
          due_date: string
          id?: string
          is_paid?: boolean
          notes?: string | null
          paid_at?: string | null
          payment_document_id?: string | null
          payment_document_url?: string | null
          period_id?: string | null
          profile_id: string
          title: string
          updated_at?: string
        }
        Update: {
          amount?: number | null
          created_at?: string
          deadline_id?: string
          due_date?: string
          id?: string
          is_paid?: boolean
          notes?: string | null
          paid_at?: string | null
          payment_document_id?: string | null
          payment_document_url?: string | null
          period_id?: string | null
          profile_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      payroll_calculations: {
        Row: {
          created_at: string
          employee_id: string
          employer_osms: number
          employer_so: number
          id: string
          ipn: number
          oosms: number | null
          opv: number
          opvr: number | null
          osms: number
          period: string
          salary_gross: number
          salary_net: number
          sn: number | null
          so: number
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          employee_id: string
          employer_osms?: number
          employer_so?: number
          id?: string
          ipn?: number
          oosms?: number | null
          opv?: number
          opvr?: number | null
          osms?: number
          period: string
          salary_gross?: number
          salary_net?: number
          sn?: number | null
          so?: number
          status?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          employee_id?: string
          employer_osms?: number
          employer_so?: number
          id?: string
          ipn?: number
          oosms?: number | null
          opv?: number
          opvr?: number | null
          osms?: number
          period?: string
          salary_gross?: number
          salary_net?: number
          sn?: number | null
          so?: number
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payroll_calculations_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      people: {
        Row: {
          certificates: string[] | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          image_url: string | null
          main_category: string | null
          name: string
          subcategory: string | null
          updated_at: string
          whatsapp_url: string | null
        }
        Insert: {
          certificates?: string[] | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          main_category?: string | null
          name: string
          subcategory?: string | null
          updated_at?: string
          whatsapp_url?: string | null
        }
        Update: {
          certificates?: string[] | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          main_category?: string | null
          name?: string
          subcategory?: string | null
          updated_at?: string
          whatsapp_url?: string | null
        }
        Relationships: []
      }
      period_status: {
        Row: {
          client_id: string
          closed_at: string | null
          closed_by: string | null
          created_at: string
          id: string
          meta: Json
          period: string
          reopen_reason: string | null
          reopened_at: string | null
          reopened_by: string | null
          status: string
          updated_at: string
        }
        Insert: {
          client_id: string
          closed_at?: string | null
          closed_by?: string | null
          created_at?: string
          id?: string
          meta?: Json
          period: string
          reopen_reason?: string | null
          reopened_at?: string | null
          reopened_by?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          client_id?: string
          closed_at?: string | null
          closed_by?: string | null
          created_at?: string
          id?: string
          meta?: Json
          period?: string
          reopen_reason?: string | null
          reopened_at?: string | null
          reopened_by?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "period_status_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "accountant_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      portal_appointments: {
        Row: {
          booked_at: string | null
          booked_by_name: string | null
          booked_by_phone: string | null
          client_note: string | null
          created_at: string
          description: string | null
          end_at: string
          id: string
          location: string | null
          portal_id: string
          start_at: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          booked_at?: string | null
          booked_by_name?: string | null
          booked_by_phone?: string | null
          client_note?: string | null
          created_at?: string
          description?: string | null
          end_at: string
          id?: string
          location?: string | null
          portal_id: string
          start_at: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          booked_at?: string | null
          booked_by_name?: string | null
          booked_by_phone?: string | null
          client_note?: string | null
          created_at?: string
          description?: string | null
          end_at?: string
          id?: string
          location?: string | null
          portal_id?: string
          start_at?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "portal_appointments_portal_id_fkey"
            columns: ["portal_id"]
            isOneToOne: false
            referencedRelation: "client_portals"
            referencedColumns: ["id"]
          },
        ]
      }
      portal_attachments: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          file_name: string | null
          file_size: number | null
          id: string
          kind: string
          mime_type: string | null
          parent_id: string | null
          parent_kind: string
          portal_id: string
          sort_order: number
          thumbnail_url: string | null
          title: string | null
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          file_name?: string | null
          file_size?: number | null
          id?: string
          kind?: string
          mime_type?: string | null
          parent_id?: string | null
          parent_kind?: string
          portal_id: string
          sort_order?: number
          thumbnail_url?: string | null
          title?: string | null
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          file_name?: string | null
          file_size?: number | null
          id?: string
          kind?: string
          mime_type?: string | null
          parent_id?: string | null
          parent_kind?: string
          portal_id?: string
          sort_order?: number
          thumbnail_url?: string | null
          title?: string | null
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "portal_attachments_portal_id_fkey"
            columns: ["portal_id"]
            isOneToOne: false
            referencedRelation: "client_portals"
            referencedColumns: ["id"]
          },
        ]
      }
      portal_documents: {
        Row: {
          action_label: string | null
          created_at: string
          description: string | null
          file_name: string | null
          file_size: number | null
          file_url: string | null
          id: string
          portal_id: string
          requires_client_action: boolean
          sort_order: number
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          action_label?: string | null
          created_at?: string
          description?: string | null
          file_name?: string | null
          file_size?: number | null
          file_url?: string | null
          id?: string
          portal_id: string
          requires_client_action?: boolean
          sort_order?: number
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          action_label?: string | null
          created_at?: string
          description?: string | null
          file_name?: string | null
          file_size?: number | null
          file_url?: string | null
          id?: string
          portal_id?: string
          requires_client_action?: boolean
          sort_order?: number
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "portal_documents_portal_id_fkey"
            columns: ["portal_id"]
            isOneToOne: false
            referencedRelation: "client_portals"
            referencedColumns: ["id"]
          },
        ]
      }
      portal_gallery: {
        Row: {
          after_url: string | null
          before_url: string | null
          caption_after: string | null
          caption_before: string | null
          created_at: string
          description: string | null
          id: string
          portal_id: string
          sort_order: number
          title: string | null
        }
        Insert: {
          after_url?: string | null
          before_url?: string | null
          caption_after?: string | null
          caption_before?: string | null
          created_at?: string
          description?: string | null
          id?: string
          portal_id: string
          sort_order?: number
          title?: string | null
        }
        Update: {
          after_url?: string | null
          before_url?: string | null
          caption_after?: string | null
          caption_before?: string | null
          created_at?: string
          description?: string | null
          id?: string
          portal_id?: string
          sort_order?: number
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "portal_gallery_portal_id_fkey"
            columns: ["portal_id"]
            isOneToOne: false
            referencedRelation: "client_portals"
            referencedColumns: ["id"]
          },
        ]
      }
      portal_messages: {
        Row: {
          body: string | null
          created_at: string
          duration_sec: number | null
          id: string
          media_name: string | null
          media_size: number | null
          media_type: string | null
          media_url: string | null
          portal_id: string
          read_by_client: boolean
          read_by_owner: boolean
          sender_name: string | null
          sender_role: string
          task_id: string | null
        }
        Insert: {
          body?: string | null
          created_at?: string
          duration_sec?: number | null
          id?: string
          media_name?: string | null
          media_size?: number | null
          media_type?: string | null
          media_url?: string | null
          portal_id: string
          read_by_client?: boolean
          read_by_owner?: boolean
          sender_name?: string | null
          sender_role: string
          task_id?: string | null
        }
        Update: {
          body?: string | null
          created_at?: string
          duration_sec?: number | null
          id?: string
          media_name?: string | null
          media_size?: number | null
          media_type?: string | null
          media_url?: string | null
          portal_id?: string
          read_by_client?: boolean
          read_by_owner?: boolean
          sender_name?: string | null
          sender_role?: string
          task_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "portal_messages_portal_id_fkey"
            columns: ["portal_id"]
            isOneToOne: false
            referencedRelation: "client_portals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portal_messages_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "portal_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      portal_payments: {
        Row: {
          amount: number
          client_note: string | null
          client_paid_at: string | null
          confirmed_at: string | null
          created_at: string
          currency: string
          description: string | null
          due_date: string | null
          id: string
          portal_id: string
          sort_order: number
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          amount: number
          client_note?: string | null
          client_paid_at?: string | null
          confirmed_at?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          due_date?: string | null
          id?: string
          portal_id: string
          sort_order?: number
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          amount?: number
          client_note?: string | null
          client_paid_at?: string | null
          confirmed_at?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          due_date?: string | null
          id?: string
          portal_id?: string
          sort_order?: number
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "portal_payments_portal_id_fkey"
            columns: ["portal_id"]
            isOneToOne: false
            referencedRelation: "client_portals"
            referencedColumns: ["id"]
          },
        ]
      }
      portal_roadmap_stages: {
        Row: {
          color: string | null
          completed_at: string | null
          created_at: string
          description: string | null
          emoji: string | null
          id: string
          portal_id: string
          sort_order: number
          status: string
          target_date: string | null
          title: string
          updated_at: string
        }
        Insert: {
          color?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          emoji?: string | null
          id?: string
          portal_id: string
          sort_order?: number
          status?: string
          target_date?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          color?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          emoji?: string | null
          id?: string
          portal_id?: string
          sort_order?: number
          status?: string
          target_date?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "portal_roadmap_stages_portal_id_fkey"
            columns: ["portal_id"]
            isOneToOne: false
            referencedRelation: "client_portals"
            referencedColumns: ["id"]
          },
        ]
      }
      portal_task_comments: {
        Row: {
          attachment_name: string | null
          attachment_url: string | null
          author_name: string | null
          author_role: string
          body: string
          created_at: string
          id: string
          portal_id: string
          task_id: string
          updated_at: string
        }
        Insert: {
          attachment_name?: string | null
          attachment_url?: string | null
          author_name?: string | null
          author_role: string
          body: string
          created_at?: string
          id?: string
          portal_id: string
          task_id: string
          updated_at?: string
        }
        Update: {
          attachment_name?: string | null
          attachment_url?: string | null
          author_name?: string | null
          author_role?: string
          body?: string
          created_at?: string
          id?: string
          portal_id?: string
          task_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "portal_task_comments_portal_id_fkey"
            columns: ["portal_id"]
            isOneToOne: false
            referencedRelation: "client_portals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portal_task_comments_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "portal_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      portal_tasks: {
        Row: {
          completed_at: string | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          portal_id: string
          priority: string
          sort_order: number
          stage_id: string | null
          stage_order: number
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          portal_id: string
          priority?: string
          sort_order?: number
          stage_id?: string | null
          stage_order?: number
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          portal_id?: string
          priority?: string
          sort_order?: number
          stage_id?: string | null
          stage_order?: number
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "portal_tasks_portal_id_fkey"
            columns: ["portal_id"]
            isOneToOne: false
            referencedRelation: "client_portals"
            referencedColumns: ["id"]
          },
        ]
      }
      portal_telegram_links: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          linked_at: string | null
          pair_code: string
          portal_id: string
          role: string
          telegram_chat_id: string | null
          telegram_username: string | null
        }
        Insert: {
          created_at?: string
          expires_at?: string
          id?: string
          linked_at?: string | null
          pair_code: string
          portal_id: string
          role?: string
          telegram_chat_id?: string | null
          telegram_username?: string | null
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          linked_at?: string | null
          pair_code?: string
          portal_id?: string
          role?: string
          telegram_chat_id?: string | null
          telegram_username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "portal_telegram_links_portal_id_fkey"
            columns: ["portal_id"]
            isOneToOne: false
            referencedRelation: "client_portals"
            referencedColumns: ["id"]
          },
        ]
      }
      portal_updates: {
        Row: {
          content: string | null
          created_at: string
          id: string
          is_pinned: boolean
          portal_id: string
          title: string
          update_type: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          is_pinned?: boolean
          portal_id: string
          title: string
          update_type?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          is_pinned?: boolean
          portal_id?: string
          title?: string
          update_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "portal_updates_portal_id_fkey"
            columns: ["portal_id"]
            isOneToOne: false
            referencedRelation: "client_portals"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          bestseller: boolean | null
          category: string
          created_at: string | null
          created_by: string | null
          deleted: boolean | null
          deleted_at: string | null
          description: string | null
          file_url: string | null
          format: string | null
          id: string
          pages: string | null
          price: string | null
          title: string
          type: string
        }
        Insert: {
          bestseller?: boolean | null
          category: string
          created_at?: string | null
          created_by?: string | null
          deleted?: boolean | null
          deleted_at?: string | null
          description?: string | null
          file_url?: string | null
          format?: string | null
          id?: string
          pages?: string | null
          price?: string | null
          title: string
          type?: string
        }
        Update: {
          bestseller?: boolean | null
          category?: string
          created_at?: string | null
          created_by?: string | null
          deleted?: boolean | null
          deleted_at?: string | null
          description?: string | null
          file_url?: string | null
          format?: string | null
          id?: string
          pages?: string | null
          price?: string | null
          title?: string
          type?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          bank_name: string | null
          bik: string | null
          bin_iin: string | null
          bio: string | null
          certificate_number: string | null
          company: string | null
          counterparties: Json | null
          created_at: string | null
          display_name: string | null
          email: string | null
          employee_count: number | null
          full_name: string | null
          has_employees: boolean | null
          iban: string | null
          id: string
          kaspi_merchant_token: string | null
          kaspi_pay_merchant_id: string | null
          kaspi_pay_webhook_secret: string | null
          last_sign_in: string | null
          notifications_settings: Json | null
          oked: string | null
          oked_name: string | null
          onboarding_completed: boolean | null
          org_form: string | null
          phone: string | null
          position: string | null
          preferred_username: string | null
          purposes: string[] | null
          remember_credentials: boolean | null
          role: string | null
          services: Json | null
          signature_url: string | null
          social_links: Json | null
          stamp_url: string | null
          subscription_plan: string | null
          tax_office_code: string | null
          tax_regime: string | null
          trial_ends_at: string | null
          ui_preferences: Json
          updated_at: string | null
          username: string | null
          vat_registered: boolean | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          bank_name?: string | null
          bik?: string | null
          bin_iin?: string | null
          bio?: string | null
          certificate_number?: string | null
          company?: string | null
          counterparties?: Json | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          employee_count?: number | null
          full_name?: string | null
          has_employees?: boolean | null
          iban?: string | null
          id: string
          kaspi_merchant_token?: string | null
          kaspi_pay_merchant_id?: string | null
          kaspi_pay_webhook_secret?: string | null
          last_sign_in?: string | null
          notifications_settings?: Json | null
          oked?: string | null
          oked_name?: string | null
          onboarding_completed?: boolean | null
          org_form?: string | null
          phone?: string | null
          position?: string | null
          preferred_username?: string | null
          purposes?: string[] | null
          remember_credentials?: boolean | null
          role?: string | null
          services?: Json | null
          signature_url?: string | null
          social_links?: Json | null
          stamp_url?: string | null
          subscription_plan?: string | null
          tax_office_code?: string | null
          tax_regime?: string | null
          trial_ends_at?: string | null
          ui_preferences?: Json
          updated_at?: string | null
          username?: string | null
          vat_registered?: boolean | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          bank_name?: string | null
          bik?: string | null
          bin_iin?: string | null
          bio?: string | null
          certificate_number?: string | null
          company?: string | null
          counterparties?: Json | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          employee_count?: number | null
          full_name?: string | null
          has_employees?: boolean | null
          iban?: string | null
          id?: string
          kaspi_merchant_token?: string | null
          kaspi_pay_merchant_id?: string | null
          kaspi_pay_webhook_secret?: string | null
          last_sign_in?: string | null
          notifications_settings?: Json | null
          oked?: string | null
          oked_name?: string | null
          onboarding_completed?: boolean | null
          org_form?: string | null
          phone?: string | null
          position?: string | null
          preferred_username?: string | null
          purposes?: string[] | null
          remember_credentials?: boolean | null
          role?: string | null
          services?: Json | null
          signature_url?: string | null
          social_links?: Json | null
          stamp_url?: string | null
          subscription_plan?: string | null
          tax_office_code?: string | null
          tax_regime?: string | null
          trial_ends_at?: string | null
          ui_preferences?: Json
          updated_at?: string | null
          username?: string | null
          vat_registered?: boolean | null
        }
        Relationships: []
      }
      provisions: {
        Row: {
          amount: number
          balance: number
          client_id: string
          created_at: string
          description: string | null
          employee_id: string | null
          id: string
          linked_ledger_entry: string | null
          meta: Json
          period: string
          provision_type: string
          updated_at: string
        }
        Insert: {
          amount?: number
          balance?: number
          client_id: string
          created_at?: string
          description?: string | null
          employee_id?: string | null
          id?: string
          linked_ledger_entry?: string | null
          meta?: Json
          period: string
          provision_type: string
          updated_at?: string
        }
        Update: {
          amount?: number
          balance?: number
          client_id?: string
          created_at?: string
          description?: string | null
          employee_id?: string | null
          id?: string
          linked_ledger_entry?: string | null
          meta?: Json
          period?: string
          provision_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "provisions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "accountant_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      push_notifications_log: {
        Row: {
          article_id: string | null
          body: string
          created_at: string
          failed_count: number | null
          id: string
          notification_type: string
          sent_by: string | null
          sent_to_count: number | null
          title: string
          url: string | null
        }
        Insert: {
          article_id?: string | null
          body: string
          created_at?: string
          failed_count?: number | null
          id?: string
          notification_type?: string
          sent_by?: string | null
          sent_to_count?: number | null
          title: string
          url?: string | null
        }
        Update: {
          article_id?: string | null
          body?: string
          created_at?: string
          failed_count?: number | null
          id?: string
          notification_type?: string
          sent_by?: string | null
          sent_to_count?: number | null
          title?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "push_notifications_log_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      push_subscriptions: {
        Row: {
          auth_key: string
          created_at: string
          endpoint: string
          id: string
          p256dh: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          auth_key: string
          created_at?: string
          endpoint: string
          id?: string
          p256dh: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          auth_key?: string
          created_at?: string
          endpoint?: string
          id?: string
          p256dh?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      record_document_links: {
        Row: {
          created_at: string | null
          document_id: string
          id: string
          is_confirmed: boolean | null
          link_type: string
          match_confidence: number | null
          record_id: string
        }
        Insert: {
          created_at?: string | null
          document_id: string
          id?: string
          is_confirmed?: boolean | null
          link_type: string
          match_confidence?: number | null
          record_id: string
        }
        Update: {
          created_at?: string | null
          document_id?: string
          id?: string
          is_confirmed?: boolean | null
          link_type?: string
          match_confidence?: number | null
          record_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "record_document_links_record_id_fkey"
            columns: ["record_id"]
            isOneToOne: false
            referencedRelation: "income_expense_records"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_balances: {
        Row: {
          cash_balance: number
          cash_unlocked: boolean
          created_at: string
          credit_balance: number
          id: string
          paid_referrals_count: number
          total_earned: number
          total_withdrawn: number
          updated_at: string
          user_id: string
        }
        Insert: {
          cash_balance?: number
          cash_unlocked?: boolean
          created_at?: string
          credit_balance?: number
          id?: string
          paid_referrals_count?: number
          total_earned?: number
          total_withdrawn?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          cash_balance?: number
          cash_unlocked?: boolean
          created_at?: string
          credit_balance?: number
          id?: string
          paid_referrals_count?: number
          total_earned?: number
          total_withdrawn?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      referral_codes: {
        Row: {
          code: string
          created_at: string
          id: string
          is_active: boolean
          program_type: string
          total_clicks: number
          updated_at: string
          user_id: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          is_active?: boolean
          program_type?: string
          total_clicks?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          is_active?: boolean
          program_type?: string
          total_clicks?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      referral_payouts: {
        Row: {
          admin_notes: string | null
          amount: number
          created_at: string
          id: string
          payout_details: string
          payout_method: string
          processed_at: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          amount: number
          created_at?: string
          id?: string
          payout_details: string
          payout_method?: string
          processed_at?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          amount?: number
          created_at?: string
          id?: string
          payout_details?: string
          payout_method?: string
          processed_at?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      referral_rewards: {
        Row: {
          commission_percent: number
          created_at: string
          id: string
          notes: string | null
          payment_amount: number
          referral_id: string
          referred_id: string
          referrer_id: string
          reward_amount: number
          reward_type: string
          subscription_code: string | null
        }
        Insert: {
          commission_percent: number
          created_at?: string
          id?: string
          notes?: string | null
          payment_amount: number
          referral_id: string
          referred_id: string
          referrer_id: string
          reward_amount: number
          reward_type: string
          subscription_code?: string | null
        }
        Update: {
          commission_percent?: number
          created_at?: string
          id?: string
          notes?: string | null
          payment_amount?: number
          referral_id?: string
          referred_id?: string
          referrer_id?: string
          reward_amount?: number
          reward_type?: string
          subscription_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referral_rewards_referral_id_fkey"
            columns: ["referral_id"]
            isOneToOne: false
            referencedRelation: "referrals"
            referencedColumns: ["id"]
          },
        ]
      }
      referrals: {
        Row: {
          created_at: string
          first_payment_at: string | null
          id: string
          payment_count: number
          referral_code: string
          referred_id: string
          referrer_id: string
          status: string
          total_paid_amount: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          first_payment_at?: string | null
          id?: string
          payment_count?: number
          referral_code: string
          referred_id: string
          referrer_id: string
          status?: string
          total_paid_amount?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          first_payment_at?: string | null
          id?: string
          payment_count?: number
          referral_code?: string
          referred_id?: string
          referrer_id?: string
          status?: string
          total_paid_amount?: number
          updated_at?: string
        }
        Relationships: []
      }
      registrations_shymkent: {
        Row: {
          city: string | null
          created_at: string | null
          email: string | null
          email_confirmation: boolean | null
          full_name: string | null
          id: string | null
          phone: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string | null
          email?: string | null
          email_confirmation?: boolean | null
          full_name?: string | null
          id?: string | null
          phone?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string | null
          email?: string | null
          email_confirmation?: boolean | null
          full_name?: string | null
          id?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      report_drafts: {
        Row: {
          attached_documents: string[] | null
          blocking_issues: string[] | null
          calculated_expenses: number | null
          calculated_income: number | null
          calculated_tax: number | null
          created_at: string | null
          expense_breakdown: Json | null
          export_data: Json | null
          filing_instructions: Json | null
          id: string
          income_breakdown: Json | null
          missing_data: string[] | null
          pdf_preview_url: string | null
          period_id: string | null
          profile_id: string
          readiness_score: number | null
          report_period: string
          report_type: string
          required_documents: Json | null
          status: string | null
          submitted_at: string | null
          tax_base: number | null
          updated_at: string | null
          warnings: string[] | null
        }
        Insert: {
          attached_documents?: string[] | null
          blocking_issues?: string[] | null
          calculated_expenses?: number | null
          calculated_income?: number | null
          calculated_tax?: number | null
          created_at?: string | null
          expense_breakdown?: Json | null
          export_data?: Json | null
          filing_instructions?: Json | null
          id?: string
          income_breakdown?: Json | null
          missing_data?: string[] | null
          pdf_preview_url?: string | null
          period_id?: string | null
          profile_id: string
          readiness_score?: number | null
          report_period: string
          report_type: string
          required_documents?: Json | null
          status?: string | null
          submitted_at?: string | null
          tax_base?: number | null
          updated_at?: string | null
          warnings?: string[] | null
        }
        Update: {
          attached_documents?: string[] | null
          blocking_issues?: string[] | null
          calculated_expenses?: number | null
          calculated_income?: number | null
          calculated_tax?: number | null
          created_at?: string | null
          expense_breakdown?: Json | null
          export_data?: Json | null
          filing_instructions?: Json | null
          id?: string
          income_breakdown?: Json | null
          missing_data?: string[] | null
          pdf_preview_url?: string | null
          period_id?: string | null
          profile_id?: string
          readiness_score?: number | null
          report_period?: string
          report_type?: string
          required_documents?: Json | null
          status?: string | null
          submitted_at?: string | null
          tax_base?: number | null
          updated_at?: string | null
          warnings?: string[] | null
        }
        Relationships: []
      }
      search_queries: {
        Row: {
          clicked_result: string | null
          created_at: string
          id: string
          query: string
          results_count: number | null
          session_id: string
          user_id: string | null
        }
        Insert: {
          clicked_result?: string | null
          created_at?: string
          id?: string
          query: string
          results_count?: number | null
          session_id: string
          user_id?: string | null
        }
        Update: {
          clicked_result?: string | null
          created_at?: string
          id?: string
          query?: string
          results_count?: number | null
          session_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      shymkent_registor: {
        Row: {
          city: string | null
          created_at: string
          email: string
          email_confirmation: boolean | null
          full_name: string
          id: string
          phone: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string
          email: string
          email_confirmation?: boolean | null
          full_name: string
          id?: string
          phone?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string
          email?: string
          email_confirmation?: boolean | null
          full_name?: string
          id?: string
          phone?: string | null
        }
        Relationships: []
      }
      signature_audit_log: {
        Row: {
          created_at: string
          device_info: Json | null
          event_type: string
          id: string
          ip_address: string | null
          metadata: Json | null
          signature_id: string
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          device_info?: Json | null
          event_type: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          signature_id: string
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          device_info?: Json | null
          event_type?: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          signature_id?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      site_feedback: {
        Row: {
          admin_notes: string | null
          created_at: string
          email: string | null
          id: string
          message: string
          name: string | null
          status: string
          subject: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          email?: string | null
          id?: string
          message: string
          name?: string | null
          status?: string
          subject: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          email?: string | null
          id?: string
          message?: string
          name?: string | null
          status?: string
          subject?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      social_shares: {
        Row: {
          article_id: string
          created_at: string | null
          id: string
          last_shared: string | null
          platform: string
          share_count: number | null
        }
        Insert: {
          article_id: string
          created_at?: string | null
          id?: string
          last_shared?: string | null
          platform: string
          share_count?: number | null
        }
        Update: {
          article_id?: string
          created_at?: string | null
          id?: string
          last_shared?: string | null
          platform?: string
          share_count?: number | null
        }
        Relationships: []
      }
      subscription_codes: {
        Row: {
          activated_at: string | null
          activated_by: string | null
          code: string
          created_at: string
          id: string
          plan_tier: string
          rejection_reason: string | null
          status: string
          subscription_end: string | null
          telegram_username: string | null
          updated_at: string
          user_email: string | null
          user_id: string
          user_name: string | null
        }
        Insert: {
          activated_at?: string | null
          activated_by?: string | null
          code?: string
          created_at?: string
          id?: string
          plan_tier?: string
          rejection_reason?: string | null
          status?: string
          subscription_end?: string | null
          telegram_username?: string | null
          updated_at?: string
          user_email?: string | null
          user_id: string
          user_name?: string | null
        }
        Update: {
          activated_at?: string | null
          activated_by?: string | null
          code?: string
          created_at?: string
          id?: string
          plan_tier?: string
          rejection_reason?: string | null
          status?: string
          subscription_end?: string | null
          telegram_username?: string | null
          updated_at?: string
          user_email?: string | null
          user_id?: string
          user_name?: string | null
        }
        Relationships: []
      }
      tax_alerts: {
        Row: {
          action_required: string | null
          action_url: string | null
          ai_confidence: number | null
          alert_type: string
          created_at: string
          id: string
          is_dismissed: boolean | null
          is_read: boolean | null
          is_resolved: boolean | null
          message: string
          period_id: string | null
          profile_id: string | null
          related_data: Json | null
          resolved_at: string | null
          severity: string
          title: string
          user_id: string
        }
        Insert: {
          action_required?: string | null
          action_url?: string | null
          ai_confidence?: number | null
          alert_type: string
          created_at?: string
          id?: string
          is_dismissed?: boolean | null
          is_read?: boolean | null
          is_resolved?: boolean | null
          message: string
          period_id?: string | null
          profile_id?: string | null
          related_data?: Json | null
          resolved_at?: string | null
          severity?: string
          title: string
          user_id: string
        }
        Update: {
          action_required?: string | null
          action_url?: string | null
          ai_confidence?: number | null
          alert_type?: string
          created_at?: string
          id?: string
          is_dismissed?: boolean | null
          is_read?: boolean | null
          is_resolved?: boolean | null
          message?: string
          period_id?: string | null
          profile_id?: string | null
          related_data?: Json | null
          resolved_at?: string | null
          severity?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tax_alerts_period_id_fkey"
            columns: ["period_id"]
            isOneToOne: false
            referencedRelation: "tax_periods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tax_alerts_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "tax_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tax_check_results: {
        Row: {
          action_plan: Json | null
          check_type: string
          checked_at: string | null
          confidence_score: number | null
          critical_count: number | null
          discrepancies: Json | null
          documents_analyzed: number | null
          id: string
          issues: Json
          issues_count: number | null
          overall_status: string
          period_id: string
          processing_time_ms: number | null
          profile_id: string
          recommendations: Json | null
          warnings_count: number | null
        }
        Insert: {
          action_plan?: Json | null
          check_type: string
          checked_at?: string | null
          confidence_score?: number | null
          critical_count?: number | null
          discrepancies?: Json | null
          documents_analyzed?: number | null
          id?: string
          issues?: Json
          issues_count?: number | null
          overall_status: string
          period_id: string
          processing_time_ms?: number | null
          profile_id: string
          recommendations?: Json | null
          warnings_count?: number | null
        }
        Update: {
          action_plan?: Json | null
          check_type?: string
          checked_at?: string | null
          confidence_score?: number | null
          critical_count?: number | null
          discrepancies?: Json | null
          documents_analyzed?: number | null
          id?: string
          issues?: Json
          issues_count?: number | null
          overall_status?: string
          period_id?: string
          processing_time_ms?: number | null
          profile_id?: string
          recommendations?: Json | null
          warnings_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tax_check_results_period_id_fkey"
            columns: ["period_id"]
            isOneToOne: false
            referencedRelation: "tax_periods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tax_check_results_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "tax_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tax_deadline_events: {
        Row: {
          completed_at: string | null
          created_at: string | null
          days_until: number | null
          description: string | null
          due_date: string
          event_type: string
          id: string
          is_recurring: boolean | null
          legal_reference: string | null
          period_id: string | null
          priority: string | null
          profile_id: string
          recurrence_pattern: string | null
          related_task_id: string | null
          reminder_date: string | null
          status: string | null
          title: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          days_until?: number | null
          description?: string | null
          due_date: string
          event_type: string
          id?: string
          is_recurring?: boolean | null
          legal_reference?: string | null
          period_id?: string | null
          priority?: string | null
          profile_id: string
          recurrence_pattern?: string | null
          related_task_id?: string | null
          reminder_date?: string | null
          status?: string | null
          title: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          days_until?: number | null
          description?: string | null
          due_date?: string
          event_type?: string
          id?: string
          is_recurring?: boolean | null
          legal_reference?: string | null
          period_id?: string | null
          priority?: string | null
          profile_id?: string
          recurrence_pattern?: string | null
          related_task_id?: string | null
          reminder_date?: string | null
          status?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "tax_deadline_events_period_id_fkey"
            columns: ["period_id"]
            isOneToOne: false
            referencedRelation: "tax_periods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tax_deadline_events_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "tax_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tax_deadline_events_related_task_id_fkey"
            columns: ["related_task_id"]
            isOneToOne: false
            referencedRelation: "tax_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      tax_documents: {
        Row: {
          ai_warnings: Json | null
          ai_weak_spots: Json | null
          amount: number | null
          audit_risk_score: number | null
          document_category: string
          document_date: string | null
          document_period: string | null
          document_type: string
          file_name: string
          file_size: number | null
          file_type: string | null
          file_url: string
          id: string
          notes: string | null
          period_id: string
          processed_at: string | null
          profile_id: string
          recognition_confidence: number | null
          recognition_status: string | null
          recognized_data: Json | null
          uploaded_at: string | null
          user_confirmed: boolean | null
          user_corrections: Json | null
          validation_issues: Json | null
          validation_status: string | null
        }
        Insert: {
          ai_warnings?: Json | null
          ai_weak_spots?: Json | null
          amount?: number | null
          audit_risk_score?: number | null
          document_category: string
          document_date?: string | null
          document_period?: string | null
          document_type: string
          file_name: string
          file_size?: number | null
          file_type?: string | null
          file_url: string
          id?: string
          notes?: string | null
          period_id: string
          processed_at?: string | null
          profile_id: string
          recognition_confidence?: number | null
          recognition_status?: string | null
          recognized_data?: Json | null
          uploaded_at?: string | null
          user_confirmed?: boolean | null
          user_corrections?: Json | null
          validation_issues?: Json | null
          validation_status?: string | null
        }
        Update: {
          ai_warnings?: Json | null
          ai_weak_spots?: Json | null
          amount?: number | null
          audit_risk_score?: number | null
          document_category?: string
          document_date?: string | null
          document_period?: string | null
          document_type?: string
          file_name?: string
          file_size?: number | null
          file_type?: string | null
          file_url?: string
          id?: string
          notes?: string | null
          period_id?: string
          processed_at?: string | null
          profile_id?: string
          recognition_confidence?: number | null
          recognition_status?: string | null
          recognized_data?: Json | null
          uploaded_at?: string | null
          user_confirmed?: boolean | null
          user_corrections?: Json | null
          validation_issues?: Json | null
          validation_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tax_documents_period_id_fkey"
            columns: ["period_id"]
            isOneToOne: false
            referencedRelation: "tax_periods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tax_documents_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "tax_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tax_documents_storage: {
        Row: {
          created_at: string
          file_name: string | null
          file_size: number | null
          file_type: string | null
          file_url: string | null
          id: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          file_name?: string | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          file_name?: string | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      tax_entries: {
        Row: {
          amount: number
          category: string | null
          counterparty: string | null
          created_at: string
          description: string | null
          document_id: string | null
          entry_date: string
          entry_type: string
          id: string
          is_verified: boolean | null
          period_id: string | null
          profile_id: string | null
          source: string | null
          updated_at: string
          user_id: string
          verification_notes: string | null
        }
        Insert: {
          amount: number
          category?: string | null
          counterparty?: string | null
          created_at?: string
          description?: string | null
          document_id?: string | null
          entry_date?: string
          entry_type: string
          id?: string
          is_verified?: boolean | null
          period_id?: string | null
          profile_id?: string | null
          source?: string | null
          updated_at?: string
          user_id: string
          verification_notes?: string | null
        }
        Update: {
          amount?: number
          category?: string | null
          counterparty?: string | null
          created_at?: string
          description?: string | null
          document_id?: string | null
          entry_date?: string
          entry_type?: string
          id?: string
          is_verified?: boolean | null
          period_id?: string | null
          profile_id?: string | null
          source?: string | null
          updated_at?: string
          user_id?: string
          verification_notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tax_entries_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "tax_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tax_entries_period_id_fkey"
            columns: ["period_id"]
            isOneToOne: false
            referencedRelation: "tax_periods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tax_entries_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "tax_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tax_evidence_packages: {
        Row: {
          completeness_score: number | null
          created_at: string | null
          documents_count: number | null
          documents_included: string[] | null
          id: string
          last_generated_at: string | null
          missing_documents: Json | null
          pdf_report_url: string | null
          period_id: string
          profile_id: string
          updated_at: string | null
          weak_points: Json | null
          zip_package_url: string | null
        }
        Insert: {
          completeness_score?: number | null
          created_at?: string | null
          documents_count?: number | null
          documents_included?: string[] | null
          id?: string
          last_generated_at?: string | null
          missing_documents?: Json | null
          pdf_report_url?: string | null
          period_id: string
          profile_id: string
          updated_at?: string | null
          weak_points?: Json | null
          zip_package_url?: string | null
        }
        Update: {
          completeness_score?: number | null
          created_at?: string | null
          documents_count?: number | null
          documents_included?: string[] | null
          id?: string
          last_generated_at?: string | null
          missing_documents?: Json | null
          pdf_report_url?: string | null
          period_id?: string
          profile_id?: string
          updated_at?: string | null
          weak_points?: Json | null
          zip_package_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tax_evidence_packages_period_id_fkey"
            columns: ["period_id"]
            isOneToOne: false
            referencedRelation: "tax_periods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tax_evidence_packages_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "tax_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tax_forms: {
        Row: {
          created_at: string
          deadline: string
          form_data: Json | null
          form_type: string
          id: string
          period: string
          status: string
          submitted_at: string | null
          tax_amount: number | null
          total_expense: number | null
          total_income: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          deadline: string
          form_data?: Json | null
          form_type: string
          id?: string
          period: string
          status?: string
          submitted_at?: string | null
          tax_amount?: number | null
          total_expense?: number | null
          total_income?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          deadline?: string
          form_data?: Json | null
          form_type?: string
          id?: string
          period?: string
          status?: string
          submitted_at?: string | null
          tax_amount?: number | null
          total_expense?: number | null
          total_income?: number | null
          user_id?: string
        }
        Relationships: []
      }
      tax_health_snapshots: {
        Row: {
          compliance_score: number | null
          created_at: string
          documentation_score: number | null
          id: string
          limit_score: number | null
          open_risks: number | null
          overall_score: number | null
          payment_score: number | null
          profile_id: string | null
          resolved_risks: number | null
          risk_details: Json | null
          risk_level: string | null
          snapshot_date: string
          status_phrase: string | null
          status_phrase_detail: string | null
          top_actions: Json | null
          user_id: string
          ytd_income: number | null
          ytd_limit_usage_percent: number | null
          ytd_tax_paid: number | null
        }
        Insert: {
          compliance_score?: number | null
          created_at?: string
          documentation_score?: number | null
          id?: string
          limit_score?: number | null
          open_risks?: number | null
          overall_score?: number | null
          payment_score?: number | null
          profile_id?: string | null
          resolved_risks?: number | null
          risk_details?: Json | null
          risk_level?: string | null
          snapshot_date?: string
          status_phrase?: string | null
          status_phrase_detail?: string | null
          top_actions?: Json | null
          user_id: string
          ytd_income?: number | null
          ytd_limit_usage_percent?: number | null
          ytd_tax_paid?: number | null
        }
        Update: {
          compliance_score?: number | null
          created_at?: string
          documentation_score?: number | null
          id?: string
          limit_score?: number | null
          open_risks?: number | null
          overall_score?: number | null
          payment_score?: number | null
          profile_id?: string | null
          resolved_risks?: number | null
          risk_details?: Json | null
          risk_level?: string | null
          snapshot_date?: string
          status_phrase?: string | null
          status_phrase_detail?: string | null
          top_actions?: Json | null
          user_id?: string
          ytd_income?: number | null
          ytd_limit_usage_percent?: number | null
          ytd_tax_paid?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tax_health_snapshots_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "tax_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tax_knowledge_base: {
        Row: {
          category: string | null
          content: string
          created_at: string
          embedding: string | null
          id: string
          keywords: string[] | null
          section_number: string | null
          section_title: string
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string
          embedding?: string | null
          id?: string
          keywords?: string[] | null
          section_number?: string | null
          section_title: string
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string
          embedding?: string | null
          id?: string
          keywords?: string[] | null
          section_number?: string | null
          section_title?: string
        }
        Relationships: []
      }
      tax_notifications: {
        Row: {
          ai_explanation: string | null
          ai_summary: string | null
          deadline: string | null
          draft_response: string | null
          id: string
          notification_type: string | null
          original_document_id: string | null
          profile_id: string
          received_at: string | null
          required_actions: Json | null
          required_documents: Json | null
          resolved_at: string | null
          responded_at: string | null
          response_document_id: string | null
          status: string | null
          subject: string | null
          urgency: string | null
        }
        Insert: {
          ai_explanation?: string | null
          ai_summary?: string | null
          deadline?: string | null
          draft_response?: string | null
          id?: string
          notification_type?: string | null
          original_document_id?: string | null
          profile_id: string
          received_at?: string | null
          required_actions?: Json | null
          required_documents?: Json | null
          resolved_at?: string | null
          responded_at?: string | null
          response_document_id?: string | null
          status?: string | null
          subject?: string | null
          urgency?: string | null
        }
        Update: {
          ai_explanation?: string | null
          ai_summary?: string | null
          deadline?: string | null
          draft_response?: string | null
          id?: string
          notification_type?: string | null
          original_document_id?: string | null
          profile_id?: string
          received_at?: string | null
          required_actions?: Json | null
          required_documents?: Json | null
          resolved_at?: string | null
          responded_at?: string | null
          response_document_id?: string | null
          status?: string | null
          subject?: string | null
          urgency?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tax_notifications_original_document_id_fkey"
            columns: ["original_document_id"]
            isOneToOne: false
            referencedRelation: "tax_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tax_notifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "tax_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tax_notifications_response_document_id_fkey"
            columns: ["response_document_id"]
            isOneToOne: false
            referencedRelation: "tax_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      tax_os_users: {
        Row: {
          active_sessions: number
          bin_iin: string | null
          company: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          last_active_at: string
          onboarding_completed_at: string | null
          onboarding_started_at: string
          org_form: string | null
          purposes: string[] | null
          role: string | null
          source: string | null
          status: string
          tax_regime: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          active_sessions?: number
          bin_iin?: string | null
          company?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          last_active_at?: string
          onboarding_completed_at?: string | null
          onboarding_started_at?: string
          org_form?: string | null
          purposes?: string[] | null
          role?: string | null
          source?: string | null
          status?: string
          tax_regime?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          active_sessions?: number
          bin_iin?: string | null
          company?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          last_active_at?: string
          onboarding_completed_at?: string | null
          onboarding_started_at?: string
          org_form?: string | null
          purposes?: string[] | null
          role?: string | null
          source?: string | null
          status?: string
          tax_regime?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      tax_payments: {
        Row: {
          amount: number
          confirmed_manually: boolean | null
          created_at: string
          deadline: string | null
          id: string
          kbk: string | null
          paid_at: string | null
          payment_ref: string | null
          period: string
          status: string
          tax_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount?: number
          confirmed_manually?: boolean | null
          created_at?: string
          deadline?: string | null
          id?: string
          kbk?: string | null
          paid_at?: string | null
          payment_ref?: string | null
          period: string
          status?: string
          tax_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          confirmed_manually?: boolean | null
          created_at?: string
          deadline?: string | null
          id?: string
          kbk?: string | null
          paid_at?: string | null
          payment_ref?: string | null
          period?: string
          status?: string
          tax_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      tax_periods: {
        Row: {
          audit_readiness_phrase: string | null
          check_result: Json | null
          closed_at: string | null
          created_at: string | null
          documents_required: number | null
          documents_uploaded: number | null
          end_date: string
          health_score: number | null
          id: string
          income_change_percent: number | null
          issues_count: number | null
          last_check_at: string | null
          period_label: string
          period_number: number
          period_type: string
          period_year: number
          prev_period_income: number | null
          prev_period_taxes: number | null
          profile_id: string
          start_date: string
          status: string
          status_color: string | null
          tasks_completed: number | null
          tasks_total: number | null
          taxes_change_percent: number | null
          taxes_due: number | null
          taxes_paid: number | null
          total_expenses: number | null
          total_income: number | null
          turnover_limit: number | null
          turnover_percentage: number | null
          turnover_used: number | null
          updated_at: string | null
          warnings_count: number | null
        }
        Insert: {
          audit_readiness_phrase?: string | null
          check_result?: Json | null
          closed_at?: string | null
          created_at?: string | null
          documents_required?: number | null
          documents_uploaded?: number | null
          end_date: string
          health_score?: number | null
          id?: string
          income_change_percent?: number | null
          issues_count?: number | null
          last_check_at?: string | null
          period_label: string
          period_number: number
          period_type: string
          period_year: number
          prev_period_income?: number | null
          prev_period_taxes?: number | null
          profile_id: string
          start_date: string
          status?: string
          status_color?: string | null
          tasks_completed?: number | null
          tasks_total?: number | null
          taxes_change_percent?: number | null
          taxes_due?: number | null
          taxes_paid?: number | null
          total_expenses?: number | null
          total_income?: number | null
          turnover_limit?: number | null
          turnover_percentage?: number | null
          turnover_used?: number | null
          updated_at?: string | null
          warnings_count?: number | null
        }
        Update: {
          audit_readiness_phrase?: string | null
          check_result?: Json | null
          closed_at?: string | null
          created_at?: string | null
          documents_required?: number | null
          documents_uploaded?: number | null
          end_date?: string
          health_score?: number | null
          id?: string
          income_change_percent?: number | null
          issues_count?: number | null
          last_check_at?: string | null
          period_label?: string
          period_number?: number
          period_type?: string
          period_year?: number
          prev_period_income?: number | null
          prev_period_taxes?: number | null
          profile_id?: string
          start_date?: string
          status?: string
          status_color?: string | null
          tasks_completed?: number | null
          tasks_total?: number | null
          taxes_change_percent?: number | null
          taxes_due?: number | null
          taxes_paid?: number | null
          total_expenses?: number | null
          total_income?: number | null
          turnover_limit?: number | null
          turnover_percentage?: number | null
          turnover_used?: number | null
          updated_at?: string | null
          warnings_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tax_periods_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "tax_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tax_profiles: {
        Row: {
          activity_description: string | null
          activity_type: string | null
          bin_iin: string | null
          business_type: string
          client_type: string | null
          company_name: string | null
          created_at: string | null
          employee_count: number | null
          has_contractors: boolean | null
          has_employees: boolean | null
          has_ved: boolean | null
          id: string
          last_updated_at: string | null
          monthly_payroll_range: string | null
          monthly_turnover_range: string | null
          okeds: string[] | null
          payment_methods: string[] | null
          profile_completeness: number | null
          regime_confirmed: boolean | null
          region: string | null
          registration_date: string | null
          risk_factors: string[] | null
          tax_regime: string | null
          trade_points_count: number | null
          user_id: string
          vat_registration_date: string | null
          vat_status: string | null
          yearly_turnover_estimate: number | null
        }
        Insert: {
          activity_description?: string | null
          activity_type?: string | null
          bin_iin?: string | null
          business_type: string
          client_type?: string | null
          company_name?: string | null
          created_at?: string | null
          employee_count?: number | null
          has_contractors?: boolean | null
          has_employees?: boolean | null
          has_ved?: boolean | null
          id?: string
          last_updated_at?: string | null
          monthly_payroll_range?: string | null
          monthly_turnover_range?: string | null
          okeds?: string[] | null
          payment_methods?: string[] | null
          profile_completeness?: number | null
          regime_confirmed?: boolean | null
          region?: string | null
          registration_date?: string | null
          risk_factors?: string[] | null
          tax_regime?: string | null
          trade_points_count?: number | null
          user_id: string
          vat_registration_date?: string | null
          vat_status?: string | null
          yearly_turnover_estimate?: number | null
        }
        Update: {
          activity_description?: string | null
          activity_type?: string | null
          bin_iin?: string | null
          business_type?: string
          client_type?: string | null
          company_name?: string | null
          created_at?: string | null
          employee_count?: number | null
          has_contractors?: boolean | null
          has_employees?: boolean | null
          has_ved?: boolean | null
          id?: string
          last_updated_at?: string | null
          monthly_payroll_range?: string | null
          monthly_turnover_range?: string | null
          okeds?: string[] | null
          payment_methods?: string[] | null
          profile_completeness?: number | null
          regime_confirmed?: boolean | null
          region?: string | null
          registration_date?: string | null
          risk_factors?: string[] | null
          tax_regime?: string | null
          trade_points_count?: number | null
          user_id?: string
          vat_registration_date?: string | null
          vat_status?: string | null
          yearly_turnover_estimate?: number | null
        }
        Relationships: []
      }
      tax_tasks: {
        Row: {
          completed_at: string | null
          completed_by: string | null
          created_at: string | null
          days_until_due: number | null
          description: string | null
          due_date: string | null
          id: string
          is_auto_generated: boolean | null
          is_overdue: boolean | null
          order_index: number | null
          period_id: string
          priority: string | null
          profile_id: string
          related_document_id: string | null
          related_document_type: string | null
          status: string | null
          task_type: string
          title: string
        }
        Insert: {
          completed_at?: string | null
          completed_by?: string | null
          created_at?: string | null
          days_until_due?: number | null
          description?: string | null
          due_date?: string | null
          id?: string
          is_auto_generated?: boolean | null
          is_overdue?: boolean | null
          order_index?: number | null
          period_id: string
          priority?: string | null
          profile_id: string
          related_document_id?: string | null
          related_document_type?: string | null
          status?: string | null
          task_type: string
          title: string
        }
        Update: {
          completed_at?: string | null
          completed_by?: string | null
          created_at?: string | null
          days_until_due?: number | null
          description?: string | null
          due_date?: string | null
          id?: string
          is_auto_generated?: boolean | null
          is_overdue?: boolean | null
          order_index?: number | null
          period_id?: string
          priority?: string | null
          profile_id?: string
          related_document_id?: string | null
          related_document_type?: string | null
          status?: string | null
          task_type?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "tax_tasks_period_id_fkey"
            columns: ["period_id"]
            isOneToOne: false
            referencedRelation: "tax_periods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tax_tasks_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "tax_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tax_tasks_related_document_id_fkey"
            columns: ["related_document_id"]
            isOneToOne: false
            referencedRelation: "tax_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      team_invitations: {
        Row: {
          accepted_at: string | null
          accepted_by: string | null
          created_at: string
          expires_at: string
          id: string
          invitee_email: string | null
          invitee_name: string | null
          max_uses: number
          owner_id: string
          permissions: Json
          role_preset: Database["public"]["Enums"]["team_role_preset"]
          status: Database["public"]["Enums"]["team_invitation_status"]
          token: string
          updated_at: string
          uses_count: number
        }
        Insert: {
          accepted_at?: string | null
          accepted_by?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          invitee_email?: string | null
          invitee_name?: string | null
          max_uses?: number
          owner_id: string
          permissions?: Json
          role_preset?: Database["public"]["Enums"]["team_role_preset"]
          status?: Database["public"]["Enums"]["team_invitation_status"]
          token: string
          updated_at?: string
          uses_count?: number
        }
        Update: {
          accepted_at?: string | null
          accepted_by?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          invitee_email?: string | null
          invitee_name?: string | null
          max_uses?: number
          owner_id?: string
          permissions?: Json
          role_preset?: Database["public"]["Enums"]["team_role_preset"]
          status?: Database["public"]["Enums"]["team_invitation_status"]
          token?: string
          updated_at?: string
          uses_count?: number
        }
        Relationships: []
      }
      team_members: {
        Row: {
          created_at: string
          id: string
          last_active_at: string | null
          member_email: string | null
          member_id: string
          member_name: string | null
          owner_id: string
          permissions: Json
          role_preset: Database["public"]["Enums"]["team_role_preset"]
          status: Database["public"]["Enums"]["team_member_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_active_at?: string | null
          member_email?: string | null
          member_id: string
          member_name?: string | null
          owner_id: string
          permissions?: Json
          role_preset?: Database["public"]["Enums"]["team_role_preset"]
          status?: Database["public"]["Enums"]["team_member_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          last_active_at?: string | null
          member_email?: string | null
          member_id?: string
          member_name?: string | null
          owner_id?: string
          permissions?: Json
          role_preset?: Database["public"]["Enums"]["team_role_preset"]
          status?: Database["public"]["Enums"]["team_member_status"]
          updated_at?: string
        }
        Relationships: []
      }
      technical_documents: {
        Row: {
          category: string
          created_at: string
          description: string | null
          download_count: number | null
          file_name: string
          file_size: number
          file_type: string
          file_url: string
          id: string
          last_downloaded_at: string | null
          metadata: Json | null
          print_ready: boolean | null
          status: string
          subcategory: string | null
          tags: string[] | null
          technical_specs: Json | null
          title: string
          updated_at: string
          uploaded_by: string
          version: number
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          download_count?: number | null
          file_name: string
          file_size: number
          file_type: string
          file_url: string
          id?: string
          last_downloaded_at?: string | null
          metadata?: Json | null
          print_ready?: boolean | null
          status?: string
          subcategory?: string | null
          tags?: string[] | null
          technical_specs?: Json | null
          title: string
          updated_at?: string
          uploaded_by: string
          version?: number
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          download_count?: number | null
          file_name?: string
          file_size?: number
          file_type?: string
          file_url?: string
          id?: string
          last_downloaded_at?: string | null
          metadata?: Json | null
          print_ready?: boolean | null
          status?: string
          subcategory?: string | null
          tags?: string[] | null
          technical_specs?: Json | null
          title?: string
          updated_at?: string
          uploaded_by?: string
          version?: number
        }
        Relationships: []
      }
      telegram_ai_messages: {
        Row: {
          chat_id: number
          content: string
          created_at: string
          id: string
          role: string
          user_id: string | null
        }
        Insert: {
          chat_id: number
          content: string
          created_at?: string
          id?: string
          role: string
          user_id?: string | null
        }
        Update: {
          chat_id?: number
          content?: string
          created_at?: string
          id?: string
          role?: string
          user_id?: string | null
        }
        Relationships: []
      }
      telegram_bot_state: {
        Row: {
          id: number
          update_offset: number
          updated_at: string
        }
        Insert: {
          id: number
          update_offset?: number
          updated_at?: string
        }
        Update: {
          id?: number
          update_offset?: number
          updated_at?: string
        }
        Relationships: []
      }
      telegram_connections: {
        Row: {
          ai_chat_enabled: boolean
          bot_language: string
          bot_tone: string
          commands_enabled: boolean
          connected_at: string | null
          connection_token: string
          created_at: string | null
          custom_instructions: string | null
          digest_hour: number
          id: string
          is_connected: boolean | null
          notify_bot_booking_cancel: boolean
          notify_bot_daily_summary: boolean
          notify_bot_help_needed: boolean
          notify_bot_negative_feedback: boolean
          notify_bot_new_booking: boolean
          notify_bot_new_lead: boolean
          notify_bot_payment_due: boolean
          notify_daily_digest: boolean | null
          notify_deadlines: boolean | null
          notify_new_transactions: boolean | null
          notify_tax_alerts: boolean | null
          notify_weekends: boolean
          notify_weekly_summary: boolean | null
          quiet_hours_end: number
          quiet_hours_start: number
          revoked_at: string | null
          telegram_chat_id: number | null
          telegram_username: string | null
          token_expires_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          ai_chat_enabled?: boolean
          bot_language?: string
          bot_tone?: string
          commands_enabled?: boolean
          connected_at?: string | null
          connection_token: string
          created_at?: string | null
          custom_instructions?: string | null
          digest_hour?: number
          id?: string
          is_connected?: boolean | null
          notify_bot_booking_cancel?: boolean
          notify_bot_daily_summary?: boolean
          notify_bot_help_needed?: boolean
          notify_bot_negative_feedback?: boolean
          notify_bot_new_booking?: boolean
          notify_bot_new_lead?: boolean
          notify_bot_payment_due?: boolean
          notify_daily_digest?: boolean | null
          notify_deadlines?: boolean | null
          notify_new_transactions?: boolean | null
          notify_tax_alerts?: boolean | null
          notify_weekends?: boolean
          notify_weekly_summary?: boolean | null
          quiet_hours_end?: number
          quiet_hours_start?: number
          revoked_at?: string | null
          telegram_chat_id?: number | null
          telegram_username?: string | null
          token_expires_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          ai_chat_enabled?: boolean
          bot_language?: string
          bot_tone?: string
          commands_enabled?: boolean
          connected_at?: string | null
          connection_token?: string
          created_at?: string | null
          custom_instructions?: string | null
          digest_hour?: number
          id?: string
          is_connected?: boolean | null
          notify_bot_booking_cancel?: boolean
          notify_bot_daily_summary?: boolean
          notify_bot_help_needed?: boolean
          notify_bot_negative_feedback?: boolean
          notify_bot_new_booking?: boolean
          notify_bot_new_lead?: boolean
          notify_bot_payment_due?: boolean
          notify_daily_digest?: boolean | null
          notify_deadlines?: boolean | null
          notify_new_transactions?: boolean | null
          notify_tax_alerts?: boolean | null
          notify_weekends?: boolean
          notify_weekly_summary?: boolean | null
          quiet_hours_end?: number
          quiet_hours_start?: number
          revoked_at?: string | null
          telegram_chat_id?: number | null
          telegram_username?: string | null
          token_expires_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      telegram_deadline_actions: {
        Row: {
          action: string
          created_at: string
          event_id: string
          id: string
          snoozed_until: string | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          event_id: string
          id?: string
          snoozed_until?: string | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          event_id?: string
          id?: string
          snoozed_until?: string | null
          user_id?: string
        }
        Relationships: []
      }
      telegram_forum_sessions: {
        Row: {
          chat_id: number
          city: string | null
          comment: string | null
          created_at: string
          email: string | null
          full_name: string | null
          position: string | null
          step: string
          updated_at: string
          username: string | null
        }
        Insert: {
          chat_id: number
          city?: string | null
          comment?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          position?: string | null
          step?: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          chat_id?: number
          city?: string | null
          comment?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          position?: string | null
          step?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      templates: {
        Row: {
          category: string
          content: string
          created_at: string
          created_by: string | null
          description: string | null
          file_name: string | null
          file_size: number | null
          file_type: string | null
          file_url: string | null
          id: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          content: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          file_name?: string | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          file_name?: string | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      training_bot_answers: {
        Row: {
          chat_id: number | null
          correct: boolean
          course: string | null
          created_at: string
          first_try: boolean
          id: string
          lesson: string | null
          user_id: string
        }
        Insert: {
          chat_id?: number | null
          correct?: boolean
          course?: string | null
          created_at?: string
          first_try?: boolean
          id?: string
          lesson?: string | null
          user_id: string
        }
        Update: {
          chat_id?: number | null
          correct?: boolean
          course?: string | null
          created_at?: string
          first_try?: boolean
          id?: string
          lesson?: string | null
          user_id?: string
        }
        Relationships: []
      }
      training_bot_broadcasts: {
        Row: {
          audience: string
          created_at: string
          failed_count: number
          id: string
          sent_count: number
          text: string
        }
        Insert: {
          audience?: string
          created_at?: string
          failed_count?: number
          id?: string
          sent_count?: number
          text: string
        }
        Update: {
          audience?: string
          created_at?: string
          failed_count?: number
          id?: string
          sent_count?: number
          text?: string
        }
        Relationships: []
      }
      training_bot_links: {
        Row: {
          code: string
          code_expires_at: string
          connected_at: string | null
          created_at: string
          game_state: Json | null
          id: string
          last_lifehack_index: number
          last_question_index: number
          last_task_date: string | null
          pending_question: Json | null
          pref_daily_task: boolean
          pref_lifehacks: boolean
          pref_new_courses: boolean
          pref_subscription: boolean
          status: string
          streak: number
          telegram_chat_id: number | null
          telegram_first_name: string | null
          telegram_username: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          code: string
          code_expires_at?: string
          connected_at?: string | null
          created_at?: string
          game_state?: Json | null
          id?: string
          last_lifehack_index?: number
          last_question_index?: number
          last_task_date?: string | null
          pending_question?: Json | null
          pref_daily_task?: boolean
          pref_lifehacks?: boolean
          pref_new_courses?: boolean
          pref_subscription?: boolean
          status?: string
          streak?: number
          telegram_chat_id?: number | null
          telegram_first_name?: string | null
          telegram_username?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          code?: string
          code_expires_at?: string
          connected_at?: string | null
          created_at?: string
          game_state?: Json | null
          id?: string
          last_lifehack_index?: number
          last_question_index?: number
          last_task_date?: string | null
          pending_question?: Json | null
          pref_daily_task?: boolean
          pref_lifehacks?: boolean
          pref_new_courses?: boolean
          pref_subscription?: boolean
          status?: string
          streak?: number
          telegram_chat_id?: number | null
          telegram_first_name?: string | null
          telegram_username?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      training_bot_log: {
        Row: {
          chat_id: number | null
          created_at: string
          dedupe_key: string | null
          error: string | null
          id: string
          kind: string
          success: boolean
          user_id: string | null
        }
        Insert: {
          chat_id?: number | null
          created_at?: string
          dedupe_key?: string | null
          error?: string | null
          id?: string
          kind: string
          success?: boolean
          user_id?: string | null
        }
        Update: {
          chat_id?: number | null
          created_at?: string
          dedupe_key?: string | null
          error?: string | null
          id?: string
          kind?: string
          success?: boolean
          user_id?: string | null
        }
        Relationships: []
      }
      training_bot_settings: {
        Row: {
          daily_enabled: boolean
          daily_hour: number
          id: boolean
          reminders_enabled: boolean
          timezone_offset: number
          updated_at: string
        }
        Insert: {
          daily_enabled?: boolean
          daily_hour?: number
          id?: boolean
          reminders_enabled?: boolean
          timezone_offset?: number
          updated_at?: string
        }
        Update: {
          daily_enabled?: boolean
          daily_hour?: number
          id?: boolean
          reminders_enabled?: boolean
          timezone_offset?: number
          updated_at?: string
        }
        Relationships: []
      }
      training_certificate_requests: {
        Row: {
          admin_note: string | null
          course_slug: string
          course_title: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          lessons_total: number | null
          sent_at: string | null
          status: string
          user_id: string
          user_login: string | null
          user_name: string | null
        }
        Insert: {
          admin_note?: string | null
          course_slug: string
          course_title?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          lessons_total?: number | null
          sent_at?: string | null
          status?: string
          user_id: string
          user_login?: string | null
          user_name?: string | null
        }
        Update: {
          admin_note?: string | null
          course_slug?: string
          course_title?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          lessons_total?: number | null
          sent_at?: string | null
          status?: string
          user_id?: string
          user_login?: string | null
          user_name?: string | null
        }
        Relationships: []
      }
      training_chat_messages: {
        Row: {
          attachment_mime: string | null
          attachment_name: string | null
          attachment_path: string | null
          attachment_size: number | null
          chat_id: string
          content: string | null
          created_at: string
          id: string
          is_read: boolean
          sender_id: string
          sender_type: string
        }
        Insert: {
          attachment_mime?: string | null
          attachment_name?: string | null
          attachment_path?: string | null
          attachment_size?: number | null
          chat_id: string
          content?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          sender_id: string
          sender_type: string
        }
        Update: {
          attachment_mime?: string | null
          attachment_name?: string | null
          attachment_path?: string | null
          attachment_size?: number | null
          chat_id?: string
          content?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          sender_id?: string
          sender_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_chat_messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "training_chats"
            referencedColumns: ["id"]
          },
        ]
      }
      training_chats: {
        Row: {
          assigned_accountant_id: string | null
          created_at: string
          id: string
          last_message_at: string
          last_message_preview: string | null
          status: string
          unread_for_accountant: number
          unread_for_user: number
          updated_at: string
          video_user_id: string
        }
        Insert: {
          assigned_accountant_id?: string | null
          created_at?: string
          id?: string
          last_message_at?: string
          last_message_preview?: string | null
          status?: string
          unread_for_accountant?: number
          unread_for_user?: number
          updated_at?: string
          video_user_id: string
        }
        Update: {
          assigned_accountant_id?: string | null
          created_at?: string
          id?: string
          last_message_at?: string
          last_message_preview?: string | null
          status?: string
          unread_for_accountant?: number
          unread_for_user?: number
          updated_at?: string
          video_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_chats_assigned_accountant_id_fkey"
            columns: ["assigned_accountant_id"]
            isOneToOne: false
            referencedRelation: "accountant_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "training_chats_video_user_id_fkey"
            columns: ["video_user_id"]
            isOneToOne: true
            referencedRelation: "video_users"
            referencedColumns: ["id"]
          },
        ]
      }
      training_course_lessons: {
        Row: {
          course_id: string
          created_at: string
          description: string | null
          id: string
          position: number
          task: string | null
          title: string
          updated_at: string
          youtube_url: string | null
        }
        Insert: {
          course_id: string
          created_at?: string
          description?: string | null
          id?: string
          position?: number
          task?: string | null
          title: string
          updated_at?: string
          youtube_url?: string | null
        }
        Update: {
          course_id?: string
          created_at?: string
          description?: string | null
          id?: string
          position?: number
          task?: string | null
          title?: string
          updated_at?: string
          youtube_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "training_course_lessons_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "training_courses"
            referencedColumns: ["id"]
          },
        ]
      }
      training_courses: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_published: boolean
          level: string
          position: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_published?: boolean
          level?: string
          position?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_published?: boolean
          level?: string
          position?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      training_homework_submissions: {
        Row: {
          admin_feedback: string | null
          course_slug: string
          created_at: string
          feedback_at: string | null
          id: string
          lesson_index: number
          status: string
          text: string
          updated_at: string
          user_id: string
          user_login: string | null
          user_name: string | null
        }
        Insert: {
          admin_feedback?: string | null
          course_slug: string
          created_at?: string
          feedback_at?: string | null
          id?: string
          lesson_index: number
          status?: string
          text: string
          updated_at?: string
          user_id: string
          user_login?: string | null
          user_name?: string | null
        }
        Update: {
          admin_feedback?: string | null
          course_slug?: string
          created_at?: string
          feedback_at?: string | null
          id?: string
          lesson_index?: number
          status?: string
          text?: string
          updated_at?: string
          user_id?: string
          user_login?: string | null
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "training_homework_submissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "video_users"
            referencedColumns: ["id"]
          },
        ]
      }
      training_lesson_videos: {
        Row: {
          course_slug: string
          created_at: string
          id: string
          lesson_index: number
          updated_at: string
          youtube_url: string | null
        }
        Insert: {
          course_slug: string
          created_at?: string
          id?: string
          lesson_index: number
          updated_at?: string
          youtube_url?: string | null
        }
        Update: {
          course_slug?: string
          created_at?: string
          id?: string
          lesson_index?: number
          updated_at?: string
          youtube_url?: string | null
        }
        Relationships: []
      }
      training_live_chat: {
        Row: {
          content: string
          created_at: string
          id: string
          name: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          name: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      training_live_stream: {
        Row: {
          description: string | null
          id: number
          is_live: boolean
          stream_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          description?: string | null
          id?: number
          is_live?: boolean
          stream_url?: string | null
          title?: string
          updated_at?: string
        }
        Update: {
          description?: string | null
          id?: number
          is_live?: boolean
          stream_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      training_quiz_progress: {
        Row: {
          course_slug: string
          created_at: string
          id: string
          lesson_index: number
          updated_at: string
          user_id: string
        }
        Insert: {
          course_slug: string
          created_at?: string
          id?: string
          lesson_index: number
          updated_at?: string
          user_id: string
        }
        Update: {
          course_slug?: string
          created_at?: string
          id?: string
          lesson_index?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      transaction_categories: {
        Row: {
          color: string | null
          created_at: string | null
          icon: string | null
          id: string
          is_system: boolean | null
          is_taxable: boolean | null
          keywords: string[] | null
          name: string
          parent_id: string | null
          profile_id: string | null
          tax_logic: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          is_system?: boolean | null
          is_taxable?: boolean | null
          keywords?: string[] | null
          name: string
          parent_id?: string | null
          profile_id?: string | null
          tax_logic?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          is_system?: boolean | null
          is_taxable?: boolean | null
          keywords?: string[] | null
          name?: string
          parent_id?: string | null
          profile_id?: string | null
          tax_logic?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transaction_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "transaction_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transaction_categories_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "tax_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          category: string
          created_at: string
          date: string
          description: string | null
          id: string
          source: string | null
          type: string
          user_id: string
        }
        Insert: {
          amount?: number
          category?: string
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          source?: string | null
          type: string
          user_id: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          source?: string | null
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      updated_community_experts: {
        Row: {
          category: string
          certificates: string[] | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
          subcategory: string | null
          updated_at: string
          whatsapp_url: string | null
        }
        Insert: {
          category?: string
          certificates?: string[] | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          subcategory?: string | null
          updated_at?: string
          whatsapp_url?: string | null
        }
        Update: {
          category?: string
          certificates?: string[] | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          subcategory?: string | null
          updated_at?: string
          whatsapp_url?: string | null
        }
        Relationships: []
      }
      updated_community_posts: {
        Row: {
          category: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          image_url: string | null
          members: number | null
          title: string
        }
        Insert: {
          category: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          members?: number | null
          title: string
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          members?: number | null
          title?: string
        }
        Relationships: []
      }
      uploaded_files: {
        Row: {
          category_id: string
          created_at: string
          file_name: string
          file_size: number
          file_type: string
          file_url: string
          id: string
          updated_at: string
          uploaded_by: string | null
        }
        Insert: {
          category_id: string
          created_at?: string
          file_name: string
          file_size: number
          file_type: string
          file_url: string
          id?: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Update: {
          category_id?: string
          created_at?: string
          file_name?: string
          file_size?: number
          file_type?: string
          file_url?: string
          id?: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Relationships: []
      }
      user_documents: {
        Row: {
          created_at: string
          file_name: string
          file_size: number | null
          file_url: string
          id: string
          name: string
          status: string
          uploaded_by: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          file_name: string
          file_size?: number | null
          file_url: string
          id?: string
          name: string
          status?: string
          uploaded_by?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          file_name?: string
          file_size?: number | null
          file_url?: string
          id?: string
          name?: string
          status?: string
          uploaded_by?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_favorites: {
        Row: {
          created_at: string
          document_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          document_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          document_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_favorites_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "technical_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      user_geography: {
        Row: {
          city: string | null
          country: string | null
          created_at: string | null
          id: string
          latitude: number | null
          longitude: number | null
          region: string | null
          session_id: string
          timezone: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          region?: string | null
          session_id: string
          timezone?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          region?: string | null
          session_id?: string
          timezone?: string | null
        }
        Relationships: []
      }
      user_interactions: {
        Row: {
          created_at: string | null
          element_selector: string | null
          element_text: string | null
          id: string
          interaction_type: string
          page_path: string
          position_x: number | null
          position_y: number | null
          scroll_depth: number | null
          session_id: string
          time_on_element: number | null
        }
        Insert: {
          created_at?: string | null
          element_selector?: string | null
          element_text?: string | null
          id?: string
          interaction_type: string
          page_path: string
          position_x?: number | null
          position_y?: number | null
          scroll_depth?: number | null
          session_id: string
          time_on_element?: number | null
        }
        Update: {
          created_at?: string | null
          element_selector?: string | null
          element_text?: string | null
          id?: string
          interaction_type?: string
          page_path?: string
          position_x?: number | null
          position_y?: number | null
          scroll_depth?: number | null
          session_id?: string
          time_on_element?: number | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          department: string
          granted_by: string | null
          id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          department?: string
          granted_by?: string | null
          id?: string
          role: string
          user_id: string
        }
        Update: {
          created_at?: string
          department?: string
          granted_by?: string | null
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          created_at: string | null
          device_info: string | null
          id: string
          last_login: string | null
          remember_me: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          device_info?: string | null
          id?: string
          last_login?: string | null
          remember_me?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          device_info?: string | null
          id?: string
          last_login?: string | null
          remember_me?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_sessions_analytics: {
        Row: {
          browser: string | null
          city: string | null
          country: string | null
          device_type: string | null
          ended_at: string | null
          entry_page: string | null
          exit_page: string | null
          id: string
          ip_address: string | null
          is_returning_visitor: boolean | null
          os: string | null
          session_id: string
          started_at: string
          total_duration_seconds: number | null
          total_pages: number | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          browser?: string | null
          city?: string | null
          country?: string | null
          device_type?: string | null
          ended_at?: string | null
          entry_page?: string | null
          exit_page?: string | null
          id?: string
          ip_address?: string | null
          is_returning_visitor?: boolean | null
          os?: string | null
          session_id: string
          started_at?: string
          total_duration_seconds?: number | null
          total_pages?: number | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          browser?: string | null
          city?: string | null
          country?: string | null
          device_type?: string | null
          ended_at?: string | null
          entry_page?: string | null
          exit_page?: string | null
          id?: string
          ip_address?: string | null
          is_returning_visitor?: boolean | null
          os?: string | null
          session_id?: string
          started_at?: string
          total_duration_seconds?: number | null
          total_pages?: number | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      video_categories: {
        Row: {
          created_at: string
          id: string
          name: string
          position: number
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          position?: number
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          position?: number
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      video_sessions: {
        Row: {
          created_at: string
          expires_at: string
          token: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at: string
          token?: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          token?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "video_users"
            referencedColumns: ["id"]
          },
        ]
      }
      video_users: {
        Row: {
          created_at: string
          id: string
          login: string
          name: string
          password_hash: string
          phone: string | null
          plan: string
          status: string
          subscription_until: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          login: string
          name: string
          password_hash: string
          phone?: string | null
          plan?: string
          status?: string
          subscription_until?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          login?: string
          name?: string
          password_hash?: string
          phone?: string | null
          plan?: string
          status?: string
          subscription_until?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      videos: {
        Row: {
          category_id: string | null
          created_at: string
          description: string | null
          duration_seconds: number | null
          id: string
          is_published: boolean
          position: number
          preview_url: string | null
          title: string
          updated_at: string
          video_path: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          id?: string
          is_published?: boolean
          position?: number
          preview_url?: string | null
          title: string
          updated_at?: string
          video_path: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          id?: string
          is_published?: boolean
          position?: number
          preview_url?: string | null
          title?: string
          updated_at?: string
          video_path?: string
        }
        Relationships: [
          {
            foreignKeyName: "videos_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "video_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      worksheets: {
        Row: {
          client_id: string
          created_at: string
          created_by: string | null
          data: Json
          id: string
          linked_form: string | null
          period: string
          title: string
          updated_at: string
          worksheet_type: string
        }
        Insert: {
          client_id: string
          created_at?: string
          created_by?: string | null
          data?: Json
          id?: string
          linked_form?: string | null
          period: string
          title: string
          updated_at?: string
          worksheet_type: string
        }
        Update: {
          client_id?: string
          created_at?: string
          created_by?: string | null
          data?: Json
          id?: string
          linked_form?: string | null
          period?: string
          title?: string
          updated_at?: string
          worksheet_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "worksheets_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "accountant_clients"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      firm_ledger_period_summary: {
        Row: {
          entries_count: number | null
          owner_id: string | null
          period: string | null
          total_expense: number | null
          total_income: number | null
        }
        Relationships: []
      }
      ledger_period_summary: {
        Row: {
          client_id: string | null
          depreciation: number | null
          entries_count: number | null
          expense_no_vat: number | null
          income_no_vat: number | null
          payroll_total: number | null
          period: string | null
          taxes_payroll: number | null
          total_expense: number | null
          total_income: number | null
          vat_input: number | null
          vat_output: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ledger_entries_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "accountant_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      registration_stats: {
        Row: {
          city: string | null
          total_registrations: number | null
        }
        Relationships: []
      }
      registrations_almaty: {
        Row: {
          city: string | null
          created_at: string | null
          email: string | null
          email_confirmation: boolean | null
          full_name: string | null
          id: string | null
          phone: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string | null
          email?: string | null
          email_confirmation?: boolean | null
          full_name?: string | null
          id?: string | null
          phone?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string | null
          email?: string | null
          email_confirmation?: boolean | null
          full_name?: string | null
          id?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      registrations_astana: {
        Row: {
          city: string | null
          created_at: string | null
          email: string | null
          email_confirmation: boolean | null
          full_name: string | null
          id: string | null
          phone: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string | null
          email?: string | null
          email_confirmation?: boolean | null
          full_name?: string | null
          id?: string | null
          phone?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string | null
          email?: string | null
          email_confirmation?: boolean | null
          full_name?: string | null
          id?: string | null
          phone?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      accept_team_invitation: { Args: { _token: string }; Returns: Json }
      activate_subscription:
        | { Args: { p_code: string; p_months?: number }; Returns: Json }
        | {
            Args: { p_code: string; p_months?: number; p_plan_tier?: string }
            Returns: Json
          }
      cleanup_analytics_data: { Args: never; Returns: undefined }
      create_initial_tax_periods: {
        Args: { p_profile_id: string }
        Returns: undefined
      }
      create_profile: {
        Args: {
          user_full_name: string
          user_id: string
          user_phone?: string
          user_remember_credentials?: boolean
          user_username: string
        }
        Returns: Json
      }
      create_transfer_notification: {
        Args: {
          p_message: string
          p_notification_type: string
          p_recipient_id: string
          p_title: string
          p_transfer_id: string
        }
        Returns: string
      }
      ensure_referral_code: {
        Args: {
          p_program_type?: string
          p_user_id: string
          p_user_name?: string
        }
        Returns: string
      }
      force_delete_expert: { Args: { expert_id: string }; Returns: boolean }
      generate_referral_code: {
        Args: { p_user_name?: string }
        Returns: string
      }
      generate_seo_slug: { Args: { title: string }; Returns: string }
      generate_unique_subscription_code: { Args: never; Returns: string }
      get_active_users_online: { Args: never; Returns: number }
      get_article_analytics: { Args: { limit_count?: number }; Returns: Json }
      get_article_reading_stats: {
        Args: { article_limit?: number }
        Returns: Json
      }
      get_comprehensive_analytics: {
        Args: { end_date?: string; start_date?: string }
        Returns: Json
      }
      get_consent_analytics: { Args: never; Returns: Json }
      get_conversion_analytics: { Args: never; Returns: Json }
      get_device_browser_stats: {
        Args: { end_date?: string; start_date?: string }
        Returns: Json
      }
      get_enhanced_dashboard_analytics: {
        Args: { p_end_date?: string; p_start_date?: string }
        Returns: Json
      }
      get_full_user_analytics: { Args: { p_limit?: number }; Returns: Json }
      get_geography_stats: {
        Args: { end_date?: string; start_date?: string }
        Returns: Json
      }
      get_interaction_stats: {
        Args: { end_date?: string; start_date?: string }
        Returns: Json
      }
      get_invitation_preview: { Args: { _token: string }; Returns: Json }
      get_main_metrics: {
        Args: { end_date?: string; start_date?: string }
        Returns: Json
      }
      get_popular_pages: {
        Args: { end_date?: string; page_limit?: number; start_date?: string }
        Returns: Json
      }
      get_public_url: {
        Args: { bucket_name: string; file_path: string }
        Returns: string
      }
      get_real_time_activity: { Args: never; Returns: Json }
      get_real_time_metrics: { Args: never; Returns: Json }
      get_session_analytics: { Args: never; Returns: Json }
      get_today_stats: { Args: never; Returns: Json }
      get_trending_analytics: { Args: never; Returns: Json }
      get_unified_real_time_metrics: { Args: never; Returns: Json }
      get_user_workspace: { Args: { _user_id: string }; Returns: string }
      get_weekly_trends: { Args: never; Returns: Json }
      has_financial_access: { Args: { user_id: string }; Returns: boolean }
      has_technical_access: { Args: { user_id: string }; Returns: boolean }
      has_workspace_permission: {
        Args: { _category: string; _level?: string; _user_id: string }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
      is_admin_by_email: { Args: never; Returns: boolean }
      is_organizer: { Args: never; Returns: boolean }
      match_agent_knowledge: {
        Args: {
          p_agent_id: string
          p_match_count?: number
          p_min_similarity?: number
          p_query_embedding: string
        }
        Returns: {
          content: string
          id: string
          similarity: number
          source_url: string
          title: string
        }[]
      }
      process_subscription_payment_reward: {
        Args: {
          p_payment_amount: number
          p_referred_user_id: string
          p_subscription_code?: string
        }
        Returns: Json
      }
      reinvite_team_invitation: {
        Args: { _days?: number; _invitation_id: string }
        Returns: Json
      }
      search_articles_fts: {
        Args: { result_limit?: number; search_query: string }
        Returns: {
          category: string
          cover_image_url: string
          excerpt: string
          id: string
          published_at: string
          rank: number
          slug: string
          tags: string[]
          title: string
        }[]
      }
      search_tax_knowledge: {
        Args: { result_limit?: number; search_query: string }
        Returns: {
          category: string
          content: string
          id: string
          relevance: number
          section_number: string
          section_title: string
        }[]
      }
      search_tax_knowledge_hybrid: {
        Args: {
          query_embedding: string
          result_limit?: number
          search_text: string
          semantic_weight?: number
        }
        Returns: {
          category: string
          combined_score: number
          content: string
          id: string
          section_number: string
          section_title: string
        }[]
      }
      search_tax_knowledge_semantic: {
        Args: {
          query_embedding: string
          result_limit?: number
          similarity_threshold?: number
        }
        Returns: {
          category: string
          content: string
          id: string
          section_number: string
          section_title: string
          similarity: number
        }[]
      }
      user_has_role: {
        Args: { _role: string; _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user" | "business" | "accountant"
      ledger_source_type:
        | "bank"
        | "payroll"
        | "invoice"
        | "cash"
        | "manual"
        | "doc"
        | "import"
      team_invitation_status: "pending" | "accepted" | "expired" | "revoked"
      team_member_status: "active" | "suspended" | "removed"
      team_role_preset:
        | "accountant"
        | "marketer"
        | "analyst"
        | "full_access"
        | "custom"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user", "business", "accountant"],
      ledger_source_type: [
        "bank",
        "payroll",
        "invoice",
        "cash",
        "manual",
        "doc",
        "import",
      ],
      team_invitation_status: ["pending", "accepted", "expired", "revoked"],
      team_member_status: ["active", "suspended", "removed"],
      team_role_preset: [
        "accountant",
        "marketer",
        "analyst",
        "full_access",
        "custom",
      ],
    },
  },
} as const
