import Image from "next/image";
import { TeamInterface } from "@/app/nosotros/page";

interface Props {
  team: TeamInterface[];
}

const NosotrosTeam = ({ team }: Props) => {
  return (
    <section className="border-b border-(--border) bg-card py-24 md:py-32">
      <div className="mx-auto px-6">

        {/* Section header */}
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-10 text-sm font-medium uppercase tracking-[0.3em] text-(--primary)">
              Nuestro Equipo
            </p>
            <h2 className="text-(--foreground) text-3xl font-bold md:text-4xl lg:text-5xl text-balance">
              El talento detrás de cada proyecto
            </h2>
          </div>

          <p className="max-w-sm text-xl text-(--muted-foreground) leading-relaxed md:text-right">
            Un equipo creativo y estratégico que combina diseño, marketing y tecnología 
            para construir marcas con identidad y resultados reales.
          </p>
        </div>

        {/* Members grid*/}
        <div className="grid gap-6 md:grid-cols-2">
          {team.map((member) => (
            <div
              key={`team-member-${member.id}`}
              className="group flex flex-col sm:flex-row 
                        border border-(--primary) bg-card"
            >
              {/* Imagen */}
              <div className="relative aspect-[3/4] w-full shrink-0 overflow-hidden sm:aspect-square sm:w-56 md:w-64">
                <Image
                  src={member.imagenes?.url || "/placeholder.png"}
                  alt={`Retrato de ${member.name}`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Información */}
              <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                    {member.role}
                  </p>

                  <h3 className="mt-2 font-serif text-xl font-bold text-foreground md:text-2xl">
                    {member.name}
                  </h3>

                  {member.description && (
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {member.description}
                    </p>
                  )}
                </div>

                <div className="mt-6">
                  <p className="text-(--muted-foreground)">Contacto</p>
                  <a
                    href={`mailto:${member.contact}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {member.contact}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default NosotrosTeam;