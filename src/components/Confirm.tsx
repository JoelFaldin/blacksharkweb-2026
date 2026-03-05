"use client";

import { useState } from "react";

import { useAuthStore } from "@/lib/store/useAuthStore";
import Button from "./Button";
import { EyeOpen, Refresh } from "./icons";
import Modal from "./Modal";

type ConfirmType = {
  visible: boolean;
  changeVisibility: () => void;
  text: string;
  position: string;
};

const Confirm = ({ visible, changeVisibility, text, position }: ConfirmType) => {
  const user = useAuthStore((u) => u.user);

  const [isOpen, setIsOpen] = useState(false);

  if (user?.role !== "admin") return;

  const handleModal = () => {
    if (!isOpen) {
      setIsOpen(true);
      // Desactivar el scroll:
      document.body.classList.add("overflow-hidden");
    } else {
      setIsOpen(false);
      // Reactivar el scroll:
      document.body.classList.remove("overflow-hidden");
    }
  };

  const confirm = () => {
    changeVisibility();
    handleModal();
  };

  if (isOpen) {
    return (
      <Modal isOpen={isOpen} onClose={handleModal} className="w-xl">
        <div className="px-6 py-5 border border-(--border) bg-(--background)">
          <h4 className="text-2xl font-medium text-(--foreground)">
            ¿Quieres cambiar la visibilidad de {text}?
          </h4>
          <p className="text-md text-(--foreground)/70 mt-2">
            {text.charAt(0).toUpperCase() + text.slice(1)} pasará a ser{" "}
            {visible ? "invisible" : "visible"} para el usuario común.
          </p>
          <span className="flex flex-row items-center justify-center gap-3 px-6 py-5">
            <Button type="secondary" onClick={handleModal} className="p-6 cursor-pointer">
              <span className="font-bold">Volver</span>
            </Button>
            <Button
              type="primary"
              onClick={confirm}
              className="p-6 flex flex-row gap-2 cursor-pointer"
            >
              <Refresh className="text-(--secondary)" />
              <span className="text-(--secondary) font-bold">Cambiar Visibilidad</span>
            </Button>
          </span>
        </div>
      </Modal>
    );
  } else {
    return (
      <button
        type="button"
        onClick={handleModal}
        className={`absolute top-10 ${position}-2 z-20 text-transparent border-transparent bg-transparent p-1 flex flex-row justify-center items-center gap-2 rounded border group-hover:border-(--primary) group-hover:text-(--primary) text-sm group-hover:bg-(--background)/90 cursor-pointer transition-all`}
      >
        <EyeOpen />
        <span>Cambiar Visibilidad</span>
      </button>
    );
  }
};

export default Confirm;
