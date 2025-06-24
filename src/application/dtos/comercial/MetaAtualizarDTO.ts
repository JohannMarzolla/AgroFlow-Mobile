import { z } from "zod";
import { MetaValidation } from "@/application/validators/comercial/meta.validation";
import { MetaInserirSchemaBase } from "./MetaInserirDTO";

export const MetaAtualizarSchema = MetaInserirSchemaBase.extend({
  id: z.string().min(1, "ID é obrigatório"),
}).superRefine(MetaValidation.validarTipoDependencias);

export type MetaAtualizarDTO = z.infer<typeof MetaAtualizarSchema>;
