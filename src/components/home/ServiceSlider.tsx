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
      <div className="relative flex w-full overflow-hidden">
        <div className="animate-loop flex">
          {/* Primer set */}
          <div className="flex shrink-0">
            {services.map((service, i) => (
              <div key={`a-${i}`} className="flex items-center">
                <span className="text-(--muted-foreground) whitespace-nowrap px-6 text-sm font-medium tracking-[0.2em] uppercase">
                  {service}
                </span>
                <span aria-hidden className="text-(--secondary)">
                  {"///"}
                </span>
              </div>
            ))}
          </div>
          {/* Segundo set */}
          <div className="flex shrink-0">
            {services.map((service, i) => (
              <div key={`b-${i}`} className="flex items-center">
                <span className="text-(--muted-foreground) whitespace-nowrap px-6 text-sm font-medium tracking-[0.2em] uppercase">
                  {service}
                </span>
                <span aria-hidden className="text-(--secondary)">
                  {"///"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServiceSlider