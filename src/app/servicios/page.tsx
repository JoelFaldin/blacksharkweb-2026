import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import ServiceClient from "./ServiceClient";

interface ServicioInterface {
  id: number;
  precio: string;
  descripcion_corta: string;
  imagen: {
    url: string;
  } | null;
  nombre: string;
}

const ServiciosPage = async () => {
  const supabase = await createSupabaseServerClient();

  const { data: serviciosData } = await supabase
    .from("servicios")
    .select(`id, precio, descripcion_corta, imagen:imagenes(url), nombre`);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const servicios = serviciosData as unknown as ServicioInterface[];

  return (
    <ServiceClient
      servicios={servicios}
      isAuthenticated={!!session}
    />
  );
};

export default ServiciosPage;