"use server"

import sharp from "sharp";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { handleAddBrand } from "./brands";

interface CustomJwtPayload extends JwtPayload {
  app_metadata: {
    role: string,
  }
}

export async function uploadOptimizedImage(file: File, brandName: string) {
  if (!file) throw new Error("No file provided.");

  const supabase = await createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) throw new Error("No session found.");

  const jwt = jwtDecode<CustomJwtPayload>(session.access_token);
  const role = jwt.app_metadata.role;

  if (role !== "admin") return { success: false, error: "Forbidden: not an admin" };

  const regex = /\.[^.]*webp$/;
  let optimizedBuffer: Buffer;
  if (!regex.test(file.name)) {
    // La imagen no es webp:
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
  
    optimizedBuffer = await sharp(buffer)
      .resize(1200, null, { withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();
  } else {
    // La imagen es webp:
    optimizedBuffer = Buffer.from(await file.arrayBuffer());
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ROLE_KEY!,
  )

  const name = `${file.name.replace(/\.[^/.]+$/, "")}.webp`
  const { data, error } = await supabaseAdmin.storage.from('images')
    .upload(`marcas/${name}`, optimizedBuffer, {
      contentType: 'image/webp',
      upsert: true,
    });

  if (error) return { success: false, error: error.message };

  const res = await handleAddBrand(data.path, brandName);
  if (res?.error) return { success: false, error: res.error }

  revalidatePath('/');
  return { success: true };
}