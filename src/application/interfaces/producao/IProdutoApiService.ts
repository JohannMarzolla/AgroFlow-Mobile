import { ProdutoBuscarTodosDTO } from "@/application/dtos/producao/Produtos/ProdutoBuscarTodosDTO";
import { ProdutoBuscarTodosResponseDTO } from "@/application/dtos/producao/Produtos/ProdutoBuscarTodosResponseDTO";
import { ProdutoInserirDTO } from "@/application/dtos/producao/Produtos/ProdutoInserirDTO";

export interface IProdutoApiService {
    buscarTodos(dto:ProdutoBuscarTodosDTO): Promise<  ProdutoBuscarTodosResponseDTO>;
    inserir(dados:   ProdutoInserirDTO): Promise<void>;
    // atualizar(dados: FazendaAtualizarDTO): Promise<void>;
  }
