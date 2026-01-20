import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import Image from "next/image";

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
    <div className="w-full px-8 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
        {servicios.map((servicio) => (
          <div
            key={servicio.id}
            className="group flex flex-col w-[26rem] rounded-2xl
            bg-gradient-to-br from-[#0b1320] via-[#0e1a2f] to-[#0b1320]
            border border-blue-500/10
            shadow-[0_0_0_1px_rgba(59,130,246,0.08)]
            hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]
            transition-all duration-300"
          >
            {/* Imagen */}
            <div className="relative w-full h-64 overflow-hidden rounded-t-2xl">
              {servicio.imagen?.url && (
                <Image
                  src={servicio.imagen.url}
                  alt="Servicio"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>

            {/* Contenido */}
            <div className="p-6 flex flex-col gap-3 text-sm text-slate-300">
              <p className="text-blue-400 font-semibold text-lg">
                ${servicio.precio}
              </p>

              <p className="text-white text-lg font-semibold tracking-tight">
                {servicio.nombre}
              </p>

              <p className="text-slate-400 leading-relaxed">
                {servicio.descripcion_corta}
              </p>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <button
                  className="rounded-lg border border-blue-500/30
                  bg-blue-500/10 text-blue-300
                  py-2 font-medium cursor-pointer
                  hover:bg-blue-500/20 hover:text-white
                  transition"
                >
                  Añadir al carrito
                </button>

                <button
                  className="rounded-lg bg-blue-600 text-white
                  py-2 font-medium
                  hover:bg-blue-500 cursor-pointer
                  transition shadow-lg shadow-blue-600/30"
                >
                  Comprar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default Servicios