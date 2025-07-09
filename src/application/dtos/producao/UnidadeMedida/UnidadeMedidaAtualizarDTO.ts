import { z } from "zod";
import { MedidaSchema } from "./UnidadeMedidaInserirDTO";

export const UnidadeMedidaAtualizarSchema = MedidaSchema.and(
  z.object({
    id: z.string().min(1, "ID é obrigatório"),
  })
);

export type UnidadeMedidaAtualizarDTO = z.infer<typeof UnidadeMedidaAtualizarSchema>;
