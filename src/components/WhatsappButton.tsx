"use client";

import { WhatsApp } from "./icons/Whatsapp";
import { useContextStore } from "@/lib/store/useContextStore";

export default function WhatsappButton() {
  const whatsappLink = useContextStore(m => m.getLink);

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-black p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 z-50 flex items-center justify-center"
    >
      <WhatsApp width={50} height={50} className="text-green-500" />
    </a>
  );
}
