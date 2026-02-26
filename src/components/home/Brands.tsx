import { createSupabaseServerClient } from "@/lib/supabase/server"
import Image from "next/image"

import AddBrand from "./AddBrand";

interface MarcasInterface {
  id: number;
  nombre: string;
  imagen: {
    url: string;
  } | null;
}

const Brands = async () => {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase
    .from("marcas")
    .select(`id, nombre, imagen(url)`);

  const brands = data as unknown as MarcasInterface[];

  if (!data) {
    return (
      <section className="bg-(--background) border-b border-(--border) py-36 flex flex-col items-center justify-center">
        <p className="text-(--foreground) font-bold text-3xl">
          No hay marcas para mostrar... aún.
        </p>
      </section>
    )
  }

  return (
    <section className="bg-(--background) border-b border-(--border) py-36 flex flex-col items-center justify-center">
			<p className="pb-10 text-(--primary) font-medium text-2xl uppercase tracking-widest">
        Trabajamos con
      </p>
      <h3 className="text-(--foreground) font-bold text-5xl">
        Marcas locales
      </h3>

      {/* Sección de las marcas */}
      {/* Estructurado con "flex" de forma momentánea */}
      {/* La idea es, cuando estén más empresas, cambiar la estructura a grid */}
      <div className="py-10 flex flex-col items-center justify-center gap-10">
        {brands.map(brand => (
          <div key={`brands-${brand.id}-${brand.nombre}`} className="flex flex-col items-center justify-center gap-y-2">
            <Image src={brand.imagen?.url ?? ""} alt={`Logo de empresa ${brand.nombre}`} width={223} height={223} />
            <span className="text-lg uppercase">
              {brand.nombre}
            </span>
          </div>
        ))}

        <AddBrand />
      </div>
    </section>
  )
}

export default Brands