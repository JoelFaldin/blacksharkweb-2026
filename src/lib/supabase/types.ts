export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      carrito: {
        Row: {
          id: number;
          usuario_id: string;
          servicio_id: number;
          created_at: string;
        };
        Insert: {
          id?: number;
          usuario_id: string;
          servicio_id: number;
          created_at?: string;
        };
        Update: {
          id?: number;
          usuario_id?: string;
          servicio_id?: number;
          created_at?: string;
        };
      };
      servicios: {
        Row: {
          id: number;
          nombre: string;
          precio: string;
          descripcion_corta: string | null;
          imagen: { url: string } | null;
        };
        Insert: {
          nombre: string;
          precio: string;
          descripcion_corta?: string | null;
          imagen?: { url: string } | null;
        };
        Update: {
          nombre?: string;
          precio?: string;
          descripcion_corta?: string | null;
          imagen?: { url: string } | null;
        };
      };
    };
  };
}
