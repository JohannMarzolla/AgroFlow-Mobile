import { IProducaoApiService } from "../interfaces/producao/IProducaoApiService";
import { ProducaoBuscarTodosDTO } from "../dtos/producao/Producao/ProducaoBuscarTodosDTO";
import { ProducaoInserirDTO } from "../dtos/producao/Producao/ProducaoInserirDTO";
import { ProducaoBuscarTodosResponseDTO } from "../dtos/producao/Producao/ProducaoBuscarTodosResponseDTO";
import { ProducaoAtualizarDTO } from "../dtos/producao/Producao/ProducaoAtualizarDTO";

export class ProducaoService {
  constructor(private apiService: IProducaoApiService) {}

  async buscarTodos(
    dto: ProducaoBuscarTodosDTO
  ): Promise<ProducaoBuscarTodosResponseDTO> {
    return await this.apiService.buscarTodos(dto);
  }

  async inserir(dados: ProducaoInserirDTO): Promise<void> {
    return await this.apiService.inserir(dados);
  }

  async atualizar(producao: ProducaoAtualizarDTO): Promise<void> {
    return await this.apiService.atualizar(producao);
  }
}
