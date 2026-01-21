export type Database = {
  public: {
    Tables: {
      carrito: {
        Row: {
          id: number
          usuario_id: string
          servicio_id: number
          created_at: string
        }

        Insert: {
          usuario_id: string
          servicio_id: number
          created_at?: string
        }

        Update: {
          usuario_id?: string
          servicio_id?: number
        }
      }
    }
  }
}
