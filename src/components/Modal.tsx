"use client";

import type { ReactNode } from "react";
import ReactDOM from "react-dom";

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
};

const Modal = ({ children, isOpen, onClose, className }: ModalProps) => {
  if (!isOpen) return null;

  const portalRoot = document.getElementById("modal-root");

  if (!portalRoot) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-(--background)/80 backdrop-blur-sm p-4"
      onClick={onClose}
      role="presentation"
    >
      <div onClick={(e) => e.stopPropagation()} role="none" className={`z-70 ${className}`}>
        {children}
      </div>
    </div>,
    portalRoot,
  );
};

export default Modal;
