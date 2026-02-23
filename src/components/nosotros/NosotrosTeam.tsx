import { createSupabaseServerClient } from "@/lib/supabase/server-client"
import Image from "next/image"

interface TeamInterface {
  id: string,
  name: string,
  role: string,
  contact: string,
  description?: string,
  imagenes: {
    url: string,
  },
}

const NosotrosHero = async () => {

    const supabase = await createSupabaseServerClient();
        const { data } = await supabase
        .from("nosotros")
        .select(`id, name, role, contact, description, imagenes("url")`);

    const team: TeamInterface[] = data as unknown as TeamInterface[];
      
  return (
      <section className="max-w-xl mx-auto flex flex-col gap-4 mb-50">
        <h3 className="text-3xl">Nuestro equipo 🥇</h3>
        
        <div className="grid grid-cols-1 gap-4">
          {
            team.map((member: TeamInterface) => (
              <div key={`team-member-${member.name}`} className="bg-(--card)/5 flex flex-row gap-4 p-4 rounded-lg border border-white/40">
                <Image
                  alt="Imagen del integrante"
                  src={member.imagenes.url}
                  width={100}
                  height={100}
                  className="rounded-full"
                />
                <span>
                  <p className="text-xl font-bold text-(--muted) leading-relaxed">{member.name}</p>
                  <p className="text-md text-(--muted-foreground) leading-relaxed">
                    {member.role}
                    {
                      member.description ? ` - ${member.description}` : ""
                    }
                  </p>
                  <p>Contacto: <a className="text-(--primary) hover:cursor-pointer">{member.contact}</a>
                  </p>
                </span>
              </div>
            ))
          }
        </div>
      </section>
  )
}

export default NosotrosHero