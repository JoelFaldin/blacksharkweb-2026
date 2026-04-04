"use client";

import { useCartStore } from "@/lib/store/useCartStore";
import type { CartItemType } from "@/types";
import Button from "../Button";
import { ArrowRight, ShoppingCart } from "../icons";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

const CartContent = () => {
  const items: CartItemType[] = useCartStore((s) => s.items);

  if (items.length === 0) {
    return (
      <section className="bg-background h-screen flex flex-col gap-6 items-center justify-center">
        <span className="border border-border rounded-full p-4 text-foreground">
          <ShoppingCart width={40} height={40} />
        </span>
        <h1 className="text-3xl text-foreground">No hay servicios en el carrito.</h1>
        <p className="text-muted-foreground text-md max-w-lg text-center">
          Parece que aún no has añadido nada al carrito. Revisa nuestros servicios y encuentra la
          solución perfecta para tu marca.
        </p>
        <Button
          type="primary"
          href="/servicios"
          className="group flex flex-row items-center justify-center gap-x-2 p-6"
        >
          <span className="text-secondary text-2xl font-bold">Servicios</span>
          <ArrowRight className="text-black group-hover:translate-x-1 transition-transform" />
        </Button>
      </section>
    );
  } else {
    return (
      <section className="bg-background flex flex-col md:flex-row gap-12 py-20 mx-auto w-fit px-6">
        <div className="flex flex-col gap-12">
          {items.map((item) => (
            <CartItem key={`cart-item-${item.id}-${item.servicio_id}`} item={item} />
          ))}
        </div>
        <CartSummary />
      </section>
    );
  }
};

export default CartContent;
