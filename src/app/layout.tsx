import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import { BackgroundEffect } from "@/components/background/BackgroundEffect";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import Footer from "@/components/footer/footer";

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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthenticated = !!user;

  const userName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    undefined;

  return (
    <html lang="es">
      <body>
        <BackgroundEffect />

        <Navbar
          isAuthenticated={isAuthenticated}
          userName={userName}
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
