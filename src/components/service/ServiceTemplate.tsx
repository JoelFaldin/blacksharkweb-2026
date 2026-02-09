import Image from "next/image"

import ArrowUpRight from "../icons/ArrowUpRight"
import Button from "../Button"
import ShoppingCart from "../icons/ShoppingCart"
import Send from "../icons/Send"

interface ServiceTemplateInterface {
  precio: string,
  descripcion_corta: string,
  nombre: string,
  imagen: {
    url: string,
  } | null,
  index: number,
}

const ServiceTemplate = ({ precio, descripcion_corta, nombre, imagen, index }: ServiceTemplateInterface) => {
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
            {precio}
          </span>
        </div>

        <div className="flex items-center justify-center gap-4 pt-8">
          <Button type="secondary" href="" className="flex flex-row items-center justify-center rounded-lg p-6 gap-x-4">
            <ShoppingCart />
            <span>Añadir al carrito</span>
          </Button>
          <Button type="primary" href="" className="flex flex-row items-center justify-center rounded-lg p-6 gap-x-4">
            <Send className="text-(--secondary)" />
            <span className="text-(--secondary)">Solicitar Servicio</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ServiceTemplate