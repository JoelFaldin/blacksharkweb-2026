import Image from "next/image"

export function NosotrosHistory () {
    return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section label */}
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-primary">
          Our Story
        </p>

        <div className="grid gap-16 md:grid-cols-2 md:items-center">
          {/* Text content */}
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl text-balance">
              Born from a passion for bold, meaningful design
            </h2>
            <div className="mt-8 flex flex-col gap-6 text-muted-foreground leading-relaxed">
              <p>
                BlackSharkStudios was founded with a single conviction: design is not decoration.
                It is strategy made visible. Every mark, color, and composition
                should serve a purpose and move people to act.
              </p>
              <p>
                What began as a one-person freelance operation has grown into a
                tight-knit creative studio serving clients across industries -- from
                startups finding their voice to established brands seeking reinvention.
              </p>
              <p>
                We believe in minimal aesthetics with maximum impact. Our work
                strips away the unnecessary to reveal what truly matters: your
                brand&apos;s core identity, communicated with precision and craft.
              </p>
            </div>

            {/* Values row */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              {[
                { number: "01", label: "Precision" },
                { number: "02", label: "Boldness" },
                { number: "03", label: "Integrity" },
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
          <div className="relative aspect-[4/5] overflow-hidden">
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