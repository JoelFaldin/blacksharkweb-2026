"use client"

import { useState } from "react"
import { toast } from "sonner"

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    try {
      setLoading(true)

      const res = await fetch("/api/checkout", {
        method: "POST",
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || "Error al enviar pedido")
        return
      }

      toast.success("Pedido enviado correctamente")

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