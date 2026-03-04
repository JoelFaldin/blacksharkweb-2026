"use client";

import { useEffect } from "react";

import { useCartStore } from "@/lib/store/useCartStore";

type CartData = {
  id: number;
  usuario_id: string;
  servicio_id: number;
  precio: number;
  nombre: string;
  cantidad: number;
  img_url: string;
  desc?: string;
};

type Props = {
  initialCartItems: CartData[];
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
