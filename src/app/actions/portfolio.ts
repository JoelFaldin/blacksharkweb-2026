"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

import { getEnvironmentVariables } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getServerEnvironmentVariables } from "@/lib/supabase/server-config";
import { portolioSchema } from "@/lib/validations/portfolio.schema";
import type { ActionState } from "@/types/actions";
import { uploadOptimizedImage } from "./upload";

export async function handlePorfolio(
  file: File,
  desc: string,
  category: string,
  client: string,
): Promise<ActionState> {
  try {
    const validateData = portolioSchema.safeParse({
      file,
      description: desc,
      category: category,
      client: client,
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
          "Revisa el tipo y tamaño de la imagen, y que la descripción tenga al menos 3 carácteres.",
      };
    }

    const optimizedBuffer = await uploadOptimizedImage(file);

    if ("error" in optimizedBuffer) throw optimizedBuffer.error;

    const { supabaseUrl } = getEnvironmentVariables();
    const { supabaseServiceRoleKey } = getServerEnvironmentVariables();

    if (!supabaseServiceRoleKey) throw new Error("Service role key is required for admin client.");

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

    const imgName = `${file.name.replace(/\.[^/.]+$/, "")}.webp`;
    const { data, error } = await supabaseAdmin.storage
      .from("images")
      .upload(`galeria/${imgName}`, optimizedBuffer, {
        contentType: "image/webp",
        upsert: true,
      });

    if (error) throw error;

    const res = await handleAddPortfolioImage(data.path, desc, category, client);

    if (res.error) throw res.error;

    return {
      status: "success",
      message: "¡Se ha subido la imagen con éxito!",
    };
  } catch (error) {
    console.log(error);

    return {
      status: "error",
      message: "Ocurrió un error guardando el servicio. Inténtalo más tarde.",
      ...(error ? error : null),
    };
  }
}

async function handleAddPortfolioImage(
  path: string,
  desc: string,
  category: string,
  client: string,
) {
  const supabase = await createSupabaseServerClient();

  const { data: urlData } = supabase.storage.from("images").getPublicUrl(path);

  if (!urlData) return { status: "error", error: "No image url found." };

  const { data, error } = await supabase
    .from("imagenes")
    .insert({
      url: urlData.publicUrl,
      categoria: category,
    })
    .select("id");

  if (!data) return { success: false, error: error };

  await supabase.from("galeria").insert({
    image_id: data[0].id,
    desc: desc,
    cliente: client,
  });

  revalidatePath("/portafolio");
  return { success: true };
}

export async function updateImageVisibility(id: number): Promise<ActionState> {
  try {
    const supabase = await createSupabaseServerClient();
    const image = await supabase.from("galeria").select("disponible").eq("id", id);

    if (!image) throw new Error("Imagen no encontrada.");

    const res = await supabase
      .from("galeria")
      .update({
        disponible: !image.data?.[0].disponible,
      })
      .eq("id", id);

    if (res.error) {
      return {
        status: "error",
        error: res.error.message,
        message: "Ocurrió un error al actualizar la visibilidad de la imagen. Inténtalo más tarde.",
      };
    }

    revalidatePath("/portafolio");
    return { status: "success", message: "¡Visibilidad actualizada!" };
  } catch (error) {
    console.log(error);

    return {
      status: "error",
      message: "Ocurrió un error en el servidor, inténtalo más tarde.",
    };
  }
}
