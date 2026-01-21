"use client";

import Image from "next/image";
import { useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";


interface ServicioInterface {
  id: number;
  precio: string;
  descripcion_corta: string;
  imagen: {
    url: string;
  } | null;
  nombre: string;
}

interface Props {
  servicios: ServicioInterface[];
  isAuthenticated: boolean;
}

const ServiceClient = ({ servicios, isAuthenticated }: Props) => {
    const [showAuthAlert, setShowAuthAlert] = useState(false);
    const supabase = getSupabaseBrowserClient();

    const handleAddToCart = async (servicioId: number) => {
    if (!isAuthenticated) {
        setShowAuthAlert(true);
        return;
    }

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        setShowAuthAlert(true);
        return;
    }
    };

  return (
    <div className="w-full px-8 py-16">
      {showAuthAlert && (
        <div className="
            fixed bottom-6 left-1/2 z-50
            w-[90%] max-w-md
            -translate-x-1/2
            rounded-xl
            border border-red-500/40
            bg-gradient-to-r from-[#2a0f14] via-[#3a1218] to-[#2a0f14]
            p-4
            shadow-[0_0_30px_rgba(239,68,68,0.35)]
            backdrop-blur
            animate-slide-up
        ">
            <div className="flex items-start justify-between gap-4">
                <p className="text-red-400 text-sm font-medium">
                    Debes registrarte e iniciar sesión para poder comprar
                </p>

                <button
                    onClick={() => setShowAuthAlert(false)}
                    className="text-red-400 hover:text-red-300 transition cursor-pointer"
                >
                    ✕
                </button>
            </div>
        </div>
        )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
        {servicios.map((servicio) => (
          <div
            key={servicio.id}
            className="group flex flex-col w-[26rem] h-full rounded-2xl
            bg-gradient-to-br from-[#0b1320] via-[#0e1a2f] to-[#0b1320]
            border border-blue-500/10
            shadow-[0_0_0_1px_rgba(59,130,246,0.08)]
            hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]
            transition-all duration-300"
          >
            {/* Imagen */}
            <div className="relative w-full h-64 overflow-hidden rounded-t-2xl">
              {servicio.imagen?.url && (
                <Image
                  src={servicio.imagen.url}
                  alt={servicio.nombre}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>

            {/* Contenido */}
            <div className="p-6 flex flex-col gap-3 text-sm text-slate-300 flex-1">
              <p className="text-blue-400 font-semibold text-lg">
                ${servicio.precio}
              </p>

              <p className="text-white text-lg font-semibold">
                {servicio.nombre}
              </p>

              <p className="text-slate-400 flex-1">
                {servicio.descripcion_corta}
              </p>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <button
                   onClick={() => handleAddToCart(servicio.id)}
                  className="rounded-lg border border-blue-500/30
                  bg-blue-500/10 text-blue-300
                  py-2 font-medium
                  hover:bg-blue-500/20 hover:text-white transition"
                >
                  Añadir al carrito
                </button>

                <button
                   onClick={() => handleAddToCart(servicio.id)}
                  className="rounded-lg bg-blue-600 text-white
                  py-2 font-medium
                  hover:bg-blue-500 transition shadow-lg shadow-blue-600/30"
                >
                  Comprar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceClient;

