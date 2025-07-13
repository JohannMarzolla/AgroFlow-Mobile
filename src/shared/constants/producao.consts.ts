import { ProducaoStatusEnum } from "@/domain/enum/producao/producao.enum";
import { SelectOption } from "../models/SelectOption";

export default class ProducaoConsts {
  static readonly statusText: Record<ProducaoStatusEnum, string> = {
    [ProducaoStatusEnum.AGUARDANDO]: "Aguardando",
    [ProducaoStatusEnum.EM_PRODUCAO]: "Em produção",
    [ProducaoStatusEnum.COLHIDA]: "Colhida",
  };

  static readonly Status: SelectOption[] = [
    { value: ProducaoStatusEnum.AGUARDANDO, label: this.statusText.AGUARDANDO },
    {
      value: ProducaoStatusEnum.EM_PRODUCAO,
      label: this.statusText.EM_PRODUCAO,
    },
    { value: ProducaoStatusEnum.COLHIDA, label: this.statusText.COLHIDA },
  ];
}
