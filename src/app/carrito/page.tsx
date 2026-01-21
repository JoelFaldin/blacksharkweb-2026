import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import CarritoClientDemo from "./CarritoClientDemo";

interface CarritoItem {
    id: number;
    usuario_id: string;
    servicio: {
    id: number;
    nombre: string;
    precio: string;
    descripcion_corta: string;
    imagen: {
      url: string;
    } | null;
    }
}

const Carrito = async () => {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <CarritoClientDemo items={[]} />;
  }

  const { data, error } = await supabase
    .from("carrito")
    .select(`
        id,
        usuario_id,
        servicio:servicios (
        id,
        nombre,
        precio,
        descripcion_corta,
        imagen:imagenes ( url )
        )
    `)
    .eq("usuario_id", user.id);

  if (error) {
    console.error("Error carrito:", error);
    return <CarritoClientDemo items={[]} />;
  }

  const carritoItems = data as unknown as CarritoItem[];

  return <CarritoClientDemo items={carritoItems} />;
};

export default Carrito;