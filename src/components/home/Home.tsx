import Image from "next/image";

import Button from "../Button";
import { ArrowRight } from "../icons";

const Home = () => {
  return (
    <section className=" relative mx-auto px-4 pt-36 pb-20">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/background.webp"
          alt="Imagen de referencia BlackSharkStudios"
          fill
          className="object-cover opacity-30"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative z-10 mx-auto">
        <p className="text-2xl text-primary text-center mb-5">Agencia Publicitaria</p>
        <h1 className="text-6xl md:text-8xl font-bold text-center text-foreground mb-10">
          Diseños que <br />
          <span className="text-primary"> impulsan </span>
          tu marca
        </h1>
        <p className="max-w-2xl text-2xl text-muted-foreground text-center text-pretty mb-10 mx-auto">
          Transformamos la imagen de tu marca para capturar la atención de tus clientes. Desde el
          concepto hasta la ejecución, traemos tus ideas a la realidad con calidad excelente.
        </p>

        <section className="flex flex-col md:flex-row justify-center items-center gap-6 mb-20">
          <Button
            type="primary"
            href="/portafolio"
            className="group flex flex-row items-center justify-center gap-x-2 p-6"
          >
            <span className="text-secondary text-2xl font-bold">Portafolio</span>
            <ArrowRight className="text-black group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button type="secondary" href="/nosotros" className="flex flex-row p-6">
            <span className="text-foreground text-2xl font-bold">Contáctanos</span>
          </Button>
        </section>

        <section className="flex flex-col justify-center items-center gap-5">
          <div className="h-10 w-0.5 bg-primary" />
          <p className="text-2xl text-center text-muted-foreground">Sigue bajando</p>
        </section>
      </div>
    </section>
  );
};

export default Home;
