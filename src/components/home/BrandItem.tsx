"use client"

import Image from "next/image"

import { useAuthStore } from "@/lib/store/useAuthStore";
import XIcon from "../icons/XIcon";
import scheduleAvailableSync from "@/lib/utils/brandSync";
import { toast } from "sonner";

interface BrandItemProps {
  id: number,
  nombre: string;
  imagen: {
    url: string;
  } | null;
  disponible: boolean;
}

const BrandItem = ({ id, nombre, imagen, disponible }: BrandItemProps) => {
  const user = useAuthStore(u => u.user);

  const handleChangeVisibility = async () => {
    const loading = toast.loading('Cambiando la visibilidad de la marca...');

    await scheduleAvailableSync(id);
    toast.dismiss(loading);
    toast.success("Se ha actualizado la visibilidad de la marca.");
  }
  
  return (
    <div
      className={`group flex flex-col h-80 w-80 shrink-0 items-center justify-center bg-(--background) p-2 last:border-r-0 transition-colors hover:bg-(--card)`}
    >
      <div className="relative aspect-square mb-4 w-full overflow-hidden">
        {user?.role === "admin" && disponible ? (
          <button
            type="button"
            onClick={handleChangeVisibility}
            className="z-10 absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full border-transparent text-transparent transition-all group-hover:border-(--border) group-hover:text-(--muted-foreground) hover:!border-(destructive) hover:!text-(--destructive) cursor-pointer"
          >
            <XIcon />
          </button>
        ) : <></>}

        <Image
          src={imagen?.url ?? ""}
          alt={`Logo de empresa ${nombre}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <span className="relative text-xs uppercase tracking-[0.2em] text-(--muted-foreground)/60 transition-colors group-hover:text-(--foreground)">
        {nombre}
      </span>
      {!disponible ? (
        <>
          <p className="relative text-xs text-center text-(--destructuve) border border-(--destructive) bg-(--destructive)/30 p-1 rounded-md mt-2">
            Ésta marca no será visible para el resto de los usuarios.
          </p>
          <button
            type="button"
            className="mt-2 text-sm border rounded-md py-1 px-2 cursor-pointer"
            onClick={handleChangeVisibility}
          >
            Cambiar visibilidad
          </button>
        </>
      ) : <></>}
    </div>
  )
}

export default BrandItem;