import Link from "next/link";

import ArrowRight from "@/components/icons/ArrowRight";

export default function Home() {
  return (
      <div className="container mx-auto px-4 pt-32 pb-20">
        <h1 className="text-7xl font-bold text-center mb-10">
          Diseños que <br />
          <span className="text-(--secondary)"> impulsan </span>
          tu marca
        </h1>
        <p className="max-w-xl text-xl text-center text-pretty mb-10 mx-auto">
          Nos encargamos de crear y transformar la imagen de tu marca para capturar la atención de tus clientes.
          Desde el concepto hasta la ejecución, traemos tus ideas a la realidad con calidad excelente.
        </p>

        <section className="flex flex-row justify-center items-center gap-3">
          <Link href="/portafolio" className="group flex flex-row items-center justify-center gap-x-2 bg-(--secondary) hover:bg-(--secondary)/90 px-4 py-2 rounded-lg opacity-100">
            <span className="text-black text-md font-bold">
              Portafolio
            </span>
            <ArrowRight className="text-black group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/nosotros" className="bg-black hover:bg-neutral-900 px-4 py-2 rounded-lg border border-white/30">
            <span className="font-bold">
              Contáctanos
            </span>
          </Link>
        </section>
      </div>  
  )
}