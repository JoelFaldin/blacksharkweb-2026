import Button from "../Button";
import { ArrowRight } from "../icons";

const ContactForm = () => {
  return (
    <section className="py-48 bg-(--card) flex flex-col items-center justify-center text-center">
      <p className="mb-4 text-2xl font-medium uppercase tracking-[0.2em] text-(--primary)">
        ¿Tienes una idea en mente?
      </p>
      <h4 className="mb-6 text-5xl font-bold text-(--foreground) text-balance">
        Ponte en contacto con nosotros
      </h4>
      <p className="mx-auto text-xl mb-10 max-w-md text-(--muted-foreground) leading-relaxed">
        Cuéntanos tu idea y trabajemos juntos para que tu marca crezca con estrategia, identidad y
        estilo.
      </p>

      <span className="flex sm:flex-row flex-col gap-8 py-10">
        <Button
          type="primary"
          href="/nosotros"
          className="flex flex-row items-center justify-center gap-x-2 bg-(--primary) hover:bg-(--primary)/80 p-6 rounded-lg border border-white/30"
        >
          <span className="text-(--secondary) text-2xl font-bold ">Contáctanos</span>
          <ArrowRight className="text-black group-hover:translate-x-1 transition-transform" />
        </Button>
        <Button
          type="secondary"
          href="/servicios"
          className="flex flex-row items-center justify-center rounded-lg p-6"
        >
          <span className="text-(--foreground) text-2xl font-bold">Servicios</span>
        </Button>
      </span>
    </section>
  );
};

export default ContactForm;
