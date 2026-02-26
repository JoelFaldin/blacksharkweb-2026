import Image from "next/image"

export function NosotrosHistory () {
    return (
        <section className="bg-background py-24 md:py-32 w-full border-b border-(--border)">
            <div className="mx-auto max-w-7xl px-6">
                {/* Section label */}
                <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-(--primary)">
                Nuestra historia
                </p>

                <div className="grid gap-24 md:grid-cols-2 md:items-center">
                {/* Text content */}
                    <div>
                        <h2 className="text-(--foreground) text-3xl font-bold md:text-4xl lg:text-5xl text-balance">
                            Nacidos de una pasión por el diseño audaz y significativo
                        </h2>
                        <div className="mt-8 flex flex-col gap-6 text-(--muted-foreground) leading-relaxed">
                        <p>
                            BlackSharkStudios fue fundada con una sola convicción: el diseño no es decoración.
                            Es estrategia hecha visible. Cada trazo, color y composición
                            debe cumplir un propósito y motivar a las personas a actuar.
                        </p>
                        <p>
                            Lo que comenzó como una operación freelance unipersonal se ha convertido en un
                            estudio creativo sólido y colaborativo que atiende clientes de diversas industrias,
                            desde startups que buscan encontrar su voz hasta marcas consolidadas que desean reinventarse.
                        </p>
                        <p>
                            Creemos en una estética minimalista con máximo impacto. Nuestro trabajo
                            elimina lo innecesario para revelar lo que realmente importa: la
                            identidad central de tu marca, comunicada con precisión y excelencia.
                        </p>
                        </div>

                        {/* Values row */}
                        <div className="mt-12 grid grid-cols-3 gap-6 text-(--primary)">
                        {[
                            { number: "01", label: "Precisión" },
                            { number: "02", label: "Audacia" },
                            { number: "03", label: "Integridad" },
                        ].map((value) => (
                            <div key={value.label} className="border-t border-border pt-4">
                            <span className="text-xs font-medium text-primary">{value.number}</span>
                            <p className="mt-1 text-sm font-semibold uppercase tracking-[0.15em] text-foreground">
                                {value.label}
                            </p>
                            </div>
                        ))}
                        </div>
                    </div>

                    {/* Studio image */}
                    <div className="relative aspect-[4/5] text-(--primary) overflow-hidden">
                        <Image
                        src="/images/history.jpg"
                        alt="BlackSharkStudios creative workspace"
                        fill
                        className="object-cover"
                        />
                        {/* Gold corner accent */}
                        <div className="absolute bottom-0 right-0 h-24 w-24 border-b-2 border-r-2 border-primary" />
                    </div>
                </div>
            </div>
        </section>
    )
}