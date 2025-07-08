import { z } from "zod";
import { ProducaoSchema } from "./ProducaoInserirDTO";


export const ProducaoAtualizarSchema = ProducaoSchema.and(
  z.object({
    id: z.string().min(1, "ID é obrigatório"),
  })
);

export type ProducaoAtualizarDTO = z.infer<typeof ProducaoAtualizarSchema>;
