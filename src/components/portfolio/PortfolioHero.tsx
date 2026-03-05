const PortfolioHero = () => {
  return (
    <section className="w-full bg-(--background)">
      <div className="flex flex-row justify-between items-center border-b border-(--border) pb-16 pt-32 px-20">
        <span className="text-xl text-(--muted-foreground) text-start max-w-md">
          <p>
            Una selección de nuestro trabajo, abarcando desde diseño de la marca, digital y
            fotografía. Cada detalle tiene una intención, precisión y visión creativa.
          </p>
        </span>
        <span className="max-w-2xl">
          <p className="text-xl text-(--primary) text-end uppercase tracking-[0.2em] mb-4">
            Nuestro trabajo
          </p>
          <h1 className="text-8xl text-(--foreground) text-balance text-end">
            Diseños con <span className="text-(--primary)">personalidad</span>
          </h1>
        </span>
      </div>
    </section>
  );
};

export default PortfolioHero;
