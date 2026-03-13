import { createSupabaseServerClient } from "@/lib/supabase/server";
import AddBrand from "./AddBrand";
import BrandItem from "./BrandItem";

interface MarcasInterface {
  id: number;
  nombre: string;
  imagen: {
    url: string;
  } | null;
  disponible: boolean;
}

const Brands = async () => {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase
    .from("marcas")
    .select(`id, nombre, imagen(url), disponible`)
    .order("id", { ascending: true });

  const brands = data as unknown as MarcasInterface[];

  if (!data) {
    return (
      <section className="bg-background border-b border-border py-36 flex flex-col items-center justify-center">
        <p className="text-foreground font-bold text-3xl">No hay marcas para mostrar... aún.</p>
      </section>
    );
  }

  return (
    <section className="bg-background border-b border-border py-36 flex flex-col items-center justify-center">
      <p className="pb-10 text-primary font-medium text-2xl uppercase tracking-widest">
        Trabajamos con
      </p>
      <h3 className="text-foreground font-bold text-5xl">Marcas locales</h3>

      <div className={`flex flex-wrap justify-center items-center gap-2 my-10 max-w-5xl`}>
        {brands.map((brand) => (
          <BrandItem key={`brands-${brand.id}-${brand.nombre}`} {...brand} />
        ))}
      </div>
      <div className="mt-12">
        <AddBrand />
      </div>
    </section>
  );
};

export default Brands;
