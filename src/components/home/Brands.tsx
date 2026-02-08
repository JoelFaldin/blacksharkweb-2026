import { div } from "framer-motion/client"
import Image from "next/image"

const brands = [
  { image: "/images/once.webp", name: 'ONCE Iquique' }
]

const Brands = () => {
  return (
    <section className="border-b border-(--border) py-36 flex flex-col items-center justify-center">
			<p className="pb-10 text-(--secondary) font-medium text-2xl uppercase tracking-widest">
        Trabajamos con
      </p>
      <h3 className="text-(--primary-foreground) font-bold text-5xl">
        Marcas locales
      </h3>
      
      {/* Sección de las marcas */}
      {/* Estructurado con "flex" de forma momentánea */}
      {/* La idea es, cuando estén más empresas, cambiar la estructura a grid */}
      <div className="py-10 flex flex-col items-center justify-center bg-(--card)">
        {brands.map(brand => (
          <div key={`brands-${brand.image}-${brand.name}`} className="flex flex-col items-center justify-center gap-y-2">
            <Image src={"/images/once.webp"} alt={`Logo de empresa ${brand.name}`} width={223} height={223} />
            <span className="text-lg uppercase">
              {brand.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Brands