import ArrowRight from "@/components/icons/ArrowRight";
import Button from "../Button";

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

      <section className="flex flex-row justify-center items-center gap-6 mb-20">
        <Button type="primary" href="/portafolio" className="group flex flex-row items-center justify-center gap-x-2 p-6">
          <span className="text-(--primary) text-2xl font-bold">
            Portafolio
          </span>
          <ArrowRight className="text-black group-hover:translate-x-1 transition-transform" />
        </Button>
        <Button type="secondary" href="/nosotros" className="flex flex-row p-6">
          <span className="text-(--primary-foreground) text-2xl font-bold">
            Contáctanos
          </span>
        </Button>
      </section>

      <section className="flex flex-col justify-center items-center gap-5">
        <div className="h-10 w-[2px] bg-(--secondary)" />
        <p className="text-2xl text-center text-(--muted-foreground)">Sigue bajando</p>
      </section>
    </div>
  )
}

export default Home