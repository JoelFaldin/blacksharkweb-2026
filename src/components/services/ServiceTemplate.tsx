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
import { useContextStore } from "@/lib/store/useContextStore"
import Modal from "../Modal"
import Alert from "../icons/Alert"
import ArrowRight from "../icons/ArrowRight"

interface ServiceTemplateInterface {
  id: number,
  precio: string,
  descripcion_corta: string,
  nombre: string,
  imagen: {
    url: string,
  } | null,
  index: number,
}

const ServiceTemplate = ({ id, precio, descripcion_corta, nombre, imagen, index }: ServiceTemplateInterface) => {
  const [isOpen, setIsOpen] = useState(false)

  const supabase = getSupabaseBrowserClient();
  
  const addItem = useCartStore(e => e.addItem);
  const whatsappLink = useContextStore(m => m.getLink);
  const message = useContextStore(m => m.message);
  const setMessage = useContextStore(m => m.setMessage);
  const setCustomMessage = useContextStore(m => m.setCustomMessage);
  
  const handleAddItem = async () => {
    const { data } = await supabase.auth.getClaims();

    if (!data) {
      alert("¡Debes iniciar sesión para agregar servicios al carrito!");
      return;
    }

    addItem(id, data.claims.sub);

    toast.success("¡Se ha agregado el servicio al carrito!");
  }

  const handleOpenWhatsapp = () => {
    setMessage(nombre);
    
    return whatsappLink();
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
  }

  return (
    <div className="group relative flex flex-col border border-(--border) bg-(--background) transition-colors hover:border-(--primary)/40">
      {/* Index */}
      <div className="absolute left-4 top-4 z-10">
        <span className="text-md font-medium tracking-widest text-(--foreground)/40">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Imagen */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imagen?.url || ""}
          alt={`Servicio ${nombre}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
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

      <Modal isOpen={isOpen} onClose={handleModal}>
        <section className="relative w-full max-w-2xl border border-(--primary)/50 bg-(--card) shadow-2xl">
          <div className="relative aspect-[16/7] w-full overflow-hidden">
            <Image
              src={imagen?.url ?? ""}
              alt={`Imagen del servicio ${nombre}`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-(--card) via-(--card)/40 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6">
              <p className="mb-1 text-xs font-medium uppercase tracking-[0.2em] text-(--primary)">
                Solicitar Servicio
              </p>
              <h2 className="font-sans text-2xl font-bold text-(--foreground) md:text-3xl">{nombre}</h2>
            </div>
          </div>

          <div className="px-6 pt-3 pb-6">
            <p className="mb-6 text-sm leading-relaxed text-(--muted-foreground)">{descripcion_corta}</p>
            <span className="flex flex-row gap-2 mb-2">
              <Alert />
              <p>Serás redirigido a WhatsApp para ponerte en contacto con el diseñador.</p>
            </span>

            <span className="flex flex-col gap-1 mb-2">
              <label htmlFor="custom-message">Cambiar mensaje:</label>
              <input
                id="custom-message"
                className="border border-white rounded-md px-2 py-1 focus:outline-none focus:border-(--primary)"
                value={message}
                onChange={e => setCustomMessage(e.target.value)}
              />
            </span>

            <span className="border-(--border) p-2 border-t flex flex-col my-4">
              <p className="text-sm text-(--muted-foreground)">Precio del Servicio:</p>
              <p className="text-2xl text-(--primary) font-bold">{priceFormat(parseInt(precio))}</p>
            </span>

            <span className="flex flex-row items-center justify-center gap-2">
              <Button type="secondary" onClick={handleModal} className="group p-6 cursor-pointer">
                <span className="text-(--foreground) text-lg font-bold">Volver</span>
              </Button>
              <Button type="primary" onClick={handleOpenWhatsapp} className="group py-6 px-4 cursor-pointer flex flex-row items-center gap-2">
                <span className="text-(--secondary) text-lg font-bold">Continuar</span>
                <ArrowRight className="text-black group-hover:translate-x-1 transition-transform" />
              </Button>
            </span>
          </div>
        </section>
      </Modal>
    </div>
  )
}

export default ServiceTemplate