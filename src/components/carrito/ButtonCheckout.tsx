"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

import { sendOrderEmail } from "@/app/actions/order-email"

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  
  const handleCheckout = async () => {
    try {
      setLoading(true)

      const res = await sendOrderEmail()

      if (!res.success) {
        toast.error("Error al enviar pedido")
        return
      }

      toast.success("Pedido enviado correctamente")
      router.refresh();

    } catch (error) {
      console.error(error)
      toast.error("Error inesperado")
    } finally {
      setLoading(false)
    }
}

  return (
    <button onClick={handleCheckout} disabled={loading} className="cursor-pointer">
      {loading ? "Enviando..." : "Finalizar compra"}
    </button>
  )
}