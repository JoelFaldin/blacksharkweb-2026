const ServiceHero = () => {
  return (
    <section className="w-full bg-(--background)">
      <div className="flex flex-row justify-between items-center border-b border-(--border) pb-16 pt-32 px-20">
        <span className="max-w-2xl">
          <p className="text-xl text-(--primary) uppercase tracking-[0.2em] mb-4">
            Nuestro trabajo
          </p>
          <h1 className="text-8xl text-(--foreground) text-balance">
            Servicios de alto <span className="text-(--primary)">impacto</span>
          </h1>
        </span>
        <span className="text-xl text-(--muted-foreground) text-end max-w-md">
          <p>Cada proyecto es importante. Combinamos pensamiento estratégico con diseño elegante y único que se alinea con tu marca.</p>
        </span>
      </div>
    </section>
  )
}

export default ServiceHero