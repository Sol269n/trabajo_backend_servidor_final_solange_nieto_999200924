

import { z } from "zod";

// Esquema para cuando van a crear un producto nuevo
export const createProductSchema = z.object({
  name: z.string().min(1, "El nombre del producto no puede ir vacío"),
  price: z.number().positive("El precio tiene que ser un número mayor a 0"),
  category: z.string().optional().default("General"),
  stock: z.number().int().nonnegative("El stock no puede ser negativo").optional().default(0)
});

// Para actualizar (PATCH), hacemos que todos los campos del esquema de arriba sean opcionales
export const updateProductSchema = createProductSchema.partial();