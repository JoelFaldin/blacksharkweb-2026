import Link from "next/link";

import ArrowRight from "@/components/icons/ArrowRight";

const Home = () => {
  return (
    <div className="mx-auto px-4 pt-36 pb-20">
      <p className="text-2xl text-(--secondary) text-center mb-5">Agencia Publicitaria</p>
      <h1 className="text-8xl font-bold text-center mb-10">
        Diseños que <br />
        <span className="text-(--secondary)"> impulsan </span>
        tu marca
      </h1>
      <p className="max-w-2xl text-2xl text-center text-pretty mb-10 mx-auto">
        Transformamos la imagen de tu marca para capturar la atención de tus clientes.
        Desde el concepto hasta la ejecución, traemos tus ideas a la realidad con calidad excelente.
      </p>

      <section className="flex flex-row justify-center items-center gap-3 mb-20">
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

      <section className="flex flex-col justify-center items-center gap-5">
        <div className="h-10 w-[2px] bg-(--secondary)" />
        <p className="text-2xl text-center text-(--muted-foreground)">Sigue bajando</p>
      </section>
    </div>
  )
}

export default Home