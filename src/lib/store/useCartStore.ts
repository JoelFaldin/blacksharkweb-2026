import { create } from "zustand"

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
  addItem: (item: CartItem) => void,
  removeItem: (service_id: number) => void,
  clearCart: () => void,
  setCart: (items: CartItem[]) => void,
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item) => set((state) => {
    const existing = state.items.find(i => i.servicio_id === item.servicio_id);

    if (existing) {
      return {
        items: state.items.map(i => 
          i.servicio_id === item.servicio_id
          ? { ...i, quantity: i.cantidad + item.cantidad }
          : i
        )
      }
    }

    return { items: [...state.items, item] };
  }),
  removeItem: async (carrito_id) => {
    const { items } = get();
    const item = items.find(i => i.id === carrito_id);

    if (item) {
      await removeCartItem(carrito_id)
    }

    set((state) => {
      const result = state.items.filter(i => i.id !== carrito_id);
      return { items: result };
  })},
  clearCart: () => set({ items: [] }),
  setCart: (items) => set({ items })
}))