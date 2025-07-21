import { z } from "zod";
import { DateUtils } from "@/shared/utils/date.utils";

export const InsumoProducaoSchema = z.object({
  insumoId: z.string().min(1, "ID do insumo é obrigatório"),
  quantidade: z.number().min(0.01, "Quantidade inválida"),
});

export const ProducaoInserirBaseSchema = z.object({
  quantidadePlanejada: z.number().min(0.01, "Quantidade planejada inválida"),
  precoPlanejado: z.number().min(0, "Preço planejado inválido").optional(),
  status: z.string().min(1, "Status é obrigatório"),
  produtoId: z.string().min(1, "ID do produto é obrigatório"),
  fazendaId: z.string().min(1, "ID da fazenda é obrigatório"),
  lote: z.string().min(1, "Lote é obrigatório"),
  dataInicio: z.coerce.date({
    required_error: "A data de início é obrigatória",
  }),
  dataFim: z.coerce.date({
    required_error: "A data final é obrigatória",
  }),
  colheitaId: z.string().optional(),
  insumos: z.array(InsumoProducaoSchema),
  quantidadeColhida: z.number().optional(),
  perdas: z.number().optional(),
  custoProducao: z.number().optional(),
  precoFinal: z.number().optional(),
});

export const ProducaoInserirSchema = ProducaoInserirBaseSchema.superRefine(
  (data, ctx) => {
    const hoje = DateUtils.getStartOfDay(new Date());
    const inicio = DateUtils.getStartOfDay(data.dataInicio);
    const fim = DateUtils.getStartOfDay(data.dataFim);

    if (inicio < hoje) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "A data de início deve ser hoje ou uma data futura.",
        path: ["dataInicio"],
      });
    }

    if (fim < hoje) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "A data final deve ser hoje ou uma data futura.",
        path: ["dataFim"],
      });
    }

    if (fim < inicio) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "A data final não pode ser anterior à data de início.",
        path: ["dataFim"],
      });
    }

    if (fim <= inicio) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "A data final deve ser maior que a data de início.",
        path: ["dataFim"],
      });
    }
  }
);

export type ProducaoInserirDTO = z.infer<typeof ProducaoInserirSchema>;
