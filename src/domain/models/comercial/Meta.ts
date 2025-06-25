import {
  MetaCalculoPorEnum,
  MetaStatusEnum,
  MetaTipoEnum,
} from "@/domain/enum/comercial/Meta.enum";

export interface Meta {
  id: string;
  titulo: string;
  descricao: string;
  tipo: MetaTipoEnum;
  valorAlvo: number;
  valorAtual: number;
  dataInicio: Date;
  dataFim: Date;
  status: MetaStatusEnum;
  calculoPor: MetaCalculoPorEnum;
  usuarioId: string;
  criadaEm: Date;
  atualizadaEm: Date;
  // campos opcionais
  fazendaId: string | null;
  vendaId: string | null;
  producaoId: string | null;
}
