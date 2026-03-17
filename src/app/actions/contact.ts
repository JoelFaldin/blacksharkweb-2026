"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function sendContactForm(
  name: string,
  email: string,
  subject: string,
  message: string,
) {
  const supabase = await createSupabaseServerClient();

  await supabase.from("mensajes").insert({
    nombre: name,
    email: email,
    asunto: subject,
    mensaje: message,
  });

  return { success: true };
}
