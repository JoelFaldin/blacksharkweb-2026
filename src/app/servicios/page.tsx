import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import Image from "next/image";

interface ServicioInterface {
  id: string;
  precio: string;
  descripcion_corta: string;
  imagenes: {
    url: string;
  }[];
}

const Servicios = async () => {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("servicios")
    .select(`id, precio, descripcion_corta, imagenes("url")`);

  const servicios = data as ServicioInterface[];

  console.log(data);
  return (
    <>
    <div className="w-full px-6 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
        {servicios.map((servicio) => (
          <div
            key={servicio.id}
            className="flex flex-col bg-white shadow-md w-96 rounded-xl"
          >
            {/* Imagen */}
            <div className="relative w-full h-56">
              {servicio.imagenes?.[0]?.url && (
                <Image
                  src={servicio.imagenes[0].url}
                  alt="Servicio"
                  fill
                  className="object-cover rounded-t-xl"
                />
              )}
            </div>

            {/* Contenido */}
            <div className="p-4 flex flex-col gap-2 text-sm">
              <p className="text-slate-600">$ {servicio.precio}</p>

              <p className="text-slate-800 font-satoshi text-base font-medium">
                Servicio
              </p>

              <p className="text-slate-500">
                {servicio.descripcion_corta}
              </p>

              <div className="grid grid-cols-2 gap-2 mt-3">
                <button className="bg-slate-100 text-slate-600 py-2 cursor-pointer">
                  Añadir al carrito
                </button>
                <button className="bg-slate-800 text-white py-2 cursor-pointer">
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