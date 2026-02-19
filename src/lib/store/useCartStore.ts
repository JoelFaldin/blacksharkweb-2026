import { create } from "zustand"

import scheduleQuantitySync from "../utils/cartSync";
import { removeCartItem } from "@/app/actions/cart";

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

type CartState = {
  items: CartItem[],
  updateQuantity: (id: number, newQuantity: number) => void,
  removeItem: (service_id: number) => void,
  clearCart: () => void,
  setCart: (items: CartItem[]) => void,
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  updateQuantity: async (id, newQuantity) => {
    if (newQuantity === 0) {
      const { items } = get();
      const item = items.find(i => i.id === id);

      if (!item) return;

      set((state) => {
        const result = state.items.filter(i => i.id !== id);
        return { items: result };
      })

      await scheduleQuantitySync(id, 0);
    } else {
      set((state) => {        
        return {
          items: state.items.map(item =>
            item.id === id
              ? { ...item, cantidad: newQuantity }
              : item
          ),
        }
      });

      await scheduleQuantitySync(id, newQuantity);
    }
  },
  removeItem: async (carrito_id) => {
    const { items } = get();
    const item = items.find(i => i.id === carrito_id);

    if (!item) return;

    set((state) => {
      const result = state.items.filter(i => i.id !== carrito_id);
      return { items: result };
    })

    await removeCartItem(carrito_id);
  },
  clearCart: () => set({ items: [] }),
  setCart: (items) => set({ items })
}))