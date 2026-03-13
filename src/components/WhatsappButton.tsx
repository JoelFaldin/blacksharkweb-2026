"use client";

import { useContextStore } from "@/lib/store/useContextStore";
import { WhatsApp } from "./icons";

export default function WhatsappButton() {
  const message = useContextStore((m) => m.message);
  const whatsappLink = useContextStore((m) => m.getLink);

  return (
    <div className="group fixed bottom-6 right-6 z-50">
      <span className="pointer-events-none absolute bottom-full right-0 mb-22 whitespace-nowrap rounded-md bg-card px-3 py-1.5 text-xs border border-border opacity-0 transition-opacity group-hover:opacity-100">
        ¡Háblanos por WhatsApp!
      </span>
      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-black p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 z-50 flex items-center justify-center"
      >
        <WhatsApp width={50} height={50} className="text-green-500" />
      </a>
    </div>
  );
}
