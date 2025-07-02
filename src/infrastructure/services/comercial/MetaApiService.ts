import { HttpClient } from "../base/HttpClient";
import { MetaInserirDTO } from "@/application/dtos/comercial/MetaInserirDTO";
import { MetaAtualizarDTO } from "@/application/dtos/comercial/MetaAtualizarDTO";
import { IMetaApiService } from "@/application/interfaces/comercial/IMetaApiService";
import { MetaBuscarTodosDTO } from "@/application/dtos/comercial/MetaBuscarTodosDTO";
import { MetaBuscarTodosResponseDTO } from "@/application/dtos/comercial/MetaBuscarTodosResponseDTO";

export class MetaApiService implements IMetaApiService {
  async buscarTodos(
    dto: MetaBuscarTodosDTO
  ): Promise<MetaBuscarTodosResponseDTO> {
    try {
      return HttpClient.post<MetaBuscarTodosDTO, MetaBuscarTodosResponseDTO>(
        "meta/",
        dto
      );
    } catch (error: any) {
      console.error("Erro ao buscar todas as metas", error);
      throw error instanceof Error
        ? error
        : new Error("Erro desconhecido ao buscar todas as metas");
    }
  }
  async inserir(dto: MetaInserirDTO): Promise<void> {
    try {
      await HttpClient.post<MetaInserirDTO, void>("meta/inserir", dto);
    } catch (error: any) {
      console.error("Erro ao inserir meta", error);
      throw error instanceof Error
        ? error
        : new Error("Erro desconhecido ao tentar cadastrar usuario");
    }
  }
  async atualizar(dto: MetaAtualizarDTO): Promise<void> {
    try {
      await HttpClient.post<MetaAtualizarDTO, void>("meta/atualizar", dto);
    } catch (error: any) {
      console.error("Erro ao atualizar meta", error);
      throw error instanceof Error
        ? error
        : new Error("Erro desconhecido ao tentar cadastrar usuario");
    }
  }
}
