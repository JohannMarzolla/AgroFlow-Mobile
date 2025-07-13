import { DashboardLucroPorProdutoDTO } from "@/application/dtos/outros/DashboardLucroPorProdutoDTO";
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

  buscarLucroPorProduto(): Promise<DashboardLucroPorProdutoDTO[]> {
    return this.apiService.buscarLucroPorProduto();
  }

  escutarProducaoProduzidoVsPerdas(callback: () => void): () => void {
    return this.apiService.escutarProducaoProduzidoVsPerdas(callback);
  }

  escutarProducaoPorStatus(callback: () => void): () => void {
    return this.apiService.escutarProducaoPorStatus(callback);
  }

  escutarLucroPorProduto(callback: () => void): () => void {
    return this.apiService.escutarLucroPorProduto(callback);
  }
}
