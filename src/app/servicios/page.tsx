import ServiceTemplate from "@/components/service/ServiceTemplate";
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
      <section className="w-full bg-(--background)">
        <div className="flex flex-row justify-between items-center border-b border-(--border) pb-16 pt-32 px-20">
          <span className="max-w-2xl">
            <p className="text-xl text-(--primary) uppercase tracking-[0.2em] mb-4">
              Nuestro trabajo
            </p>
            <h1 className="text-8xl text-(--foreground) text-balance">
              Servicios de alto <span className="text-(--primary)">impacto</span>
            </h1>
          </span>
          <span className="text-xl text-(--muted-foreground) text-end max-w-md">
            <p>Cada proyecto es importante. Combinamos pensamiento estratégico con diseño elegante y único que se alinea con tu marca.</p>
          </span>
        </div>
      </section>

      <section className="bg-(--background) py-20 md:py-28">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-10">
          {servicios.map((servicio, index) => (
            <ServiceTemplate key={`service-${servicio.nombre}`} {...servicio} index={index} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Servicios