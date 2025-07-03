import { EstoqueProdutoBuscarTodosDTO } from "@/application/dtos/producao/EstoqueProduto/EstoqueProdutoBuscarTodosDTO";
import { EstoqueProdutoInserirDTO } from "@/application/dtos/producao/EstoqueProduto/EstoqueProdutoInserirDTO";
import { EstoqueProdutoBuscarTodosResponseDTO } from "@/application/dtos/producao/EstoqueProduto/EstoqueProdutoTodosResponseDTO";

export interface IEstoqueProdutoApiService {
    buscarTodos(dto:EstoqueProdutoBuscarTodosDTO): Promise<EstoqueProdutoBuscarTodosResponseDTO>;
    inserir(dados:  EstoqueProdutoInserirDTO): Promise<void>;
    // atualizar(dados: FazendaAtualizarDTO): Promise<void>;
  }

 