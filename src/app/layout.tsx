import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import { BackgroundEffect } from "@/components/background/BackgroundEffect";

export const metadata: Metadata = {
  title: {
    template: "%s | BlackSharkWeb",
    default: "BlackSharkWeb",
  },
  description: "Lleva el diseño de tu marca al siguiente nivel, revisa los servicios disponibles y transforma la imagen de tu empresa en BlackSharkWeb!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <BackgroundEffect />
        <Navbar />

        {children}
      </body>
    </html>
  );
}
