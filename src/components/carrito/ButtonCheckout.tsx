"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { sendOrderEmail } from "@/app/actions/order-email";
import { ArrowRight } from "../icons";

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      setLoading(true);

      const res = await sendOrderEmail();

      if (res.status === "error") {
        toast.error(res.message);
        return;
      }

      toast.success("Pedido enviado correctamente");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      type="button"
      disabled={loading}
      className="cursor-pointer group flex flex-row items-center justify-center gap-2 w-full bg-primary text-(--primary-foreground) p-6 rounded-md font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
    >
      <span className="text-md text-background font-bold">
        {loading ? "Enviando..." : "Finalizar compra"}
      </span>
      {!loading && (
        <ArrowRight className="text-black group-hover:translate-x-1 transition-transform" />
      )}
    </button>
  );
}
