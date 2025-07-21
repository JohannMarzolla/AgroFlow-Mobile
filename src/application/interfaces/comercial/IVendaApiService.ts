import { VendaAtualizarDTO } from "@/application/dtos/comercial/Venda/VendaAtualizarDTO";
import { VendaBuscarTodosDTO } from "@/application/dtos/comercial/Venda/VendaBuscarTodosDTO";
import { VendaBuscarTodosResponseDTO } from "@/application/dtos/comercial/Venda/VendaBuscarTodosResponseDTO";
import { VendaInserirDTO } from "@/application/dtos/comercial/Venda/VendaInserirDTO";

export interface IVendaApiService {
  buscarTodos(dto: VendaBuscarTodosDTO): Promise<VendaBuscarTodosResponseDTO>;
  inserir(dados: VendaInserirDTO): Promise<void>;
  atualizar(dados: VendaAtualizarDTO): Promise<void>;
}
