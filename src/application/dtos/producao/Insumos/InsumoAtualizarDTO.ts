import { z } from "zod";
import { InsumoInserirBaseSchema } from "./InsumoInserirDTO";


export const InsumoAtualizarSchema = InsumoInserirBaseSchema.and(
  z.object({
    id: z.string().min(1, "ID é obrigatório"),
  })
);

export type InsumoAtualizarDTO = z.infer<typeof InsumoAtualizarSchema>;
