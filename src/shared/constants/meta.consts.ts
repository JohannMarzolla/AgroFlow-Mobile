import { SelectOption } from "../models/SelectOption";
import {
  MetaCalculoPorEnum,
  MetaStatusEnum,
  MetaTipoEnum,
} from "@/domain/enum/comercial/Meta.enum";

export default class MetaConsts {
  static readonly Tipos: SelectOption[] = [
    { value: MetaTipoEnum.VENDA, label: "Venda" },
    { value: MetaTipoEnum.PRODUCAO, label: "Produção" },
  ];

  static readonly CalculoPor: SelectOption[] = [
    { value: MetaCalculoPorEnum.QUANTIDADE, label: "Quantidade" },
    { value: MetaCalculoPorEnum.VALOR, label: "Valor" },
  ];

  static readonly Status: SelectOption[] = [
    { value: MetaStatusEnum.ATIVA, label: "Ativo" },
    { value: MetaStatusEnum.CANCELADA, label: "Cancelado" },
    { value: MetaStatusEnum.CONCLUIDA, label: "Concluído" },
    { value: MetaStatusEnum.EXPIRADA, label: "Expirado" },
    { value: MetaStatusEnum.INICIALIZADA, label: "Inicializado" },
  ];

  static readonly statusTextColors: { [key in MetaStatusEnum]: string } = {
    [MetaStatusEnum.ATIVA]: "color-agroflow-orange",
    [MetaStatusEnum.CANCELADA]: "color-agroflow-red",
    [MetaStatusEnum.INICIALIZADA]: "color-agroflow-orange",
    [MetaStatusEnum.CONCLUIDA]: "color-agroflow-green",
    [MetaStatusEnum.EXPIRADA]: "color-agroflow-red",
  };
}

// export const MetaConsts.TiposFiltro: SelectOption[] = [
//   { value: TransacaoFiltroTipoEnum.TODOS, label: "Todos" },
//   { value: TransacaoFiltroTipoEnum.TRANSFERENCIA, label: "Transferência" },
//   { value: TransacaoFiltroTipoEnum.DEPOSITO, label: "Depósito" },
// ];
