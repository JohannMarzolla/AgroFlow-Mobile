import { HttpClient } from "../base/HttpClient";
import { ProducaoInserirDTO } from "@/application/dtos/producao/Producao/ProducaoInserirDTO";
import { ProducaoBuscarTodosDTO } from "@/application/dtos/producao/Producao/ProducaoBuscarTodosDTO";
import { ProducaoBuscarTodosResponseDTO } from "@/application/dtos/producao/Producao/ProducaoBuscarTodosResponseDTO";
import { IProducaoApiService } from "@/application/interfaces/producao/IProducaoApiService";


export class ProducaoApiService implements IProducaoApiService {

  async buscarTodos(
    dto: ProducaoBuscarTodosDTO
  ): Promise<ProducaoBuscarTodosResponseDTO> {
    try {
      return HttpClient.post<ProducaoBuscarTodosDTO, ProducaoBuscarTodosResponseDTO>(
        "producao/",
        dto
      );
    } catch (error: any) {
      console.error("Erro ao buscar todas as producoes", error);
      throw error instanceof Error
        ? error
        : new Error("Erro desconhecido ao buscar todas as producoes");
    }
  }

  async inserir(dto: ProducaoInserirDTO): Promise<void> {
    try {
      await HttpClient.post<ProducaoInserirDTO, void>("producao/inserir", dto);
    } catch (error: any) {
      console.error("Erro ao inserir producao", error);
      throw error instanceof Error
        ? error
        : new Error("Erro desconhecido ao tentar cadastrar producao");
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
