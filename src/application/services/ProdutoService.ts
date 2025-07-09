import { ProdutoBuscarTodosResponseDTO } from "../dtos/producao/Produtos/ProdutoBuscarTodosResponseDTO";
import { IProdutoApiService } from "../interfaces/producao/IProdutoApiService";
import { ProdutoInserirDTO } from "../dtos/producao/Produtos/ProdutoInserirDTO";
import { ProdutoBuscarTodosDTO } from "../dtos/producao/Produtos/ProdutoBuscarTodosDTO";
import { Produto } from "@/domain/models/Produto";
import { ProdutoAtualizarDTO } from "../dtos/producao/Produtos/ProdutoAtualizarDTO";

export class ProdutoService {
  constructor(
    private apiService: IProdutoApiService,

  ) {}
  async buscarTodos(dto:ProdutoBuscarTodosDTO): Promise<ProdutoBuscarTodosResponseDTO> {
        return await this.apiService.buscarTodos(dto)
    }

  async inserir(dados: ProdutoInserirDTO): Promise<void> {
    await this.apiService.inserir(dados);
  }
  async atualizar(produto: ProdutoAtualizarDTO): Promise<void> {
    return await this.apiService.atualizar(produto);
  }

}
