import { DashboardProducaoPorStatusDTO } from "@/application/dtos/outros/DashboardProducaoPorStatusDTO";
import { DashboardProducaoProduzidoVsPerdasDTO } from "@/application/dtos/outros/DashboardProducaoProduzidoVsPerdasDTO";

export interface IDashboardApiService {
  buscarProducaoPorStatus(): Promise<DashboardProducaoPorStatusDTO[]>;
  buscarProducaoProduzidoVsPerdas(): Promise<DashboardProducaoProduzidoVsPerdasDTO>;
  escutarProducaoProduzidoVsPerdas(callback: () => void): () => void;
  escutarProducaoPorStatus(callback: () => void): () => void;
}
