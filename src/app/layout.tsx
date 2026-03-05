import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";

import "./globals.css";

import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import WhatsappButton from "@/components/WhatsappButton";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import AuthProvider from "@/providers/AuthProvider";
import CartProvider from "@/providers/CartProvider";
import MessageProvider from "@/providers/MessageProvider";

export const metadata: Metadata = {
  title: {
    template: "%s | BlackSharkWeb",
    default: "BlackSharkWeb",
  },
  description:
    "Lleva el diseño de tu marca al siguiente nivel, revisa los servicios disponibles y transforma la imagen de tu empresa en BlackSharkWeb!",
};

const font = localFont({
  src: "../../public/fonts/Satoshi-Variable.ttf",
  display: "swap",
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase.auth.getClaims();

  const userData = data?.claims?.email
    ? {
        username: data.claims.email.split("@")[0],
        email: data.claims.email,
        role: data.claims.app_metadata?.role || "user",
      }
    : null;

  const { data: carritoData } = await supabase
    .from("carrito")
    .select(
      "id, usuario_id, servicio_id, servicios(precio, nombre, imagenes(url), descripcion_corta), cantidad",
    )
    .order("id", { ascending: true });

  const flatten =
    carritoData?.map((item) => ({
      id: item.id,
      usuario_id: item.usuario_id,
      servicio_id: item.servicio_id,
      precio: item.servicios.precio,
      nombre: item.servicios.nombre,
      cantidad: item.cantidad,
      img_url: item.servicios.imagenes.url,
      desc: item.servicios.descripcion_corta || undefined,
    })) ?? [];

  return (
    <html lang="es">
      <body className={font.className}>
        <AuthProvider initialUser={userData} />
        <CartProvider initialCartItems={flatten} />
        <MessageProvider />

        <div id="modal-root" />

        <Navbar />
        {children}

        <WhatsappButton />
        <Footer />

        <Toaster />
      </body>
    </html>
  );
}
