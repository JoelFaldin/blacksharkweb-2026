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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      carrito: {
        Row: {
          cantidad: number
          created_at: string
          id: number
          servicio_id: number
          usuario_id: string
        }
        Insert: {
          cantidad?: number
          created_at?: string
          id?: number
          servicio_id: number
          usuario_id?: string
        }
        Update: {
          cantidad?: number
          created_at?: string
          id?: number
          servicio_id?: number
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "carrito_servicio_id_fkey"
            columns: ["servicio_id"]
            isOneToOne: false
            referencedRelation: "servicios"
            referencedColumns: ["id"]
          },
        ]
      }
      galeria: {
        Row: {
          cliente: string | null
          created_at: string
          desc: string
          id: number
          image_id: number
        }
        Insert: {
          cliente?: string | null
          created_at?: string
          desc: string
          id?: number
          image_id: number
        }
        Update: {
          cliente?: string | null
          created_at?: string
          desc?: string
          id?: number
          image_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "gallery_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "imagenes"
            referencedColumns: ["id"]
          },
        ]
      }
      imagenes: {
        Row: {
          categoria: string | null
          creado_at: string | null
          descripcion: string | null
          id: number
          url: string
        }
        Insert: {
          categoria?: string | null
          creado_at?: string | null
          descripcion?: string | null
          id?: never
          url: string
        }
        Update: {
          categoria?: string | null
          creado_at?: string | null
          descripcion?: string | null
          id?: never
          url?: string
        }
        Relationships: []
      }
      marcas: {
        Row: {
          created_at: string
          disponible: boolean
          id: number
          imagen: number
          nombre: string
        }
        Insert: {
          created_at?: string
          disponible?: boolean
          id?: number
          imagen: number
          nombre: string
        }
        Update: {
          created_at?: string
          disponible?: boolean
          id?: number
          imagen?: number
          nombre?: string
        }
        Relationships: [
          {
            foreignKeyName: "marcas_imagen_fkey"
            columns: ["imagen"]
            isOneToOne: false
            referencedRelation: "imagenes"
            referencedColumns: ["id"]
          },
        ]
      }
      nosotros: {
        Row: {
          contact: string
          created_at: string
          description: string | null
          id: number
          image_url: number | null
          name: string
          role: string
        }
        Insert: {
          contact: string
          created_at?: string
          description?: string | null
          id?: number
          image_url?: number | null
          name: string
          role: string
        }
        Update: {
          contact?: string
          created_at?: string
          description?: string | null
          id?: number
          image_url?: number | null
          name?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "nosotros_image_url_fkey"
            columns: ["image_url"]
            isOneToOne: false
            referencedRelation: "imagenes"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          id: number
          permission: Database["public"]["Enums"]["app_permission"]
          role: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          id?: number
          permission: Database["public"]["Enums"]["app_permission"]
          role: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          id?: number
          permission?: Database["public"]["Enums"]["app_permission"]
          role?: Database["public"]["Enums"]["app_role"]
        }
        Relationships: []
      }
      servicios: {
        Row: {
          created_at: string
          descripcion_corta: string | null
          disponible: boolean
          id: number
          imagen: number
          nombre: string
          precio: number
        }
        Insert: {
          created_at?: string
          descripcion_corta?: string | null
          disponible?: boolean
          id?: number
          imagen: number
          nombre: string
          precio?: number
        }
        Update: {
          created_at?: string
          descripcion_corta?: string | null
          disponible?: boolean
          id?: number
          imagen?: number
          nombre?: string
          precio?: number
        }
        Relationships: [
          {
            foreignKeyName: "servicios_imagen_fkey"
            columns: ["imagen"]
            isOneToOne: false
            referencedRelation: "imagenes"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: number
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: number
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: number
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      custom_access_token_hook: { Args: { event: Json }; Returns: Json }
    }
    Enums: {
      app_permission: "marcas.delete" | "marcas.add"
      app_role: "admin" | "user"
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
      app_permission: ["marcas.delete", "marcas.add"],
      app_role: ["admin", "user"],
    },
  },
} as const
