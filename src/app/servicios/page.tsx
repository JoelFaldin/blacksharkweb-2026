import ContactForm from "@/components/home/ContactForm";
import ServiceGrid from "@/components/service/ServiceGrid";
import ServiceHero from "@/components/service/ServiceHero";
import ServiceProcess from "@/components/service/ServiceProcess";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";

interface ServicioInterface {
  id: number;
  precio: string;
  descripcion_corta: string;
  imagen: {
    url: string;
  } | null;
  nombre: string;
}

const Servicios = async () => {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("servicios")
    .select(`id, precio, descripcion_corta, imagen:imagenes(url), nombre`);

  const servicios = data as unknown as ServicioInterface[];

  return (
    <>
      <ServiceHero />
      <ServiceGrid servicios={servicios} />
      <ServiceProcess />
      <ContactForm />
    </>
  )
}

export default Servicios