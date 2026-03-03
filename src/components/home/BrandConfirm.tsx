"use client"

import { useState } from "react";

import { useAuthStore } from "@/lib/store/useAuthStore";
import Modal from "../Modal";
import Button from "../Button";
import EyeOpen from "../icons/EyeOpen";
import Refresh from "../icons/Refresh";

type BrandConfirmType = {
	visible: boolean;
	changeVisibility: () => void,
}

const BrandConfirm = ({ visible, changeVisibility }: BrandConfirmType) => {
	const user = useAuthStore(u => u.user);

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
			document.body.classList.remove("overflow-hiddren");
		}
	}

	const confirm = () => {
		changeVisibility();
		handleModal();
	}

	if (isOpen) {
		return (
			<>
				<Modal isOpen={isOpen} onClose={handleModal} className="w-xl">
					<div className="px-6 py-5 border border-(--border) bg-(--background)">
						<h4 className="text-2xl font-medium text-(--foreground)">¿Quieres cambiar la visibilidad de este servicio?</h4>
						<p className="text-md text-(--foreground)/70 mt-2">Este servicio pasará a ser {visible ? "invisible" : "visible"} para el usuario común.</p>
						<span className="flex flex-row items-center justify-center gap-3 px-6 py-5">
							<Button type="secondary" onClick={handleModal} className="p-6 cursor-pointer">
								<span className="font-bold">Volver</span>
							</Button>
							<Button type="primary" onClick={confirm} className="p-6 flex flex-row gap-2 cursor-pointer">
								<Refresh className="text-(--secondary)" />
								<span className="text-(--secondary) font-bold">Cambiar Visibilidad</span>
							</Button>
						</span>
					</div>
				</Modal>
			</>
		)
	} else {
		return (
			<button
				type="button"
				onClick={handleModal}
				className="absolute top-10 left-2 z-20 p-1 flex flex-row justify-center items-center gap-2 rounded border border-(--primary) text-sm bg-(--background)/90 cursor-pointer"
			>
				<EyeOpen className="text-(--primary)" />
				<span className="text-(--primary)">Cambiar Visibilidad</span>
			</button>
		)
	}
}

export default BrandConfirm;