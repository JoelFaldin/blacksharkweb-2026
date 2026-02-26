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

      <div className={`flex flex-wrap justify-center items-center py-10 max-w-5xl`}>
        {brands.map((brand, index) => (
          <div
            key={`brands-${brand.id}-${brand.nombre}`}
            className={`group flex flex-col h-80 w-80 shrink-0 items-center justify-center bg-(--background) p-8 border-r border-(--border) last:border-r-0 transition-colors hover:bg-(--card)`}
          >
            <div className="relative aspect-square mb-4 w-full overflow-hidden">
              <Image
                src={brand.imagen?.url ?? ""}
                alt={`Logo de empresa ${brand.nombre}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <span className="relative text-xs uppercase tracking-[0.2em] text-(--muted-foreground)/60 transition-colors group-hover:text-(--foreground)">
              {brand.nombre}
            </span>
          </div>
        ))}

      </div>
      <div className="mt-12">
        <AddBrand />
      </div>
    </section>
  )
}

export default Brands