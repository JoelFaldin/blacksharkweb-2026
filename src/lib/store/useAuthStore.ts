import { create } from "zustand";

type User = {
  email: string,
  username?: string,
}

type AuthState = {
  user: User | null,
  setUser: (user: AuthState["user"] | null) => void,
  clearUser: () => void,
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}))