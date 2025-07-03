import { z } from "zod";

export const EstoqueProdutoInserirSchema = z.object({
  produtoId: z.string().min(1, "ID do produto é obrigatório"),
  quantidade: z.number().min(0.01, "Quantidade deve ser maior que zero"),
  preco: z.number().min(0, "Preço não pode ser negativo").optional()
});

export type EstoqueProdutoInserirDTO = z.infer<typeof EstoqueProdutoInserirSchema>;