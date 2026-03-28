export function NosotrosHero() {
  return (
    <section className="w-full bg-background">
      <div className="flex flex-col md:flex-row gap-y-8 justify-between items-center border-b border-border pb-16 pt-32 px-20">
        <span className="max-w-2xl">
          <p className="text-xl text-center md:text-start text-primary uppercase tracking-[0.2em] mb-4">
            Sobre nosotros
          </p>
          <h1 className="text-6xl md:text-8xl text-foreground text-balance text-center md:text-start">
            El estudio detrás de la <span className="text-primary">visión</span>
          </h1>
        </span>
        <span className="text-xl text-muted-foreground text-center md:text-end max-w-md">
          <p>
            Creamos marcas con identidad, estrategia y visión. Transformamos ideas en experiencias
            visuales que generan impacto y crecimiento.
          </p>
        </span>
      </div>
    </section>
  );
}
