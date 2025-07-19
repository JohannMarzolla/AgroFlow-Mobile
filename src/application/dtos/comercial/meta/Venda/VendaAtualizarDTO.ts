import { z } from "zod";
import { VendaInserirSchema } from "./VendaInserirDTO";

// O DTO de atualização é igual ao de inserção, mas exige o campo id
export const VendaAtualizarSchema = VendaInserirSchema.and(
  z.object({
    id: z.string().min(1, "ID é obrigatório"),
  })
);

export type VendaAtualizarDTO = z.infer<typeof VendaAtualizarSchema>;