"use server";

import { revalidatePath } from "next/cache";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { NewCartItem } from "@/types";
import type { ActionState, AddCartItemInterface } from "@/types/actions";

export async function addCartItem(
  service_id: number,
  user_id: string,
): Promise<AddCartItemInterface> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getClaims();

  if (data?.claims) {
    const res = await supabase
      .from("carrito")
      .insert({
        usuario_id: user_id,
        servicio_id: service_id,
      })
      .select(
        "id, usuario_id, servicio_id, cantidad, servicios:servicios(nombre, imagen:imagenes(url), precio)",
      );

    const data = res.data as unknown as NewCartItem[];

    revalidatePath("/carrito");
    return {
      data: data,
      status: "success",
      message: "Servicio guardado con éxito.",
    };
  } else {
    return {
      status: "error",
      message: "Usuario no autorizado.",
    };
  }
}

export async function removeCartItem(carrito_id: number): Promise<ActionState> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.auth.getClaims();

    if (data?.claims) {
      const res = await supabase
        .from("carrito")
        .delete()
        .eq("id", carrito_id)
        .eq("usuario_id", data.claims.sub);

      if (res.error) throw res.error;

      revalidatePath("/carrito");
      return {
        status: "success",
        message: "Se ha actualizado la cantidad.",
      };
    } else {
      throw new Error("No se ha encontrado el usuario.");
    }
  } catch (error) {
    console.log(error);

    return {
      status: "error",
      message: "Ocurrió un error al actualizar la cantidad.",
      ...(error ? error : null),
    };
  }
}

export async function updateItemQuantity(
  carrito_id: number,
  quantity: number,
): Promise<ActionState> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.auth.getClaims();

    if (!data) throw new Error("No se ha encontrado el usuario.");

    const res = await supabase.from("carrito").update({ cantidad: quantity }).eq("id", carrito_id);

    if (res.error) throw res.error;

    revalidatePath("/carrito");

    return {
      status: "success",
      message: "¡Se ha actualizado la cantidad!",
    };
  } catch (error) {
    console.log(error);

    return {
      status: "error",
      message: "Ocurrió un error al actualizar la cantidad.",
      ...(error ? error : null),
    };
  }
}
