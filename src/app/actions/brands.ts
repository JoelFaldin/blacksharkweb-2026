"use server"

import { createSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache";

export async function handleAddBrand(path: string, name: string) {
  const supabase = await createSupabaseServerClient();

  const { data: urlData } = supabase.storage
    .from('images')
    .getPublicUrl(path);

  if (urlData) {
    const { data, error } = await supabase
      .from("imagenes")
      .insert({
        url: urlData.publicUrl,
        categoria: "Marcas",
      })
      .select("id");

    if (!data) return;

    await supabase
      .from("marcas")
      .insert({
        nombre: name,
        imagen: data[0].id,
      })

    revalidatePath("/carrito");
  }
}