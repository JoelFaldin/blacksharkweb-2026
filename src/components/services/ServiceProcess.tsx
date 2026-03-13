const procesos = [
  {
    name: "Descubrimiento",
    desc: "Comenzamos por conocer tu marca, audiencia y objetivos. Por medio de investigación y análisis, descubrimos lo que hace única a tu marca.",
  },
  {
    name: "Concepto",
    desc: "Con el conocimiento adquirido, exploramos múltiples direcciones artísticas. Los conceptos son refinados con colaboración intrínseca.",
  },
  {
    name: "Diseño",
    desc: "Los estilos definidos llegan a la vida con precisión milimétrica. Cada detalle tiene un propósito, desde la tipografía hasta la composición de colores.",
  },
  {
    name: "Entrega",
    desc: "Los archivos finales, pautas de diseño y recursos son preparados para cada caso de uso. De esta forma, tu marca adquiere una personalidad única.",
  },
];

const ServiceProcess = () => {
  return (
    <section className="border-y border-border py-20 px-6 bg-card">
      <div className="max-w-xl mb-16 p-6 flex flex-col gap-3 text-foreground">
        <p className="text-md text-primary tracking-[0.2em] uppercase)">
          Nuestro proceso de trabajo
        </p>
        <h2 className="text-5xl ">Un proceso diseñado con claridad y calidad</h2>
      </div>

      <div className="grid gap-px md:grid-cols-4">
        {procesos.map((proceso, index) => {
          const style = index !== 3 ? "border-r border-px border-border" : "";
          return (
            <div
              key={`process-item-${index}-${proceso.name}`}
              className={`${style} text-foreground group flex flex-col items-start justify-start p-10 gap-y-4 transition-colors hover:bg-background`}
            >
              <span className="text-primary/70 group-hover:text-primary text-3xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h1 className="text-4xl">{proceso.name}</h1>
              <p className="text-lg text-muted-foreground">{proceso.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ServiceProcess;
