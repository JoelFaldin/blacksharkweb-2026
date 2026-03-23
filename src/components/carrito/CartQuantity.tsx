import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";

import { removeCartItem, updateItemQuantity } from "@/app/actions/cart";
import { useCartStore } from "@/lib/store/useCartStore";
import { Minus, Plus } from "../icons";

type CartQuantityProps = {
  item_id: number;
  cantidad: number;
};

const CartQuantity = ({ item_id, cantidad }: CartQuantityProps) => {
  const updateQuantity = useCartStore((e) => e.updateQuantity);

  const debouncedSync = useDebouncedCallback(async (item_id: number, quantity: number) => {
    if (quantity === 0) {
      const res = await removeCartItem(item_id);

      if (res.status === "error") {
        toast.error(res.message);
      } else {
        toast.success(res.message);
      }
    } else {
      const res = await updateItemQuantity(item_id, quantity);

      if (res.status === "error") {
        toast.error(res.message);
      } else {
        toast.success(res.message);
      }
    }
  }, 500);

  const handleQuantity = (quantity: number) => {
    updateQuantity(item_id, quantity);

    debouncedSync(item_id, quantity);
  };

  return (
    <section className="flex w-32 items-center justify-center gap-0">
      <button
        onClick={() => handleQuantity(cantidad - 1)}
        type="button"
        className="flex h-10 w-12 justify-center items-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary cursor-pointer"
      >
        <Minus />
      </button>
      <div className="flex h-10 w-12 items-center justify-center border-y border-border text-sm font-semibold text-foreground">
        {cantidad}
      </div>
      <button
        onClick={() => handleQuantity(cantidad + 1)}
        type="button"
        className="flex h-10 w-12 justify-center items-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary cursor-pointer"
      >
        <Plus />
      </button>
    </section>
  );
};

export default CartQuantity;
