import { HttpClient } from "../base/HttpClient";
import { MetaInserirDTO } from "@/application/dtos/comercial/MetaInserirDTO";
import { MetaAtualizarDTO } from "@/application/dtos/comercial/MetaAtualizarDTO";
import { IMetaApiService } from "@/application/interfaces/comercial/IMetaApiService";
import { Meta } from "@/domain/models/comercial/Meta";

export class MetaApiService implements IMetaApiService {
  async buscarTodos(): Promise<Meta[]> {
    try {
      return HttpClient.get<Meta[]>("meta/");
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
