import { z } from "zod";

export const EstoqueInsumoInserirSchema = z.object({
  insumoId: z.string().min(1, "ID do insumo é obrigatório"),
  quantidade: z.number().min(0.01, "Quantidade deve ser maior que zero"),
  preco: z.number().min(0, "Preço não pode ser negativo").optional()
});


export type EstoqueInsumoInserirDTO = z.infer<typeof EstoqueInsumoInserirSchema>;