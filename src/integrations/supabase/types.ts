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
      get_conversion_analytics: { Args: never; Returns: Json }
      get_device_browser_stats: {
        Args: { end_date?: string; start_date?: string }
        Returns: Json
      }
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
