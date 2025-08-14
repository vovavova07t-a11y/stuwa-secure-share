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
      articles: {
        Row: {
          author_id: string | null
          author_name: string | null
          category: string
          content: string | null
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
          company: string | null
          created_at: string | null
          full_name: string | null
          id: string
          last_sign_in: string | null
          phone: string | null
          position: string | null
          preferred_username: string | null
          remember_credentials: boolean | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          company?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          last_sign_in?: string | null
          phone?: string | null
          position?: string | null
          preferred_username?: string | null
          remember_credentials?: boolean | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          company?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          last_sign_in?: string | null
          phone?: string | null
          position?: string | null
          preferred_username?: string | null
          remember_credentials?: boolean | null
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
      cleanup_analytics_data: {
        Args: Record<PropertyKey, never>
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
      force_delete_expert: {
        Args: { expert_id: string }
        Returns: boolean
      }
      get_device_browser_stats: {
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
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_admin_by_email: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
