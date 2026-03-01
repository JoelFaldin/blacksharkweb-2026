import { create } from "zustand";

type ContextState = {
  message: string,
  setCustomMessage: (customMessage: string) => void,
  resetMessage: () => void,
  getLink: (msg: string) => string,
}

export const useContextStore = create<ContextState>((set, get) => ({
  message: '¡Hola! ¡Quiero más información!',
  setCustomMessage: (customMessage) => set({ message: customMessage }),
  resetMessage: () => set({ message: '¡Hola! ¡Quiero más información!' }),
  getLink: (msg: string) => {
    const { message } = get();

    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`;
  }
}))