import { ProdutoBuscarTodosResponseDTO } from "../dtos/producao/Produtos/ProdutoBuscarTodosResponseDTO";
import { IProdutoApiService } from "../interfaces/producao/IProdutoApiService";
import { ProdutoInserirDTO } from "../dtos/producao/Produtos/ProdutoInserirDTO";
import { ProdutoBuscarTodosDTO } from "../dtos/producao/Produtos/ProdutoBuscarTodosDTO";

export class ProdutoService {
  constructor(
    private apiService: IProdutoApiService,

  ) {}
  async buscarTodos(dto:ProdutoBuscarTodosDTO): Promise<ProdutoBuscarTodosResponseDTO> {
        return await this.apiService.buscarTodos(dto)
    }

  async insert(dados: ProdutoInserirDTO): Promise<void> {
    await this.apiService.inserir(dados);
  }

}
