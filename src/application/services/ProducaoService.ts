import { IProdutoRepository } from "@/domain/repositories/IProdutoRepository";
import { IProducaoRepository } from "@/domain/repositories/IProducaoRepository";
import { ProducaoAdicionarForm } from "@/domain/models/ProducaoAdicionarForm";
import { IEstoqueProdutoRepository } from "@/domain/repositories/IEstoqueProdutoRepository";
import { eventBus } from "@/shared/utils/EventBus";
import { Producao } from "@/domain/models/Producao";
import { EstoqueProdutoAdicionarForm } from "@/domain/models/EstoqueProdutoAdicionarForm";
import { ProducaoStatus } from "@/domain/enum/ProducaoStatus";
import { IProducaoApiService } from "../interfaces/producao/IProducaoApiService";
import { ProducaoBuscarTodosDTO } from "../dtos/producao/Producao/ProducaoBuscarTodosDTO";
import { ProducaoInserirDTO } from "../dtos/producao/Producao/ProducaoInserirDTO";
import { ProducaoBuscarTodosResponseDTO } from "../dtos/producao/Producao/ProducaoBuscarTodosResponseDTO";

export class ProducaoService {
  constructor(
    private apiService: IProducaoApiService,
  ) {}
  
  async buscarTodos(dto: ProducaoBuscarTodosDTO): Promise<ProducaoBuscarTodosResponseDTO> {
    return await this.apiService.buscarTodos(dto);
  }
  
  async inserir(dados: ProducaoInserirDTO): Promise<void> {
    return await this.apiService.inserir(dados);
  }

  // async atualizar(producao: Producao): Promise<void> {
  //   return await this.apiService.atualizar(producao);
  // }
}