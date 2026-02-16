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
      forum_registrations: {
        Row: {
          city: string
          created_at: string
          email: string
          email_confirmation: boolean | null
          full_name: string
          id: string
          phone: string | null
        }
        Insert: {
          city: string
          created_at?: string
          email: string
          email_confirmation?: boolean | null
          full_name: string
          id?: string
          phone?: string | null
        }
        Update: {
          city?: string
          created_at?: string
          email?: string
          email_confirmation?: boolean | null
          full_name?: string
          id?: string
          phone?: string | null
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
          bio: string | null
          company: string | null
          created_at: string | null
          display_name: string | null
          full_name: string | null
          id: string
          last_sign_in: string | null
          phone: string | null
          position: string | null
          preferred_username: string | null
          remember_credentials: boolean | null
          social_links: Json | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string | null
          display_name?: string | null
          full_name?: string | null
          id: string
          last_sign_in?: string | null
          phone?: string | null
          position?: string | null
          preferred_username?: string | null
          remember_credentials?: boolean | null
          social_links?: Json | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string | null
          display_name?: string | null
          full_name?: string | null
          id?: string
          last_sign_in?: string | null
          phone?: string | null
          position?: string | null
          preferred_username?: string | null
          remember_credentials?: boolean | null
          social_links?: Json | null
          updated_at?: string | null
          username?: string | null
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
    }
    Views: {
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
      force_delete_expert: { Args: { expert_id: string }; Returns: boolean }
      generate_seo_slug: { Args: { title: string }; Returns: string }
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
      get_weekly_trends: { Args: never; Returns: Json }
      has_financial_access: { Args: { user_id: string }; Returns: boolean }
      has_technical_access: { Args: { user_id: string }; Returns: boolean }
      is_admin: { Args: never; Returns: boolean }
      is_admin_by_email: { Args: never; Returns: boolean }
      is_organizer: { Args: never; Returns: boolean }
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
      app_role: "admin" | "moderator" | "user"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
