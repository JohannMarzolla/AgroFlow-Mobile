import { EstoqueProdutoBuscarTodosDTO } from "@/application/dtos/producao/EstoqueProduto/EstoqueProdutoBuscarTodosDTO";
import { EstoqueProdutoInserirDTO } from "@/application/dtos/producao/EstoqueProduto/EstoqueProdutoInserirDTO";
import { EstoqueProdutoBuscarTodosResponseDTO } from "@/application/dtos/producao/EstoqueProduto/EstoqueProdutoTodosResponseDTO";
import { EstoqueProduto } from "@/domain/models/EstoqueProduto";

export interface IEstoqueProdutoApiService {
    buscarTodos(dto:EstoqueProdutoBuscarTodosDTO): Promise<EstoqueProdutoBuscarTodosResponseDTO>;
    inserir(dados:  EstoqueProdutoInserirDTO): Promise<void>;
    // escutarTodos(lista: EstoqueProduto[]): Promise<void>
    // atualizar(dados: FazendaAtualizarDTO): Promise<void>;
  }

 