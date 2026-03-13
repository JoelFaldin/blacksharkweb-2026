"use client";

import Image from "next/image";
import { toast } from "sonner";

import { useCartStore } from "@/lib/store/useCartStore";
import priceFormat from "@/lib/utils/priceFormat";
import Confirm from "../Confirm";
import { TrashIcon } from "../icons";
import CartQuantity from "./CartQuantity";

type CartItem = {
  id: number;
  usuario_id: string;
  servicio_id: number;
  precio: number;
  nombre: string;
  cantidad: number;
  img_url: string;
  desc?: string;
};

type CartItemInterface = {
  item: CartItem;
};

const CartItem = ({ item }: CartItemInterface) => {
  const removeItem = useCartStore((e) => e.removeItem);

  const handleRemoveItem = async () => {
    const loading = toast.loading("Eliminando el servicio del carrito...");

    try {
      removeItem(item.id);
      toast.dismiss(loading);
      toast.success("¡Se ha eliminado el servicio del carrito!");
    } catch (error) {
      toast.dismiss(loading);
      toast.error("Error al eliminar el servicio del carrito");
      console.log(error);
    }
  };

  return (
    <div className="group h-fit flex flex-col gap-6 border border-border bg-card p-4 transition-colors hover:border-primary/30 md:flex-row md:items-center md:p-6">
      <div className="flex flex-1 gap-5 items-center">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden md:h-28 md:w-28">
          <Image
            src={item.img_url}
            alt={`Imagen de servicio ${item.desc}`}
            fill
            sizes="(max-width: 768px) 100vw, 30vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-1">
          <h3 className="text-lg font-bold text-foreground md:text-xl">{item.nombre}</h3>
          <p className="line-clamp-2 text-md leading-relaxed text-muted-foreground">{item.desc}</p>
        </div>
      </div>

      <CartQuantity item_id={item.id} cantidad={item.cantidad} />

      <span className="block w-28 text-right">
        <p className="text-lg font-bold text-foreground">
          {priceFormat(item.precio * item.cantidad)}
        </p>
      </span>

      <Confirm
        title="¿Estas seguro de que quieres eliminar este servicio del carrito?"
        desc="Puedes volver a añadir el servicio desde la página de servicios."
        onClick={handleRemoveItem}
        icon={<TrashIcon className="text-black" />}
        buttonText="Eliminar servicio"
      >
        {(open) => (
          <button
            type="button"
            onClick={open}
            className="block text-right cursor-pointer text-muted-foreground transition-colors hover:text-destructive"
          >
            <TrashIcon />
          </button>
        )}
      </Confirm>
    </div>
  );
};

export default CartItem;
