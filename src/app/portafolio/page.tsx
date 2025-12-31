"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { images } from "@/data/images";

export default function Portafolio() {
  const [filtro, setFiltro] = useState("Todo");

  const categorias = ["Todo", "Fotografía Profesional", "Diseño Gráfico", "Servicios Extra"];

  return (
    <section className="w-full flex flex-col items-center py-12">

      {/* 🔹 Navbar de filtros */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setFiltro(cat)}
            className={`font-satoshi-bold px-4 py-2 text-sm font-semibold transition-all duration-300 cursor-pointer ${
              filtro === cat
                ? "bg-black text-white scale-105"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } rounded-md`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filtro de secciones */}
      <motion.div
        layout
        className="px-4 sm:px-8 md:px-12 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
      >
        <AnimatePresence>
          {images
            .filter((img) => filtro === "Todo" || img.categoria === filtro)
            .map((img) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="break-inside-avoid overflow-hidden shadow-md hover:scale-[1.02] transition-transform duration-500"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}