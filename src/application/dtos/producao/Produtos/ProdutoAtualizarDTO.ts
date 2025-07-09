import { z } from "zod";
import { ProdutoSchema } from "./ProdutoInserirDTO";

export const ProdutoAtualizarSchema = ProdutoSchema.and(
  z.object({
    id: z.string().min(1, "ID é obrigatório"),
  })
);

export type ProdutoAtualizarDTO = z.infer<typeof ProdutoAtualizarSchema>;
