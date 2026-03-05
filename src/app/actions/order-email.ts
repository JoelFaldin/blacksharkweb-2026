"use server"

import { Resend } from "resend"

import { createSupabaseServerClient } from "@/lib/supabase/server"


const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendOrderEmail() {
  try {
    const supabase = await createSupabaseServerClient()

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return {
        success: false,
        error: "No autenticado",
        status: 401,
      }
    }

    const { data: cartItems, error: cartError } = await supabase
      .from("carrito")
      .select(`
        cantidad,
        servicios (
          nombre,
          precio,
          descripcion_corta
        )
      `)
      .eq("usuario_id", user.id)

    if (cartError) {
      console.error(cartError)

      return {
        success: false,
        error: "Error obteniendo carrito",
        status: 500,
      }
    }

    if (!cartItems || cartItems.length === 0) {
      return {
        success: false,
        error: "Carrito vacío",
        status: 400,
      }
    }

    const itemsText = cartItems
      .map((item) => {
        return `
Servicio: ${item.servicios?.nombre}
Precio: $${item.servicios?.precio}
Cantidad: ${item.cantidad}
----------------------------------
`
    })
    .join("\n")

    const emailContent = `
Nuevo pedido de: ${user.email}

${itemsText}
    `

    if (!process.env.ADMIN_EMAIL) {
      throw new Error("ADMIN_EMAIL no definido")
    }

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.ADMIN_EMAIL,
      subject: "Nuevo pedido recibido",
      text: emailContent,
    })

    const { error: deleteError } = await supabase
    .from("carrito")
    .delete()
    .eq("usuario_id", user.id)

    if (deleteError) {
    console.error("Error limpiando el carrito:", deleteError)
    }

    return {
      success: true,
    }

  } catch (error) {
    console.error(error)

    return {
      success: false,
      error: "Error interno del servidor",
      status: 500,
    }
  }
}