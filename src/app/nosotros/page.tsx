import Image from "next/image"

interface TeamInterface {
  image: string,
  name: string,
  role: string,
  description?: string,
  contact: string,
}

const team: TeamInterface[] = [
  {
    image: "/images/about/logotipo_blacksharkstudios.webp",
    name: "Andrés",
    role: "Diseñador",
    description: "Dueño de la marca",
    contact: "https://www.instagram.com/blackshark.studios/"
    
  },
  {
    image: "/images/about/carlos-pic.webp",
    name: "Carlos",
    role: "Desarrollador web",
    contact: "https://github.com/carloscj20"
  },
  {
    image: "/images/about/joel-pic.webp",
    name: "Joel",
    role: "Desarrollador web",
    contact: "https://github.com/JoelFaldin"
  },
  {
    image: "/images/about/samuel-pic.webp",
    name: "Samuel",
    role: "Desarrollador web",
    contact: "https://github.com/SamuelSotomayor1"
  },
]

const Nosotros = () => {
  return (
    <div className="container mx-auto px-4 pt-32 pb-20">
      <h1 className="text-5xl font-bold text-center mb-10">
        Acerca de
        <span className="text-(--secondary)"> BlackSharkStudios </span>
      </h1>

      <p className="max-w-xl text-lg text-center text-pretty mb-10 mx-auto">
        En
        <span className="text-(--secondary)"> BlackSharkStudios </span>
        creamos sitios web modernos, rápidos y adaptados a lo que tu negocio necesita.
      </p>

      <section className="max-w-lg mx-auto flex flex-col gap-4 mb-10">
        <h2 className="text-3xl">Presentación 👋</h2>

        <ul className="bg-(--card)/5 flex flex-col gap-y-1 p-4 rounded-lg border border-white/30">
          <li>🎯 Agencia creativa 5.0 en Iquique 🇨🇱</li>
          <li>📷 Diseño gráfico, marketing digital, fotografía, estampados y más.</li>
          <li>🚀 Hacemos que tu marca crezca con estrategia, identidad y estilo.</li>
          <li>💭 Escríbenos al WhatsApp +56 9 4234 4070 y llevemos tu idea al siguiente nivel.</li>
        </ul>
      </section>

      <section className="max-w-xl mx-auto flex flex-col gap-4 mb-50">
        <h3 className="text-3xl">Nuestro equipo 🥇</h3>
        
        <div className="grid grid-cols-1 gap-4">
          {
            team.map((member: TeamInterface) => (
              <div key={`team-member-${member.name}`} className="bg-(--card)/5 flex flex-row gap-4 p-4 rounded-lg border border-white/30">
                <Image
                  alt="Imagen del integrante"
                  src={member.image}
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
                  <p>Contacto: <a className="text-(--secondary) hover:cursor-pointer">{member.contact}</a>
                  </p>
                </span>
              </div>
            ))
          }
        </div>
      </section>

      <section className="flex flex-col items-center justify-center mb-50">
        <h3 className="text-4xl my-5">BlackSharkStudios</h3>

        <span>
          <p className="italic text-center">Cuando las estrellas compiten</p>
          <p className="italic text-center">Destaca la que brilla con luz propia</p>
        </span>
      </section>
    </div>
  )
}

export default Nosotros