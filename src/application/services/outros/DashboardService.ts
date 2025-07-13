import { DashboardProducaoPorStatusDTO } from "@/application/dtos/outros/DashboardProducaoPorStatusDTO";
import { IDashboardApiService } from "@/application/interfaces/outros/IDashboardApiService";

export class DashboardService {
  constructor(private apiService: IDashboardApiService) {}

  buscarProducaoPorStatus(): Promise<DashboardProducaoPorStatusDTO[]> {
    return this.apiService.buscarProducaoPorStatus();
  }

  escutarProducaoPorStatus(callback: () => void): () => void {
    return this.apiService.escutarProducaoPorStatus(callback);
  }
}
