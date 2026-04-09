"use client";

import Image from "next/image";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";

import { updateBrandVisibility } from "@/app/actions/brands";
import { useAuthStore } from "@/lib/store/useAuthStore";
import Confirm from "../Confirm";
import { EyeClose, EyeOpen, Refresh, XIcon } from "../icons";

interface BrandItemProps {
  id: number;
  nombre: string;
  imagen: {
    url: string;
  } | null;
  disponible: boolean;
}

const BrandItem = ({ id, nombre, imagen, disponible }: BrandItemProps) => {
  const user = useAuthStore((u) => u.user);

  const debouncedSync = useDebouncedCallback(async () => {
    const res = await updateBrandVisibility(id);

    if (res.status === "error") {
      toast.error(res.message);
    } else {
      toast.success(res.message);
    }
  }, 500);

  const handleChangeVisibility = async () => {
    debouncedSync();
  };

  return (
    <div
      className={`group flex flex-col h-80 w-80 shrink-0 items-center justify-center bg-background p-2 last:border-r-0 transition-colors hover:bg-card`}
    >
      <div className="relative aspect-square mb-4 w-full overflow-hidden">
        {user?.role === "admin" &&
          (disponible ? (
            <Confirm
              title={`¿Quieres cambiar la visibilidad de esta marca?`}
              desc={`Al confirmar, la visibilidad de la marca será cambiada a invisible.`}
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
          ) : (
            <>
              <span className="z-10 px-1 absolute top-2 left-2 flex flex-row justify-center items-center gap-2 rounded-md border border-border font-semibold bg-background/90 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                <EyeClose />
                <span>Invisible</span>
              </span>
              <Confirm
                title={`¿Quieres cambiar la visibilidad de esta marca?`}
                desc={`Al hacer clic, la marca ${nombre} será cambiada a visible.`}
                onClick={handleChangeVisibility}
                icon={<Refresh className="text-secondary" />}
                buttonText="Cambiar Visibilidad"
              >
                {(open) => (
                  <button
                    type="button"
                    onClick={open}
                    className={`absolute top-10 left-2 z-20 text-transparent border-transparent bg-transparent p-1 flex flex-row justify-center items-center gap-2 rounded border group-hover:border-primary group-hover:text-primary text-sm group-hover:bg-background/90 cursor-pointer transition-all`}
                  >
                    <EyeOpen />
                    <span>Cambiar Visibilidad</span>
                  </button>
                )}
              </Confirm>
            </>
          ))}

        <Image
          src={imagen?.url ?? ""}
          alt={`Logo de empresa ${nombre}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-wh: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <span className="relative text-xs uppercase tracking-[0.2em] text-muted-foreground/60 transition-colors group-hover:text-foreground">
        {nombre}
      </span>
    </div>
  );
};

export default BrandItem;
