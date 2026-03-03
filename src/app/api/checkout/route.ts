import { NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST() {
  try {
    const supabase = await createSupabaseServerClient()

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      )
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
      return NextResponse.json(
        { error: "Error obteniendo carrito" },
        { status: 500 }
      )
    }

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { error: "Carrito vacío" },
        { status: 400 }
      )
    }

    const itemsText = cartItems
      .map((item) => {
        return `
            Servicio: ${item.servicios.nombre}
            Precio: $${item.servicios.precio}
            Cantidad: ${item.cantidad}
            ----------------------------------
        `
      })
      .join("\n")

    const emailContent = `
    Nuevo pedido de: ${user.email}
    ${itemsText}
    `

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "samuel.sotomayor.t@gmail.com", 
      subject: "Nuevo pedido recibido",
      text: emailContent,
    })

    return NextResponse.json({
      success: true,
      message: "Correo enviado correctamente",
    })

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}