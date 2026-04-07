"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import PortfolioAddButton from "./PortfolioAddButton";
import PortfolioImage from "./PortfolioImage";

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
    id: number;
    desc: string;
    cliente: string;
    disponible: boolean;
    imagenes: {
      url: string;
      categoria: string;
    };
  }[];
}

const PortfolioGallery = ({ imagenes }: PortfolioGalleryInterface) => {
  const [filtro, setFiltro] = useState<Category>("Todo");

  const filteredItems =
    filtro === "Todo" ? imagenes : imagenes.filter((item) => item.imagenes.categoria === filtro);

  return (
    <section className="bg-background py-16 border-b border-border">
      {/* Navbar de filtros */}
      <div className="mx-auto max-w-7xl px-8 sm:px-12 lg:px-16">
        <div className="mb-12 flex flex-wrap items-center gap-3">
          {categorias.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setFiltro(cat)}
              className={`rounded-none border px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.15em] transition-all cursor-pointer ${
                filtro === cat
                  ? "border-primary bg-primary text-secondary"
                  : "border-border bg-transparent text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}

          {/* Cantidad de imágenes */}
          <span className="ml-auto text-sm uppercase tracking-[0.2em] text-muted-foreground">
            {filteredItems.length} {filteredItems.length === 1 ? "imagen" : "imágenes"}
          </span>
        </div>
      </div>

      {filteredItems.length === 0 && (
        <p className="text-center tracking-[0.2em] text-foreground">Nada que mostrar aún.</p>
      )}

      {/* Grid de imágenes */}
      <div className="w-[90%] mx-auto">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          <div className="w-full max-[945px]:max-w-95 mb-4">
            <PortfolioAddButton />
          </div>
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <PortfolioImage key={`item-portfolio-${item.imagenes.url}`} item={item} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default PortfolioGallery;
