import { create } from "zustand"

import scheduleQuantitySync from "../utils/cartSync";

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
  addItem: async (item_id) => {
    let quantity = 0;

    set((state) => {
      const item = state.items.find(i => i.id === item_id);
      quantity = item?.cantidad ?? 0;

      return {
      items: state.items.map(item =>
        item.id === item_id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ),
    }});
    
    await scheduleQuantitySync(item_id, quantity + 1)
  },
  removeItem: async (carrito_id) => {
    const { items } = get();
    const item = items.find(i => i.id === carrito_id);

    if (!item) return;

    const cantidad = item.cantidad;

    if (cantidad === 1) {
      set((state) => {
        const result = state.items.filter(i => i.id !== carrito_id);
        return { items: result };
      })

      await scheduleQuantitySync(carrito_id, 0);
    } else {
      set((state) => ({
        items: state.items.map(item =>
          item.id === carrito_id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        ),
      }));

      await scheduleQuantitySync(carrito_id, cantidad - 1);
    }
  },
  clearCart: () => set({ items: [] }),
  setCart: (items) => set({ items })
}))