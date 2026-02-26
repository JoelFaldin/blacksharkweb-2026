"use client"

import { useEffect } from "react";

import { useAuthStore } from "@/lib/store/useAuthStore";

interface UserData {
  username: string,
  email: string,
  role: string,
}

type Props = {
  initialUser: UserData | null,
}

export default function AuthProvider({ initialUser }: Props) {
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    if (initialUser) {
      setUser({
        username: initialUser.username,
        email: initialUser.email,
        role: initialUser.role,
      })
    }
  }, [initialUser, setUser]);

  return null;
}