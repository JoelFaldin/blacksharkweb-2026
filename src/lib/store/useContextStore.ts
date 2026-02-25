import { create } from "zustand";

type ContextState = {
  message: string,
  setMessage: (msg: string) => void,
  resetMessage: () => void,
  getLink: () => string,
}

export const useContextStore = create<ContextState>((set, get) => ({
  message: '¡Hola! ¡Quiero más información!',
  setMessage: (msg) => {
    const newMessage = `¡Hola! Me interesa el servicio ${msg} y quisiera saber más detalles al respecto.`

    return set({ message: newMessage })
  },
  resetMessage: () => set({ message: '¡Hola! ¡Quiero más información!' }),
  getLink: () => {
    const { message } = get();

    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  }
}))