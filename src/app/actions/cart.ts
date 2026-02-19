"use server"

import { revalidatePath } from "next/cache";

import { createSupabaseServerClient } from "@/lib/supabase/server-client"

export async function removeCartItem(carito_id: number) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    await supabase
      .from("carrito")
      .delete()
      .eq("id", carito_id)
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