"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { contactSchema } from "@/lib/validations/contact.schema";
import type { ActionState } from "@/types/actions";

export default async function sendContactForm(
  name: string,
  email: string,
  subject: string,
  message: string,
): Promise<ActionState> {
  const supabase = await createSupabaseServerClient();

  const validateData = contactSchema.safeParse({
    name,
    email,
    subject,
    message,
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
      message: "Revisa los campos del formulario.",
    };
  }

  await supabase.from("mensajes").insert({
    nombre: name,
    email: email,
    asunto: subject,
    mensaje: message,
  });

  return {
    status: "success",
    message: "¡Mensaje enviado con éxito!",
  };
}
