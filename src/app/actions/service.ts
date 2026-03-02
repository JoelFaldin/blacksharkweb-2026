"use server"

import { createSupabaseServerClient } from "@/lib/supabase/server"
import { uploadOptimizedImage } from "./upload";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export async function handleService(file: File, name: string, desc: string, price: number) {
  const optimizedBuffer = await uploadOptimizedImage(file);

  if ('error' in optimizedBuffer) {
    return { success: false, error: optimizedBuffer.error };
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ROLE_KEY!,
  )

  const serviceName = `${file.name.replace(/\.[^/.]+$/, "")}.webp`
  const { data, error } = await supabaseAdmin.storage.from('images')
    .upload(`servicios/${serviceName}`, optimizedBuffer, {
      contentType: 'image/webp',
      upsert: true,
    });

  if (error) return { success: false, error: error.message };

  await handleAddService(data.path, name, desc, price);
}

export async function handleAddService(path: string, name: string, desc: string, price: number) {
  const supabase = await createSupabaseServerClient();

  const { data: urlData } = supabase.storage
    .from('images')
    .getPublicUrl(path);

  if (!urlData) return { success: false, error: "No image url found." };

  const { data, error } = await supabase
    .from("imagenes")
    .insert({
      url: urlData.publicUrl,
      categoria: "Servicios",
    })
    .select("id");

  if (!data) return { success: false, error: error };

  await supabase
    .from("servicios")
    .insert({
      nombre: name,
      imagen: data[0].id,
      descripcion_corta: desc,
      precio: price,
    });

  revalidatePath("/servicios");
  return { success: true }
}