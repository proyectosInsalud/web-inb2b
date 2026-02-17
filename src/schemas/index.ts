import * as z from "zod";

export const formContactHomeSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  apellido: z.string().min(1, "El apellido es requerido"),
  mensaje: z.string().min(1, "El mensaje es requerido"),
  empresa: z.string().min(1, "La empresa es requerida"),
  telefono: z.string().min(9, "El teléfono debe tener 9 dígitos"),
  aceptaTerminos: z.boolean().refine((v) => v === true, {
    message: "Debes aceptar los términos",
  })
});
