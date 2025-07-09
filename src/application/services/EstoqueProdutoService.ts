import { IEstoqueProdutoApiService } from "../interfaces/producao/IEstoqueProdutoApiService";
import { EstoqueProdutoInserirDTO } from "../dtos/producao/EstoqueProduto/EstoqueProdutoInserirDTO";
import { EstoqueProdutoBuscarTodosResponseDTO } from "../dtos/producao/EstoqueProduto/EstoqueProdutoTodosResponseDTO";
import { EstoqueProdutoBuscarTodosDTO } from "../dtos/producao/EstoqueProduto/EstoqueProdutoBuscarTodosDTO";
import { EstoqueProduto } from "@/domain/models/EstoqueProduto";
import { EstoqueProdutoAtualizarDTO } from "../dtos/producao/EstoqueProduto/EstoqueInsumoAtualizarDTO";

export class EstoqueProdutoService {
  constructor(
    private apiService: IEstoqueProdutoApiService,
  ) {}
  
  async buscarTodos(dto :EstoqueProdutoBuscarTodosDTO):Promise<EstoqueProdutoBuscarTodosResponseDTO> {
    return await this.apiService.buscarTodos(dto);
  }
  
  async inserir(dados : EstoqueProdutoInserirDTO) {
    return await this.apiService.inserir(dados);
  }
  async atualizar(estoqueProduto: EstoqueProdutoAtualizarDTO): Promise<void> {
    return await this.apiService.atualizar(estoqueProduto);
  }
  escutarAlteracoes(callback: () => void): () => void {
    return this.apiService.escutarAlteracoes(callback);
  }
 
  
} 