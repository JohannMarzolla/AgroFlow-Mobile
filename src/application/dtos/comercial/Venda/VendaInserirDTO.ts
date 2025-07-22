import { z } from "zod";
import { VendaStatusEnum } from "@/domain/enum/comercial/Venda.enum";

export const ItemVendaInserirSchema = z.object({
  desconto: z.number().min(0, "Desconto não pode ser negativo"),
  quantidade: z.number().min(1, "Quantidade deve ser pelo menos 1"),
  produtoId: z.string().min(1, "Produto é obrigatório"),
  fazendaId: z.string().optional(),
  precoUnitario: z.number().min(0, "Preço unitário não pode ser negativo"),
  lucroUnitario: z.number().min(0, "Lucro unitário não pode ser negativo"),
  produtoNome: z.string().min(1),
});

export const VendaInserirSchema = z.object({
  dataVenda: z.coerce.date({ required_error: "Data da venda é obrigatória" }),
  cliente: z.string().min(1, "Cliente é obrigatório"),
  imposto: z.number().min(0, "Imposto não pode ser negativo").optional(),
  valorTotal: z.number().min(0, "Valor total não pode ser negativo"),
  status: z.nativeEnum(VendaStatusEnum),
  itens: z
    .array(ItemVendaInserirSchema)
    .min(1, "Adicione pelo menos um item à venda"),
});

export type VendaInserirDTO = z.infer<typeof VendaInserirSchema>;
export type ItemVendaInserirDTO = z.infer<typeof ItemVendaInserirSchema>;
