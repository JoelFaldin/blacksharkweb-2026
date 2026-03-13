"use client";

import { type ReactNode, useState } from "react";

import { useAuthStore } from "@/lib/store/useAuthStore";
import Button from "./Button";
import Modal from "./Modal";

type ConfirmType = {
  title: string;
  desc: string;
  onClick: () => void;
  icon: ReactNode;
  children: (open: () => void) => ReactNode;
  buttonText: string;
};

const Confirm = ({ title, desc, onClick, icon, children, buttonText }: ConfirmType) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAuthStore((u) => u.user);

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
    onClick();
    handleModal();
  };

  return isOpen ? (
    <Modal isOpen={isOpen} onClose={handleModal}>
      <div className="px-6 py-5 border border-(--border) bg-(--background)">
        <h4 className="text-2xl font-medium text-(--foreground)">{title}</h4>
        <p className="text-md text-(--foreground)/70 mt-2">{desc}</p>
        <span className="flex flex-row items-center justify-center gap-3 px-6 py-5">
          <Button type="secondary" onClick={handleModal} className="p-6 cursor-pointer">
            <span className="font-bold">Volver</span>
          </Button>
          <Button
            type="primary"
            onClick={confirm}
            className="p-6 flex flex-row gap-2 cursor-pointer"
          >
            {icon}
            <span className="text-(--secondary) font-bold">{buttonText}</span>
          </Button>
        </span>
      </div>
    </Modal>
  ) : (
    children(handleModal)
  );
};

export default Confirm;
