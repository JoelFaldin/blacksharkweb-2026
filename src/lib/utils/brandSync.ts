import { updateBrandVisibility } from "@/app/actions/brands";

const timers = new Map<number, NodeJS.Timeout>();

const scheduleAvailableSync = async (id: number) => {
  if (timers.has(id)) {
    clearTimeout(timers.get(id));
  }

  const timeout = setTimeout(async () => {
    await updateAvailableBrand(id);
    timers.delete(id);
  }, 500);

  timers.set(id, timeout);
};

export default scheduleAvailableSync;

async function updateAvailableBrand(id: number) {
  await updateBrandVisibility(id);
}
