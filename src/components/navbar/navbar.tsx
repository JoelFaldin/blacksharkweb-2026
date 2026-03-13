"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import { useAuthStore } from "@/lib/store/useAuthStore";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { ShoppingCart, User } from "../icons";

interface UserInterface {
  username?: string;
  email: string;
  role: string;
}

const Navbar = () => {
  const pathname = usePathname();
  const matchesPathname = (path: string): string => {
    return path === pathname ? "text-foreground" : "text-muted-foreground";
  };

  const router = useRouter();

  const user: UserInterface | null = useAuthStore((s) => s.user);
  const clearUser = useAuthStore((s) => s.clearUser);

  const handleLogout = async () => {
    const supabase = await getSupabaseBrowserClient();
    const loading = toast.loading("Cerrando sesión...");

    await supabase.auth.signOut();
    clearUser();

    toast.success("Sesión finalizada");
    toast.dismiss(loading);

    router.refresh();
  };

  return (
    <header className="grid grid-cols-3 items-center w-full backdrop-blur-md py-3 border-b border-b-border bg-background">
      <Link href="/" className="flex flex-row justify-center items-center gap-x-1">
        <Image src="/images/bsw_logo_icon.webp" alt="Logo de la empresa" width={97} height={85} />
        <p className="font-semibold text-xl tracking-tight text-foreground">
          <span>Black</span>
          <span>Shark</span>
          <span>Studios</span>
        </p>
      </Link>

      <nav>
        <ul className="flex flex-row justify-center gap-x-8 font-semibold text-md text-muted-foreground">
          <Link className={`${matchesPathname("/")} hover:text-primary transition-colors`} href="/">
            Inicio
          </Link>
          <Link
            className={`${matchesPathname("/servicios")} hover:text-primary transition-colors`}
            href="/servicios"
          >
            Servicios
          </Link>
          <Link
            className={`${matchesPathname("/portafolio")} hover:text-primary transition-colors`}
            href="/portafolio"
          >
            Portafolio
          </Link>
          <Link
            className={`${matchesPathname("/nosotros")} hover:text-primary transition-colors`}
            href="/nosotros"
          >
            Nosotros
          </Link>
        </ul>
      </nav>

      <div className="text-center">
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
    </header>
  );
};

export default Navbar;
