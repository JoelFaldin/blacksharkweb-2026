import Image from "next/image";

import type { TeamInterface } from "@/app/nosotros/page";

interface Props {
  team: TeamInterface[];
}

const NosotrosTeam = ({ team }: Props) => {
  return (
    <section className="border-b border-border bg-card py-24 md:py-32 overflow-hidden">
      <div className="mx-auto px-6 max-w-7xl">
        {/* Section header */}
        <div className="mb-16 flex flex-col gap-6 min-[945px]:flex-row min-[945px]:items-end min-[945px]:justify-between">
          <div className="max-[945px]:text-center">
            <p className="mb-10 text-sm font-medium uppercase tracking-[0.3em] text-primary">
              Nuestro Equipo
            </p>
            <h2 className="text-foreground text-3xl font-bold md:text-4xl lg:text-5xl text-pretty">
              El talento detrás de cada proyecto
            </h2>
          </div>

          <p className="max-w-sm text-xl text-muted-foreground leading-relaxed min-[945px]:text-right max-[945px]:text-center max-[945px]:mx-auto">
            Un equipo creativo y estratégico que combina diseño, marketing y tecnología para
            construir marcas con identidad y resultados reales.
          </p>
        </div>

        {/* Members grid */}
        <div className="grid gap-6 min-[945px]:grid-cols-2 grid-cols-1 justify-items-center">
          {team.map((member) => (
            <div
              key={`team-member-${member.id}`}
              className="group flex flex-col sm:flex-row border border-primary bg-card w-full max-w-full min-[945px]:max-w-none max-[640px]:max-w-100"
            >
              <div className="relative aspect-square w-full sm:w-48 md:w-56 lg:w-64 shrink-0 overflow-hidden">
                <Image
                  src={member.imagenes?.url || "/placeholder.png"}
                  alt={`Retrato de ${member.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 945px) 200px, 300px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-6 md:p-8 overflow-hidden">
                <div className="max-[640px]:text-center">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                    {member.role}
                  </p>

                  <h3 className="mt-2 font-serif text-xl font-bold text-foreground md:text-2xl">
                    {member.name}
                  </h3>

                  {member.description && (
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-4 min-[945px]:line-clamp-none">
                      {member.description}
                    </p>
                  )}
                </div>

                <div className="mt-6 max-[640px]:text-center">
                  <p className="text-muted-foreground">Contacto</p>
                  <a
                    href={`mailto:${member.contact}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary break-all block"
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
