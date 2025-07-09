import { HttpClient } from "../base/HttpClient";
import { UnidadeMedidaBuscarTodosDTO } from "@/application/dtos/producao/UnidadeMedida/UnidadeMedidaBuscarTodosDTO";
import { UnidadeMedidaBuscarTodosResponseDTO } from "@/application/dtos/producao/UnidadeMedida/UnidadeMedidaBuscarResponseDTO";
import { UnidadeMedidaInserirDTO } from "@/application/dtos/producao/UnidadeMedida/UnidadeMedidaInserirDTO";
import { IUnidadeMEdidaApiService } from "@/application/interfaces/producao/IUnidadeMedidaApiService";
import { UnidadeMedidaAtualizarDTO } from "@/application/dtos/producao/UnidadeMedida/UnidadeMedidaAtualizarDTO";


export class UnidadeMedidaApiService implements IUnidadeMEdidaApiService {

  async buscarTodos(
    dto: UnidadeMedidaBuscarTodosDTO
  ): Promise<UnidadeMedidaBuscarTodosResponseDTO> {
    try {
      return HttpClient.post<UnidadeMedidaBuscarTodosDTO, UnidadeMedidaBuscarTodosResponseDTO>(
        "unidadeMedida/",
        dto
      );
    } catch (error: any) {
      console.error("Erro ao buscar todas as medidas", error);
      throw error instanceof Error
        ? error
        : new Error("Erro desconhecido ao buscar todas as medidas");
    }
  }

  async inserir(dto: UnidadeMedidaInserirDTO): Promise<void> {
    try {
      await HttpClient.post<UnidadeMedidaInserirDTO, void>("unidadeMedida/inserir", dto);
    } catch (error: any) {
      console.error("Erro ao inserir medida", error);
      throw error instanceof Error
        ? error
        : new Error("Erro desconhecido ao tentar cadastrar medida");
    }
  }

  async atualizar(dto: UnidadeMedidaAtualizarDTO): Promise<void> {
    try {
      await HttpClient.post<UnidadeMedidaAtualizarDTO, void>("unidadeMedida/atualizar", dto);
    } catch (error: any) {
      console.error("Erro ao atualizar producao", error);
      throw error instanceof Error
        ? error
        : new Error("Erro desconhecido ao tentar atualizar producao");
    }
  }
}
