import Contact from "@/components/home/Contact";
import { NosotrosHero } from "@/components/nosotros/NosotrosHero";
import { NosotrosHistory } from "@/components/nosotros/NosotrosHistory";
import NosotrosTeam from "@/components/nosotros/NosotrosTeam";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export interface TeamInterface {
  id: string;
  name: string;
  role: string;
  contact: string;
  description?: string;
  imagenes: {
    url: string;
  };
}

const Nosotros = async () => {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("nosotros")
    .select(`id, name, role, contact, description, imagenes("url")`);

  const team: TeamInterface[] = data as unknown as TeamInterface[];

  return (
    <>
      <NosotrosHero />
      <NosotrosHistory />
      <NosotrosTeam team={team} />
      <Contact />
    </>
  );
};

export default Nosotros;
