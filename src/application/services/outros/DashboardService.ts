import { DashboardProducaoPorStatusDTO } from "@/application/dtos/outros/DashboardProducaoPorStatusDTO";
import { DashboardProducaoProduzidoVsPerdasDTO } from "@/application/dtos/outros/DashboardProducaoProduzidoVsPerdasDTO";
import { IDashboardApiService } from "@/application/interfaces/outros/IDashboardApiService";

export class DashboardService {
  constructor(private apiService: IDashboardApiService) {}

  buscarProducaoPorStatus(): Promise<DashboardProducaoPorStatusDTO[]> {
    return this.apiService.buscarProducaoPorStatus();
  }

  buscarProducaoProduzidoVsPerdas(): Promise<DashboardProducaoProduzidoVsPerdasDTO> {
    return this.apiService.buscarProducaoProduzidoVsPerdas();
  }

  escutarProducaoProduzidoVsPerdas(callback: () => void): () => void {
    return this.apiService.escutarProducaoProduzidoVsPerdas(callback);
  }

  escutarProducaoPorStatus(callback: () => void): () => void {
    return this.apiService.escutarProducaoPorStatus(callback);
  }
}
