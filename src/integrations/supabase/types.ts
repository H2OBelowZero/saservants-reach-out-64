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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author_id: string
          content: string
          created_at: string | null
          event_id: string | null
          excerpt: string | null
          featured_image_url: string | null
          id: string
          published_at: string | null
          seo_description: string | null
          seo_keywords: string | null
          slug: string
          status: string | null
          tags: Json | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string | null
          event_id?: string | null
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          published_at?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
          slug: string
          status?: string | null
          tags?: Json | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string | null
          event_id?: string | null
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          published_at?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
          slug?: string
          status?: string | null
          tags?: Json | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_messages: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          message: string
          message_type: string | null
          phone: string | null
          status: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          message: string
          message_type?: string | null
          phone?: string | null
          status?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          message?: string
          message_type?: string | null
          phone?: string | null
          status?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      donations: {
        Row: {
          amount: number
          anonymous: boolean | null
          campaign_id: string | null
          created_at: string | null
          donor_email: string
          donor_name: string
          donor_phone: string | null
          id: number
          payment_method: string
        }
        Insert: {
          amount: number
          anonymous?: boolean | null
          campaign_id?: string | null
          created_at?: string | null
          donor_email: string
          donor_name: string
          donor_phone?: string | null
          id?: number
          payment_method: string
        }
        Update: {
          amount?: number
          anonymous?: boolean | null
          campaign_id?: string | null
          created_at?: string | null
          donor_email?: string
          donor_name?: string
          donor_phone?: string | null
          id?: number
          payment_method?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_donations_campaign"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "fundraising_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      event_volunteers: {
        Row: {
          created_at: string | null
          event_id: string | null
          hours_volunteered: number | null
          id: string
          role: string | null
          volunteer_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_id?: string | null
          hours_volunteered?: number | null
          id?: string
          role?: string | null
          volunteer_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_id?: string | null
          hours_volunteered?: number | null
          id?: string
          role?: string | null
          volunteer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_volunteers_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_volunteers_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteers"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          attendees: number | null
          created_at: string | null
          created_by: string | null
          description: string | null
          event_category: string | null
          event_date: string
          event_type: string
          id: string
          location: string | null
          organizer: string | null
          outcomes: string | null
          people_reached: number | null
          tags: Json | null
          title: string
          updated_at: string | null
        }
        Insert: {
          attendees?: number | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          event_category?: string | null
          event_date: string
          event_type: string
          id?: string
          location?: string | null
          organizer?: string | null
          outcomes?: string | null
          people_reached?: number | null
          tags?: Json | null
          title: string
          updated_at?: string | null
        }
        Update: {
          attendees?: number | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          event_category?: string | null
          event_date?: string
          event_type?: string
          id?: string
          location?: string | null
          organizer?: string | null
          outcomes?: string | null
          people_reached?: number | null
          tags?: Json | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      fundraising_campaigns: {
        Row: {
          created_at: string | null
          created_by: string | null
          current_amount: number | null
          description: string
          end_date: string | null
          goal_amount: number
          id: string
          image_url: string | null
          start_date: string
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          current_amount?: number | null
          description: string
          end_date?: string | null
          goal_amount: number
          id?: string
          image_url?: string | null
          start_date: string
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          current_amount?: number | null
          description?: string
          end_date?: string | null
          goal_amount?: number
          id?: string
          image_url?: string | null
          start_date?: string
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      media: {
        Row: {
          alt_text: string | null
          event_id: string | null
          file_name: string
          file_size: number
          file_type: string
          file_url: string
          id: string
          thumbnail_url: string | null
          uploaded_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          alt_text?: string | null
          event_id?: string | null
          file_name: string
          file_size: number
          file_type: string
          file_url: string
          id?: string
          thumbnail_url?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          alt_text?: string | null
          event_id?: string | null
          file_name?: string
          file_size?: number
          file_type?: string
          file_url?: string
          id?: string
          thumbnail_url?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "media_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          address: string | null
          contact_person: string | null
          created_at: string | null
          email: string
          id: string
          logo_url: string | null
          organization_name: string
          partnership_details: string | null
          partnership_type: string | null
          phone: string | null
          services_offered: string | null
          status: string | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          address?: string | null
          contact_person?: string | null
          created_at?: string | null
          email: string
          id?: string
          logo_url?: string | null
          organization_name: string
          partnership_details?: string | null
          partnership_type?: string | null
          phone?: string | null
          services_offered?: string | null
          status?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          address?: string | null
          contact_person?: string | null
          created_at?: string | null
          email?: string
          id?: string
          logo_url?: string | null
          organization_name?: string
          partnership_details?: string | null
          partnership_type?: string | null
          phone?: string | null
          services_offered?: string | null
          status?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      volunteers: {
        Row: {
          age: number | null
          availability: string | null
          created_at: string | null
          email: string
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          experience: string | null
          full_name: string
          id: string
          location: string | null
          motivation: string | null
          phone: string | null
          skills: string[] | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          age?: number | null
          availability?: string | null
          created_at?: string | null
          email: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          experience?: string | null
          full_name: string
          id?: string
          location?: string | null
          motivation?: string | null
          phone?: string | null
          skills?: string[] | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          age?: number | null
          availability?: string | null
          created_at?: string | null
          email?: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          experience?: string | null
          full_name?: string
          id?: string
          location?: string | null
          motivation?: string | null
          phone?: string | null
          skills?: string[] | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_donation_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          donation_count: number
          total_donations: number
        }[]
      }
      get_event_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          latest_event_date: string
          total_attendees: number
          total_events: number
          total_people_reached: number
        }[]
      }
    }
    Enums: {
      user_role: "super_admin" | "content_admin" | "content_editor" | "viewer"
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
      user_role: ["super_admin", "content_admin", "content_editor", "viewer"],
    },
  },
} as const
