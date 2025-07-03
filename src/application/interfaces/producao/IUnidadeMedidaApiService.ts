import { UnidadeMedidaBuscarTodosResponseDTO } from "@/application/dtos/producao/UnidadeMedida/UnidadeMedidaBuscarResponseDTO";
import { UnidadeMedidaBuscarTodosDTO } from "@/application/dtos/producao/UnidadeMedida/UnidadeMedidaBuscarTodosDTO";
import { UnidadeMedidaInserirDTO } from "@/application/dtos/producao/UnidadeMedida/UnidadeMedidaInserirDTO";

export interface IUnidadeMEdidaApiService {
    buscarTodos(dto:UnidadeMedidaBuscarTodosDTO): Promise<UnidadeMedidaBuscarTodosResponseDTO>;
    inserir(dados: UnidadeMedidaInserirDTO): Promise<void>;
    // atualizar(dados: FazendaAtualizarDTO): Promise<void>;
  }
  