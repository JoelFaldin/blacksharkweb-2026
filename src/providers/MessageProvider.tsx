"use client"

import { useContextStore } from "@/lib/store/useContextStore";
import { useEffect } from "react";

export default function MessageProvider() {
  const resetMessage = useContextStore((m) => m.resetMessage);

  useEffect(() => {
    resetMessage();
  }, [resetMessage]);

  return null;
}