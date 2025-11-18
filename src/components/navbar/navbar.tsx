'use client'

import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

import User from "../icons/User"
import ShoppingCart from "../icons/ShoppingCart"

const Navbar = () => {
  const pathname = usePathname();
  const matchesPathname = (path: string): string => {
    return path == pathname ? "text-[var(--foreground)]" : "text-[var(--muted-foreground)]"
  }

  return (
    <header className="grid grid-cols-3 items-center w-full backdrop-blur-md py-3 border-b border-b-[var(--primary)]">
      <Link href="/" className="flex flex-row justify-center items-center gap-x-1">
        <Image
          src="/images/bsw_logo_icon.webp"
          alt="Logo de la empresa"
          width={100}
          height={100}
        />
        <p className="font-semibold text-xl tracking-tight">
          <span>Black</span>
          <span>Shark</span>
          <span>Studios</span>
        </p>
      </Link>

      <nav>
        <ul className="flex flex-row justify-center gap-x-8 font-semibold text-md">
          <Link className={`${matchesPathname("/")} hover:text-[var(--secondary)] transition-colors`} href="/">Inicio</Link>
          <Link className={`${matchesPathname("/servicios")} hover:text-[var(--secondary)] transition-colors`} href="/servicios">Servicios</Link>
          <Link className={`${matchesPathname("/portafolio")} hover:text-[var(--secondary)] transition-colors`} href="/portafolio">Portafolio</Link>
          <Link className={`${matchesPathname("/nosotros")} hover:text-[var(--secondary)] transition-colors`} href="/nosotros">Nosotros</Link>
        </ul>
      </nav>

      <div className="text-center">
        <ul className="flex flex-row justify-center items-center gap-x-4 font-semibold text-xl">
          <Link href="/login" className="p-1 hover:bg-[var(--primary)] transition-colors rounded ">
            <User />
          </Link>
          <Link href="/carrito" className="p-1 hover:bg-[var(--primary)] transition-colors rounded">
            <ShoppingCart />
          </Link>
        </ul>
      </div>
    </header>
  )
}

export default Navbar