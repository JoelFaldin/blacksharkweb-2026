"use client";

import Image from "next/image";
import { useState } from "react";

const categorias = [
  "Todo",
  "Fotografía Profesional",
  "Diseño Gráfico",
  "Servicios Extra",
  "Paisaje",
  "Matrimonio",
];

type Category = (typeof categorias)[number];

interface PortfolioGalleryInterface {
  imagenes: {
    id: number,
    desc: string,
    cliente: string,
    imagenes: {
      url: string,
      categoria: string,
    }
  }[]
}

const PortfolioGallery = ({ imagenes }: PortfolioGalleryInterface) => {
  const [filtro, setFiltro] = useState<Category>("Todo");

  const filteredItems = filtro === "Todo"
    ? imagenes
    : imagenes.filter(item => item.imagenes.categoria == filtro)

  return (
    <section className="bg-(--background) py-16 border-b border-(--border)">
       {/* Navbar de filtros */}
      <div className="mx-auto max-w-7xl px-8 sm:px-12 lg:px-16">
        <div className="mb-12 flex flex-wrap items-center gap-3">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setFiltro(cat)}
              className={`rounded-none border px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.15em] transition-all cursor-pointer ${
                filtro === cat
                  ? "border-(--primary) bg-(--primary) text-(--secondary)"
                  : "border-(--border) bg-transparent text-(--muted-foreground) hover:border-(--primary) hover:text-(--primary)"
              }`}
            >
              {cat}
            </button>
          ))}

          {/* Cantidad de imágenes */}
          <span className="ml-auto text-sm uppercase tracking-[0.2em] text-(--muted-foreground)">
            {filteredItems.length} {filteredItems.length === 1 ? "imagen" : "imágenes"}
          </span>
        </div>
      </div>

      {filteredItems.length == 0 && (
        <p className="text-center tracking-[0.2em]">
          Nada que mostrar aún.
        </p>
      )}

      {/* Grid de imágenes */}
      <div className="w-[90%] mx-auto">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {filteredItems.map(item => (
            <button
              key={`gallery-image-${item.id}`}
              type="button"
              className="group mb-4 block w-full break-inside-avoid border border-(--border) bg-(--card) text-left transition-colors"
            >
              {/* Imagen */}
              <div className="relative overflow-hidden">
                <Image
                  src={item.imagenes.url}
                  alt={item.desc}
                  width={700}
                  height={500}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Descripción en capa separada */}
              <div className="relative bg-(--card) p-4">
                <div className="flex items-center justify-between">
                  <span>
                    <h3 className="text-xl font-semibold text-(--foreground)">
                      {item.desc}
                    </h3>
                    <p className="mt-1 text-md text-(--muted-foreground)">
                      {item.cliente}
                    </p>
                  </span>

                  <p className="text-right text-sm font-medium uppercase tracking-[0.2em] text-(--primary)">
                    {item.imagenes.categoria}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PortfolioGallery