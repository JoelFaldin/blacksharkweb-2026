import { removeCartItem, updateItemQuantity } from "@/app/actions/cart";

const timers = new Map<number, NodeJS.Timeout>();

const scheduleQuantitySync = async (id: number, quantity: number) => {
  if (timers.has(id)) {
    clearTimeout(timers.get(id));
  }

  const timeout = setTimeout(async () => {
    await updateCartQuantity(id, quantity);
    timers.delete(id);
  }, 500);

  timers.set(id, timeout);
}

export default scheduleQuantitySync;

async function updateCartQuantity(id: number, quantity: number) {
  if (quantity === 0) {
    await removeCartItem(id);
  } else {
    await updateItemQuantity(id, quantity);
  }
}
