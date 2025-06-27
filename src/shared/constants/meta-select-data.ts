import { SelectOption } from "../models/SelectOption";
import {
  MetaCalculoPorEnum,
  MetaStatusEnum,
  MetaTipoEnum,
} from "@/domain/enum/comercial/Meta.enum";

export default class MetaSelectData {
  static readonly Tipos: SelectOption[] = [
    { value: MetaTipoEnum.VENDA, label: "Venda" },
    { value: MetaTipoEnum.PRODUCAO, label: "Producao" },
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
}

// export const MetaSelectData.TiposFiltro: SelectOption[] = [
//   { value: TransacaoFiltroTipoEnum.TODOS, label: "Todos" },
//   { value: TransacaoFiltroTipoEnum.TRANSFERENCIA, label: "Transferência" },
//   { value: TransacaoFiltroTipoEnum.DEPOSITO, label: "Depósito" },
// ];
