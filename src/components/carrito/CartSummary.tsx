import { useCartStore } from "@/lib/store/useCartStore";
import priceFormat from "@/lib/utils/priceFormat";
import CheckoutButton from "./ButtonCheckout";

type CartItemType = {
  id: number;
  usuario_id: string;
  servicio_id: number;
  precio: number;
  nombre: string;
  cantidad: number;
  img_url: string;
  desc?: string;
};

const CartSummary = () => {
  const items: CartItemType[] = useCartStore((s) => s.items);

  const subtotal = items.reduce((sum: number, item) => sum + item.precio * item.cantidad, 0);
  const fee = Math.round(subtotal * 0.05);
  const total = subtotal + fee;

  return (
    <section className="sticky top-24 w-md border border-(--border) bg-(--card)">
      <div className="border-b border-(--border) p-6">
        <h2 className="text-xl font-bold text-(--foreground) md:text-2xl">Resumen del pedido</h2>
      </div>
      <div className="flex flex-col gap-4 p-6">
        {items.map((item) => (
          <div key={`item-resume-${item.id}`} className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-md font-medium text-(--foreground)">{item.nombre}</p>
              {item.cantidad > 1 && (
                <p className="text-xs font-medium text-(--foreground)">
                  {priceFormat(item.precio)} x {item.cantidad}
                </p>
              )}
            </div>
            <span className="text-sm font-medium text-(--foreground)">
              {priceFormat(item.precio * item.cantidad)}
            </span>
          </div>
        ))}

        <div className="my-2 border-t border-(--border)" />

        <div className="flex items-center justify-between">
          <span className="text-sm text-(--foreground)">Subtotal</span>
          <span className="text-sm font-medium text-(--foreground)">{priceFormat(subtotal)}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-(--muted-foreground)">Impuesto (5%)</span>
          <span className="text-sm font-medium text-(--foreground)">{priceFormat(fee)}</span>
        </div>

        <div className="my-2 border-t border-(--border)" />

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-(--foreground)">Total</span>
          <span className="text-2xl font-bold text-(--primary)">{priceFormat(total)}</span>
        </div>

        <div className="my-2 border-t border-(--border)" />

        <CheckoutButton />
      </div>
    </section>
  );
};

export default CartSummary;
