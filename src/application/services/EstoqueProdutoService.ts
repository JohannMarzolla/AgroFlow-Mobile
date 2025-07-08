import { IEstoqueProdutoApiService } from "../interfaces/producao/IEstoqueProdutoApiService";
import { EstoqueProdutoInserirDTO } from "../dtos/producao/EstoqueProduto/EstoqueProdutoInserirDTO";
import { EstoqueProdutoBuscarTodosResponseDTO } from "../dtos/producao/EstoqueProduto/EstoqueProdutoTodosResponseDTO";
import { EstoqueProdutoBuscarTodosDTO } from "../dtos/producao/EstoqueProduto/EstoqueProdutoBuscarTodosDTO";

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
  escutarAlteracoes(callback: () => void): () => void {
    return this.apiService.escutarAlteracoes(callback);
  }
 
  
} 