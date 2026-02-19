"use server"

import { revalidatePath } from "next/cache";

import { createSupabaseServerClient } from "@/lib/supabase/server-client"

type NewCartItem = {
  id: number,
  usuario_id: string,
  servicio_id: number,
  cantidad: number,
  servicios: {
    precio: number,
    nombre: string,
    imagen: {
      url: string;
    } | null,
  } | null,
}

export async function addCartItem(service_id: number, user_id: string) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    const res = await supabase
      .from("carrito")
      .insert({
        usuario_id: user_id,
        servicio_id: service_id,
      })
      .select("id, usuario_id, servicio_id, cantidad, servicios:servicios(nombre, imagen:imagenes(url), precio)");
    console.log(res)

    const data = res.data as unknown as NewCartItem[];

    return data;
  }

  revalidatePath("/carrito");
}

export async function removeCartItem(carrito_id: number) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    await supabase
      .from("carrito")
      .delete()
      .eq("id", carrito_id)
      .eq("usuario_id", user?.id);
  }

  revalidatePath("/carrito");
}

export async function updateItemQuantity(id: number, quantity: number) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    await supabase
      .from("carrito")
      .update({ cantidad: quantity })
      .eq("id", id);
  }

  revalidatePath("/carrito");
}