import { TipoTransacao } from "../types/TipoTransacaoEnum";
import { TransacaoFiltroTipoEnum } from "../types/TransacaoFiltroTipoEnum";
import { SelectOption } from "../models/SelectOption";
import { MetaTipoEnum } from "@/domain/enum/comercial/Meta.enum";

export const ListaMetaTipos: SelectOption[] = [
  { value: MetaTipoEnum.VENDA, label: "Venda" },
  { value: MetaTipoEnum.PRODUCAO, label: "Producao" },
];

// export const ListaMetaTiposFiltro: SelectOption[] = [
//   { value: TransacaoFiltroTipoEnum.TODOS, label: "Todos" },
//   { value: TransacaoFiltroTipoEnum.TRANSFERENCIA, label: "Transferência" },
//   { value: TransacaoFiltroTipoEnum.DEPOSITO, label: "Depósito" },
// ];
