import { useCartStore } from "@/lib/store/useCartStore";
import Minus from "../icons/Minus";
import Plus from "../icons/Plus";

type CartQuantityProps = {
  item_id: number,
  cantidad: number,
}

const CartQuantity = ({ item_id, cantidad }: CartQuantityProps) => {
  const addItem = useCartStore(e => e.addItem);
  const removeItem = useCartStore(e => e.removeItem);

  return (
    <section className="flex w-32 items-center justify-center gap-0">
      <button
        onClick={() => removeItem(item_id)}
        type="button"
        className="flex h-10 w-12 justify-center items-center border border-(--border) text-(--muted-foreground) transition-colors hover:border-(--primary) hover:text-(--primary) cursor-pointer">
        <Minus />
      </button>
      <div className="flex h-10 w-12 items-center justify-center border-y border-(--border) text-sm font-semibold text-(--foreground)">
        {cantidad}
      </div>
      <button
        onClick={() => addItem(item_id)}
        type="button"
        className="flex h-10 w-12 justify-center items-center border border-(--border) text-(--muted-foreground) transition-colors hover:border-(--primary) hover:text-(--primary) cursor-pointer">
        <Plus />
      </button>
    </section>
  )
}

export default CartQuantity;