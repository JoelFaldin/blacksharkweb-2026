"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

import { getEnvironmentVariables } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { brandSchema } from "@/lib/validations/brand.schema";
import type { ActionState } from "@/types/actions";
import { uploadOptimizedImage } from "./upload";

export async function handleBrand(file: File, name: string): Promise<ActionState> {
  const validateData = brandSchema.safeParse({
    file,
    name,
  });

  if (!validateData.success) {
    const formattedErrors = validateData.error.issues.reduce(
      (acc, issue) => {
        const path = issue.path[0] as string;
        acc[path] = issue.message;
        return acc;
      },
      {} as Record<string, string>,
    );

    return {
      status: "error",
      errors: formattedErrors,
      message:
        "Revisa el tipo y tamaño de la imagen, y que el nombre no supere los 500 caracteres.",
    };
  }

  const optimizedBuffer = await uploadOptimizedImage(file);

  if ("error" in optimizedBuffer) {
    return {
      status: "error",
      error: optimizedBuffer.error,
      message: "Ha ocurrido un error al subir la imagen, inténtalo más tarde.",
    };
  }

  try {
    const { supabaseUrl, supabaseAnonKey } = getEnvironmentVariables();
    const supabaseAdmin = createClient(supabaseUrl, supabaseAnonKey);

    const brandName = `${file.name.replace(/\.[^/.]+$/, "")}.webp`;
    const { data, error } = await supabaseAdmin.storage
      .from("images")
      .upload(`marcas/${brandName}`, optimizedBuffer, {
        contentType: "image/webp",
        upsert: true,
      });

    if (error) throw error;

    const res = await handleAddBrand(data.path, name);

    if (res.status === "error") throw new Error("Error al guardar la marca.");

    return {
      status: "success",
      message: "Se han guardado con éxito los datos de la marca!",
    };
  } catch (error) {
    console.log(error);

    return {
      status: "error",
      message: "Hubo un error al guardar los datos, inténtalo más tarde.",
    };
  }
}

async function handleAddBrand(path: string, name: string) {
  const supabase = await createSupabaseServerClient();

  const { data: urlData } = supabase.storage.from("images").getPublicUrl(path);

  if (!urlData)
    return {
      status: "error",
      error: "No public url found.",
    };

  const { data, error } = await supabase
    .from("imagenes")
    .insert({
      url: urlData.publicUrl,
      categoria: "Marcas",
    })
    .select("id");

  if (!data) return { status: "error", error: error };

  await supabase.from("marcas").insert({
    nombre: name,
    imagen: data[0].id,
    disponible: true,
  });

  revalidatePath("/");
  return { status: "success" };
}

export async function updateBrandVisibility(id: number) {
  const supabase = await createSupabaseServerClient();
  const brand = await supabase.from("marcas").select("disponible").eq("id", id);

  if (!brand) {
    return {
      status: "error",
      message: "Marca no encontrada.",
    };
  }

  const res = await supabase
    .from("marcas")
    .update({
      disponible: !brand.data?.[0].disponible,
    })
    .eq("id", id);

  if (res.error) {
    return {
      status: "error",
      error: res.error.message,
    };
  }

  revalidatePath("/");
}
