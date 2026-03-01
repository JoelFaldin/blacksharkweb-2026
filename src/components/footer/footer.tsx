import Image from "next/image"
import Link from "next/link"

import { Instagram } from "../icons/Instagram"

const links = [
  { name: "Inicio", href: "/" },
  { name: "Servicios", href: "/servicios" },
  { name: "Portafolio", href: "/portafolio" },
  { name: "Nosotros", href: "/nosotros" }
]

const Footer = () => {
  return (
    <footer className="border-t border-(--border) py-16 bg-(--background)">
      <div className="px-40 flex md:flex-row flex-col items-center justify-between gap-2">
        <section className="flex flex-col items-center justify-center gap-y-2">
          <Image src={"/images/bsw_logo_icon.webp"} alt="Logo de BlackSharkStudios" width={97} height={85} />
          <p className="text-xl text-(--muted-foreground) max-w-sm text-center">
            Trabajamos para que tu marca crezca con estrategia, identidad y estilo.
          </p>
        </section>
        <section className="flex flex-row items-center gap-x-8">
          {links.map(link => (
            <Link key={`footer-link-${link.href}`} href={link.href}>
              <span className="text-lg hover:text-(--primary) text-(--muted-foreground) transition-colors">
                {link.name}
              </span>
            </Link>
          ))}
          <Link href="https://www.instagram.com/blackshark.studios/" className="bg-(--primary)/80 rounded-full p-2 cursor-pointer">
            <Instagram width={30} height={30} />
          </Link>
        </section>
      </div>
    </footer>
  )
}

export default Footer