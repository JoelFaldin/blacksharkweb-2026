import type { Metadata } from "next";
import { Toaster } from "sonner";

import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import Footer from "@/components/footer/footer";
import AuthProvider from "@/providers/AuthProvider";
import CartProvider from "@/providers/CartProvider";

export const metadata: Metadata = {
  title: {
    template: "%s | BlackSharkWeb",
    default: "BlackSharkWeb",
  },
  description:
    "Lleva el diseño de tu marca al siguiente nivel, revisa los servicios disponibles y transforma la imagen de tu empresa en BlackSharkWeb!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const supabase = await createSupabaseServerClient();

  const { data: { user }} = await supabase.auth.getUser();

  const userData = {
    username: user?.user_metadata?.email.split("@")[0],
    email: user?.user_metadata?.email,
  }

  const { data: carritoData } = await supabase
    .from("carrito")
    .select("id, usuario_id, servicio_id, servicios(precio, nombre), cantidad");
  
  const flatten = carritoData?.map(item => ({
      id: item.id,
      usuario_id: item.usuario_id,
      servicio_id: item.servicio_id,
      precio: item.servicios.precio,
      nombre: item.servicios.nombre,
      cantidad: item.cantidad,
    })
  ) ?? []

  return (
    <html lang="es">
      <body>
        <AuthProvider initialUser={userData} />
        <CartProvider initialCartItems={flatten} />

        <Navbar />
        {children}
        <Footer />

        <Toaster />
      </body>
    </html>
  );
}
