"use client";

import { useEffect } from "react";

import { useContextStore } from "@/lib/store/useContextStore";

export default function MessageProvider() {
  const resetMessage = useContextStore((m) => m.resetMessage);

  useEffect(() => {
    resetMessage();
  }, [resetMessage]);

  return null;
}
