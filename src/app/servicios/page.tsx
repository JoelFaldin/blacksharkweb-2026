import ContactForm from "@/components/home/ContactForm";
import ServiceGrid from "@/components/services/ServiceGrid";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceProcess from "@/components/services/ServiceProcess";
import { createSupabaseServerClient } from "@/lib/supabase/server";

interface ServicioInterface {
  id: number;
  precio: string;
  descripcion_corta: string;
  imagen: {
    url: string;
  } | null;
  nombre: string;
  disponible: boolean;
}

const ServiciosPage = async () => {
  const supabase = await createSupabaseServerClient();

  const { data: serviciosData } = await supabase
    .from("servicios")
    .select(`id, precio, descripcion_corta, imagen:imagenes(url), nombre, disponible`);

  const servicios = serviciosData as unknown as ServicioInterface[];

  return (
    <>
      <ServiceHero />
      <ServiceGrid servicios={servicios} />
      <ServiceProcess />
      <ContactForm />
    </>
  );
};

export default ServiciosPage;
