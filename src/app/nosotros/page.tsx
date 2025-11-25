interface TeamInterface {
  image: string,
  name: string,
  description: string,
}

const team: TeamInterface[] = [
  {
    image: "",
    name: "Andrés",
    description: "Diseñador"
  },
  {
    image: "",
    name: "Carlos",
    description: "Desarrollador web"
  },
  {
    image: "",
    name: "Joel",
    description: "Desarrollador web"
  },
  {
    image: "",
    name: "Samuel",
    description: "Desarrollador web"
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

        <ul className="flex flex-col gap-y-1 p-4 rounded-lg border border-white/30">
          <li>🎯 Agencia creativa 5.0 en Iquique 🇨🇱</li>
          <li>📷 Diseño gráfico, marketing digital, fotografía, estampados y más.</li>
          <li>🚀 Hacemos que tu marca crezca con estrategia, identidad y estilo.</li>
          <li>💭 Escríbenos al WhatsApp +56 9 4234 4070 y llevemos tu idea al siguiente nivel.</li>
        </ul>
      </section>

      <section className="max-w-2xl mx-auto flex flex-col gap-4">
        <h3 className="text-3xl">Nuestro equipo 🥇</h3>
        
        <div className="grid grid-cols-4 gap-4">
          {
            team.map((member: TeamInterface) => (
              <div className="p-4 rounded-lg border border-white/30">
                {/* Imagen de cada integrante: */}
                <div className="h-10 w-10 bg-white/30"></div>
                <p>{member.name}</p>
                <p>{member.description}</p>
              </div>
            ))
          }
        </div>
      </section>
    </div>
  )
}

export default Nosotros