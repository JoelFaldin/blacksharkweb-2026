"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";

import { updateImageVisibility } from "@/app/actions/portfolio";
import { useAuthStore } from "@/lib/store/useAuthStore";
import Confirm from "../Confirm";
import { EyeClose, EyeOpen, Refresh, XIcon } from "../icons";

type PortfolioImageType = {
  item: {
    id: number;
    desc: string;
    cliente: string;
    disponible: boolean;
    imagenes: {
      url: string;
      categoria: string;
    };
  };
};

const PortfolioImage = ({ item }: PortfolioImageType) => {
  const user = useAuthStore((s) => s.user);

  const handleChangeVisibility = () => {
    debouncedSync();
  };

  const debouncedSync = useDebouncedCallback(async () => {
    const res = await updateImageVisibility(item.id);

    if (res.status === "error") {
      toast.error(res.message);
    } else {
      toast.success(res.message);
    }
  }, 500);

  return (
    <motion.div
      key={item.id}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="mb-4 break-inside-avoid"
    >
      <section className="group relative block w-full border border-border bg-card text-left transition-colors">
        {user?.role === "admin" &&
          (item.disponible ? (
            <div className="absolute right-4 top-4">
              <Confirm
                title={`¿Quieres cambiar la visibilidad de esta imagen?`}
                desc={`Al confirmar, la visibilidad de la imagen será cambiada a invisible.`}
                onClick={handleChangeVisibility}
                icon={<Refresh className="text-secondary" />}
                buttonText="Cambiar Visibilidad"
              >
                {(open) => (
                  <button
                    type="button"
                    onClick={open}
                    className={`z-10 absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full border-transparent text-transparent transition-all group-hover:border-border group-hover:text-foreground hover:!border-(destructive) hover:text-destructive! cursor-pointer`}
                  >
                    <XIcon />
                  </button>
                )}
              </Confirm>
            </div>
          ) : (
            <>
              <span className="z-10 px-1 absolute top-2 right-2 flex flex-row justify-center items-center gap-2 rounded-md border border-border font-semibold bg-background/90 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                <EyeClose />
                <span>Invisible</span>
              </span>
              <Confirm
                title={`¿Quieres cambiar la visibilidad de esta imagen?`}
                desc={`Al confirmar, la visibilidad de la imagen será cambiada a visible.`}
                onClick={handleChangeVisibility}
                icon={<Refresh className="text-secondary" />}
                buttonText="Cambiar Visibilidad"
              >
                {(open) => (
                  <button
                    type="button"
                    onClick={open}
                    className={`absolute top-10 right-2 z-20 text-transparent border-transparent bg-transparent p-1 flex flex-row justify-center items-center gap-2 rounded border group-hover:border-primary group-hover:text-primary text-sm group-hover:bg-background/90 cursor-pointer transition-all`}
                  >
                    <EyeOpen />
                    <span>Cambiar Visibilidad</span>
                  </button>
                )}
              </Confirm>
            </>
          ))}
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

        {/* Descripción */}
        <div className="relative bg-card p-4">
          <div className="flex flex-col items-start gap-4 ">
            <span className="flex flex-col">
              <h3 className="text-xl font-semibold text-foreground">{item.desc}</h3>
              <p className="text-sm text-muted-foreground">{item.cliente}</p>
            </span>

            <p className="text-left text-sm font-medium uppercase tracking-[0.2em] text-primary">
              {item.imagenes.categoria}
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default PortfolioImage;
