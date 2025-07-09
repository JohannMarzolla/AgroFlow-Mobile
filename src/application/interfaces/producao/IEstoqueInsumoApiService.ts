import { EstoqueInsumoAtualizarDTO } from "@/application/dtos/producao/EstoqueInsumo/EstoqueInsumoAtualizarDTO";
import { EstoqueInsumoBuscarTodosDTO } from "@/application/dtos/producao/EstoqueInsumo/EstoqueInsumoBuscarTodosDTO";
import { EstoqueInsumoBuscarTodosResponseDTO } from "@/application/dtos/producao/EstoqueInsumo/EstoqueInsumoBuscarTodosResponseDTO";
import { EstoqueInsumoInserirDTO } from "@/application/dtos/producao/EstoqueInsumo/EstoqueInsumoInserirDTO";

export interface IEstoqueInsumoApiService {
    buscarTodos(dto: EstoqueInsumoBuscarTodosDTO): Promise< EstoqueInsumoBuscarTodosResponseDTO>;
    inserir(dados: EstoqueInsumoInserirDTO): Promise<void>;
    atualizar(dados: EstoqueInsumoAtualizarDTO): Promise<void>;
  }

