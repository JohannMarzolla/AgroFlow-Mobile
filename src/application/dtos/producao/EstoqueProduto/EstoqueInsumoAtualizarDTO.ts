import { z } from "zod";


export const EstoqueProdutoAtualizarSchema = z.object({
  id: z.string().min(1, "ID é obrigatório"),
  quantidade: z.number().min(0.01, "Quantidade deve ser maior que zero"),
  preco: z.number().min(0, "Preço não pode ser negativo").optional(),
  lote: z.string().optional()
});

export type EstoqueProdutoAtualizarDTO = z.infer<typeof EstoqueProdutoAtualizarSchema>;