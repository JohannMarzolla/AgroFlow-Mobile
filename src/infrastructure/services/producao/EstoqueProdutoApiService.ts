
import { HttpClient } from "../base/HttpClient";
import { EstoqueProdutoInserirDTO } from "@/application/dtos/producao/EstoqueProduto/EstoqueProdutoInserirDTO";
import { EstoqueProdutoBuscarTodosDTO } from "@/application/dtos/producao/EstoqueProduto/EstoqueProdutoBuscarTodosDTO";
import { EstoqueProdutoBuscarTodosResponseDTO } from "@/application/dtos/producao/EstoqueProduto/EstoqueProdutoTodosResponseDTO";
import { IEstoqueProdutoApiService } from "@/application/interfaces/producao/IEstoqueProdutoApiService";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../outros/FirebaseConfig";
import { EstoqueProdutoAtualizarDTO } from "@/application/dtos/producao/EstoqueProduto/EstoqueInsumoAtualizarDTO";
import { ProducaoAtualizarDTO } from "@/application/dtos/producao/Producao/ProducaoAtualizarDTO";


export class EstoqueProdutoApiService implements IEstoqueProdutoApiService {

  async buscarTodos(
    dto: EstoqueProdutoBuscarTodosDTO
  ): Promise<EstoqueProdutoBuscarTodosResponseDTO> {
    try {
      return HttpClient.post<EstoqueProdutoBuscarTodosDTO, EstoqueProdutoBuscarTodosResponseDTO>(
        "estoqueProduto/",
        dto
      );
    } catch (error: any) {
      console.error("Erro ao buscar todas os estoque de produtos", error);
      throw error instanceof Error
        ? error
        : new Error("Erro desconhecido ao buscar todo os estoque de produtos");
    }
  }

  async inserir(dto: EstoqueProdutoInserirDTO): Promise<void> {
    try {
      await HttpClient.post<EstoqueProdutoInserirDTO, void>("estoqueProduto/inserir", dto);
    } catch (error: any) {
      console.error("Erro ao inserir estoqueProduto", error);
      throw error instanceof Error
        ? error
        : new Error("Erro desconhecido ao tentar cadastrar festoque produto");
    } 
  }
  escutarAlteracoes(callback: () => void): () => void {
    const q = query(collection(db, "estoqueProduto"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // Não nos importamos com os dados, apenas notificamos que houve mudança
      callback();
    });
  
    return unsubscribe;
  }

  async atualizar(dto: EstoqueProdutoAtualizarDTO): Promise<void> {
    try {
      await HttpClient.post<EstoqueProdutoAtualizarDTO, void>("estoqueProduto/atualizar", dto);
    } catch (error: any) {
      console.error("Erro ao atualizar estoque Produto", error);
      throw error instanceof Error
        ? error
        : new Error("Erro desconhecido ao tentar atualizar estoque Produto ");
    }
  }
}
