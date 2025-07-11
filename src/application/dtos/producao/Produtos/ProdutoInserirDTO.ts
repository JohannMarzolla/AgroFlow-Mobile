import { z } from "zod";

export const ProdutoSchema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    unidadeMedidaId: z.string().min(1, "ID da unidade de medida é obrigatório"),
    insumos: z.array(z.string()).optional(),
  });
  
  export type ProdutoInserirDTO = z.infer<typeof ProdutoSchema>;