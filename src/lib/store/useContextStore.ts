import { create } from "zustand";

type ContextState = {
  message: string,
  setMessage: (msg: string) => void,
  resetMessage: () => void,
  getLink: () => string,
}

export const useContextStore = create<ContextState>((set, get) => ({
  message: 'Hola! Quiero más información!',
  setMessage: (msg) => set({ message: msg }),
  resetMessage: () => set({ message: 'Hola! Quiero más información!' }),
  getLink: () => {
    const { message } = get();

    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  }
}))