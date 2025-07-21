import { z } from "zod";
import { ItemVendaInserirSchema, VendaInserirSchema } from "./VendaInserirDTO";

export const ItemVendaAtualizarSchema = ItemVendaInserirSchema.and(
  z.object({
    id: z.string().min(1, "ID é obrigatório"),
  })
);

export const VendaAtualizarSchema = VendaInserirSchema.extend({
  id: z.string().min(1, "ID é obrigatório"),
  itens: z
    .array(ItemVendaAtualizarSchema)
    .min(1, "Venda deve ter ao menos um item"),
});

export type VendaAtualizarDTO = z.infer<typeof VendaAtualizarSchema>;
