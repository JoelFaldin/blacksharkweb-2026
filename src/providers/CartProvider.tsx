"use client";

import { useEffect } from "react";

import { useCartStore } from "@/lib/store/useCartStore";
import type { CartItemType } from "@/types";

type Props = {
  initialCartItems: CartItemType[];
};

export default function CartProvider({ initialCartItems }: Props) {
  const setCart = useCartStore((s) => s.setCart);

  useEffect(() => {
    if (initialCartItems) {
      setCart(initialCartItems);
    }
  });

  return null;
}
