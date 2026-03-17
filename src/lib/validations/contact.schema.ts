import z from "zod";

export const contactSchema = z.object({
  name: z.string().min(3, "El nombre es demasiado corto."),
  email: z.email("Correo inválido"),
  subject: z.string().min(5, "Intenta hacer más descriptivo el asunto."),
  message: z.string().max(500, "El mensaje no debe superar los 500 caracteres."),
});
