import z from "zod";

const maxSize = 1024 * 1024 * 5; // 5MB
const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

export const brandSchema = z.object({
  file: z
    .instanceof(File, {
      error: "Debes subir una foto.",
    })
    .refine((file) => file.size <= maxSize, {
      error: "El archivo no debe pesar más de 5MB.",
    })
    .refine((file) => validTypes.includes(file.type), {
      error: "Tipo de imagen inválido. Selecciona una imagen de tipo PNG, JPEG, JPG o WEBP.",
    }),
  name: z.string().max(100, "El nombre de la marca no debe superar los 50 caracteres."),
});
