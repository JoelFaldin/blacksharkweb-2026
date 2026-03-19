"use server";

import { Resend } from "resend";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ActionState } from "@/types/actions";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderEmail(): Promise<ActionState> {
  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) throw new Error("Usuario no autenticado.");

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
      .eq("usuario_id", user.id);

    if (cartError) throw cartError;

    if (!cartItems || cartItems.length === 0) throw new Error("El carrito está vacío.");

    const itemsText = cartItems
      .map((item) => {
        return `
Servicio: ${item.servicios?.nombre}
Precio: $${item.servicios?.precio}
Cantidad: ${item.cantidad}
----------------------------------
`;
      })
      .join("\n");

    const emailContent = `
Nuevo pedido de: ${user.email}

${itemsText}
    `;

    if (!process.env.ADMIN_EMAIL) {
      throw new Error("ADMIN_EMAIL no definido");
    }

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.ADMIN_EMAIL,
      subject: "Nuevo pedido recibido",
      text: emailContent,
    });

    const { error: deleteError } = await supabase
      .from("carrito")
      .delete()
      .eq("usuario_id", user.id);

    if (deleteError) throw deleteError;

    return {
      status: "success",
      message: "Se ha realizado el pedido.",
    };
  } catch (error) {
    console.error(error);

    return {
      status: "error",
      message: "Ocurrió un error en el servidor, inténtalo más tarde.",
      ...(error ? error : null),
    };
  }
}
