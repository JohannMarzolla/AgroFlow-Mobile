import { DashboardLucroPorProdutoDTO } from "@/application/dtos/outros/DashboardLucroPorProdutoDTO";
import { DashboardProducaoPorStatusDTO } from "@/application/dtos/outros/DashboardProducaoPorStatusDTO";
import { DashboardProducaoProduzidoVsPerdasDTO } from "@/application/dtos/outros/DashboardProducaoProduzidoVsPerdasDTO";

export interface IDashboardApiService {
  buscarProducaoPorStatus(): Promise<DashboardProducaoPorStatusDTO[]>;
  buscarProducaoProduzidoVsPerdas(): Promise<DashboardProducaoProduzidoVsPerdasDTO>;
  buscarLucroPorProduto(): Promise<DashboardLucroPorProdutoDTO[]>;

  escutarProducaoProduzidoVsPerdas(callback: () => void): () => void;
  escutarProducaoPorStatus(callback: () => void): () => void;
  escutarLucroPorProduto(callback: () => void): () => void;
}
