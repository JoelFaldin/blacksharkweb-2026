import { create } from "zustand";

import { addCartItem, removeCartItem } from "@/app/actions/cart";
import scheduleQuantitySync from "../utils/cartSync";

interface CartItem {
  id: number;
  usuario_id: string;
  servicio_id: number;
  precio: number;
  nombre: string;
  cantidad: number;
  img_url: string;
  desc?: string;
}

type NewCartItem = {
  id: number;
  usuario_id: string;
  servicio_id: number;
  cantidad: number;
  servicios: {
    precio: number;
    nombre: string;
    imagen: {
      url: string;
    } | null;
  } | null;
};

type CartState = {
  items: CartItem[];
  updateQuantity: (carrito_id: number, newQuantity: number) => void;
  addItem: (service_id: number, user_id: string) => void;
  removeItem: (service_id: number) => void;
  clearCart: () => void;
  setCart: (items: CartItem[]) => void;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  updateQuantity: async (carrito_id, newQuantity) => {
    if (newQuantity === 0) {
      const { items } = get();
      const item = items.find((i) => i.id === carrito_id);

      if (!item) return;

      set((state) => {
        const result = state.items.filter((i) => i.id !== carrito_id);
        return { items: result };
      });

      await scheduleQuantitySync(carrito_id, 0);
    } else {
      set((state) => {
        return {
          items: state.items.map((item) =>
            item.id === carrito_id ? { ...item, cantidad: newQuantity } : item,
          ),
        };
      });

      await scheduleQuantitySync(carrito_id, newQuantity);
    }
  },
  addItem: async (service_id, user_id) => {
    const { items } = get();
    const findItem = items.find((i) => i.servicio_id === service_id);

    if (!findItem) {
      const res: NewCartItem[] | undefined = await addCartItem(service_id, user_id);

      if (!res || !Array.isArray(res) || res.length === 0) return;

      const cartItem = res[0];
      const newItem: CartItem = {
        id: cartItem.id,
        usuario_id: cartItem.usuario_id,
        servicio_id: cartItem.servicio_id,
        precio: cartItem.servicios?.precio || 0,
        nombre: cartItem.servicios?.nombre || "",
        cantidad: cartItem.cantidad,
        img_url: cartItem.servicios?.imagen?.url || "",
      };

      set((state) => {
        return {
          items: [...state.items, newItem],
        };
      });
    } else {
      set((state) => {
        return {
          items: state.items.map((item) =>
            item.id === findItem.id ? { ...item, cantidad: item.cantidad + 1 } : item,
          ),
        };
      });

      await scheduleQuantitySync(findItem.id, findItem.cantidad + 1);
    }
  },
  removeItem: async (carrito_id) => {
    const { items } = get();
    const item = items.find((i) => i.id === carrito_id);

    if (!item) return;

    set((state) => {
      const result = state.items.filter((i) => i.id !== carrito_id);
      return { items: result };
    });

    await removeCartItem(carrito_id);
  },
  clearCart: () => set({ items: [] }),
  setCart: (items) => set({ items }),
}));
