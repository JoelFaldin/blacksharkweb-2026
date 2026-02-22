import Image from "next/image";

import priceFormat from "@/lib/utils/priceFormat";
import TrashIcon from "../icons/Trash";
import CartQuantity from "./CartQuantity";
import { useCartStore } from "@/lib/store/useCartStore";

type CartItem = {
    id: number,
    usuario_id: string,
    servicio_id: number,
    precio: number,
    nombre: string,
    cantidad: number,
    img_url: string,
    desc?: string,
}

type CartItemInterface = {
  item: CartItem,
}

const CartItem = ({ item }: CartItemInterface) => {
  const removeItem = useCartStore(e => e.removeItem);

  const handleRemoveItem = (id: number) => {
    const confirm = window.confirm("¿Estas seguro de que quieres eliminar este servicio del carrito?");

    if (confirm) {
      removeItem(id);
    } else {
      return;
    }
  }

  return (
    <div className="group h-fit flex flex-col gap-6 border border-(--border) bg-(--card) p-4 transition-colors hover:border-(--primary)/30 md:flex-row md:items-center md:p-6">
      <div className="flex flex-1 gap-5 items-center">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden md:h-28 md:w-28">
          <Image
            src={item.img_url}
            alt={`Imagen de servicio ${item.desc}`}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-1">
          <h3 className="text-lg font-bold text-(--foreground) md:text-xl">
            {item.nombre}
          </h3>
          <p className="line-clamp-2 text-md leading-relaxed text-(--muted-foreground)">
            {item.desc}
          </p>
        </div>
      </div>

      <CartQuantity item_id={item.id} cantidad={item.cantidad} />

      <span className="block w-28 text-right">
        <p className="text-lg font-bold text-(--foreground)">
          {priceFormat(item.precio * item.cantidad)}
        </p>
      </span>
      <button
        onClick={() => handleRemoveItem(item.id)}
        className="block w-12 text-right cursor-pointer text-(--muted-foreground) transition-colors hover:text-(--destructive)"
      >
        <TrashIcon />
      </button>
    </div>
  )
}

export default CartItem;