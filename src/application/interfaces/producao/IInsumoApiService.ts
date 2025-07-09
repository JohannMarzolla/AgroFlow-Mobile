import { InsumoAtualizarDTO } from "@/application/dtos/producao/Insumos/InsumoAtualizarDTO";
import { InsumoBuscarTodosDTO } from "@/application/dtos/producao/Insumos/InsumoBuscarTodosDTO";
import { InsumoBuscarTodosResponseDTO } from "@/application/dtos/producao/Insumos/InsumoBuscarTodosResponseDTO";
import { InsumoInserirDTO } from "@/application/dtos/producao/Insumos/InsumoInserirDTO";

export interface IInsumoApiService {
    buscarTodos(dto:InsumoBuscarTodosDTO): Promise<InsumoBuscarTodosResponseDTO>;
    inserir(dados: InsumoInserirDTO): Promise<void>;
    atualizar(dados: InsumoAtualizarDTO): Promise<void>;
  }
  