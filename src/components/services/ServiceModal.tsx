"use client";

import Image from "next/image";
import { useState } from "react";

import { useContextStore } from "@/lib/store/useContextStore";
import priceFormat from "@/lib/utils/priceFormat";
import Button from "../Button";
import Alert from "../icons/Alert";
import ArrowRight from "../icons/ArrowRight";
import Modal from "../Modal";

type ServiceModalType = {
  nombre: string;
  url?: string;
  descripcion_corta: string;
  precio: string;
  handleModal: () => void;
  isOpen: boolean;
};

const ServiceModal = ({
  nombre,
  url,
  descripcion_corta,
  precio,
  handleModal,
  isOpen,
}: ServiceModalType) => {
  const whatsappLink = useContextStore((m) => m.getLink);
  const message = useContextStore((m) => m.message);

  const [msg, setMsg] = useState(
    `${message} Me interesa el servicio ${nombre.toLowerCase()} de BlackSharkStudios`,
  );

  const handleLink = () => {
    const newLink = whatsappLink(msg);
    window.open(newLink, "_blank");
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModal}>
      <section className="relative w-full max-w-2xl border border-(--primary)/50 bg-(--card) shadow-2xl">
        <div className="relative aspect-[16/7] w-full overflow-hidden">
          <Image
            src={url ?? ""}
            alt={`Imagen del servicio ${nombre}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 30vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-(--card) via-(--card)/40 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <p className="mb-1 text-xs font-medium uppercase tracking-[0.2em] text-(--primary)">
              Solicitar Servicio
            </p>
            <h2 className="font-sans text-2xl font-bold text-(--foreground) md:text-3xl">
              {nombre}
            </h2>
          </div>
        </div>

        <div className="px-6 pt-3 pb-6">
          <p className="mb-6 text-sm leading-relaxed text-(--muted-foreground)">
            {descripcion_corta}
          </p>
          <span className="flex flex-row gap-2 mb-2">
            <Alert />
            <p>Serás redirigido a WhatsApp para ponerte en contacto con el diseñador.</p>
          </span>

          <span className="flex flex-col gap-1 mb-2">
            <label htmlFor="custom-message">Cambiar mensaje:</label>
            <textarea
              id="custom-message"
              className="border border-white rounded-md px-2 py-1 focus:outline-none focus:border-(--primary)"
              value={`${msg}`}
              onChange={(e) => setMsg(e.target.value)}
            />
          </span>

          <span className="border-(--border) p-2 border-t flex flex-col my-4">
            <p className="text-sm text-(--muted-foreground)">Precio del Servicio:</p>
            <p className="text-2xl text-(--primary) font-bold">
              {priceFormat(parseInt(precio, 10))}
            </p>
          </span>

          <span className="flex flex-row items-center justify-center gap-2">
            <Button type="secondary" onClick={handleModal} className="group p-6 cursor-pointer">
              <span className="text-(--foreground) text-lg font-bold">Volver</span>
            </Button>
            <Button
              type="primary"
              onClick={handleLink}
              className="group py-6 px-4 cursor-pointer flex flex-row items-center gap-2"
            >
              <span className="text-(--secondary) text-lg font-bold">Continuar</span>
              <ArrowRight className="text-black group-hover:translate-x-1 transition-transform" />
            </Button>
          </span>
        </div>
      </section>
    </Modal>
  );
};

export default ServiceModal;
