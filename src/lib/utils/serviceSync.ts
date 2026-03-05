import { updateServiceVisibility } from "@/app/actions/service";

const timers = new Map<number, NodeJS.Timeout>();

const scheduleServiceSync = async (service_id: number) => {
  if (timers.has(service_id)) {
    clearTimeout(timers.get(service_id));
  }

  const timeout = setTimeout(async () => {
    await updateVisibility(service_id);
    timers.delete(service_id);
  }, 500);

  timers.set(service_id, timeout);
};

export default scheduleServiceSync;

const updateVisibility = async (service_id: number) => {
  await updateServiceVisibility(service_id);
};
