import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioGallery from "@/components/portfolio/PortfolioGallery";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";

interface GalleryInterface {
  id: number,
  desc: string,
  cliente: string,
  imagenes: {
    url: string,
    categoria: string,
  }
}

export default async function Portafolio() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("galeria")
    .select(`id, desc, cliente, imagenes("url", "categoria")`);
  
  const images = data as unknown as GalleryInterface[];

  return (
    <>
      <PortfolioHero />
      <PortfolioGallery imagenes={images} />
    </>
  );
}