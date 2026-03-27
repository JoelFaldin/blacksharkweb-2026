"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useAuthStore } from "@/lib/store/useAuthStore";
import { useSupabaseStore } from "@/lib/store/useSupabaseStore";
import type { User as UserType } from "@/types";
import { Menu, ShoppingCart, User, XIcon } from "../icons";
import MenuButton from "./MenuButton";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/portafolio", label: "Portafolio" },
  { href: "/nosotros", label: "Nosotros" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();
  const matchesPathname = (path: string): string => {
    return path === pathname ? "text-foreground" : "text-muted-foreground";
  };

  const router = useRouter();

  const user: UserType | null = useAuthStore((s) => s.user);
  const clearUser = useAuthStore((s) => s.clearUser);
  const supabase = useSupabaseStore((s) => s.supabase);

  const handleLogout = async () => {
    const loading = toast.loading("Cerrando sesión...");

    await supabase.auth.signOut();
    clearUser();

    toast.success("Sesión finalizada");
    toast.dismiss(loading);

    router.refresh();
  };

  // La documentación de React sugiere usar useEffect al lidiar con el DOM:
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="grid grid-cols-3 md:grid md:grid-cols-3 flex-row items-center w-full backdrop-blur-md py-3 border-b border-b-border bg-background">
        <Link href="/" className="flex flex-row justify-center items-center gap-x-1">
          <Image src="/images/bsw_logo_icon.webp" alt="Logo de la empresa" width={97} height={85} />
          <p className="hidden min-[1060px]:block font-semibold text-xl tracking-tight text-foreground">
            <span>Black</span>
            <span>Shark</span>
            <span>Studios</span>
          </p>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex flex-row justify-center gap-x-8 font-semibold text-md text-muted-foreground">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  className={`${matchesPathname(href)} hover:text-primary transition-colors`}
                  href={href}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block text-center">
          <ul className="flex flex-row justify-center items-center gap-x-4 text-foreground font-semibold text-xl">
            {user?.email || user?.username ? (
              <>
                <li className="px-3 py-1 rounded bg-secondary text-sm">{user.username}</li>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-3 py-1 rounded hover:bg-secondary transition-colors text-sm cursor-pointer"
                >
                  Cerrar Sesión
                </button>

                <Link href="/carrito" className="p-1 hover:bg-primary transition-colors rounded">
                  <ShoppingCart />
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="p-1 hover:bg-secondary transition-colors rounded">
                  <User />
                </Link>

                <Link href="/carrito" className="p-1 hover:bg-secondary transition-colors rounded">
                  <ShoppingCart />
                </Link>
              </>
            )}
          </ul>
        </div>

        <div className="flex md:hidden items-center justify-end gap-x-3 col-span-2">
          <Link
            href="/carrito"
            className="p-1 hover:bg-secondary transition-colors rounded text-foreground"
          >
            <ShoppingCart />
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="p-1 mr-5 hover:bg-secondary transition-colors rounded text-foreground cursor-pointer"
          >
            {menuOpen ? <XIcon /> : <Menu />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <MenuButton
          navLinks={navLinks}
          pathname={pathname}
          setMenuOpen={setMenuOpen}
          user={user}
          handleLogout={handleLogout}
        />
      )}
    </>
  );
};

export default Navbar;
