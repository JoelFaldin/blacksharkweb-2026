import z from "zod";

const maxSize = 1024 * 1024 * 5; // 5MB
const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

export const portolioSchema = z.object({
  file: z
    .instanceof(File, {
      error: "Debes agregar una imagen.",
    })
    .refine((file) => file.size <= maxSize, {
      error: "El archivo no debe pesar más de 5MB.",
    })
    .refine((file) => validTypes.includes(file.type), {
      error: "Tipo de imagen inválido. Selecciona una imagen tipo PNG, JPEG, JPG o WEBP.",
    }),
  description: z.string().min(3, "La descripción debe tener al menos 3 carácteres."),
  category: z.string(),
  client: z.string().optional(),
});
