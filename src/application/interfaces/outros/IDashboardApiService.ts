import { DashboardProducaoPorStatusDTO } from "@/application/dtos/outros/DashboardProducaoPorStatusDTO";

export interface IDashboardApiService {
  buscarProducaoPorStatus(): Promise<DashboardProducaoPorStatusDTO[]>;
  escutarProducaoPorStatus(callback: () => void): () => void;
}
