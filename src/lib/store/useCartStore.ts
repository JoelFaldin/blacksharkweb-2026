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
  addItem: (item_id: number) => void,
  removeItem: (service_id: number) => void,
  clearCart: () => void,
  setCart: (items: CartItem[]) => void,
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item_id) => {
    set((state) => ({
      items: state.items.map(item =>
        item.id === item_id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ),
    }));
    
    // Función para guardar la cantidad en la db!|
  },
  removeItem: async (carrito_id) => {
    const { items } = get();
    const item = items.find(i => i.id === carrito_id);
    const cantidad = item?.cantidad;

    if (cantidad === 1) {
      set((state) => {
        const result = state.items.filter(i => i.id !== carrito_id);
        return { items: result };
      })

      // Función para guardar la cantidad en la db!|
    } else {
      set((state) => ({
        items: state.items.map(item =>
          item.id === carrito_id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        ),
      }));

      // Función para guardar la cantidad en la db!|
    }
  },
  clearCart: () => set({ items: [] }),
  setCart: (items) => set({ items })
}))