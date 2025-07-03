import { z } from "zod";

export const ProducaoSchema = z.object({
    id: z.string().min(1, "ID é obrigatório"),
    quantidade: z.number().min(0.01, "Quantidade inválida"),
    status: z.string().min(1,"status obrigatorio"),
    produtoId: z.string().min(1, "ID do produto é obrigatório"),
    fazendaId: z.string().min(1, "ID da fazenda é obrigatório")
  });
  
  export type ProducaoDTO = z.infer<typeof ProducaoSchema>;