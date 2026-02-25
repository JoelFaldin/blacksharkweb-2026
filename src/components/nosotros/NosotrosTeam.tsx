import Image from "next/image";
import { TeamInterface } from "@/app/nosotros/page";

interface Props {
  team: TeamInterface[];
}

const NosotrosTeam = ({ team }: Props) => {
  return (
    <section className="max-w-xl mx-auto flex flex-col gap-4 mb-50">
      <h3 className="text-3xl">Nuestro equipo 🥇</h3>

      <div className="grid grid-cols-1 gap-4">
        {team.map((member) => (
          <div
            key={`team-member-${member.id}`}
            className="bg-(--card)/5 flex flex-row gap-4 p-4 rounded-lg border border-white/40"
          >
            <Image
              alt={`Imagen de ${member.name}`}
              src={member.imagenes?.url || "/placeholder.png"}
              width={100}
              height={100}
              className="rounded-full object-cover"
            />

            <span>
              <p className="text-xl font-bold text-(--muted) leading-relaxed">
                {member.name}
              </p>

              <p className="text-md text-(--muted-foreground) leading-relaxed">
                {member.role}
                {member.description ? ` - ${member.description}` : ""}
              </p>

              <p>
                Contacto:{" "}
                <a
                  href={`mailto:${member.contact}`}
                  className="text-(--primary) hover:cursor-pointer"
                >
                  {member.contact}
                </a>
              </p>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NosotrosTeam;