import { HttpClient } from "../base/HttpClient";
import { IInsumoApiService } from "@/application/interfaces/producao/IInsumoApiService";
import { InsumoBuscarTodosDTO } from "@/application/dtos/producao/Insumos/InsumoBuscarTodosDTO";
import { InsumoBuscarTodosResponseDTO } from "@/application/dtos/producao/Insumos/InsumoBuscarTodosResponseDTO";
import { InsumoInserirDTO } from "@/application/dtos/producao/Insumos/InsumoInserirDTO";
import { InsumoAtualizarDTO } from "@/application/dtos/producao/Insumos/InsumoAtualizarDTO";

export class InsumoApiService implements IInsumoApiService {

  async buscarTodos(
    dto: InsumoBuscarTodosDTO
  ): Promise<InsumoBuscarTodosResponseDTO> {
    try {
      return HttpClient.post<InsumoBuscarTodosDTO, InsumoBuscarTodosResponseDTO>(
        "insumo/",
        dto
      );
    } catch (error: any) {
      console.error("Erro ao buscar todas as insumos", error);
      throw error instanceof Error
        ? error
        : new Error("Erro desconhecido ao buscar todas os insumos");
    }
  }

  async inserir(dto: InsumoInserirDTO): Promise<void> {
    try {
      await HttpClient.post<InsumoInserirDTO, void>("insumo/inserir", dto);
    } catch (error: any) {
      console.error("Erro ao inserir insumo", error);
      throw error instanceof Error
        ? error
        : new Error("Erro desconhecido ao tentar cadastrar insumo");
    }
  }

  async atualizar(dto: InsumoAtualizarDTO): Promise<void> {
    try {
      await HttpClient.post<InsumoAtualizarDTO, void>("insumo/atualizar", dto);
    } catch (error: any) {
      console.error("Erro ao atualizar producao", error);
      throw error instanceof Error
        ? error
        : new Error("Erro desconhecido ao tentar atualizar producao");
    }
  }
}
