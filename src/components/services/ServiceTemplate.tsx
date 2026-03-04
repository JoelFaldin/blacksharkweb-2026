"use client"

import Image from "next/image"
import { toast } from "sonner"
import { useState } from "react"

import ArrowUpRight from "../icons/ArrowUpRight"
import Button from "../Button"
import ShoppingCart from "../icons/ShoppingCart"
import Send from "../icons/Send"
import { useCartStore } from "@/lib/store/useCartStore"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import priceFormat from "@/lib/utils/priceFormat"
import ServiceModal from "./ServiceModal"
import { useContextStore } from "@/lib/store/useContextStore"
import { useAuthStore } from "@/lib/store/useAuthStore"
import XIcon from "../icons/XIcon"
import scheduleServiceSync from "@/lib/utils/serviceSync"
import EyeClose from "../icons/EyeClose"
import Confirm from "../Confirm"

interface ServiceTemplateInterface {
  id: number,
  precio: string,
  descripcion_corta: string,
  nombre: string,
  imagen: {
    url: string,
  } | null,
  index: number,
  disponible: boolean,
}

const ServiceTemplate = ({ id, precio, descripcion_corta, nombre, imagen, index, disponible }: ServiceTemplateInterface) => {
  const [isOpen, setIsOpen] = useState(false)

  const supabase = getSupabaseBrowserClient();
  
  const addItem = useCartStore(e => e.addItem);
  const setCustomMessage = useContextStore(m => m.resetMessage);
  const user = useAuthStore(u => u.user);
  
  const handleAddItem = async () => {
    const { data } = await supabase.auth.getClaims();

    if (!data) {
      toast.warning("¡Debes iniciar sesión para agregar servicios al carrito!");
      return;
    }

    addItem(id, data.claims.sub);

    toast.success("¡Se ha agregado el servicio al carrito!");
  }

  const handleChangeVisibility = async () => {
    toast.promise(
      scheduleServiceSync(id),
      {
        loading: "Cambiando la visibilidad del servicio...",
        success: "¡Se ha cambiado la visibilidad del servicio!",
        error: "Error al cambiar la visibilidad del servicio",
      }
    );
  }

  const handleModal = () => {
    if (!isOpen) {
      setIsOpen(true);
      // Desactivar el scroll cuando se abre el modal:
      document.body.classList.add('overflow-hidden');
    } else {
      setIsOpen(false);
      // Reactivar el scroll cuando se cierra el modal:
      document.body.classList.remove('overflow-hidden');
    }

    setCustomMessage();
  }

  return (
    <div className="group relative flex flex-col border border-(--border) bg-(--background) transition-colors hover:border-(--primary)/40">
      {/* Index */}
      <div className="absolute left-4 top-4 z-10">
        <span className="text-md font-medium tracking-widest text-(--foreground)/40">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      {user?.role === "admin" && (
        disponible ? (
          <div className="absolute right-4 top-4 z-10">
            <button
              type="button"
              onClick={handleChangeVisibility}
              className="z-10 absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full border-transparent text-transparent transition-all group-hover:border-(--border) group-hover:text-(--muted-foreground) hover:!border-(destructive) hover:!text-(--destructive) cursor-pointer"
            >
              <XIcon className="text-(--foreground)" />
            </button>
          </div>
        ) : (
          <>
            <span className="z-10 px-1 absolute top-2 right-2 flex flex-row justify-center items-center gap-2 rounded-md border border-(--border) font-semibold bg-(--background)/90 text-[10px] uppercase tracking-[0.15em] text-(--muted-foreground)">
                <EyeClose />
                <span>Invisible</span>
              </span>
            <Confirm visible={disponible} changeVisibility={handleChangeVisibility} text="este servicio" position="right" />
          </>
        )
      )}

      {/* Imagen */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imagen?.url || ""}
          alt={`Servicio ${nombre}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="eager"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Contenido */}
      <div className="flex flex-1 flex-col justify-center p-6">
        <span className="mb-4 flex items-center justify-between gap-4">
          <h3 className="text-xl font-bold text-(--foreground) transition-colors group-hover:text-(--primary)">
            {nombre}
          </h3>
          <ArrowUpRight className="text-(--foreground) transition-colors group-hover:text-(--primary)" />
        </span>

        <p className="flex-1 text-md leading-relaxed text-(--muted-foreground)">
          {descripcion_corta}
        </p>

        <div className="flex items-center justify-between border-t border-(--border) pt-4">
          <span className="text-md font-medium uppercase tracking-[0.2em] text-(--muted-foreground)">
            Precio
          </span>
          <span className="text-xl font-bold text-(--primary)">
            {priceFormat(parseInt(precio))}
          </span>
        </div>

        <div className="flex items-center justify-center gap-4 pt-8">
          <button
            type="button"
            onClick={() => handleAddItem()}
            className="flex flex-row items-center justify-center border border-(--border) p-6 gap-x-4 cursor-pointer"
          >
            <ShoppingCart />
            <span>Añadir al carrito</span>
          </button>
          <Button type="primary" onClick={handleModal} className="flex flex-row items-center justify-center rounded-lg p-6 gap-x-4 cursor-pointer">
            <Send className="text-(--secondary)" />
            <span className="text-(--secondary)">Solicitar Servicio</span>
          </Button>
        </div>
      </div>

      <ServiceModal
        nombre={nombre}
        url={imagen?.url}
        descripcion_corta={descripcion_corta}
        precio={precio}
        handleModal={handleModal}
        isOpen={isOpen}
      />
    </div>
  )
}

export default ServiceTemplate