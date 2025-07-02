import { FazendaBuscarTodosDTO } from "@/application/dtos/producao/fazenda/FazendaBuscarTodosDTO";
import { HttpClient } from "../base/HttpClient";
import { FazendaBuscarTodosResponseDTO } from "@/application/dtos/producao/fazenda/FazendaBuscarTodosResponseDTO";
import { FazendaInserirDTO } from "@/application/dtos/producao/fazenda/FazendaInserirDTO";
import { IFazendaApiService } from "@/application/interfaces/producao/IFazendaApiService";


export class FazendaApiService implements IFazendaApiService {

  async buscarTodos(
    dto: FazendaBuscarTodosDTO
  ): Promise<FazendaBuscarTodosResponseDTO> {
    try {
      return HttpClient.post<FazendaBuscarTodosDTO, FazendaBuscarTodosResponseDTO>(
        "fazenda/",
        dto
      );
    } catch (error: any) {
      console.error("Erro ao buscar todas as fazenda", error);
      throw error instanceof Error
        ? error
        : new Error("Erro desconhecido ao buscar todas as fazendas");
    }
  }

  async inserir(dto: FazendaInserirDTO): Promise<void> {
    try {
      await HttpClient.post<FazendaInserirDTO, void>("fazenda/inserir", dto);
    } catch (error: any) {
      console.error("Erro ao inserir fazenda", error);
      throw error instanceof Error
        ? error
        : new Error("Erro desconhecido ao tentar cadastrar fazenda");
    }
  }

  // async atualizar(dto: FazendaAtualizarDTO): Promise<void> {
  //   try {
  //     await HttpClient.post<FazendaAtualizarDTO, void>("fazenda/atualizar", dto);
  //   } catch (error: any) {
  //     console.error("Erro ao atualizar fazenda", error);
  //     throw error instanceof Error
  //       ? error
  //       : new Error("Erro desconhecido ao tentar atualizar fazenda");
  //   }
  // }
}
