import { create } from "zustand";

type User = {
  email: string,
  username?: string,
  role: string,
}

type AuthState = {
  user: User | null,
  setUser: (user: AuthState["user"] | null) => void,
  clearUser: () => void,
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
  clearUser: () => set({ user: null }),
}))