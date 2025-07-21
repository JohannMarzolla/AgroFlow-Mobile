import { SelectOption } from "../models/SelectOption";
import {
  MetaCalculoPorEnum,
  MetaStatusFiltroEnum,
  MetaStatusEnum,
  MetaTipoEnum,
  MetaTipoFiltroEnum,
} from "@/domain/enum/comercial/Meta.enum";

export default class MetaConsts {
  static readonly Tipos: SelectOption[] = [
    { value: MetaTipoEnum.VENDA, label: "Venda" },
    { value: MetaTipoEnum.PRODUCAO, label: "Produção" },
  ];

  static readonly TiposFiltro: SelectOption[] = [
    { value: MetaTipoFiltroEnum.TODOS, label: "Todos" },
    { value: MetaTipoFiltroEnum.VENDA, label: "Venda" },
    { value: MetaTipoFiltroEnum.PRODUCAO, label: "Produção" },
  ];

  static readonly StatusFiltro: SelectOption[] = [
    { value: MetaStatusFiltroEnum.TODOS, label: "Todos" },
    { value: MetaStatusFiltroEnum.EM_ANDAMENTO, label: "Em andamento" },
    { value: MetaStatusFiltroEnum.ALCANCADA, label: "Alcançadas" },
    { value: MetaStatusFiltroEnum.NAO_ALCANCADA, label: "Não alcançadas" },
  ];

  static readonly CalculoPor: SelectOption[] = [
    { value: MetaCalculoPorEnum.QUANTIDADE, label: "Quantidade" },
    { value: MetaCalculoPorEnum.VALOR, label: "Valor" },
  ];

  static readonly Status = new Map<MetaStatusEnum, string>([
    [MetaStatusEnum.EM_ANDAMENTO, "Em andamento"],
    [MetaStatusEnum.ALCANCADA, "Alcançada"],
    [MetaStatusEnum.NAO_ALCANCADA, "Não alcançada"],
  ]);
}
