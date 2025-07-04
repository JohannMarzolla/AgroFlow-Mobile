import { HttpClient } from "../base/HttpClient";
import { ProdutoBuscarTodosDTO } from "@/application/dtos/producao/Produtos/ProdutoBuscarTodosDTO";
import { ProdutoBuscarTodosResponseDTO } from "@/application/dtos/producao/Produtos/ProdutoBuscarTodosResponseDTO";
import { ProdutoInserirDTO } from "@/application/dtos/producao/Produtos/ProdutoInserirDTO";
import { IProdutoApiService } from "@/application/interfaces/producao/IProdutoApiService";


export class ProdutoApiService implements IProdutoApiService {

  async buscarTodos(
    dto: ProdutoBuscarTodosDTO
  ): Promise<ProdutoBuscarTodosResponseDTO> {
    try {
      return HttpClient.post<ProdutoBuscarTodosDTO, ProdutoBuscarTodosResponseDTO>(
        "produto/",
        dto
      );
    } catch (error: any) {
      console.error("Erro ao buscar todas as fazenda", error);
      throw error instanceof Error
        ? error
        : new Error("Erro desconhecido ao buscar todas as fazendas");
    }
  }

  async inserir(dto: ProdutoInserirDTO): Promise<void> {
    try {
      await HttpClient.post<ProdutoInserirDTO, void>("produto/inserir", dto);
    } catch (error: any) {
      console.error("Erro ao inserir produto", error);
      throw error instanceof Error
        ? error
        : new Error("Erro desconhecido ao tentar cadastrar produto");
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
