"use server"

import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";

import { createSupabaseServerClient } from "@/lib/supabase/server"
import { uploadOptimizedImage } from "./upload";

export async function handleBrand(file: File, name: string) {
  const optimizedBuffer = await uploadOptimizedImage(file);

  if ('error' in optimizedBuffer) {
    return { success: false, error: optimizedBuffer.error };
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ROLE_KEY!,
  )

  const brandName = `${file.name.replace(/\.[^/.]+$/, "")}.webp`
  const { data, error } = await supabaseAdmin.storage.from('images')
    .upload(`marcas/${brandName}`, optimizedBuffer, {
      contentType: 'image/webp',
      upsert: true,
    });

  if (error) return { success: false, error: error.message };

  await handleAddBrand(data.path, name);
}

async function handleAddBrand(path: string, name: string) {
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

  if (!data) return { success: false, error: error };

  await supabase
    .from("marcas")
    .insert({
      nombre: name,
      imagen: data[0].id,
      disponible: true,
    })

  revalidatePath("/")
  return { success: true }
}

export async function updateBrandVisibility(id: number) {
  const supabase = await createSupabaseServerClient();
  const brand = await supabase
    .from('marcas')
    .select('disponible')
    .eq('id', id);
  
  if (!brand) return;

  await supabase
    .from('marcas')
    .update({
        disponible: !brand.data?.[0].disponible
    })
    .eq('id', id);

  revalidatePath("/");
}