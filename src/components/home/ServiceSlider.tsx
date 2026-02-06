const services = [
  "Publicidad digital",
  "Fotografía Profesional",
  "Diseño Gráfico",
  "Estampados",
  "Estampados x Mayor",
  "Servicios extras",
]

const ServiceSlider = () => {
  // Slider de servicios
  // La animación se encuentra en src/app/globals.css
  return (
    <section className="border-y border-(--border) bg-(--card) py-5 overflow-hidden">
      <div className="animate-loop flex w-max items-center">
        {[...services, ...services].map((service, i) => (
          <div key={`${service}-${i}`} className="flex items-center">
            <span className="text-(--muted-foreground) whitespace-nowrap px-6 text-sm font-medium tracking-[0.2em] uppercase">
              {service}
            </span>
            <span className="text-(--secondary)" aria-hidden="true">
              {"///"}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ServiceSlider