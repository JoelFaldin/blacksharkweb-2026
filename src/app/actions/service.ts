"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

import { getEnvironmentVariables } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getServerEnvironmentVariables } from "@/lib/supabase/server-config";
import { uploadOptimizedImage } from "./upload";

export async function handleService(file: File, name: string, desc: string, price: number) {
  const optimizedBuffer = await uploadOptimizedImage(file);

  if ("error" in optimizedBuffer) {
    return { success: false, error: optimizedBuffer.error };
  }

  const { supabaseUrl } = getEnvironmentVariables();
  const { supabaseServiceRoleKey } = getServerEnvironmentVariables();

  if (!supabaseServiceRoleKey) throw new Error("Service role key is required for admin client.");

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

  const serviceName = `${file.name.replace(/\.[^/.]+$/, "")}.webp`;
  const { data, error } = await supabaseAdmin.storage
    .from("images")
    .upload(`servicios/${serviceName}`, optimizedBuffer, {
      contentType: "image/webp",
      upsert: true,
    });

  if (error) return { success: false, error: error.message };

  await handleAddService(data.path, name, desc, price);
}

export async function handleAddService(path: string, name: string, desc: string, price: number) {
  const supabase = await createSupabaseServerClient();

  const { data: urlData } = supabase.storage.from("images").getPublicUrl(path);

  if (!urlData) return { success: false, error: "No image url found." };

  const { data, error } = await supabase
    .from("imagenes")
    .insert({
      url: urlData.publicUrl,
      categoria: "Servicios",
    })
    .select("id");

  if (!data) return { success: false, error: error };

  await supabase.from("servicios").insert({
    nombre: name,
    imagen: data[0].id,
    descripcion_corta: desc,
    precio: price,
  });

  revalidatePath("/servicios");
  return { success: true };
}

export async function updateServiceVisibility(service_id: number) {
  const supabase = await createSupabaseServerClient();
  const service = await supabase.from("servicios").select("disponible").eq("id", service_id);

  if (!service) return { success: false, error: "No service found with that id." };

  await supabase
    .from("servicios")
    .update({
      disponible: !service.data?.[0].disponible,
    })
    .eq("id", service_id);

  revalidatePath("/servicios");
  return { success: true };
}
