import { z } from "zod";

export const MedidaSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  sigla: z.string().min(1, "Sigla é obrigatória")
});

export type MedidaDTO = z.infer<typeof MedidaSchema>;