"use server"

import { createSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache";

export async function handleAddBrand(path: string, name: string) {
  const supabase = await createSupabaseServerClient();

  const { data: urlData } = supabase.storage
    .from('images')
    .getPublicUrl(path);

  if (!urlData) return { success: false, error: "No image url found." };

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
      disponible: true,
    })

  return { success: true }
}

export async function updateBrandVisibility(id: number) {
  const supabase = await createSupabaseServerClient();
  const brand = await supabase
    .from('marcas')
    .select('disponible')
    .eq('id', id);
  
  if (!brand) return;

  const res = await supabase
    .from('marcas')
    .update({
        disponible: !brand.data?.[0].disponible
    })
    .eq('id', id);

  console.log(res)

  revalidatePath("/");
}