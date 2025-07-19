import { VendaBuscarTodosDTO } from "@/application/dtos/comercial/meta/Venda/VendaBuscarTodosDTO";
import { VendaBuscarTodosResponseDTO } from "@/application/dtos/comercial/meta/Venda/VendaBuscarTodosResponseDTO";
import { HttpClient } from "../base/HttpClient";
import { VendaInserirDTO } from "@/application/dtos/comercial/meta/Venda/VendaInserirDTO";
import { VendaAtualizarDTO } from "@/application/dtos/comercial/meta/Venda/VendaAtualizarDTO";
import { IVendaApiService } from "@/application/interfaces/comercial/IVendaApiService";

export class VendaApiService implements IVendaApiService {
  async buscarTodos(
    dto: VendaBuscarTodosDTO
  ): Promise<VendaBuscarTodosResponseDTO> {
    try {
      return HttpClient.post<VendaBuscarTodosDTO, VendaBuscarTodosResponseDTO>(
        "venda/",
        dto
      );
    } catch (error: any) {
      console.error("Erro ao buscar todas as vendas", error);
      throw error instanceof Error
        ? error
        : new Error("Erro desconhecido ao buscar todas as vendas");
    }
  }

  async inserir(dto: VendaInserirDTO): Promise<void> {
    try {
      await HttpClient.post<VendaInserirDTO, void>("venda/inserir", dto);
    } catch (error: any) {
      console.error("Erro ao inserir venda", error);
      throw error instanceof Error
        ? error
        : new Error("Erro desconhecido ao tentar cadastrar venda");
    }
  }

  async atualizar(dto: VendaAtualizarDTO): Promise<void> {
    try {
      await HttpClient.post<VendaAtualizarDTO, void>("venda/atualizar", dto);
    } catch (error: any) {
      console.error("Erro ao atualizar venda", error);
      throw error instanceof Error
        ? error
        : new Error("Erro desconhecido ao tentar atualizar venda");
    }
  }
}