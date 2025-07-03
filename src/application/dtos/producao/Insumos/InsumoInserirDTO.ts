import { z } from "zod";


export const InsumoInserirBaseSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  unidadeMedidaId: z.string().min(1, "ID da unidade de medida é obrigatório")
});

export type InsumoInserirDTO = z.infer<typeof InsumoInserirBaseSchema>;