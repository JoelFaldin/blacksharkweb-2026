import Link from "next/link"

import ArrowRight from "../icons/ArrowRight"

const ContactForm = () => {
  return (
    <section className="py-48 bg-(--card) flex flex-col items-center justify-center text-center">
      <p className="mb-4 text-2xl font-medium uppercase tracking-[0.2em] text-(--secondary)">
        ¿Tienes una idea en mente?
      </p>
      <h4 className="mb-6 text-5xl font-bold text-(--primary-foreground) text-balance">
        Ponte en contacto con nosotros
      </h4>
      <p className="mx-auto text-xl mb-10 max-w-md text-(--muted-foreground) leading-relaxed">
        Cuéntanos tu idea y trabajemos juntos para que tu marca crezca con estrategia, identidad y estilo.
      </p>

      <span className="flex flex-row gap-8">
        <Link href="/nosotros" className="flex flex-row gap-x-2 bg-(--secondary) hover:bg-(--secondary)/80 px-4 py-2 rounded-lg border border-white/30">
          <span className="font-bold text-(--primary)">
            Contáctanos
          </span>
          <ArrowRight className="text-black group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link href={"/servicios"} className="flex flex-row items-center justify-center border border-(--border) rounded-lg px-4 py-2">
          <span className="text-(--primary-foreground)">
            Servicios
          </span>
        </Link>
      </span>
    </section>
  )
}

export default ContactForm