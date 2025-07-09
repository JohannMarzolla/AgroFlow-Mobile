import { HttpClient } from "../base/HttpClient";
import { EstoqueInsumoInserirDTO } from "@/application/dtos/producao/EstoqueInsumo/EstoqueInsumoInserirDTO";
import { EstoqueInsumoBuscarTodosDTO } from "@/application/dtos/producao/EstoqueInsumo/EstoqueInsumoBuscarTodosDTO";
import { EstoqueInsumoBuscarTodosResponseDTO } from "@/application/dtos/producao/EstoqueInsumo/EstoqueInsumoBuscarTodosResponseDTO";
import { IEstoqueInsumoApiService } from "@/application/interfaces/producao/IEstoqueInsumoApiService";
import { EstoqueInsumoAtualizarDTO } from "@/application/dtos/producao/EstoqueInsumo/EstoqueInsumoAtualizarDTO";


export class EstoqueInsumoApiService implements IEstoqueInsumoApiService {

  async buscarTodos(
    dto: EstoqueInsumoBuscarTodosDTO
  ): Promise<EstoqueInsumoBuscarTodosResponseDTO> {
    try {
      return HttpClient.post<EstoqueInsumoBuscarTodosDTO, EstoqueInsumoBuscarTodosResponseDTO>(
        "estoqueInsumo/",
        dto
      );
    } catch (error: any) {
      console.error("Erro ao buscar todas os estoques de insumos", error);
      throw error instanceof Error
        ? error
        : new Error("Erro desconhecido ao buscar todas os estoques de insumos");
    }
  }

  async inserir(dto: EstoqueInsumoInserirDTO): Promise<void> {
    try {
      await HttpClient.post<EstoqueInsumoInserirDTO, void>("estoqueInsumo/inserir", dto);
    } catch (error: any) {
      console.error("Erro ao inserir estoqueInsumo", error);
      throw error instanceof Error
        ? error
        : new Error("Erro desconhecido ao tentar cadastrar estoqueInsumo");
    }
  }

  async atualizar(dto: EstoqueInsumoAtualizarDTO): Promise<void> {
    try {
      await HttpClient.post<EstoqueInsumoAtualizarDTO, void>("estoqueInsumo/atualizar", dto);
    } catch (error: any) {
      console.error("Erro ao atualizar producao", error);
      throw error instanceof Error
        ? error
        : new Error("Erro desconhecido ao tentar atualizar producao");
    }
  }
}
