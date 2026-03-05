import { useCartStore } from "@/lib/store/useCartStore";
import { Minus, Plus } from "../icons";

type CartQuantityProps = {
  item_id: number;
  cantidad: number;
};

const CartQuantity = ({ item_id, cantidad }: CartQuantityProps) => {
  const updateQuantity = useCartStore((e) => e.updateQuantity);

  return (
    <section className="flex w-32 items-center justify-center gap-0">
      <button
        onClick={() => updateQuantity(item_id, cantidad - 1)}
        type="button"
        className="flex h-10 w-12 justify-center items-center border border-(--border) text-(--muted-foreground) transition-colors hover:border-(--primary) hover:text-(--primary) cursor-pointer"
      >
        <Minus />
      </button>
      <div className="flex h-10 w-12 items-center justify-center border-y border-(--border) text-sm font-semibold text-(--foreground)">
        {cantidad}
      </div>
      <button
        onClick={() => updateQuantity(item_id, cantidad + 1)}
        type="button"
        className="flex h-10 w-12 justify-center items-center border border-(--border) text-(--muted-foreground) transition-colors hover:border-(--primary) hover:text-(--primary) cursor-pointer"
      >
        <Plus />
      </button>
    </section>
  );
};

export default CartQuantity;
