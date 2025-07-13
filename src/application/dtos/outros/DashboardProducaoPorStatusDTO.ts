import { ProducaoStatusEnum } from "@/domain/enum/producao/producao.enum";

export interface DashboardProducaoPorStatusDTO {
  status: ProducaoStatusEnum;
  qtd: number;
}
