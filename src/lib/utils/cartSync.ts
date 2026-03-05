import { removeCartItem, updateItemQuantity } from "@/app/actions/cart";

const timers = new Map<number, NodeJS.Timeout>();

const scheduleQuantitySync = async (carrito_id: number, quantity: number) => {
  if (timers.has(carrito_id)) {
    clearTimeout(timers.get(carrito_id));
  }

  const timeout = setTimeout(async () => {
    await updateCartQuantity(carrito_id, quantity);
    timers.delete(carrito_id);
  }, 500);

  timers.set(carrito_id, timeout);
};

export default scheduleQuantitySync;

async function updateCartQuantity(carrito_id: number, quantity: number) {
  if (quantity === 0) {
    await removeCartItem(carrito_id);
  } else {
    await updateItemQuantity(carrito_id, quantity);
  }
}
