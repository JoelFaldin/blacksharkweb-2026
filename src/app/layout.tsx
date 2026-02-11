import type { Metadata } from "next";
import { Toaster } from "sonner";

import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import Footer from "@/components/footer/footer";
import AuthProvider from "@/components/AuthProvider";

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

  return (
    <html lang="es">
      <body>
        <AuthProvider initialUser={userData} />

        <Navbar />
        {children}
        <Footer />

        <Toaster />
      </body>
    </html>
  );
}
